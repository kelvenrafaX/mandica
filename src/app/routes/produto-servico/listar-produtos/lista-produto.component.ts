import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { SettingsService } from '../../../core/settings/settings.service';
import { ProdutoService } from '../../../providers/produto.service';
import { ImagemService } from '../../../providers/imagem.service';
import { CategoriaService } from '../../../providers/categoria.service';
import { FornecedorService } from '../../../providers/fornecedor.service';
import { Produto, Tipo } from '../../../entity/produto';
import { ImagemProduto } from '../../../entity/imagemProduto';
import { Fornecedor } from '../../../entity/fornecedor';
import { Categoria } from '../../../entity/categoria';
import { FiltroProduto } from '../../../models/filtros/filtroProduto';
import Swal from 'sweetalert2';
import { formGroupProduto } from '../../../models/form/form-group-produtos';

@Component({
  selector: 'app-lista-produto',
  templateUrl: './lista-produto.component.html',
  providers: [ProdutoService, ImagemService, CategoriaService, FornecedorService],
  styleUrls: ['./lista-produto.component.scss']
})
export class ListarProdutosComponent implements OnInit {

  produtos: Produto[] = [];
  produtoEdit: Produto;
  imagens:  ImagemProduto[] = [];
  fornecedores: Fornecedor[] = [];
  categorias: Categoria[] = [];
  imagemSelecionada: File = null;
  typeTable: string;
  filtro: FiltroProduto;
  urlImagem: any;
  imageUrl = 'assets/img/upload_gray.png';
  form = formGroupProduto;
  loadingProdutos = true;

  constructor(private produtoService: ProdutoService, private imagemService: ImagemService,
                private categoriaService: CategoriaService, private fornecedorService: FornecedorService,
                private configuracao: SettingsService ) {
                  this.urlImagem = `${this.configuracao.getUrlImagens('url')}`;
                 }

  ngOnInit() {
    this.filtro = new FiltroProduto();
    this.filtro.Fornecedor = 0;
    this.filtro.CategoriaId = 0;
    this.filtro.Inativo = 2;
    this.typeTable = 'grid';
    this.carregarFornecedores();
    this.carregarCategorias();
    this.carregarImagens();
    this.carregarProdutos();
  }

  getUrlImagem(i): string {
    return ((i.Imagem.Descricao !== 'ImagemCadastradno' && i.Imagem.Descricao !== ' ') ?
     this.urlImagem + '/' + i.Imagem.Descricao : 'assets/img/upload_gray.png');
  }

  setBuscaInativos(status: number) {
    this.filtro.Inativo = status;
    this.carregarProdutos();
  }

  changeTable(value: string) {
    this.typeTable = value;
  }

  carregarProdutos() {
    this.loadingProdutos = true;
    this.produtoService.getFiltrado(this.filtro, Tipo.PRODUTO)
      .subscribe(produtos => {
        this.loadingProdutos = false;
        this.produtos = produtos.Dados;
      });
  }

  carregarFornecedores() {
    this.fornecedorService.getFornecedores()
         .subscribe(fornecedor => {
           this.fornecedores = fornecedor;
         });
  }

  carregarCategorias() {
    this.categoriaService.getCategorias()
         .subscribe(categoria => {
          this.categorias = categoria;
         });
  }

  capturarImagem(file: FileList) {
    const reader =  new FileReader();
    this.imagemSelecionada = file.item(0);
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.imagemSelecionada);
  }

  carregarImagens() {
    this.imagemService.getImagens()
         .subscribe(imagens => {
          // this.imagens = imagens;
         });
  }

  inativarProduto(produto: Produto) {
    const status = produto.Inativo === 0 ? 1 : 0;
    this.produtoService.inativar(produto.Id, status)
        .subscribe(message => {
          if (message.Type === 'success') {
            Swal.fire(message.Title, message.Message, 'success');
          } else if (message.Type === 'warning') {
            Swal.fire(message.Title, message.Message, 'warning');
          } else if (message.Type === 'error') {
            Swal.fire(message.Title, message.Message, 'error');
          }
          this.carregarProdutos();
      });
  }

  openModal(classicModal: any, produto: Produto) {
    this.produtoEdit = produto;
    this.imageUrl = this.getUrlImagem(produto);
    this.form.patchValue(produto);
    classicModal.show();
  }

  onSubmit(imagem: any) {
    this.produtoService.update(this.form.value, 0, Tipo.PRODUTO)
        .subscribe( message => {
          if (message.Type === 'success') {
            Swal.fire(message.Title, message.Message, 'success');
          } else if (message.Type === 'warning') {
            Swal.fire(message.Title, message.Message, 'warning');
          } else if (message.Type === 'error') {
            Swal.fire(message.Title, message.Message, 'error');
          }
          this.updateImagem(this.form.controls.Id.value);
        });
    }

    updateImagem(id: number) {
      // this.imagemService.updateImagem(this.imagemSelecionada, id)
      //     .subscribe(x => {
      //       this.carregarProdutos();
      //     });
    }
}
