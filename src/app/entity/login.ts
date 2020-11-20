export class Login {
  Usuario: string;
  Senha: string;
  Tipo: TipoUsuario;
 
}

export enum TipoUsuario{
  Master=1,
  Administrador = 2,
  Comum = 3,
}