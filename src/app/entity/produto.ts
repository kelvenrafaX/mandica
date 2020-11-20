import { Categoria } from './categoria';
import { Fornecedor } from './fornecedor';
import { ImagemProduto } from './imagemProduto';
import { EstoqueComprometido } from './estoque-comprometido';

export class Produto {
    constructor() { }

    Id: number;
    Nome: string;
    Tipo: Tipo;
    Situacao: Situacao;
    Descricao: string;
    Categoria: Categoria;
    CategoriaId: number;
    ValorUnitarioLocacao: number;
    ValorUnitarioReposicao: number;
    ValorCustoProduto: number;
    Fornecedor: Fornecedor;
    FornecedorId: number;
    ImagemProdutos: ImagemProduto[];
    Inativo: number;
    DataCadastro: Date;
    Quantidade: number;
    Terceiros: boolean;
    EstoqueComprometido: EstoqueComprometido[];
    EstoqueMin: number;
    EstoqueMax: number;
    Cor: string;
    Altura: number;
    Profundidade: number;
    Largura: number;
    ImagemPrincipal: ImagemProduto;

    getEstoque(produto: Produto, dataInicial: Date, dataFinal: Date): number {
        let qtd = 0;
        if (produto.Terceiros === false) {
          qtd = produto.Quantidade;
          if (produto.EstoqueComprometido && produto.EstoqueComprometido.length > 0) {
            produto.EstoqueComprometido.map( x => {
              if (!((x.DataInicio < dataInicial && x.DataFim < dataInicial)
                || (x.DataInicio > dataFinal && x.DataFim > dataFinal))) {
                  qtd -= x.Quantidade;
              }
            });
          }
        }
        return qtd;
      }

    public getUrlImagem(): string {
      if (this.ImagemPrincipal !== null) {
        return this.ImagemPrincipal.Imagem.Descricao;
      } else {
        return 'assets/img/upload_gray.png';
      }
    }
}

export enum Tipo {
    ACERVO = 0,
    PRODUTO = 1,
    SERVICO = 2,
    TODOS = -1
}

export enum Situacao {
    PERFEITOESTADO = 0,
    LEVEDEFEITO = 1,
    AVARIADO = 2,
    QUEBRADO = 3,
    TODOS = -1
}
