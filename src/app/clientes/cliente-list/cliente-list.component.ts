import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Cliente } from '../../models/cliente.model';
import { ClienteService } from '../../services/cliente.service';
import { ClienteFormComponent } from '../cliente-form/cliente-form.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importe o FormsModule

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css'],
  standalone: false
})
export class ClienteListComponent implements OnInit {
  clientes: Cliente[] = [];
  clientesFiltrados: Cliente[] = [];
  filtro: string = '';

  constructor(
    private clienteService: ClienteService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarClientes();
  }

  carregarClientes(): void {
    this.clienteService.getClientes().subscribe({
      next: (clientes) => {
        this.clientes = clientes;
        this.clientesFiltrados = [...clientes];
      },
      error: (err) => console.error('Erro ao carregar clientes:', err)
    });
  }

  filtrarClientes(): void {
    if (!this.filtro) {
      this.clientesFiltrados = [...this.clientes];
      return;
    }

    const termo = this.filtro.toLowerCase();
    this.clientesFiltrados = this.clientes.filter(cliente =>
      cliente.nome.toLowerCase().includes(termo) ||
      cliente.cnpj.toLowerCase().includes(termo)
    );
  }

  verDetalhes(id: number): void {
    this.router.navigate(['/clientes', id]);
  }

  openAddClienteDialog(): void {
    const dialogRef = this.dialog.open(ClienteFormComponent, {
      width: '800px',
      data: { mode: 'add' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.carregarClientes();
      }
    });
  }

  openEditClienteDialog(cliente: Cliente): void {
    const dialogRef = this.dialog.open(ClienteFormComponent, {
      width: '800px',
      data: { mode: 'edit', cliente }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.carregarClientes();
      }
    });
  }
}