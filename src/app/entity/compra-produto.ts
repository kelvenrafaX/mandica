import { Produto } from './produto';
import { Fornecedor } from './fornecedor';

export class CompraProduto {
  Id: number;

  Produto: Produto;

  ProdutoId: number;

  Quantidade: number;

  PrecoUnitario: number;
}
