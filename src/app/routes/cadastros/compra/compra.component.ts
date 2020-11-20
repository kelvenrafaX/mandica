import { Component, OnInit, ViewChild } from '@angular/core';
import { CompraService } from '../../../providers/compra.service';
import { Compra } from '../../../entity/compra';
import { EditCompraComponent } from '../../../components/compra/edit-compra/edit-compra.component';

@Component({
    selector: 'app-cadastro-compra',
    templateUrl: './compra.component.html',
    styleUrls: ['./compra.component.scss'],
    providers: [CompraService]
})
export class CadastroCompraComponent implements OnInit {

    @ViewChild('editCompraComponent', {static: true}) EditCompraComponent: EditCompraComponent;

    compras: Compra[];
    comprasAll: Compra[];
    compraEdit: Compra;

    screen: string;

    constructor(private compraService: CompraService) { }

    ngOnInit() {
      this.getCompras();
      this.screen = 'home';
    }

    changeScreen(screen): void {
      this.screen = screen;
    }

    getCompras(): void {
      this.compraService.getCompras()
      .subscribe( x => {
        this.compras = x.Dados;
        this.comprasAll = this.compras;
      });
    }

    addCompra(compra: Compra): void {
      this.getCompras();
      // this.compras.push(compra);
    }

    compraSelectedEdit(compra: Compra) {
      console.log(compra);
      this.EditCompraComponent.form.patchValue(compra);
      this.screen = 'editar';
    }

    clienteSelectedRemove(compra: Compra) {
        this.getCompras();
    }

    editCliente(compra: Compra) {
        this.getCompras();
    }

    filtrando(event: any): void {

    }

    compraSelectedRemove(event: any): void {

    }

    editCompra(event: any): void {

    }

    /*filtrando(filtro: FiltroCompra) {
        this.compras = this.comprasAll.filter( x => {
            if (
              (filtro.Nome === undefined || filtro.Nome.trim() === '' ||
              x.Pessoa.Nome.toLowerCase().includes(filtro.Nome.toLowerCase())) &&

              ( filtro.CpfCnpj === undefined || filtro.CpfCnpj.trim() === '' ||
              (x.Pessoa.Cpf.includes(filtro.CpfCnpj)  || x.Pessoa.Cnpj.includes(filtro.CpfCnpj)))

              && ( filtro.Celular === undefined || filtro.Celular.trim() === '' ||
              x.Pessoa.Celular.includes(filtro.Celular))) {
                return true;
              }
          });
    }*/

}
