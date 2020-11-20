import { Produto } from './produto';

export class Estoque {
  Id: number;

  ProdutoId: number;

  Entrada: number;

  Saida: number;

  Quantidade: number;

  Produto: Produto;
}
