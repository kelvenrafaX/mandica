import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SettingsService } from '../core/settings/settings.service';
import { FiltroProduto } from '../models/filtros/filtroProduto';
import { Paginador } from '../models/paginador/paginador';
import { Produto, Tipo } from '../entity/produto';
import { JsonResponse } from '../models/JsonResponse';


const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

@Injectable()
export class ProdutoService {

  url: any;
  urlImage: any;
  constructor(private http: HttpClient, private configuracao: SettingsService) {
    this.url  = `${this.configuracao.getApiSetting('url')}/produto`;
    this.urlImage = `${this.configuracao.getUrlImagens('url')}`;
  }

  getAll(tipo: Tipo): Observable<Paginador<Produto>> {
    return this.http.get<Paginador<Produto>>(`${this.url}?tipo=${tipo}`);
  }

  get(codigo: string, tipo: Tipo): Observable<Produto> {
    return this.http.get<Produto>(`${this.url}/${codigo}?tipo=${tipo}`);
  }

  getFiltrado(filtro: FiltroProduto, tipo: Tipo): Observable<Paginador<Produto>> {
    return this.http
      .post<Paginador<Produto>>(`${this.url}/Filtro?tipo=${tipo}`, filtro, httpOptions);
  }

  add(produto: Produto, estoque: number, tipo: Tipo): Observable<JsonResponse>  {
   return this.http
     .post<JsonResponse>(`${this.url}/${estoque}?tipo=${tipo}`, produto, httpOptions);
 }

  update (produto: Produto, estoque: number, tipo: Tipo): Observable<JsonResponse> {
    return this.http
      .put<JsonResponse>(`${this.url}/${estoque}?tipo=${tipo}`, produto, httpOptions);
  }

  deleteProduto(id: number): Observable<string> {
    return this.http
      .delete<string>(`${this.url}/${id}`, httpOptions);
  }

  inativar(id: number, status: number): Observable<JsonResponse> {
    return this.http
      .post<JsonResponse>(`${this.url}/Inativar/${id}/${status}`, httpOptions);
  }

  getUrlImagem(produto: Produto): string {
    if (produto.ImagemProdutos.filter(x => x.Imagem.Principal === true)[0] !== undefined) {
      return produto.ImagemProdutos.filter(x => x.Imagem.Principal === true)[0].Imagem.Descricao;
    } else {
      return 'assets/img/upload_gray.png';
    }
  }
}
