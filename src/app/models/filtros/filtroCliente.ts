import { Filtro } from './filtro';

export class FiltroCliente extends Filtro {
  Id: number;

  Nome: string;

  CpfCnpj: string;

  Rg: string;

  Celular: string;

  Email: string;

  Inativo: number;
}
