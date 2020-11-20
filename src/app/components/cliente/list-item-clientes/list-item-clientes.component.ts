import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ClienteService } from '../../../providers/cliente.service';
import { Cliente } from '../../../entity/cliente';
import { FiltroCliente } from '../../../models/filtros/filtroCliente';

@Component({
selector: './app-list-item-clientes',
templateUrl: './list-item-clientes.component.html',
providers: [ ClienteService ],
styleUrls: ['./list-item-clientes.component.scss']
})
export class ListItemClientesComponent implements OnInit {

    clientes: Cliente[] = [];
    @Output() eventClienteSelecionado = new EventEmitter();
    checked: number;
    filtro: FiltroCliente;

    constructor(private clienteService: ClienteService) { }

    ngOnInit(): void {
        this.filtro = new FiltroCliente();
        this.getClientes();
    }

    check(i: number): void {
        this.checked = i;
        let cliente: Cliente;
        this.clientes.forEach(function(element, index) { if (index === i) { cliente = element; }});
        this.eventClienteSelecionado.emit(cliente);
    }

    getClientes(): void {
        this.clienteService.getClientesFiltrado(this.filtro)
          .subscribe(x => {
            this.clientes = [];
            x.Dados.map( cliente => this.clientes.push(cliente));
            // this.check(0);
          });
    }

    editCliente(cliente: Cliente): void {
        alert(`Editando o cliente ${cliente.Pessoa.Nome}`);
        // TODO Abrir formulário para edição
    }

    deleteCliente(cliente: Cliente): void {
        this.clienteService.deleteCliente(cliente.Id)
            .subscribe(message => {
                console.log(message);
                this.getClientes();
            });
    }
}
