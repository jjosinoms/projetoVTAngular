import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  
})
export class MenuComponent {

  constructor(
    private router: Router,

  ) { }

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

    // Função para navegação aos cards
    navigateTo(route: string) {
      this.router.navigate([route]);
    }

    
}
