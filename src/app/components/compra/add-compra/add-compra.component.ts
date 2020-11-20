import { Component, OnInit, Input, LOCALE_ID, Output, EventEmitter, ViewChild } from '@angular/core';
import { Compra } from '../../../entity/compra';
import { formGroupCompra } from '../../../models/form/form-group-compra';
import { Produto, Tipo } from '../../../entity/produto';
import { Fornecedor } from '../../../entity/fornecedor';
import { registerLocaleData, DatePipe } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { FornecedorService } from '../../../providers/fornecedor.service';
import { CompraService } from '../../../providers/compra.service';
import { ProdutoService } from '../../../providers/produto.service';
import { Mask } from '../../../models/mask';
import { SettingsService } from '../../../core/settings/settings.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { FormGroups } from '../../../models/form/form-groups';
import { SelectComponent } from 'ng2-select';
import { CompraProduto } from '../../../entity/compra-produto';
registerLocaleData(ptBr);


@Component({
  selector: 'app-add-compra',
  templateUrl: './add-compra.component.html',
  providers: [ FornecedorService, CompraService, ProdutoService, { provide: LOCALE_ID, useValue: 'pt-PT' } ],
  styleUrls: ['./add-compra.component.scss']
})
export class AddCompraComponent implements OnInit {

  @ViewChild ('SelectFornecedorId', {static: true}) public selectFornecedor: SelectComponent;

  public selectedFornecedorId: number;

  public itemsFornecedor: Array<{id: number, text: string}> = [];

  @Output() eventAdd = new EventEmitter;
  @Input() compras: Compra[];
  produtos: Produto[];
  acervos: Produto[];
  fornecedores: Fornecedor[] = [];
  // form = new FormGroups().formGroupCompra();
  compra: Compra;
  pipe = new DatePipe('pt');

  /** Mask's */
  mask: Mask = new Mask();

  /* Selecionando */
  acervoL: Produto;
  produtoL: Produto;
  lista: Produto[];

  constructor(private fornecedorService: FornecedorService, private compraService: CompraService,
    private configuracao: SettingsService,
    private http: HttpClient, private produtoService: ProdutoService) { }

  ngOnInit() {
    this.lista = [];
    this.produtos = [];
    this.compra = new Compra();

    this.setFormDefault();
    this.getProdutos();
    this.getAcervos();
    this.getFornecedores();
  }

  preenchePreco(item: Produto): void {
    console.log(item);
    this.acervos.map( x => {
      if ( x.Id == item.Id ) {
        this.acervoL.ValorCustoProduto = x.ValorCustoProduto;
        this.acervoL.Nome = x.Nome;
      }
    });

    this.produtos.map( x => {
      if ( x.Id == item.Id ) {
        this.produtoL.ValorCustoProduto = x.ValorCustoProduto;
        this.produtoL.Nome = x.Nome;
      }
    });
  }

  addList(item: Produto): void {
    console.log(item);
    this.lista.push(Object.assign({}, item));
  }

  getFornecedores() {
    return this.fornecedorService.getFornecedores()
    .subscribe(fornecedores => {
      this.fornecedores = [];
      this.itemsFornecedor = [];
      fornecedores.map(fornecedor => {
        this.fornecedores.push(fornecedor);
        this.itemsFornecedor.push({id: fornecedor.Id, text: fornecedor.Pessoa.Nome});
      });

      this.selectFornecedor.items = this.itemsFornecedor;
    });
  }

  selectedFornecedor(fornecedor: any) {
    this.compra.FornecedorId = fornecedor.id;
  }

  onSubmit() {

    const dataCompra = this.compra.DataCompra.toString();
    const dataCompraAux = dataCompra.split('/');
    this.compra.DataCompra = new Date(`${dataCompraAux[2]}-${dataCompraAux[1]}-${dataCompraAux[0]} 00:00` );

    const listaProduto = [] ;
    this.lista.map(x => {
      listaProduto.push({
        PrecoUnitario: x.ValorCustoProduto,
        ProdutoId: x.Id,
        Quantidade: x.Quantidade
      });
    });

    this.compra.CompraProduto = listaProduto;

    this.compraService.addCompra(this.compra)
    .subscribe(x => {
      if (x.Type === 'success') {
        Swal.fire(x.Title, x.Message, 'success');
      } else if (x.Type === 'warning') {
        Swal.fire(x.Title, x.Message, 'warning');
      } else if (x.Type === 'error') {
        Swal.fire(x.Title, x.Message, 'error');
      }
        if (x.Type === 'success') {
        this.setFormDefault();
        this.eventAdd.emit(this.compra);
      }
    });
  }

  getAcervos() {
    this.produtoService.getAll(Tipo.ACERVO)
        .subscribe( x => {
          this.acervos = x.Dados;
        });
  }

  getProdutos() {
    this.produtoService.getAll(Tipo.PRODUTO)
        .subscribe( x => {
          this.produtos = x.Dados;
        });
  }

  clearForm(): void {
    this.setFormDefault();
    Swal.fire('Limpo!', 'Formulário limpo com sucesso!', 'success');
  }

  setFormDefault() {
    this.acervoL = new Produto();
    this.produtoL = new Produto();

    const now = Date.now();
    const myFormattedDate = this.pipe.transform(now, 'dd/MM/yyyy');
    /*this.form.patchValue({
      NumDocumento: 0,
      DataCompra: myFormattedDate,
      CompraProduto: [],
      FornecedorId: 0
    });*/
  }

  validForm(): boolean {
    // return this.form.valid && this.form.controls.ProdutoId.value !== '0';
    return true;
  }

  eventAddAcervo(event: any): void {

  }

  eventAddProduto(produto: Produto): void {
    this.getProdutos();
  }

  // Output's do component add Fornecedor
  eventAddFornecedor(fornecedor: Fornecedor) {
    this.getFornecedores();
  }
}
