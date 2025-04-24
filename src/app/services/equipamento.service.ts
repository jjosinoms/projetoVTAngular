import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Equipamento } from '../models/equipamento.model';

@Injectable({
  providedIn: 'root'
})
export class EquipamentoService {
  private apiUrl = `${environment.apiUrl}/equipamentos`;

  constructor(private http: HttpClient) { }

  getEquipamentosPorCliente(clienteId: number): Observable<Equipamento[]> {
    return this.http.get<Equipamento[]>(`${this.apiUrl}?cliente_id=${clienteId}`);
  }
  addEquipamento(equipamento: Omit<Equipamento, 'id'>): Observable<Equipamento> {
    return this.http.post<Equipamento>(this.apiUrl, equipamento);
  }
  
  updateEquipamento(id: number, equipamento: Partial<Equipamento>): Observable<Equipamento> {
    return this.http.put<Equipamento>(`${this.apiUrl}/${id}`, equipamento);
  }
  
  getEquipamento(id: number): Observable<Equipamento> {
    return this.http.get<Equipamento>(`${this.apiUrl}/${id}`);
  }

  // Outros métodos conforme necessário
}