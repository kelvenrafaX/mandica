import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SettingsService } from '../core/settings/settings.service';
import { Orcamento } from '../entity/orcamento';
import { JsonResponse } from '../models/JsonResponse';
import { Paginador } from '../models/paginador/paginador';
import { FiltroOrcamento } from '../models/filtros/filtroOrcamento';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class OrcamentoService {

  url: any;
  constructor(private http: HttpClient, private configuracao: SettingsService) {
    this.url  = `${this.configuracao.getApiSetting('url')}/orcamento`;
  }

  getOrcamentoById(id: number): Observable<Orcamento> {
    return this.http
      .get<Orcamento>(`${this.url}/${id}`);
  }

  getOrcamentos(): Observable<Orcamento[]> {
    return this.http
      .get<Orcamento[]>(this.url);
  }

  getOrcamentosFiltrado(filtro: FiltroOrcamento): Observable<Paginador<Orcamento>> {
    return this.http
      .post<Paginador<Orcamento>>(`${this.url}/Filtro`, filtro);
  }

  getIdLastOrder(): Observable<number> {
    return this.http
      .get<number>(`${this.url}/GetLastOrder`);
  }

  addOrcamentos(orcamento: Orcamento): Observable<JsonResponse>  {
    return this.http
      .post<JsonResponse>(`${this.url}`, orcamento, httpOptions);
  }

  update(orcamento: Orcamento): Observable<JsonResponse> {
    return this.http
      .put<JsonResponse>(`${this.url}`, orcamento, httpOptions);
  }

  deleteCliente(id: number): Observable<string> {
    return this.http
      .delete<string>(`${this.url}/${id}`, httpOptions);
  }

  atualizaStatus(orcamento: Orcamento): Observable<JsonResponse> {
    return this.http
      .post<JsonResponse>(`${this.url}/AtualizaStatus`, orcamento, httpOptions);
  }

  savePdf(data: FormData): Observable<JsonResponse> {
    return this.http
      .post<JsonResponse>(`${this.url}/SavePdf`, data);
  }
}
