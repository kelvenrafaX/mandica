import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { Orcamento } from '../../entity/orcamento';
import { Cliente } from '../../entity/cliente';

import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
selector: './app-pdf-orcamento',
templateUrl: './pdf-orcamento.component.html',
providers: [ ]
})
export class PdfOrcamentoComponent implements OnInit, OnChanges {

    imageUrl: string;

    @Input() orcamento: Orcamento;

    constructor() { }

    ngOnInit(): void {
        this.imageUrl = 'assets/img/mini-logo.png';
        // this.orcamento = new Orcamento();
        // this.orcamento.Cliente = new Cliente();
    }

    ngOnChanges(): void {
        console.log(this.orcamento);
    }

    TotalQtd(): number {
        let qtd = 0;

        this.orcamento.OrcamentoProduto.map( x => {
            qtd += x.Quantidade;
        });

        return qtd;
    }

    ValorEntrada(): number {
        let valor = 0;

        this.orcamento.Venda.map( x => {
            valor += x.ValorParcela;
        });

        return valor;
    }
}
