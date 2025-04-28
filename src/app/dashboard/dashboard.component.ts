import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: false
})
export class DashboardComponent {
  constructor(private router: Router) {}

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

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
