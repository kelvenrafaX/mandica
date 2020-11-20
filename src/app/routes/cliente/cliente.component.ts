import { Component, OnInit } from '@angular/core';
import { MenuCliente } from '../../components/cliente/menu-cliente/menu-cliente';

@Component({
    selector: 'app-cliente',
    templateUrl: './cliente.component.html',
    styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

    selectedMenu: MenuCliente;

    constructor() { }

    ngOnInit() { }

    reciverMenuSelected(selectedMenu: MenuCliente) {
        this.selectedMenu = selectedMenu;
    }
}
