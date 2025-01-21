import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private urlApi = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getNotas(): Observable<any>{
    return this.http.get(`${this.urlApi}/notas`)
  }

  getNotaPorId(id:string): Observable<any>{
    return this.http.get(`${this.urlApi}/notas/${id}`)
  }

  crearNota(nota: any): Observable<any>{
    return this.http.post(`${this.urlApi}/nota`, nota)
  }

  updateNota(id: string, nota: any): Observable<any>{
    return this.http.put(`${this.urlApi}/notas/${id}`, nota)
  }

  deleteNota(id:string): Observable<any>{
    return this.http.delete(`${this.urlApi}/notas/${id}`)
  }
}
