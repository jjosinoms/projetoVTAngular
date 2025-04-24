import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Visita } from '../models/visita.model';

@Injectable({
  providedIn: 'root'
})
export class VisitaService {
  private apiUrl = `${environment.apiUrl}/visitas`;

  constructor(private http: HttpClient) { }

  // Método para obter visitas por cliente
  getVisitasPorCliente(clienteId: number): Observable<Visita[]> {
    return this.http.get<Visita[]>(`${this.apiUrl}?cliente_id=${clienteId}`);
  }

  // Método para adicionar uma nova visita
  addVisita(visita: Omit<Visita, 'id'>): Observable<Visita> {
    return this.http.post<Visita>(this.apiUrl, visita, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  

  // Método para atualizar uma visita existente
  updateVisita(id: number, visita: Partial<Visita>): Observable<Visita> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'  // Definindo o cabeçalho Content-Type
    });

    return this.http.put<Visita>(`${this.apiUrl}/${id}`, visita, { headers });
  }

  // Método para obter uma visita específica pelo ID
  getVisita(id: number): Observable<Visita> {
    return this.http.get<Visita>(`${this.apiUrl}/${id}`);
  }
}
