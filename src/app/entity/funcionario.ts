import { Pessoa } from './pessoa';
import { Cargo } from './cargo';
import { UsuarioAcesso } from './usuario-acesso';

export class Funcionario {
  Id: number;
  Usuario: string;
  Senha: string; 
  Cargo:Cargo;
  CargoId:number;
  Pessoa: Pessoa ;
  UsuarioAcesso: UsuarioAcesso[];


}
