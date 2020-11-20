import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SettingsService } from '../core/settings/settings.service';
import { JsonResponse } from '../models/JsonResponse';
import { Cargo } from '../entity/cargo';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CargoService {

  url: any;
  constructor(private http: HttpClient, private configuracao: SettingsService) {
    this.url  = `${this.configuracao.getApiSetting('url')}/cargo`;
  }

  getCargo(): Observable<Cargo[]> {
    return this.http
      .get<Cargo[]>(this.url);
  }

  addCargo(cargo: Cargo): Observable<JsonResponse>  {
    return this.http
      .post<JsonResponse>(`${this.url}`, cargo, httpOptions);
  }

  updateCargo (cargo: Cargo): Observable<JsonResponse> {
    return this.http
      .put<JsonResponse>(`${this.url}`, cargo, httpOptions);
  }

  mudarStatus(cargo: Cargo): Observable<JsonResponse> {
    return this.http
      .post<JsonResponse>(`${this.url}/MudarStatus`, cargo, httpOptions);
  }

  deleteCargo(id: number): Observable<string> {
    return this.http
      .delete<string>(`${this.url}/${id}`, httpOptions);
  }
}
