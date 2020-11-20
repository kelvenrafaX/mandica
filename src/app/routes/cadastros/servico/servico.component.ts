import { Component, OnInit, ViewChild } from '@angular/core';
import { ProdutoService } from '../../../providers/produto.service';
import { Produto, Tipo } from '../../../entity/produto';
import { FiltroProduto } from '../../../models/filtros/filtroProduto';
import { EditProdutoComponent } from '../../../components/produto/edit-produto/edit-produto.component';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-cadastro-servico',
    templateUrl: './servico.component.html',
    styleUrls: ['./servico.component.scss'],
    providers: [ ProdutoService ]
})
export class CadastroServicoComponent implements OnInit {

    @ViewChild('editServicoComponent', {static: true}) EditServicoComponent: EditProdutoComponent;

    servicos: Produto[];
    servicosAll: Produto[];
    filtro: FiltroProduto;
    tipo: Tipo;

    constructor(private produtoService: ProdutoService) { }

    ngOnInit() {
        this.tipo = Tipo.SERVICO;
        this.filtro = new FiltroProduto();
        this.filtro.Inativo = 0;
        this.servicos = [];
        this.getServicos();
    }

    getServicos() {
        this.produtoService.getFiltrado(this.filtro, this.tipo)
        .subscribe( x => {
            this.servicos = x.Dados;
            this.servicosAll = x.Dados;
        });
    }

    addServico(servico: Produto, modal: any) {
        // this.servicos.push(servico);
        this.getServicos();
        modal.hide();
    }

    editServico(servico: Produto, modal: any) {
        /*this.servicos.map( (x, i) => {
            if (x.Id === servico.Id) {
                this.servicos[i] = Object.assign({}, servico);
            }
        });*/

        this.getServicos();

        modal.hide();
    }

    prodSelectedEdit(produto: Produto): void {
        this.EditServicoComponent.form.patchValue(produto);
        this.EditServicoComponent.form.controls.ValorCustoProduto.patchValue(this.getValue(produto.ValorCustoProduto));
        this.EditServicoComponent.form.controls.ValorUnitarioReposicao.patchValue(this.getValue(produto.ValorUnitarioReposicao));
        this.EditServicoComponent.form.controls.ValorUnitarioLocacao.patchValue(this.getValue(produto.ValorUnitarioLocacao));
        this.EditServicoComponent.selectedCategoriaId = produto.CategoriaId;
        this.EditServicoComponent.selectedFornecedorId = produto.FornecedorId;
        this.EditServicoComponent.selectCategoriaActive = [{ id: produto.CategoriaId, text: produto.Categoria.Descricao}];
        this.EditServicoComponent.selectFornecedorActive = [{ id: produto.FornecedorId, text: produto.Fornecedor.Pessoa.Nome}];
    }

    getValue(value) {
        // if (value )
        return `R$ ${parseFloat(value).toFixed(2).replace('.', ',')}`;
    }

    filtrando(filtro: FiltroProduto) {
        this.servicos = this.servicosAll.filter( x => {
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

    eventRemove(servico: Produto): void {
        Swal.fire({
            title: 'Excluir serviço?',
            text: `Desejas realmente excluir o serviço ${servico.Nome}?`,
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não'
        }).then((result) => {
            if (result.value) {
                const index = this.servicos.indexOf(servico, 0);
                if (index > -1) {
                  this.servicos.splice(index, 1);
                }
                Swal.fire(
                'Serviço Excluído!',
                `Serviço ${servico.Nome} excluído com sucesso!`,
                'success'
                );
            }
        });
    }

}

