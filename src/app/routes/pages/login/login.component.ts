import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../core/settings/settings.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { UtilService } from '../../../core/services/util.service';
import { Login } from '../../../entity/login';
import { LoginService } from '../../../providers/login.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],

})
export class LoginComponent implements OnInit {

    valForm: FormGroup;
    acesso : Login;


    constructor(public settings: SettingsService, fb: FormBuilder, private util: UtilService,private acessoService:LoginService) {

        this.valForm = fb.group({
            'usuario': [null, Validators.required],
            'senha': [null, Validators.required]
        });

    }

    submitForm($ev, value: any) {
        $ev.preventDefault();
        console.log(this.valForm.controls.usuario);

        this.acesso.Usuario = this.valForm.controls.usuario.value;
        this.acesso.Senha = this.valForm.controls.senha.value;
      console.log(this.acesso);
        this.acessoService.validarAcesso(this.acesso);
       

  
    }

    ngOnInit() {
this.acesso = new Login();
    }

}
