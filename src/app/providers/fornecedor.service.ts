import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SettingsService } from '../core/settings/settings.service';
import { Fornecedor } from '../entity/fornecedor';
import { FiltroFornecedor } from '../models/filtros/filtroFornecedor';
import { Paginador } from '../models/paginador/paginador';
import { JsonResponse } from '../models/JsonResponse';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class FornecedorService {

  url: any;
  constructor(private http: HttpClient, private configuracao: SettingsService) {
    this.url  = `${this.configuracao.getApiSetting('url')}/fornecedor`;
  }

  getFornecedores(): Observable<Fornecedor[]> {
    return this.http
      .get<Fornecedor[]>(this.url);
  }

  getFornecedoresFiltrado(filtro: FiltroFornecedor): Observable<Paginador<Fornecedor>> {
    return this.http
      .post<Paginador<Fornecedor>>(`${this.url}/Filtro`, filtro);
  }

  addFornecedor(fornecedor: Fornecedor): Observable<JsonResponse>  {
    return this.http
      .post<JsonResponse>(`${this.url}`, fornecedor, httpOptions);
  }

  updateFornecedor (fornecedor: Fornecedor): Observable<JsonResponse> {
    return this.http
      .put<JsonResponse>(`${this.url}`, fornecedor, httpOptions);
  }

  deleteFornecedor(id: number): Observable<string> {
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

  getUrlImagem(fornecedor: Fornecedor) {
    return `assets/img/user/user_default_${fornecedor.Pessoa !== undefined ? fornecedor.Pessoa.SiglaSexo : 'M'}.png`;
  }
}
