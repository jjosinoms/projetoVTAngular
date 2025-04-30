import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions as ChartJSOptions } from 'chart.js';
import { forkJoin } from 'rxjs';
import { RelatorioService } from '../services/relatorio.service';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.css'],
  standalone: false
})
export class RelatoriosComponent implements OnInit {

  // Gráfico de pizza: Situações de Reparo
  situacaoChartLabels: string[] = [];
  situacaoChartData: number[] = [];
  situacaoChartType: ChartType = 'pie';
  situacaoChartColors = [{
    backgroundColor: ['#FF0000', '#FF9900', '#00FF00']
  }];
  chartOptions: ChartJSOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      }
    }
  };

  // Gráfico de barras: Equipamentos mais atendidos
  equipamentoChartLabels: string[] = [];
  equipamentoChartData: number[] = [];
  equipamentoChartType: ChartType = 'bar';
  equipamentoChartColors = [{
    backgroundColor: '#4CAF50',
    borderColor: '#388E3C',
    borderWidth: 1
  }];

  // Tabela: Visitas por mês + novos clientes
  clientesNovosMensais: { mes: string, visitas: number, novosClientes: number }[] = [];

  constructor(private relatorioService: RelatorioService) {}

  ngOnInit(): void {
    this.carregarSituacoes();
    this.carregarTopEquipamentos();
    this.carregarVisitasENovosClientes();
  }

  carregarSituacoes(): void {
    this.relatorioService.getSituacaoReparos().subscribe(resumo => {
      this.situacaoChartLabels = Object.keys(resumo);
      this.situacaoChartData = Object.values(resumo);
    });
  }

  carregarTopEquipamentos(): void {
    this.relatorioService.getEquipamentosMaisAtendidos().subscribe(dados => {
      this.equipamentoChartLabels = dados.map(d => d.equipamento);
      this.equipamentoChartData = dados.map(d => d.total);
    });
  }

  carregarVisitasENovosClientes(): void {
    forkJoin({
      visitas: this.relatorioService.getVisitasPorPeriodo(),
      novos: this.relatorioService.getClientesNovosPorMes()
    }).subscribe(({ visitas, novos }) => {
      const mapa: { [mes: string]: { mes: string, visitas: number, novosClientes: number } } = {};

      visitas.forEach(v => {
        mapa[v.mes] = { mes: v.mes, visitas: v.total, novosClientes: 0 };
      });

      novos.forEach(n => {
        if (mapa[n.mes]) {
          mapa[n.mes].novosClientes = n.total;
        } else {
          mapa[n.mes] = { mes: n.mes, visitas: 0, novosClientes: n.total };
        }
      });

      // Ordenar por data
      this.clientesNovosMensais = Object.values(mapa).sort((a, b) => {
        const [mesA, anoA] = a.mes.split('/').map(Number);
        const [mesB, anoB] = b.mes.split('/').map(Number);
        return new Date(anoA, mesA - 1).getTime() - new Date(anoB, mesB - 1).getTime();
      });
    });
  }

}
