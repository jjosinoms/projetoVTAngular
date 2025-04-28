import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importando os componentes principais
import { ClienteListComponent } from './clientes/cliente-list/cliente-list.component';
import { ClienteDetalhesComponent } from './clientes/cliente-detalhes/cliente-detalhes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { NotificacoesComponent } from './notificacoes/notificacoes.component';

// Definindo as rotas
const routes: Routes = [
  { 
    path: '',
    pathMatch: 'full',
    component: DashboardComponent // A rota principal é o Dashboard
  },
  {
    path: 'clientes',
    component: ClienteListComponent // Lista de clientes
  },
  {
    path: 'clientes/:id',
    component: ClienteDetalhesComponent // Detalhes de um cliente
  },
  {
    path: 'dashboard',
    component: DashboardComponent // Dashboard
  },
  {
    path: 'relatorios',
    component: RelatoriosComponent // Relatórios
  },
  {
    path: 'notificacoes',
    component: NotificacoesComponent // Notificações
  },
  {
    path: 'documentacoes',
    loadChildren: () => import('./documentacoes/documentacoes.module').then(m => m.DocumentacoesModule) // Lazy loading do módulo de documentações
  },
  { 
    path: '**',
    redirectTo: '' // Redireciona para o Dashboard se não encontrar a rota
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
