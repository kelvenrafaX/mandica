import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SettingsService } from '../core/settings/settings.service';
import { Paginador } from '../models/paginador/paginador';
import { JsonResponse } from '../models/JsonResponse';
import { Estoque } from '../entity/estoque';


@Injectable()
export class EstoqueService {

  url: any;
  constructor(private http: HttpClient, private configuracao: SettingsService) {
    this.url  = `${this.configuracao.getApiSetting('url')}/estoque`;
  }

  getEstoques(): Observable<Paginador<Estoque>> {
    return this.http
    .get<Paginador<Estoque>>(`${this.url}`);
  }
}
