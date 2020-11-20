import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SettingsService } from '../core/settings/settings.service';
import { Bandeira } from '../entity/bandeira';
import { JsonResponse } from '../models/JsonResponse';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class BandeiraService {

  url: any;
  constructor(private http: HttpClient, private configuracao: SettingsService) {
    this.url  = `${this.configuracao.getApiSetting('url')}/bandeira`;
  }

  getBandeiras(): Observable<Bandeira[]> {
    return this.http
      .get<Bandeira[]>(this.url);
  }

  addOrcamentos(bandeira: Bandeira): Observable<JsonResponse>  {
    return this.http
      .post<JsonResponse>(`${this.url}`, bandeira, httpOptions);
  }

  updateCliente (bandeira: Bandeira): Observable<Bandeira> {
    return this.http
      .put<Bandeira>(`${this.url}`, bandeira, httpOptions);
  }

  deleteCliente(id: number): Observable<string> {
    return this.http
      .delete<string>(`${this.url}/${id}`, httpOptions);
  }
}
