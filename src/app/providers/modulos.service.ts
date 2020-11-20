import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SettingsService } from '../core/settings/settings.service';
import { JsonResponse } from '../models/JsonResponse';
import { Modulos } from '../entity/modulos';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ModulosService {

  url: any;
  constructor(private http: HttpClient, private configuracao: SettingsService) {
    this.url  = `${this.configuracao.getApiSetting('url')}/Modulo`;
  }

  getModulos(): Observable<Modulos[]> {
    return this.http
      .get<Modulos[]>(this.url);
  }

  addModulo(modulo: Modulos): Observable<JsonResponse>  {
    return this.http
      .post<JsonResponse>(`${this.url}`, modulo, httpOptions);
  }

  updateModulo (modulo: Modulos): Observable<JsonResponse> {
    return this.http
      .put<JsonResponse>(`${this.url}`, modulo, httpOptions);
  }

  mudarStatus(modulo:Modulos ): Observable<JsonResponse> {
    return this.http
      .post<JsonResponse>(`${this.url}/MudarStatus`, modulo, httpOptions);
  }

  deletemodulo(id: number): Observable<string> {
    return this.http
      .delete<string>(`${this.url}/${id}`, httpOptions);
  }
}
