import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../services/cliente.service'; // Atualize conforme necessário
import { Cliente } from '../models/cliente.model'; // Certifique-se de que o caminho está correto

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: false
})
export class DashboardComponent implements OnInit {
  filterText = '';
  clientes: Cliente[] = [];  // Tipando como Cliente[]
  selectedCliente: Cliente | null = null;

  cards = [
    {
      title: 'Documentações',
      description: 'Passo a passo de configuração para diversos modelos de balança.',
      route: '/documentacoes',
      icon: '📘'
    },
    {
      title: 'Visitas Técnicas / Clientes',
      description: 'Gerencie suas visitas técnicas e os dados dos clientes.',
      route: '/clientes',
      icon: '🧑‍🔧'
    },
    {
      title: 'Relatórios',
      description: 'Acompanhe dados de visitas, equipamentos e clientes.',
      route: '/relatorios',
      icon: '📊'
    },
    {
      title: 'Notificações',
      description: 'Alertas sobre garantias, visitas e estoque.',
      route: '/notificacoes',
      icon: '🔔'
    }
  ];

  constructor(private router: Router, private clienteService: ClienteService) {}

  ngOnInit() {
    this.carregarClientes();  // Chama a função para carregar os clientes
  }

  // Função para carregar os clientes
  carregarClientes(): void {
    this.clienteService.getClientes().subscribe({
      next: (data: Cliente[]) => {
        this.clientes = data;  // Atualiza os dados corretamente
      },
      error: (err) => console.error('Erro ao carregar clientes:', err)
    });
  }

  // Função para filtrar clientes
  get filteredClientes() {
    const filter = this.filterText.toLowerCase();
    return this.clientes.filter(cliente =>
      cliente.nome.toLowerCase().includes(filter) ||
      cliente.cnpj.toLowerCase().includes(filter)
    );
  }

  // Navegar para o cliente específico
  openDetails(cliente: Cliente) {
    this.selectedCliente = cliente;
    this.router.navigate([`/clientes/${cliente.id}`]);  // Navega para a página de detalhes do cliente
  }

  // Função para navegação aos cards
  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
