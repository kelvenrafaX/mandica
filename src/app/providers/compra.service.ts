import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SettingsService } from '../core/settings/settings.service';
import { Paginador } from '../models/paginador/paginador';
import { Compra } from '../entity/compra';
import { JsonResponse } from '../models/JsonResponse';


@Injectable()
export class CompraService {

  url: any;
  constructor(private http: HttpClient, private configuracao: SettingsService) {
    this.url  = `${this.configuracao.getApiSetting('url')}/compra`;
  }

  getCompras(): Observable<Paginador<Compra>> {
    return this.http
    .get<Paginador<Compra>>(`${this.url}`);
  }

  addCompra(compra: Compra): Observable<JsonResponse>  {
    return this.http
      .post<JsonResponse>(`${this.url}`, compra);
  }
}
