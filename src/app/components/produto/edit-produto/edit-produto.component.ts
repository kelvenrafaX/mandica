import { Component, OnInit, ViewEncapsulation, ViewChild, Output, EventEmitter, Input, SimpleChanges, OnChanges } from '@angular/core';
import { CategoriaService } from '../../../providers/categoria.service';
import { FornecedorService } from '../../../providers/fornecedor.service';
import { ProdutoService } from '../../../providers/produto.service';
import { ImagemService } from '../../../providers/imagem.service';
import { SelectComponent } from 'ng2-select';
import { Categoria } from '../../../entity/categoria';
import { Fornecedor } from '../../../entity/fornecedor';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from '../../../core/settings/settings.service';
import { Imagem } from '../../../entity/imagem';
import { Produto, Tipo } from '../../../entity/produto';
import Swal from 'sweetalert2';
import { formGroupAcervo } from '../../../models/form/form-group-acervo';
import { FormGroups } from '../../../models/form/form-groups';
import { ImagemProduto } from '../../../entity/imagemProduto';

@Component({
  selector: 'app-edit-produto',
  templateUrl: './edit-produto.component.html',
  styleUrls: ['./edit-produto.component.scss'],
  providers: [CategoriaService, FornecedorService, ProdutoService, ImagemService],
  encapsulation: ViewEncapsulation.None
})
export class EditProdutoComponent implements OnInit, OnChanges {

  @Input() selectCategoriaActive: any;
  @Input() selectFornecedorActive: any;

  public selectedCategoriaId: number;
  public selectedFornecedorId: number;

  @Input() tipo: Tipo;
  @Output() eventEdit = new EventEmitter;

  form = new FormGroups().formGroupAcervo();
  loadingAddProduto: boolean;
  disponivelEstoque: number;
  url: any;

  constructor(public http: HttpClient,
    private categoriaService: CategoriaService, private fornecedorService: FornecedorService,
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
    if (this.form.controls.Id.value !== '' &&
    this.form.controls.ImagemProdutos.value.filter(x => x.Imagem.Principal === true)[0] !== undefined) {
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
    this.loadingAddProduto = true;
    this.form.controls.ValorCustoProduto.patchValue(this.getValue(this.form.controls.ValorCustoProduto.value));
    this.form.controls.ValorUnitarioLocacao.patchValue(this.getValue(this.form.controls.ValorUnitarioLocacao.value));
    this.form.controls.ValorUnitarioReposicao.patchValue(this.getValue(this.form.controls.ValorUnitarioReposicao.value));

    const produto = this.form.value;
    produto.ValorCustoProduto = parseFloat(produto.ValorCustoProduto.toString().replace(',', '.'));
    produto.ValorUnitarioLocacao = parseFloat(produto.ValorUnitarioLocacao.toString().replace(',', '.'));
    produto.ValorUnitarioReposicao = parseFloat(produto.ValorUnitarioReposicao.toString().replace(',', '.'));
    this.produtoService.update(produto, this.disponivelEstoque, Tipo.ACERVO)
    .subscribe( x => {
      if (x.Type === 'success') {
        Swal.fire(x.Title, x.Message, 'success');
      } else if (x.Type === 'warning') {
        Swal.fire(x.Title, x.Message, 'warning');
      } else if (x.Type === 'error') {
        Swal.fire(x.Title, x.Message, 'error');
      }
      if (x.Type === 'success') {
        this.eventEdit.emit(produto);
        this.ngOnInit();
      } else {
        this.form.controls.ValorCustoProduto.patchValue(this.setValue(produto.ValorCustoProduto));
        this.form.controls.ValorUnitarioReposicao.patchValue(this.setValue(produto.ValorUnitarioReposicao));
        this.form.controls.ValorUnitarioLocacao.patchValue(this.setValue(produto.ValorUnitarioLocacao));
      }

      this.loadingAddProduto = false;
    });
  }

  clearForm() {
    this.form.reset();
    this.setFormDefault();
  }

  setFormDefault() {

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
