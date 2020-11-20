import { Component, OnInit, ViewChild } from '@angular/core';
import { EditFuncionarioComponent } from '../../../components/funcionario/edit-funcionario/edit-funcionario.component';
import { FuncionarioService } from '../../../providers/funcionario.service';
import { Funcionario } from '../../../entity/funcionario';
import { ModulosService } from '../../../providers/modulos.service';
import { Modulos } from '../../../entity/modulos';
import { ModuloItem } from '../../../entity/modulo-item';
import { UsuarioAcesso } from '../../../entity/usuario-acesso';
import { stringify } from 'querystring';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-controle-acesso',
  templateUrl: './controle-acesso.component.html',
  styleUrls: ['./controle-acesso.component.scss'],
  providers:[FuncionarioService,ModulosService]
})
export class ControleAcessoComponent implements OnInit {

  // @ViewChild('editFuncionarioComponent', {static: true}) EditFuncionarioComponent: EditFuncionarioComponent;
  funcionarios = [];
  modulos: Modulos[];
  funcionario: Funcionario;


  constructor(private funcionarioService: FuncionarioService,private modulosService: ModulosService) { 

      }

  ngOnInit() {
    this.ObterFuncionarios();
    this.modulos = [];
    this.funcionario = new Funcionario();
    
    
  }
  ObterFuncionarios() {
    this.funcionarioService.getFuncionario()
        .subscribe(funcionarios => this.funcionarios = funcionarios);
  }

  controleAcesso(funcionario : Funcionario,modal:any){
    this.funcionario  = funcionario;
    this.ObterModulos();
     modal.show();

  }
  ObterModulos() {
    this.modulosService.getModulos()
        .subscribe(modulos => {
         this.modulos = modulos;
         this.modulos.map(x=> {
              x.Checked = false;
              x.ModulosItem.map(y=> y.Checked= false) 
                 });
       });
  }

  salvarDados(){

    if(!this.funcionario.Usuario || !this.funcionario.Senha){
      Swal.fire('Informe Usuário e Senha','','warning');
    }
    console.log(this.modulos);

    this.funcionario.UsuarioAcesso = [];

    this.modulos.map( modulo => {
      modulo.ModulosItem.map(item => {
        if (item.Checked){
          const usuarioAcesso = new UsuarioAcesso();
          usuarioAcesso.ModuloId = modulo.Id;
          usuarioAcesso.ModuloItemId = item.Id;
          this.funcionario.UsuarioAcesso.push(usuarioAcesso);
        }
      });
    });
    this.funcionarioService.updateFuncionario(this.funcionario)
        .subscribe(x => {
          if(x.Type= 'success'){
            Swal.fire(x.Message,'','success');
          }

        })

    console.log(this.funcionario);
  }

  checkedAll(modulo: Modulos): void {
    modulo.ModulosItem.map( item => {
      item.Checked = modulo.Checked;
    });
  }

  filtrando(event: any): void {

  }

  funcionarioSelectedRemove(event: any): void {

  }

  funcionarioSelectedEdit(event: any): void {

  }
}
