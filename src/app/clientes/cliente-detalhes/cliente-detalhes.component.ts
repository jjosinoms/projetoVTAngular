import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Cliente } from '../../models/cliente.model';
import { Equipamento } from '../../models/equipamento.model';
import { Visita } from '../../models/visita.model';
import { ClienteService } from '../../services/cliente.service';
import { EquipamentoService } from '../../services/equipamento.service';
import { VisitaService } from '../../services/visita.service';
import { ClienteFormComponent } from '../cliente-form/cliente-form.component';
import { EquipamentoFormComponent } from '../equipamentos/equipamento-form/equipamento-form.component';
import { VisitaFormComponent } from '../visitas/visita-form/visita-form.component';

@Component({
  selector: 'app-cliente-detalhes',
  templateUrl: './cliente-detalhes.component.html',
  styleUrls: ['./cliente-detalhes.component.css'],
  standalone: false
})
export class ClienteDetalhesComponent implements OnInit {
  clienteId!: number;
  cliente?: Cliente;
  equipamentos: Equipamento[] = [];
  visitas: Visita[] = [];

  displayedColumns: string[] = ['inmetro', 'serie', 'nomeEquipamento', 'modelo', 'dataAquisicao', 'garantia'];
  visitasColumns: string[] = ['data', 'tecnico', 'descricao', 'observacoes'];

  constructor(
    private route: ActivatedRoute,
    private clienteService: ClienteService,
    private equipamentoService: EquipamentoService,
    private visitaService: VisitaService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.clienteId = +this.route.snapshot.paramMap.get('id')!;
    this.carregarDados();
  }

  carregarDados(): void {
    this.carregarCliente();
    this.carregarEquipamentos();
    this.carregarVisitas();
  }

  carregarCliente(): void {
    this.clienteService.getCliente(this.clienteId).subscribe({
      next: (data: any) => {
        const cliente = data.cliente;

        // Converte os campos necessários para camelCase
        this.cliente = {
          ...cliente,
          razao_social: cliente.razao_social
        };
      },
      error: (err) => console.error('Erro ao carregar cliente:', err)
    });
  }

  carregarEquipamentos(): void {
    this.equipamentoService.getEquipamentosPorCliente(this.clienteId).subscribe({
      next: (equipamentos: any[]) => {
        this.equipamentos = equipamentos.map(e => ({
          ...e,
          nomeEquipamento: e.nome_equipamento,
          dataAquisicao: e.data_aquisicao ? new Date(e.data_aquisicao) : null,
          estaNaGarantia: this.calcularGarantia(new Date(e.data_aquisicao))
        }));
      },
      error: (err) => console.error('Erro ao carregar equipamentos:', err)
    });
  }

  carregarVisitas(): void {
    this.visitaService.getVisitasPorCliente(this.clienteId).subscribe({
      next: (visitas: any[]) => {
        this.visitas = visitas.map(v => ({
          ...v,
          data: v.data ? new Date(v.data) : null
        }));
      },
      error: (err) => console.error('Erro ao carregar visitas:', err)
    });
  }

  calcularGarantia(dataAquisicao?: Date): boolean {
    if (!dataAquisicao) return false;

    const hoje = new Date();
    const dataGarantia = new Date(dataAquisicao);
    dataGarantia.setMonth(dataGarantia.getMonth() + 3); // 3 meses de garantia

    return hoje <= dataGarantia;
  }

  openEditClienteDialog(): void {
    if (!this.cliente) return;

    const dialogRef = this.dialog.open(ClienteFormComponent, {
      width: '800px',
      data: {
        mode: 'edit',
        cliente: this.cliente
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.carregarCliente();
      }
    });
  }

  openAddEquipamentoDialog(): void {
    const dialogRef = this.dialog.open(EquipamentoFormComponent, {
      width: '600px',
      data: { clienteId: this.clienteId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.carregarEquipamentos();
      }
    });
  }

  openAddVisitaDialog(): void {
    const dialogRef = this.dialog.open(VisitaFormComponent, {
      width: '600px',
      data: { clienteId: this.clienteId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.carregarVisitas();
      }
    });
  }
}
