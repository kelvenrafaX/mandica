import { Component, OnInit, Output, ViewEncapsulation, ViewChild, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ImagemService } from '../../../providers/imagem.service';
import { FornecedorService } from '../../../providers/fornecedor.service';
import { CategoriaService } from '../../../providers/categoria.service';
import { Categoria } from '../../../entity/categoria';
import { Fornecedor } from '../../../entity/fornecedor';
import { SelectComponent } from 'ng2-select';
import { Imagem } from '../../../entity/imagem';
import { SettingsService } from '../../../core/settings/settings.service';
import { ProdutoService } from '../../../providers/produto.service';
import Swal from 'sweetalert2';
import { formGroupAcervo } from '../../../models/form/form-group-acervo';
import { Mask } from '../../../models/mask';
import { FormGroups } from '../../../models/form/form-groups';
import { ImagemProduto } from '../../../entity/imagemProduto';
import { Tipo } from '../../../entity/produto';


@Component({
  selector: 'app-add-produto',
  templateUrl: './add-produto.component.html',
  providers: [CategoriaService, FornecedorService, ProdutoService, ImagemService],
  styleUrls: ['./add-produto.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddProdutoComponent implements OnInit, OnChanges {

  @ViewChild('ImageComponent', {static: true}) ImageComponent;

  public selectedCategoriaId: number;
  public selectedFornecedorId: number;

  @Input() tipo: Tipo;
  @Output() eventAdd = new EventEmitter;

  form = new FormGroups().formGroupAcervo();
  loadingAddProduto: boolean;
  disponivelEstoque: number;
  url: any;

  constructor(public http: HttpClient, private fornecedorService: FornecedorService,
    private produtoService: ProdutoService, private configuracao: SettingsService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tipo.previousValue !== changes.tipo.currentValue) {
      switch (this.tipo) {
        case Tipo.ACERVO:
          this.form = new FormGroups().formGroupAcervo();
          break;
        case Tipo.PRODUTO:
          this.form = new FormGroups().formGroupProduto();
          break;
        case Tipo.SERVICO:
          this.form = new FormGroups().formGroupServico();
          break;
        default:
          this.form = new FormGroups().formGroupAcervo();
          break;
      }
    }
  }

  ngOnInit() {
     this.loadingAddProduto = false;
     this.setFormDefault();
  }

  getUrlImagem(): string {
    if (this.form.controls.ImagemProdutos.value.filter(x => x.Imagem.Principal === true)[0] !== undefined) {
      return this.form.controls.ImagemProdutos.value.filter(x => x.Imagem.Principal === true)[0].Imagem.Descricao;
    } else {
      return 'assets/img/upload_gray.png';
    }
  }

  selectedCategoria(categoriaId: any) {
    this.form.controls.CategoriaId.setValue(categoriaId);
  }

  selectedFornecedor(fornecedorId: any) {
    this.form.controls.FornecedorId.setValue(fornecedorId);
  }

  getValue(value) {
    value = value.replace('R$ ', '').replace('.', '').replace(',', '');
    return parseFloat(value.substring(0, value.length - 2) + '.' + value.substr(-2));
  }

  setValue(value) {
    return `R$ ${parseFloat(value).toFixed(2).replace('.', ',')}`;
  }

  onSubmit() {
    // if (this.form.controls.Id.value != '') {
      this.loadingAddProduto = true;
      this.form.controls.ValorCustoProduto.patchValue(this.getValue(this.form.controls.ValorCustoProduto.value));
      this.form.controls.ValorUnitarioLocacao.patchValue(this.getValue(this.form.controls.ValorUnitarioLocacao.value));
      this.form.controls.ValorUnitarioReposicao.patchValue(this.getValue(this.form.controls.ValorUnitarioReposicao.value));

      const produto = this.form.value;
      produto.ValorCustoProduto = parseFloat(produto.ValorCustoProduto.toString().replace(',', '.'));
      produto.ValorUnitarioLocacao = parseFloat(produto.ValorUnitarioLocacao.toString().replace(',', '.'));
      produto.ValorUnitarioReposicao = parseFloat(produto.ValorUnitarioReposicao.toString().replace(',', '.'));

      this.produtoService.add(produto, this.disponivelEstoque, this.tipo)
      .subscribe( x => {
        if (x.Type === 'success') {
          Swal.fire(x.Title, x.Message, 'success');
        } else if (x.Type === 'warning') {
          Swal.fire(x.Title, x.Message, 'warning');
        } else if (x.Type === 'error') {
          Swal.fire(x.Title, x.Message, 'error');
        }

        if (x.Type === 'success') {
          this.eventAdd.emit(x.Entity);
          this.ngOnInit();
        } else {
          this.form.controls.ValorCustoProduto.patchValue(this.setValue(produto.ValorCustoProduto));
          this.form.controls.ValorUnitarioReposicao.patchValue(this.setValue(produto.ValorUnitarioReposicao));
          this.form.controls.ValorUnitarioLocacao.patchValue(this.setValue(produto.ValorUnitarioLocacao));
        }

        this.loadingAddProduto = false;
      });
    // }
  }

  clearForm() {
    this.form.reset();
    this.setFormDefault();
  }

  setFormDefault() {
    this.ImageComponent.imagens = [];
    this.disponivelEstoque = 0;
    this.selectedCategoriaId = 0;
    this.selectedFornecedorId = 0;
    this.form.patchValue({
      CategoriaId: '0',
      FornecedorId: '0',
      Nome: '',
      Descricao: '',
      ValorUnitarioLocacao: 'R$ 0,00',
      ValorUnitarioReposicao: 'R$ 0,00',
      ValorCustoProduto: 'R$ 0,00',
      Terceiros: false,
      ImagemProdutos: [],
      Cor: null,
      Profundidade: null,
      Largura: null,
      Altura: null,
    });
  }

  validForm(): boolean {
    return this.form.valid && this.form.controls.CategoriaId.value !== '0'
    && this.form.controls.FornecedorId.value !== '0';
  }

  // Output's do component Image
  selectImage(imagens: Imagem[]): void {
    const imagemProdutos = [];
    imagens.map(x => {
      const imagemProduto = new ImagemProduto();
      imagemProduto.Imagem = x;
      imagemProdutos.push(imagemProduto);
    });


    this.form.controls.ImagemProdutos.setValue(imagemProdutos);
  }
}

