import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SettingsService } from '../core/settings/settings.service';
import { Cliente } from '../entity/cliente';
import { FiltroCliente } from '../models/filtros/filtroCliente';
import { Paginador } from '../models/paginador/paginador';
import { JsonResponse } from '../models/JsonResponse';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ClienteService {

  url: any;
  constructor(private http: HttpClient, private configuracao: SettingsService) {
    this.url  = `${this.configuracao.getApiSetting('url')}/cliente`;
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http
      .get<Cliente>(`${this.url}/${id}`);
  }

  getClientes(): Observable<Cliente[]> {
    return this.http
      .get<Cliente[]>(this.url);
  }

  getClientesFiltrado(filtro: FiltroCliente): Observable<Paginador<Cliente>> {
    return this.http
      .post<Paginador<Cliente>>(`${this.url}/Filtro`, filtro);
  }

  addCliente(cliente: Cliente): Observable<JsonResponse>  {
    console.log(cliente);
    return this.http
      .post<JsonResponse>(`${this.url}`, cliente);
  }

  addListCliente(clientes: any): Observable<Cliente[]> {
    return this.http
      .post<Cliente[]>(`${this.url}/AddLista`, clientes, httpOptions);
  }

  updateCliente (cliente: Cliente): Observable<JsonResponse> {
    return this.http
      .put<JsonResponse>(`${this.url}`, cliente, httpOptions);
  }

  deleteCliente(id: number): Observable<string> {
    return this.http
      .delete<string>(`${this.url}/${id}`, httpOptions);
  }

  existisCpfCnpj(cpfCnpj: string): Observable<JsonResponse> {
    return this.http
    .get<JsonResponse>(`${this.url}/VerificaCPFCNPJ/${cpfCnpj}`, httpOptions);
  }

  inativar(id: number, status: number): Observable<JsonResponse> {
    return this.http
    .post<JsonResponse>(`${this.url}/Inativar/${id}/${status}`, httpOptions);
  }

  getUrlImagem(cliente: Cliente) {
    return `assets/img/user/user_default_${cliente.Pessoa.SiglaSexo}.png`;
  }
}
