import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SettingsService } from '../core/settings/settings.service';
import { Natureza } from '../entity/natureza';
import { JsonResponse } from '../models/JsonResponse';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class NaturezaService {

  url: any;
  constructor(private http: HttpClient, private configuracao: SettingsService) {
    this.url  = `${this.configuracao.getApiSetting('url')}/natureza`;
  }

  getNaturezas(): Observable<Natureza[]> {
    return this.http
      .get<Natureza[]>(this.url);
  }

  addNatureza(natureza: Natureza): Observable<JsonResponse>  {
    return this.http
      .post<JsonResponse>(`${this.url}`, natureza, httpOptions);
  }

  updateNatureza (natureza: Natureza): Observable<JsonResponse> {
    return this.http
      .put<JsonResponse>(`${this.url}`, natureza, httpOptions);
  }

  deleteCliente(id: number): Observable<string> {
    return this.http
      .delete<string>(`${this.url}/${id}`, httpOptions);
  }
}
