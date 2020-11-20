import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Cep } from '../models/cep';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CepService {

  url = 'https://viacep.com.br/ws';

  constructor(private http: HttpClient) { }

  getEndereco(cep: string): Observable<Object> {
    return this.http
      .get<string>(`${this.url}/${cep}/json`);
  }

}
