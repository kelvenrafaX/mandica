import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Compra } from '../../../entity/compra';
import { ProdutoService } from '../../../providers/produto.service';
import { Produto } from '../../../entity/produto';
import { CompraProduto } from '../../../entity/compra-produto';

@Component({
  selector: 'app-list-compra',
  templateUrl: './list-compra.component.html',
  providers: [ ProdutoService ],
  styleUrls: ['./list-compra.component.scss']
})
export class ListCompraComponent implements OnInit {

  @Input() compras: Compra[];
  @Output() filtrando = new EventEmitter();
  @Output() eventEdit = new EventEmitter();
  @Output() eventRemove = new EventEmitter();

  compraEdit: Compra;
  typeTable: string;
  // filtro: FiltroCompra;
  loadingCompras = true;

  constructor(private produtoService: ProdutoService) { }

  ngOnInit() {
    this.compras = [];
    this.searchCliente();

    this.compraEdit = new Compra();
    // this.filtro = new FiltroCompra();
    this.typeTable = 'grid';
    // this.filtro.Inativo = 2;
    this.setFormDefault();
  }

  filter(): void {
    // this.filtrando.emit(this.filtro);
  }

  remove(compra: Compra) {
    /*this.compraService.inativar(cliente.Id, 1)
      .subscribe( message => {
        if (message.Type === 'success') {
          Swal.fire(message.Title, message.Message, 'success');
        } else if (message.Type === 'warning') {
          Swal.fire(message.Title, message.Message, 'warning');
        } else if (message.Type === 'error') {
          Swal.fire(message.Title, message.Message, 'error');
        }
          this.eventRemove.emit(cliente);
      });*/
  }

  searchCliente(): void {
    this.loadingCompras = true;
    const buscandoCompra = setInterval( () => {
      if (this.compras.length > 0) {
        this.loadingCompras = false;
        clearInterval(buscandoCompra);
      }
    }, 100 );
  }

  changeTable(value: string) {
    this.typeTable = value;
  }

  openModal(classicModal: any, compra: Compra) {
    this.compraEdit = compra;
    // this.form.patchValue( compra );
    classicModal.show();
  }

  setFormDefault(): void {

  }

  getQtdItens(itens: CompraProduto[]): number {
    return itens.reduce( (value, x) => (value + x.Quantidade), 0);
  }

  getValorCusto(itens: CompraProduto[]): number {
    return itens.reduce( (value, x) => (value + (x.Quantidade * x.PrecoUnitario)), 0);
  }
}
