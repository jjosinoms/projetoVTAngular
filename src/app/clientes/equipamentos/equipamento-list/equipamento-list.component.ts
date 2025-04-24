import { Component, Input, OnInit } from '@angular/core';
import { Equipamento } from '../../../models/equipamento.model';
import { EquipamentoService } from '../../../services/equipamento.service';

@Component({
  selector: 'app-equipamento-list',
  templateUrl: './equipamento-list.component.html',
  styleUrls: ['./equipamento-list.component.css'],
  standalone: false
})
export class EquipamentoListComponent implements OnInit {
  @Input() clienteId!: number;
  equipamentos: Equipamento[] = [];

  constructor(private equipamentoService: EquipamentoService) { }

  ngOnInit(): void {
    if (this.clienteId) {
      this.carregarEquipamentos();
    }
  }

  carregarEquipamentos(): void {
    this.equipamentoService.getEquipamentosPorCliente(this.clienteId).subscribe(
      equipamentos => this.equipamentos = equipamentos,
      error => console.error('Erro ao carregar equipamentos:', error)
    );
  }
}