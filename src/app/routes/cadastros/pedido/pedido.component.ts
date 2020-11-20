import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-cadastro-pedido',
    templateUrl: './pedido.component.html',
    styleUrls: ['./pedido.component.scss']
})
export class CadastroPedidoComponent implements OnInit {

    type: string;

    constructor() { }

    ngOnInit() {
        this.type = 'Pedido';
    }

}
