import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SettingsService } from '../core/settings/settings.service';
import { ImagemProduto } from '../entity/imagemProduto';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ImagemProdutoService {

  url: any;
  constructor(private http: HttpClient, private configuracao: SettingsService) {
    this.url  = `${this.configuracao.getApiSetting('url')}/imagemProduto`;
  }

  getImagens(): Observable<ImagemProduto[]> {
    return this.http
      .get<ImagemProduto[]>(`${this.url}`)
        .map(x => x);
  }

  addImagem(arquivo: any): Observable<void>  {
    const formData: FormData = new FormData();
    formData.append('Imagem', arquivo, arquivo.name);

   return this.http
     .post<void>(`${this.url}`, formData/*, httpOptions*/);
  }

  updateImagem(arquivo: any, produtoId: number): Observable<void> {
    const formData: FormData = new FormData();
    formData.append('Imagem', arquivo, arquivo.name);

    return this.http
     .post<void>(`${this.url}/Atualizar/${produtoId}`, formData/*, httpOptions*/);
  }

  deleteImagem(id: number): Observable<string> {
    return this.http
      .delete<string>(`${this.url}/${id}`, httpOptions);
  }
}
