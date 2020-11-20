import { Produto } from './produto';

export class OrcamentoProduto {
    Id: number;
    Produto: Produto;
    ProdutoId: number;
    Quantidade: number;
    ValorUnitario: number;

    constructor(produto: Produto, quantidade: number, valorUnitario?: number) {
        this.Produto = produto;
        this.Quantidade = quantidade;
        this.ValorUnitario = valorUnitario;
    }
}
