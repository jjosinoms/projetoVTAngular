import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentacoesRoutingModule } from './documentacoes-routing.module';
import { DocumentacoesComponent } from './documentacoes.component';


@NgModule({
  declarations: [
    DocumentacoesComponent
  ],
  imports: [
    CommonModule,
    DocumentacoesRoutingModule
  ]
})
export class DocumentacoesModule { }
