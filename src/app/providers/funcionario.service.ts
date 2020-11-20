import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SettingsService } from '../core/settings/settings.service';
import { Funcionario } from '../entity/funcionario';
import { FiltroFuncionario } from '../models/filtros/filtroFuncionario';
import { Paginador } from '../models/paginador/paginador';
import { JsonResponse } from '../models/JsonResponse';
import { Cargo } from '../entity/cargo';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class FuncionarioService {
    getfuncionariosFiltrado(filtro: FiltroFuncionario): Observable<Paginador<Funcionario>> {
      return this.http
      .post<Paginador<Funcionario>>(`${this.url}/Filtro`, filtro);
    }
  
  url: any;
  constructor(private http: HttpClient, private configuracao: SettingsService) {
    this.url  = `${this.configuracao.getApiSetting('url')}/funcionario`;
  }

  getFuncionario(): Observable<Funcionario[]> {
    return this.http
      .get<Funcionario[]>(this.url);
  }

  getFuncionariosFiltrado(filtro: FiltroFuncionario): Observable<Paginador<Funcionario>> {
    return this.http
      .post<Paginador<Funcionario>>(`${this.url}/Filtro`, filtro);
  }

  addFuncionario(funcionario: Funcionario): Observable<JsonResponse>  {
    return this.http
      .post<JsonResponse>(`${this.url}`, funcionario, httpOptions);
  }

  updateFuncionario (funcionario: Funcionario): Observable<JsonResponse> {
    return this.http
      .put<JsonResponse>(`${this.url}`, funcionario, httpOptions);
  }

  deleteFuncionario(id: number): Observable<string> {
    return this.http
      .delete<string>(`${this.url}/${id}`, httpOptions);
  }

  existisCpfCnpj(cpfCnpj: string): Observable<JsonResponse> {
    return this.http
    .get<JsonResponse>(`${this.url}/VerificaCPFCNPJ/${cpfCnpj}`, httpOptions);
  }

  inativar(id: number, status: number): Observable<JsonResponse> {
    return this.http
    .post<JsonResponse>(`${this.url}/Inativar/${id}/${status}`, httpOptions);
  }

  getUrlImagem(funcionario: Funcionario) {
    return `assets/img/user/user_default_${funcionario.Pessoa !== undefined ? funcionario.Pessoa.SiglaSexo : 'M'}.png`;
  }

  //obtem os cargos ativos;
  obterCargos():Observable<Cargo[]> {
    return this.http
    .get<Cargo[]>(`${this.url}/ObterCargos`,httpOptions);
  }

}
