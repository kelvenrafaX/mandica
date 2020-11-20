import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SettingsService } from '../core/settings/settings.service';
import { Paginador } from '../models/paginador/paginador';
import { JsonResponse } from '../models/JsonResponse';
import { Fretes } from '../entity/fretes';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class FretesService {

  url: any;
  constructor(private http: HttpClient, private configuracao: SettingsService) {
    this.url  = `${this.configuracao.getApiSetting('url')}/fretes`;
  }

  getById(id: number): Observable<Fretes> {
    return this.http
      .get<Fretes>(`${this.url}/${id}`);
  }

  getAll(): Observable<Fretes[]> {
    return this.http
      .get<Fretes[]>(this.url);
  }

  getCidades(): Observable<any[]> {
    return this.http
      .get<any[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/23/municipios`);
  }

  add(fretes: Fretes): Observable<JsonResponse>  {
    return this.http
      .post<JsonResponse>(`${this.url}`, fretes);
  }

  addList(fretes: any): Observable<Fretes[]> {
    return this.http
      .post<Fretes[]>(`${this.url}/AddLista`, fretes, httpOptions);
  }

  update(fretes: Fretes): Observable<JsonResponse> {
    return this.http
      .put<JsonResponse>(`${this.url}`, fretes, httpOptions);
  }

  delete(id: number): Observable<string> {
    return this.http
      .delete<string>(`${this.url}/${id}`, httpOptions);
  }
}
