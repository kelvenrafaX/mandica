import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { ProdutoService } from '../../../providers/produto.service';
import { Produto, Tipo } from '../../../entity/produto';
import { SettingsService } from '../../../core/settings/settings.service';
import Swal from 'sweetalert2';
import { FiltroProduto } from '../../../models/filtros/filtroProduto';
import { SelectComponent } from 'ng2-select';
import { CategoriaService } from '../../../providers/categoria.service';
import { Categoria } from '../../../entity/categoria';

@Component({
selector: './app-list-produtos',
templateUrl: './list-produtos.component.html',
providers: [ ProdutoService, CategoriaService ],
styleUrls: ['./list-produtos.component.scss']
})
export class ListProdutosComponent implements OnInit {

    @ViewChild ('SelectListCategoriaId' , {static: true}) public selectCategoria: SelectComponent;
    @ViewChild ('SelectListSituacao' , {static: true}) public selectSituacao: SelectComponent;

    @Input() editAcervoModal: any;
    @Input() acervos: Produto[];
    @Input() tipo: Tipo;
    @Output() filtrando = new EventEmitter();
    @Output() eventEdit = new EventEmitter;
    @Output() eventRemove = new EventEmitter;

    url: any;
    filtro: FiltroProduto;

    public itemsCategoria: Array<{id: number, text: string}> = [];
    categorias: Categoria[] = [];

    constructor(private produtoService: ProdutoService, private categoriaService: CategoriaService, 
      private configuracao: SettingsService) { }

    ngOnInit(): void {
        this.url = this.configuracao.getUrlImagens('url');
        this.acervos = [];
        this.filtro = new FiltroProduto();
        this.getCategorias();
        this.setSelectSituacao();
    }

    setSelectSituacao() {
      this.selectSituacao.items = [
        {id: -1, text: 'TODAS'},
        {id: 1, text: 'Perfeito Estado'},
        {id: 2, text: 'Leve Defeito'},
        {id: 3, text: 'Avariado'},
        {id: 4, text: 'Quebrado'}
      ];
    }

    selectedSituacao(situacao: any) {
      this.filtro.Situacao = situacao.id > -1 ? situacao.id - 1 : situacao.id;
      this.filter();
    }

    getCategorias() {
      this.categoriaService.getCategorias()
       .subscribe(categorias => {
        this.categorias = [];
        categorias.map(categoria => {
          this.categorias.push(categoria);
        });
       });

      this.categoriaService.getCategoriasPorTipo(this.tipo)
       .subscribe(categorias => {
        this.itemsCategoria = [];
        this.itemsCategoria.push({id: -1, text: 'TODAS'});
        categorias.map(categoria => {
          this.itemsCategoria.push({id: categoria.Id, text: categoria.Descricao});
        });
        console.log(this.itemsCategoria);
        this.selectCategoria.items = this.itemsCategoria;
       });
    }

    selectedCategoria(categoria: any) {
      this.filtro.CategoriaId = categoria.id;
      this.filter();
    }

    filter(): void {
      this.filtrando.emit(this.filtro);
    }

    getUrlImagem(produto: Produto): string {
        if (produto.ImagemPrincipal !== null) {
          return produto.ImagemPrincipal.Imagem.Descricao;
        } else {
          return 'assets/img/upload_gray.png';
        }
    }

    getSituacao(situacao: number): string {
      if (situacao === 0) {
          return 'PERFEITO ESTADO';
      } else if (situacao === 1) {
          return 'LEVE DEFEITO';
      } else if (situacao === 2) {
          return 'AVARIADO';
      } else if (situacao === 3) {
          return 'QUEBRADO';
      }
    }

    getCustoTotal(): number {
      return this.acervos.reduce((total, acervo) => (total + (acervo.Quantidade * acervo.ValorCustoProduto)), 0);
    }

    edit(produto: Produto): void {
      this.eventEdit.emit(produto);
      this.editAcervoModal.show();
    }

    remove(produto: Produto): void {
      this.produtoService.inativar(produto.Id, 1).subscribe( x => {
        if (x.Type === 'success') {
          Swal.fire(x.Title, x.Message, 'success');
        } else if (x.Type === 'warning') {
          Swal.fire(x.Title, x.Message, 'warning');
        } else if (x.Type === 'error') {
          Swal.fire(x.Title, x.Message, 'error');
        }
        if (x.Type === 'success') {
          this.eventRemove.emit(produto);
        }
      });
    }

    getEstoque(produto: Produto): number {
      let qtd = 0;
      if (produto.Terceiros === false) {
        qtd = produto.Quantidade;
        if (produto.EstoqueComprometido && produto.EstoqueComprometido.length > 0) {
          produto.EstoqueComprometido.map( x => {
            if (!((x.DataInicio < new Date() && x.DataFim < new Date())
              || (x.DataInicio > new Date() && x.DataFim > new Date()))) {
                qtd -= x.Quantidade;
            }
          });
        }
      }
      return qtd;
    }
}
