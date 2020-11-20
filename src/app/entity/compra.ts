import { Fornecedor } from './fornecedor';
import { CompraProduto } from './compra-produto';

export class Compra {
  Id: number;

  NumDocumento: string;

  CompraProduto: CompraProduto[];

  Fornecedor: Fornecedor;

  FornecedorId: number;

  DataCompra: Date;
}
