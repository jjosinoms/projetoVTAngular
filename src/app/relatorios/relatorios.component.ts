import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions, ChartData, Chart } from 'chart.js';
import { forkJoin } from 'rxjs';
import { RelatorioService } from '../services/relatorio.service';
import { ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Registro obrigatório para Chart.js v4+
Chart.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.css'],
  standalone: false
})
export class RelatoriosComponent implements OnInit {

  // Gráfico de barras: Situações de Reparo
  situacaoChartType: ChartType = 'bar';
  situacaoChartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };

  // Configurações do gráfico
  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      }
    }
  };

  // Gráfico de barras: Equipamentos mais atendidos
  equipamentoChartType: ChartType = 'bar';
  equipamentoChartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };

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
      // Defina um mapa fixo de cores para cada tipo de situação
      const corPorSituacao: { [key: string]: string } = {
        'Urgente': '#FF0000',
        'Em andamento': '#FF9900',
        'Concluído Reparo': '#00FF00',
        'Instalação Concluída': '#2196F3',
        'Configuração Concluída': '#9C27B0'
      };
  
      if (Array.isArray(resumo)) {
        const labels = resumo.map(item => item.situacao);
        const data = resumo.map(item => item.total);
        const backgroundColor = labels.map(label => corPorSituacao[label] || '#CCCCCC'); // cor padrão se não mapeada
  
        this.situacaoChartData = {
          labels,
          datasets: [{
            label: 'Situação dos Reparos',
            data,
            backgroundColor
          }]
        };
      } else {
        console.error('A resposta da API não é um array', resumo);
      }
    });
  }
  
  

  carregarTopEquipamentos(): void {
    this.relatorioService.getEquipamentosMaisAtendidos().subscribe(dados => {
      const labels = dados.map(d => d.equipamento);
      const data = dados.map(d => d.total);

      // Atualiza o gráfico de barras com os dados de equipamentos
      this.equipamentoChartData = {
        labels,
        datasets: [{
          label: 'Atendimentos',
          data,
          backgroundColor: '#4CAF50',
          borderColor: '#388E3C',
          borderWidth: 1
        }]
      };
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

      this.clientesNovosMensais = Object.values(mapa).sort((a, b) => {
        const [mesA, anoA] = a.mes.split('/').map(Number);
        const [mesB, anoB] = b.mes.split('/').map(Number);
        return new Date(anoA, mesA - 1).getTime() - new Date(anoB, mesB - 1).getTime();
      });
    });
  }
}
