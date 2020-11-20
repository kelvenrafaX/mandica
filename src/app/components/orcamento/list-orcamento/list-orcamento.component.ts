import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { OrcamentoService } from '../../../providers/orcamento.service';
import { Orcamento } from '../../../entity/orcamento';
import { FiltroOrcamento } from '../../../models/filtros/filtroOrcamento';

import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
selector: './app-list-orcamento',
templateUrl: './list-orcamento.component.html',
providers: [ OrcamentoService ]
})
export class ListOrcamentoComponent implements OnInit {

    orcamentoSelected: Orcamento;
    orcamentos: Orcamento[] = [];
    filtro: FiltroOrcamento;

    @Output() eventSelect = new EventEmitter();

    constructor(private orcamentoService: OrcamentoService, private router: Router) { }

    ngOnInit(): void {
        // this.orcamentoSelected = new Orcamento();
        this.filtro = new FiltroOrcamento();
        this.filtro.TipoPedido = 'Orçamento';
        this.getOrcamentos();
    }

    getOrcamentos(): void {
        this.orcamentoService.getOrcamentosFiltrado(this.filtro)
          .subscribe(x => {
            this.orcamentos = [];
            x.Dados.map( orcamento => this.orcamentos.push(orcamento) );
          });
    }

    atualizaStatus(orcamento: Orcamento) {
        this.orcamentoService.atualizaStatus(orcamento)
        .subscribe(x => {
            // Adicionar o resultado do Json Response
            console.log(x);
            this.getOrcamentos();
        });
    }

    valorTotal(orcamento: Orcamento): number {
        return orcamento.OrcamentoProduto.reduce((total, p) => (p.ValorUnitario * p.Quantidade) + total, 0 ) + orcamento.Frete;
    }

    modalPagamento(orcamento: Orcamento, modal: any) {
        this.orcamentoSelected = orcamento;
        modal.show();
    }

    captureScreen(orcamento: Orcamento) {
        this.orcamentoSelected = orcamento;

        const data = document.getElementById('contentToConvert');

        const doc = new jspdf();
        const elementHandler = {
            '#ignorePDF': function (element, renderer) {
                return true;
            }
        };

        doc.fromHTML(data, 15, 15, { 'width': 180, 'elementHandlers': elementHandler });

        doc.output('dataurlnewwindow');

        /*html2canvas(data).then(canvas => {
            // Few necessary setting options
            const imgWidth = 208;
            const pageHeight = 295;
            const imgHeight = canvas.height * imgWidth / canvas.width;
            const heightLeft = imgHeight;

            const contentDataURL = canvas.toDataURL('image/png');
            const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
            const position = 0;
            pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
            pdf.save('MYPdf.pdf'); // Generated PDF

            // Pdf Output
            const pdfOut = pdf.output('blob');

            const data = new FormData();
            data.append('data' , pdfOut, 'teste');

            /*this.orcamentoService.savePdf(data)
                .subscribe( x => {
                    console.log(x);
                });
        });*/
    }

    confirmarOrcamento(orcamento: Orcamento): void {
        this.router.navigate([`/cadastros/pedido/${orcamento.Id}`]);
    }
}
