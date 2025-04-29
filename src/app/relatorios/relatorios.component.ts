import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { RelatorioService } from '../services/relatorio.service';
import { ChartDataset, RadialLinearScaleOptions, ChartOptions as ChartJSOptions } from 'chart.js';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.css'],
  standalone: false
})
export class RelatoriosComponent implements OnInit {

  // Gráfico de pizza: Situações de Reparo
  situacaoChartLabels: string[] = ['Urgente', 'Em andamento', 'Finalizado'];
  situacaoChartData: number[] = [0, 0, 0];
  situacaoChartType: ChartType = 'pie';
  situacaoChartColors = [{
    backgroundColor: ['#FF0000', '#FF9900', '#00FF00']
  }];
  chartOptions: ChartJSOptions = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true
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

  // Novos clientes por mês (dados reais agora)
  clientesNovosMensais: { mes: string, novosClientes: number }[] = [];

  constructor(
    private relatorioService: RelatorioService  // Alterado para usar o serviço correto
  ) {}

  ngOnInit(): void {
    this.carregarSituacoes();
    this.carregarTopEquipamentos();
    this.carregarClientesNovosPorMes();  // Carregar os dados reais de novos clientes por mês
    
  }

  carregarSituacoes(): void {
    this.relatorioService.getSituacaoReparos().subscribe(resumo => {  // Alterado para usar o serviço correto
      this.situacaoChartLabels = Object.keys(resumo);
      this.situacaoChartData = Object.values(resumo);
    });
  }

  carregarTopEquipamentos(): void {
    this.relatorioService.getEquipamentosMaisAtendidos().subscribe(dados => {  // Alterado para usar o serviço correto
      this.equipamentoChartLabels = dados.map(d => d.equipamento);
      this.equipamentoChartData = dados.map(d => d.total);  // Alterado para 'total', conforme a resposta do Flask
    });
  }

  carregarClientesNovosPorMes(): void {
    this.relatorioService.getClientesNovosPorMes().subscribe(dados => {  // Buscar os dados reais de novos clientes
      console.log("esses sao os clientes novos por mes:", dados)
      this.clientesNovosMensais = dados.map(d => ({
        mes: d.mes, 
        novosClientes: d.total  // A resposta pode conter a chave 'total' que representa a quantidade de novos clientes
        
      }));
    });
  }

}
