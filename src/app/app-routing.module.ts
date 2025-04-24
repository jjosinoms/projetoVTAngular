import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteListComponent } from './clientes/cliente-list/cliente-list.component';
import { ClienteDetalhesComponent } from './clientes/cliente-detalhes/cliente-detalhes.component';

const routes: Routes = [
  { 
    path: '',
    pathMatch: 'full',
    redirectTo: 'clientes'
  },
  {
    path: 'clientes',
    component: ClienteListComponent
  },
  {
    path: 'clientes/:id',
    component: ClienteDetalhesComponent
  },
  // Você pode adicionar uma rota para página não encontrada (404) se quiser
  { 
    path: '**',
    redirectTo: 'clientes'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }