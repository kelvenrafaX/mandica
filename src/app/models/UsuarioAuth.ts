import { Funcionario } from "../entity/funcionario";
import { UsuarioAcesso } from "../entity/usuario-acesso";
import { TipoUsuario } from "../entity/login";

export class UsuarioAuth {
  Funcionario: Funcionario;
  UsuarioAcesso: UsuarioAcesso
  TipoUsuario: TipoUsuario;
}
