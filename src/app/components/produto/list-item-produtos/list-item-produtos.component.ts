import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FiltroProduto } from '../../../models/filtros/filtroProduto';
import { ProdutoService } from '../../../providers/produto.service';
import { Produto, Tipo } from '../../../entity/produto';
import Swal from 'sweetalert2';

@Component({
selector: './app-list-item-produtos',
templateUrl: './list-item-produtos.component.html',
providers: [ProdutoService],
styleUrls: ['./list-item-produtos.component.scss']
})
export class ListItemProdutosComponent implements OnInit {
    pagination: any = { totalItems: 0, currentPage: 1, maxSize: 5, itemsPerPage: 20 };
    produtos: Produto[] = [];
    filtro: FiltroProduto;

    @Input() tipo: Tipo;
    @Output() eventAdd = new EventEmitter();

    constructor(private produtoService: ProdutoService) { }

    ngOnInit(): void {
        this.filtro = new FiltroProduto();
        this.getProdutosFiltrado();
    }

    getUrlImagem(produto: Produto): string {
        return this.produtoService.getUrlImagem(produto);
    }

    getProdutosFiltrado(): void {
        this.filtro.Pagina = this.pagination.currentPage;
        this.filtro.ItensPorPagina = this.pagination.itemsPerPage;
        this.produtoService.getFiltrado(this.filtro, this.tipo)
        .subscribe(x => {
            this.produtos = [];
            x.Dados.map( produto => {
                if (produto.Inativo === 0) {
                    this.produtos.push(produto);
                }
            });
            this.pagination.totalItems = x.QtdeItensTotal;
        });
    }

    addProduto(produto: Produto): void {
        if (produto.Terceiros === true || produto.Quantidade > 0) {
            this.eventAdd.emit(produto);
        } else {
            Swal.fire('Sem estoque!', 'Não é possível selecionar um produto sem estoque.', 'warning');
        }
    }

    public pageChanged(event: any): void {
        this.pagination.currentPage = event.page;
        this.pagination.itemsPerPage = event.itemsPerPage;
        this.getProdutosFiltrado();
    }
}
