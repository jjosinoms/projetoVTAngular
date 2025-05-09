import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../services/cliente.service'; // Atualize conforme necessário
import { Cliente } from '../models/cliente.model'; // Certifique-se de que o caminho está correto
import { VisitaService } from '../services/visita.service';
import { Visita } from '../models/visita.model';

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
  expanded: boolean = false;  // Inicializa como false por padrão


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
  ];

  constructor(
    private router: Router,
    private clienteService: ClienteService,
    private visitaService: VisitaService
  ) { }

  ngOnInit() {
    this.carregarClientes();  // Chama a função para carregar os clientes
  }

  // Função para carregar os clientes
  carregarClientes(): void {
    this.clienteService.getClientes().subscribe({
      next: (data: Cliente[]) => {
        this.clientes = data;
        this.clientes.forEach(cliente => this.carregarVisitas(cliente));
        // console.log("Lista de clientes:", this.clientes);
      },
      error: (err) => console.error('Erro ao carregar clientes:', err)
    });
  }

  // Função para carregar as visitas de um cliente
  carregarVisitas(cliente: Cliente): void {
    this.visitaService.getVisitasPorCliente(cliente.id).subscribe({
      next: (data: Visita[]) => {
        cliente.visitas = data;  // Adiciona as visitas diretamente no cliente
        // console.log(`Lista de visitas para o cliente ${cliente.id}:`, cliente.visitas);
      },
      error: (err) => console.error(`Erro ao carregar visitas para o cliente ${cliente.id}:`, err)
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

  isExpandedRow(index: number, row: any): boolean {
    return !!row.expanded;
  }
  
  
  toggleExpanded(element: any): void {
    element.expanded = !element.expanded;
  }

  getUltimaVisita(cliente: Cliente): string {
    if (!cliente.visitas || cliente.visitas.length === 0) {
      return 'Sem visitas';
    }
  
    // Ordena as visitas pela data (mais recente primeiro)
    const ultima = cliente.visitas
      .slice() // evita alterar o array original
      .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())[0];
  
    return new Date(ultima.data).toLocaleDateString('pt-BR');
  }
  
  
}
