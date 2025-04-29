import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {
  private baseUrl = `${environment.apiUrl}/relatorios`;

  constructor(private http: HttpClient) {}

  // Relatório 1: Visitas por período (mensal)
  getVisitasPorPeriodo(): Observable<{ mes: string, total: number }[]> {
    return this.http.get<{ mes: string, total: number }[]>(`${this.baseUrl}/visitas-por-periodo`);
  }

  // Relatório 2: Novos clientes por mês
  getClientesNovosPorMes(): Observable<{ mes: string, total: number }[]> {
    return this.http.get<{ mes: string, total: number }[]>(`${this.baseUrl}/clientes-novos-por-mes`);
  }

  // Relatório 3: Situação dos reparos (urgente, em andamento, finalizado)
  getSituacaoReparos(): Observable<{ [situacao: string]: number }> {
    return this.http.get<{ [situacao: string]: number }>(`${this.baseUrl}/situacao-reparos`);
  }

  // Relatório 4: Equipamentos mais atendidos
  getEquipamentosMaisAtendidos(): Observable<{ equipamento: string, total: number }[]> {
    return this.http.get<{ equipamento: string, total: number }[]>(`${this.baseUrl}/equipamentos-mais-atendidos`);
  }
}
