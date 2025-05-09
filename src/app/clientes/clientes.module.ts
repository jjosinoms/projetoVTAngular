import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { ClienteDetalhesComponent } from './cliente-detalhes/cliente-detalhes.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { EquipamentoListComponent } from './equipamentos/equipamento-list/equipamento-list.component';
import { EquipamentoFormComponent } from './equipamentos/equipamento-form/equipamento-form.component';
import { VisitaListComponent } from './visitas/visita-list/visita-list.component';
import { VisitaFormComponent } from './visitas/visita-form/visita-form.component';

import { SharedModule } from '../shared/shared.module'; // <--- para usar MenuComponent
import { MatDividerModule } from '@angular/material/divider';


@NgModule({
  declarations: [
    ClienteListComponent,
    ClienteDetalhesComponent,
    ClienteFormComponent,
    EquipamentoListComponent,
    EquipamentoFormComponent,
    VisitaListComponent,
    VisitaFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SharedModule, // <--- permite uso de <app-menu> aqui

    // Angular Material
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule
  ]
})
export class ClientModule { }
