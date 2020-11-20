import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Cliente } from '../entity/cliente';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': '' })
};

@Injectable()
export class PessoaService {

  url = 'http://localhost:60621/cliente';

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    return this.http
      .get<Cliente[]>(this.url);
  }

  addCliente(cliente: Cliente): Observable<Cliente>  {
    return this.http
      .post<Cliente>(`${this.url}/addCliente`, cliente, httpOptions);
  }

  updateHero (cliente: Cliente): Observable<Cliente> {
    return this.http
      .put<Cliente>(`${this.url}/addCliente`, cliente, httpOptions);
  }

  deleteCliente(id: number): Observable<string> {
    return this.http
      .delete<string>(`${this.url}/${id}`, httpOptions);
  }
}
