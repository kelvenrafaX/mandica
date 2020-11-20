import { Funcionario } from './funcionario';
import { UsuarioAcesso } from './usuario-acesso';

export class Usuario {
   
  Login : string;
  Senha:string;
  Salt:string;


  Funcionario: Funcionario;
  FuncionarioId:number;
  TipoUsuario: TipoUsuario;

  UsuarioAcesso: UsuarioAcesso[] ; 

}

export enum TipoUsuario{
  Master = 1,
  Administrador = 2,
  Comum = 3,
}
