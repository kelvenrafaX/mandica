import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Produto, Tipo } from '../../../entity/produto';
import { ProdutoService } from '../../../providers/produto.service';
import { EditProdutoComponent } from '../../../components/produto/edit-produto/edit-produto.component';
import { FiltroProduto } from '../../../models/filtros/filtroProduto';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-acervo-produto',
    templateUrl: './acervo.component.html',
    styleUrls: ['./acervo.component.scss'],
    providers: [ ProdutoService ]
})
export class CadastroAcervoComponent implements OnInit {

    @ViewChild('editAcervoComponent', {static: true}) EditAcervoComponent: EditProdutoComponent;

    acervos: Produto[];
    acervosAll: Produto[];
    filtro: FiltroProduto;
    tipo: Tipo;

    constructor(private produtoService: ProdutoService) { }

    ngOnInit() {
        this.tipo = Tipo.ACERVO;
        this.filtro = new FiltroProduto();
        this.filtro.Inativo = 0;
        this.acervos = [];
        this.getAcervos();
    }

    getAcervos() {
        this.produtoService.getFiltrado(this.filtro, this.tipo)
        .subscribe( x => {
            this.acervos = x.Dados;
            this.acervosAll = x.Dados;
        });
    }

    addAcervo(acervo: Produto, modal: any) {
        // this.acervos.push(acervo);
        this.getAcervos();
        modal.hide();
    }

    editAcervo(acervo: Produto, modal: any) {
        /*this.acervos.map( (x, i) => {
            if (x.Id === acervo.Id) {
                this.acervos[i] = Object.assign({}, acervo);
            }
        });*/

        this.getAcervos();

        modal.hide();
    }

    prodSelectedEdit(produto: Produto): void {
        this.EditAcervoComponent.form.patchValue(produto);
        this.EditAcervoComponent.form.controls.ValorCustoProduto.patchValue(this.getValue(produto.ValorCustoProduto));
        this.EditAcervoComponent.form.controls.ValorUnitarioReposicao.patchValue(this.getValue(produto.ValorUnitarioReposicao));
        this.EditAcervoComponent.form.controls.ValorUnitarioLocacao.patchValue(this.getValue(produto.ValorUnitarioLocacao));
        this.EditAcervoComponent.selectedCategoriaId = produto.CategoriaId;
        this.EditAcervoComponent.selectedFornecedorId = produto.FornecedorId;
        this.EditAcervoComponent.selectCategoriaActive = [{ id: produto.CategoriaId, text: produto.Categoria.Descricao}];
        this.EditAcervoComponent.selectFornecedorActive = [{ id: produto.FornecedorId, text: produto.Fornecedor.Pessoa.Nome}];
        this.EditAcervoComponent.disponivelEstoque = produto.Quantidade;
    }

    getValue(value) {
        // if (value )
        return `R$ ${parseFloat(value).toFixed(2).replace('.', ',')}`;
    }

    filtrando(filtro: FiltroProduto) {
        this.acervos = this.acervosAll.filter( x => {
            if (
              (filtro.Nome === undefined || filtro.Nome.trim() === '' ||
               x.Nome.toLowerCase().includes(filtro.Nome.toLowerCase())) &&

              (filtro.Id === null || filtro.Id === undefined || filtro.Id === 0 ||
               (x.Id.toString().includes(filtro.Id.toString())))

              && ( filtro.CategoriaId === null || filtro.CategoriaId === 0 || filtro.CategoriaId === -1 ||
               x.CategoriaId === filtro.CategoriaId)

               && ( filtro.Situacao === null || filtro.Situacao === -1 ||
                x.Situacao === filtro.Situacao)

                && (!filtro.Terceiros || (filtro.Terceiros && filtro.Terceiros === x.Terceiros))

               ) {
                return true;
              }
          });
    }

    eventRemove(acervo: Produto): void {
        Swal.fire({
            title: 'Excluir acervo?',
            text: `Desejas realmente excluir o acervo ${acervo.Nome}?`,
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não'
        }).then((result) => {
            if (result.value) {
                const index = this.acervos.indexOf(acervo, 0);
                if (index > -1) {
                  this.acervos.splice(index, 1);
                }
                Swal.fire(
                'Acervo Excluído!',
                `Acervo ${acervo.Nome} excluído com sucesso!`,
                'success'
                );
            }
        });
    }

}
