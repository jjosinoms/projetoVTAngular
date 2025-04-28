import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentacoesComponent } from './documentacoes.component';

const routes: Routes = [{ path: '', component: DocumentacoesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentacoesRoutingModule { }
