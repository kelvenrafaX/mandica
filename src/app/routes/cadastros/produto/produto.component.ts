import { Component, OnInit, ViewChild } from '@angular/core';
import { Produto, Tipo } from '../../../entity/produto';
import { ProdutoService } from '../../../providers/produto.service';
import { FiltroProduto } from '../../../models/filtros/filtroProduto';
import { EditProdutoComponent } from '../../../components/produto/edit-produto/edit-produto.component';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-cadastro-produto',
    templateUrl: './produto.component.html',
    styleUrls: ['./produto.component.scss'],
    providers: [ ProdutoService ]
})
export class CadastroProdutoComponent implements OnInit {

    @ViewChild('editProdutoComponent', {static: true}) EditProdutoComponent: EditProdutoComponent;

    produtos: Produto[];
    produtosAll: Produto[];
    filtro: FiltroProduto;
    tipo: Tipo;

    constructor(private produtoService: ProdutoService) { }

    ngOnInit() {
        this.tipo = Tipo.PRODUTO;
        this.filtro = new FiltroProduto();
        this.filtro.Inativo = 0;
        this.produtos = [];
        this.getProdutos();
    }

    getProdutos() {
        this.produtoService.getFiltrado(this.filtro, this.tipo)
        .subscribe( x => {
            this.produtos = x.Dados;
            this.produtosAll = x.Dados;
        });
    }

    addProduto(produto: Produto, modal: any) {
        // this.produtos.push(produto);
        this.getProdutos();
        modal.hide();
    }

    editProduto(produto: Produto, modal: any) {
        /*this.produtos.map( (x, i) => {
            if (x.Id === produto.Id) {
                this.produtos[i] = Object.assign({}, produto);
            }
        });*/

        this.getProdutos();

        modal.hide();
    }

    prodSelectedEdit(produto: Produto): void {
        this.EditProdutoComponent.form.patchValue(produto);
        this.EditProdutoComponent.form.controls.ValorCustoProduto.patchValue(this.getValue(produto.ValorCustoProduto));
        this.EditProdutoComponent.form.controls.ValorUnitarioLocacao.patchValue(this.getValue(produto.ValorUnitarioLocacao));
        this.EditProdutoComponent.selectedCategoriaId = produto.CategoriaId;
        this.EditProdutoComponent.selectedFornecedorId = produto.FornecedorId;
        this.EditProdutoComponent.selectCategoriaActive = [{ id: produto.CategoriaId, text: produto.Categoria.Descricao}];
        this.EditProdutoComponent.selectFornecedorActive = [{ id: produto.FornecedorId, text: produto.Fornecedor.Pessoa.Nome}];
    }

    getValue(value) {
        // if (value )
        return `R$ ${parseFloat(value).toFixed(2).replace('.', ',')}`;
    }

    filtrando(filtro: FiltroProduto) {
        this.produtos = this.produtosAll.filter( x => {
            if (
                (filtro.Nome === undefined || filtro.Nome.trim() === '' ||
                 x.Nome.toLowerCase().includes(filtro.Nome.toLowerCase())) &&

                (filtro.Id === null || filtro.Id === undefined || filtro.Id === 0 ||
                 (x.Id.toString().includes(filtro.Id.toString())))

                && ( filtro.CategoriaId === null || filtro.CategoriaId === 0 || filtro.CategoriaId === -1 ||
                 x.CategoriaId === filtro.CategoriaId)) {
                  return true;
                }
          });
    }

    eventRemove(produto: Produto): void {
        Swal.fire({
            title: 'Excluir produto?',
            text: `Desejas realmente excluir o produto ${produto.Nome}?`,
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não'
        }).then((result) => {
            if (result.value) {
                const index = this.produtos.indexOf(produto, 0);
                if (index > -1) {
                  this.produtos.splice(index, 1);
                }
                Swal.fire(
                'Produto Excluído!',
                `Produto ${produto.Nome} excluído com sucesso!`,
                'success'
                );
            }
        });
    }

}
