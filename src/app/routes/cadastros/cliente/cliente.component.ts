import { Component, OnInit, ViewChild } from '@angular/core';
import { ClienteService } from '../../../providers/cliente.service';
import { Cliente } from '../../../entity/cliente';
import { EditClienteComponent } from '../../../components/cliente/edit-cliente/edit-cliente.component';
import { FiltroCliente } from '../../../models/filtros/filtroCliente';

@Component({
    selector: 'app-cadastro-cliente',
    templateUrl: './cliente.component.html',
    styleUrls: ['./cliente.component.scss'],
    providers: [ClienteService]
})
export class CadastroClienteComponent implements OnInit {

    @ViewChild('editClienteComponent', {static: true}) EditClienteComponent: EditClienteComponent;

    clientes: Cliente[];
    clientesAll: Cliente[];
    clienteEdit: Cliente;

    screen: string;

    constructor(private clienteService: ClienteService) { }

    ngOnInit() {
        this.getClientes();
        this.screen = 'home';
    }

    changeScreen(screen): void {
        this.screen = screen;
    }

    getClientes(): void {
        this.clienteService.getClientes()
        .subscribe( clientes => {
            this.clientes = clientes.filter( x => x.Pessoa.Inativo === 0);
            this.clientesAll = this.clientes;
        });
    }

    addCliente(cliente: Cliente): void {
        // this.clientes.push(cliente);
        this.getClientes();
    }

    clienteSelectedEdit(cliente: Cliente) {
        this.EditClienteComponent.form.patchValue(cliente);
        this.EditClienteComponent.form.controls.Pessoa.get('Enderecos').patchValue(cliente.Pessoa.Enderecos[0]);
        this.EditClienteComponent.form.controls.Pessoa.get('Enderecos').get('Estado').patchValue(cliente.Pessoa.Enderecos[0].UF);

        if (cliente.Pessoa.DataNascimento !== null) {
            const dateSplit = cliente.Pessoa.DataNascimento.toString().substring(0, 10).split('-');
            this.EditClienteComponent.form.controls.Pessoa.get('DataNascimento').patchValue(`
                ${dateSplit[2]}/${dateSplit[1]}/${dateSplit[0]}
            `);
        } else {
            this.EditClienteComponent.form.controls.Pessoa.get('DataNascimento').patchValue(``);
        }

        this.screen = 'editar';
    }

    clienteSelectedRemove(cliente: Cliente) {
        this.getClientes();
    }

    editCliente(cliente: Cliente) {
        /*this.clientes.map(item => {
            if (item.Pessoa.No === cliente) {
                item = cliente;
            }
        });*/
        this.getClientes();
    }

    filtrando(filtro: FiltroCliente) {
        this.clientes = this.clientesAll.filter( x => {
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
