import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../entity/categoria';
import { SettingsService } from '../core/settings/settings.service';
import { JsonResponse } from '../models/JsonResponse';
import { Tipo } from '../entity/produto';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CategoriaService {

  url: any;

  constructor(private http: HttpClient, private configuracao: SettingsService) {
    this.url  = `${this.configuracao.getApiSetting('url')}/categoria`;
  }

  getCategoriaById(categoriaId: number): Observable<Categoria> {
    return this.http
    .get<Categoria>(`${this.url}/${categoriaId}`)
      .map(x => x);
  }

  getCategorias(): Observable<Categoria[]> {
    return this.http
      .get<Categoria[]>(`${this.url}`)
        .map(x => x);
  }

  getCategoriasPorTipo(tipo: Tipo): Observable<Categoria[]> {
    return this.http
      .get<Categoria[]>(`${this.url}/PorTipo?tipo=${tipo}`)
        .map(x => x);
  }

  addCategoria(categoria: Categoria): Observable<JsonResponse>  {
    return this.http
      .post<JsonResponse>(`${this.url}`, categoria, httpOptions);
  }

  updateCategoria (categoria: Categoria): Observable<JsonResponse> {
    return this.http
      .put<JsonResponse>(`${this.url}`, categoria, httpOptions);
  }

  deleteCategoria(id: number): Observable<JsonResponse> {
    return this.http
      .delete<JsonResponse>(`${this.url}/${id}`, httpOptions);
  }
}
