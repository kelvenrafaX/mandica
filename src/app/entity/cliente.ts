import { Pessoa } from './pessoa';

export class Cliente {
  Id: number;
  Pessoa: Pessoa ;

  constructor(pessoa?: Pessoa) {
    this.Pessoa = pessoa;
  }
}
