import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ClientesRoutingModule } from './clientes/clientes-routing.module';
import { SharedModule } from './shared/shared.module';
import { ClientModule } from './clientes/clientes.module';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { NotificacoesComponent } from './notificacoes/notificacoes.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    RelatoriosComponent,
    NotificacoesComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ClientesRoutingModule,
    SharedModule,
    ClientModule,



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
