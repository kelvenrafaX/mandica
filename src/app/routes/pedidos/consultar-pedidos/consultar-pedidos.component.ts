import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrcamentoService } from '../../../providers/orcamento.service';
import { Orcamento } from '../../../entity/orcamento';

@Component({
  selector: 'app-consultar-pedidos',
  templateUrl: './consultar-pedidos.component.html',
  providers: [OrcamentoService],
  styleUrls: ['./consultar-pedidos.component.scss']
})
export class ConsultarPedidosComponent implements OnInit {

  @ViewChild('pdfModal', {static: true}) pdfModal;

  page = 1;
  totalPages: number;
  isLoaded = false;

  constructor(private http: HttpClient, private orcamentoService: OrcamentoService ) { }

  ngOnInit() {

  }

  /* Métodos do PDV Viewer */
  afterLoadComplete(pdfData: any) {
      this.totalPages = pdfData.numPages;
      this.isLoaded = true;
  }

  nextPage() {
      this.page++;
  }

  prevPage() {
      this.page--;
  }

  eventSelect(orcamento: Orcamento) {
    this.pdfModal.show();
  }
}
