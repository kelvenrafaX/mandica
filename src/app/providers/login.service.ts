import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SettingsService } from '../core/settings/settings.service';
import { Login } from '../entity/login';
import { Funcionario } from '../entity/funcionario';
import { Router } from '@angular/router';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable()
export class LoginService {

  private usuarioAutenticado : boolean = false;

  url: any;
  constructor(private http: HttpClient, private configuracao: SettingsService,private router:Router) {
    this.url  = `${this.configuracao.getApiSetting('url')}/usuario`;
  }
  

  validarAcesso(login: Login){
    if(login.Usuario.toLocaleUpperCase() === "MASTER" && login.Senha === "123456"){
      this.usuarioAutenticado = true;
      this.router.navigate(['/home']);
    }else{
      this.usuarioAutenticado = false;
    }
        
  }

  usuarioEstaAutenticado(){
    return this.usuarioAutenticado;
  }



 
}
