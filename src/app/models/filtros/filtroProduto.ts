import { Filtro } from './filtro';
import { Categoria } from '../../entity/categoria';

export class FiltroProduto extends Filtro {
  Id: number;
  Nome: string;
  Descricao: string;
  Fornecedor: number;
  CategoriaId: number;
  Inativo: number;
  Categoria: Categoria;
  Situacao: number;
  Terceiros: boolean;

  constructor() {
    super();
    this.Terceiros = false;
    this.Fornecedor = 0;
    this.CategoriaId = 0;
    this.Inativo = 2;
    this.Situacao = -1;
  }
}
