import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ClientesRoutingModule } from './clientes/clientes-routing.module';
import { SharedModule } from './shared/shared.module';
import { ClientModule } from './clientes/clientes.module';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { NotificacoesComponent } from './notificacoes/notificacoes.component';
import { DocumentacoesComponent } from './documentacoes/documentacoes.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
// import { DocumentacoesComponent } from './documentacoes/documentacoes.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Importação para o MatSpinner
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    RelatoriosComponent,
    NotificacoesComponent,
    DocumentacoesComponent,
    SafeUrlPipe 
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ClientesRoutingModule,
    SharedModule,
    ClientModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    RouterModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatTableModule,
    
    
    
     



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
