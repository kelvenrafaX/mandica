import { Component, OnInit, ViewChild } from '@angular/core';
import { Fornecedor } from '../../../entity/fornecedor';
import { FiltroCliente } from '../../../models/filtros/filtroCliente';
import { FornecedorService } from '../../../providers/fornecedor.service';
import { EditFornecedorComponent } from '../../../components/fornecedor/edit-fornecedor/edit-fornecedor.component';

@Component({
    selector: 'app-cadastro-fornecedor',
    templateUrl: './fornecedor.component.html',
    styleUrls: ['./fornecedor.component.scss'],
    providers: [FornecedorService]
})
export class CadastroFornecedorComponent implements OnInit {

    @ViewChild('editFornecedorComponent', {static: true}) EditFornecedorComponent: EditFornecedorComponent;

    fornecedores: Fornecedor[];
    fornecedoresAll: Fornecedor[];
    fornecedoresEdit: Fornecedor;

    screen: string;

    constructor(private fornecedorService: FornecedorService) { }

    ngOnInit() {
        this.getFornecedores();
        this.screen = 'home';
    }

    changeScreen(screen): void {
        this.screen = screen;
    }

    getFornecedores(): void {
        this.fornecedorService.getFornecedores()
        .subscribe( fornecedores => {
            this.fornecedores = fornecedores.filter( x => x.Pessoa.Inativo === 0);
            this.fornecedoresAll = this.fornecedores;
        });
    }

    addFornecedor(fornecedor: Fornecedor): void {
        this.fornecedores.push(fornecedor);
    }

    fornecedorSelectedEdit(fornecedor: Fornecedor) {
        console.log(fornecedor);
        this.EditFornecedorComponent.form.patchValue(fornecedor);
        this.screen = 'editar';
    }

    fornecedorSelectedRemove(fornecedor: Fornecedor) {
        this.getFornecedores();
    }

    editFornecedor(fornecedor: Fornecedor) {
        /*this.clientes.map(item => {
            if (item.Pessoa.No === cliente) {
                item = cliente;
            }
        });*/
        this.getFornecedores();
    }

    filtrando(filtro: FiltroCliente) {
        this.fornecedores = this.fornecedoresAll.filter( x => {
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
    }

}
