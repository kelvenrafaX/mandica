import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SettingsService } from '../core/settings/settings.service';
import { Imagem } from '../entity/imagem';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ImagemService {

  url: any;
  constructor(private http: HttpClient, private configuracao: SettingsService) {
    this.url  = `${this.configuracao.getApiSetting('url')}/imagem`;
  }

  getImagens(): Observable<Imagem[]> {
    return this.http
      .get<Imagem[]>(`${this.url}`)
        .map(x => x);
  }

  addImagem(base64: any): Observable<void>  {
   return this.http
     .post<void>(`${this.url}`, base64/*, httpOptions*/);
  }
}
