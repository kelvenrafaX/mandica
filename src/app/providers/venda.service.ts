import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SettingsService } from '../core/settings/settings.service';
import { Orcamento } from '../entity/orcamento';
import { JsonResponse } from '../models/JsonResponse';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class VendaService {

  url: any;
  constructor(private http: HttpClient, private configuracao: SettingsService) {
    this.url  = `${this.configuracao.getApiSetting('url')}/venda`;
  }

  pagarParcela (id: number, grupo: number, parcela: number): Observable<JsonResponse> {
    return this.http
      .get<JsonResponse>(`${this.url}/pagarParcela/${id}/${grupo}/${parcela}`);
  }

  pagarTotal (orcamento: Orcamento): Observable<JsonResponse> {
    return this.http
      .post<JsonResponse>(`${this.url}/pagarTotal`, orcamento, httpOptions);
  }
}
