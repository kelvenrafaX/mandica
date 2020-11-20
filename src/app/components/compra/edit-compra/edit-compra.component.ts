import { Component, OnInit, Output, EventEmitter, LOCALE_ID, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mask } from '../../../models/mask';
import { CepService } from '../../../providers/cep.service';
import Swal from 'sweetalert2';
import { FormGroups } from '../../../models/form/form-groups';
import { DatePipe, registerLocaleData } from '@angular/common';
import { CompraService } from '../../../providers/compra.service';
import { Produto, Tipo } from '../../../entity/produto';
import { Fornecedor } from '../../../entity/fornecedor';
import ptBr from '@angular/common/locales/pt';
import { Compra } from '../../../entity/compra';
import { FornecedorService } from '../../../providers/fornecedor.service';
import { SettingsService } from '../../../core/settings/settings.service';
import { ProdutoService } from '../../../providers/produto.service';
registerLocaleData(ptBr);

@Component({
  selector: 'app-edit-compra',
  templateUrl: './edit-compra.component.html',
  styleUrls: ['./edit-compra.component.scss'],
  providers: [CompraService, CepService, FornecedorService, ProdutoService, { provide: LOCALE_ID, useValue: 'pt-PT' }]
})
export class EditCompraComponent implements OnInit {

  @Output() eventAdd = new EventEmitter;
  @Input() compras: Compra[];
  produtos: Produto[];
  fornecedores: Fornecedor[] = [];
  form = new FormGroups().formGroupCompra();
  pipe = new DatePipe('pt');

  /** Mask's */
  mask: Mask = new Mask();

  constructor(private fornecedorService: FornecedorService, private compraService: CompraService,
    private configuracao: SettingsService, private produtoService: ProdutoService,
    private http: HttpClient) { }

  ngOnInit() {
    this.produtos = [];
    this.setFormDefault();
    this.getProdutos();
    this.getFornecedores();
  }

  getFornecedores() {
    return this.fornecedorService.getFornecedores()
    .subscribe(fornecedores => {
      this.fornecedores = [];
      fornecedores.map(fornecedor => this.fornecedores.push(fornecedor));
    });
  }

  onSubmit() {
    const compra = new Compra();
    let dataCompra = this.form.controls.DataCompra.value;
    dataCompra = dataCompra.split('/');
    compra.DataCompra = new Date(`${dataCompra[2]}-${dataCompra[1]}-${dataCompra[0]} 00:00` );
    // compra.ProdutoId = this.form.controls.ProdutoId.value;
    // compra.Quantidade = this.form.controls.Quantidade.value;
    this.compraService.addCompra(compra)
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
        this.eventAdd.emit(compra);
      }
    });
  }

  getProdutos() {
    this.produtoService.getAll(Tipo.ACERVO)
        .subscribe( x => {
          this.produtos = x.Dados;
        });
  }

  clearForm(): void {
    this.setFormDefault();
    Swal.fire('Limpo!', 'Formulário limpo com sucesso!', 'success');
  }

  setFormDefault() {
    const now = Date.now();
    const myFormattedDate = this.pipe.transform(now, 'dd/MM/yyyy');
    this.form.patchValue({
      NumDocumento: 0,
      DataCompra: myFormattedDate,
      Quantidade: 0,
      ProdutoId: 0,
      FornecedorId: 0
    });
  }

  validForm(): boolean {
    return this.form.valid && this.form.controls.ProdutoId.value !== '0';
  }

  eventAddProduto(produto: Produto): void {
    this.getProdutos();
  }
}
