import { Component, Input, OnInit } from '@angular/core';
import { Visita } from '../../../models/visita.model';
import { VisitaService } from '../../../services/visita.service';

@Component({
  selector: 'app-visita-list',
  templateUrl: './visita-list.component.html',
  styleUrls: ['./visita-list.component.css'],
  standalone: false
})
export class VisitaListComponent implements OnInit {
  @Input() clienteId!: number;
  visitas: Visita[] = [];

  constructor(private visitaService: VisitaService) { }

  ngOnInit(): void {
    if (this.clienteId) {
      this.carregarVisitas();
    }
  }

  carregarVisitas(): void {
    this.visitaService.getVisitasPorCliente(this.clienteId).subscribe(
      visitas => this.visitas = visitas,
      error => console.error('Erro ao carregar visitas:', error)
    );
  }
}