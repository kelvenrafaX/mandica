import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-cadastro-orcamento',
    templateUrl: './orcamento.component.html',
    styleUrls: ['./orcamento.component.scss']
})
export class CadastroOrcamentoComponent implements OnInit {

    type: string;

    constructor() { }

    ngOnInit() {
        this.type = 'Orçamento';
    }

}
