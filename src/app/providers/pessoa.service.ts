import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Cliente } from '../entity/cliente';
import { SettingsService } from '../core/settings/settings.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': '' })
};

@Injectable()
export class PessoaService {

  url: any;
  constructor(private http: HttpClient, private configuracao: SettingsService) {
    this.url  = `${this.configuracao.getApiSetting('url')}/cliente`;
  }

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
