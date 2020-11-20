import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { VendaService } from '../../../providers/venda.service';
import { Venda } from '../../../entity/venda';
import { Orcamento } from '../../../entity/orcamento';
import Swal from 'sweetalert2';
import { Natureza } from '../../../entity/natureza';
import { NaturezaParcelas } from '../../../entity/natureza-parcelas';
import { NaturezaService } from '../../../providers/natureza.service';
import { OrcamentoService } from '../../../providers/orcamento.service';

@Component({
selector: './app-modal-pagamento',
templateUrl: './modal-pagamento.component.html',
providers: [VendaService, NaturezaService, OrcamentoService]
})
export class ModalPagamentoComponent implements OnInit {

    @Input() orcamento;
    @Input() modal;
    @Output() atualizarOrcamento = new EventEmitter();

    venda: Venda;
    naturezas: Natureza[];

    constructor(private vendaService: VendaService, private naturezaService: NaturezaService,
      private orcamentoService: OrcamentoService) { }

    ngOnInit(): void {
      this.orcamento.TipoPedido = 'Pedido';
      this.setVendaDefault();
      this.getNaturezas();
    }

    setVendaDefault(): void {
      this.venda = new Venda();
      this.venda.Natureza = new Natureza();
      this.venda.NaturezaId = 0;
      this.venda.Natureza.NaturezaParcelas = [];
    }

    addVenda(venda: Venda): void {
      const date = new Date();
      const aux = Object.assign({}, venda);
      // tslint:disable-next-line:triple-equals
      aux.Natureza = this.naturezas.filter(x => x.Id == aux.NaturezaId)[0];
      const parcela = aux.Natureza.NaturezaParcelas.filter(x => x.Parcela == aux.Plano)[0];
      date.setDate(date.getDate() + parcela.DiasVencimento);
      aux.DataRecebimento = date;
      aux.ValorParcela = parseFloat(aux.ValorParcela.toString()) + parseFloat((aux.ValorParcela * (parcela.Tarifacao / 100)).toString());
      aux.ValorParcela = aux.ValorParcela / parcela.Parcela;
      // aux.ValorParcela = this.decimalAdjust('round', aux.ValorParcela / parcela.Parcela, -2);
      aux.Recente = true;
      this.orcamento.Venda.push(aux);
      this.setVendaDefault();
    }

    SalvarPagamentos(): void {
      this.orcamento.Venda = this.orcamento.Venda.filter(x => x.Recente);
      this.orcamentoService.update(this.orcamento)
      .subscribe(message => {
        if (message.Type === 'success') {
          Swal.fire(message.Title, message.Message, 'success');
        } else if (message.Type === 'warning') {
          Swal.fire(message.Title, message.Message, 'warning');
        } else if (message.Type === 'error') {
          Swal.fire(message.Title, message.Message, 'error');
        }

        if (message.Type === 'success') {
          this.atualizarOrcamento.emit();
        }
      });
    }

    selectParcelaPadrao(): void {
      this.venda.Plano = this.getParcelas(this.venda.NaturezaId)[0].Parcela;
    }

    getTotalParcelas(): number {
      return this.orcamento.Venda ? this.orcamento.Venda.reduce((total, p) => (p.ValorParcela) + total, 0) : 0;
    }

    getTotalParcelasPagas(): number {
      return this.orcamento.Venda ? this.orcamento.Venda.reduce((total, p) => (p.ValorPago) + total, 0) : 0;
    }

    getParcelas(naturezaId: number): NaturezaParcelas[] {
      // tslint:disable-next-line:triple-equals
      const parcelas = this.naturezas.filter( x => x.Id == naturezaId);
      // this.venda.Plano = parcelas.length > 0 ? parcelas[0].NaturezaParcelas[0].Parcela : 0;
      return parcelas.length > 0 ? parcelas[0].NaturezaParcelas : [];
    }

    getNaturezas() {
      this.naturezas = [];
      this.naturezaService.getNaturezas()
        .subscribe( x => {
          x.map( item => {
            if (item.Ativa) {
              this.naturezas.push(item);
            }
          });
        });
    }



    pagarParcela(venda: Venda) {
      this.vendaService.pagarParcela(venda.Id, venda.Grupo, venda.Parcela)
        .subscribe( message => {
          if (message.Type === 'success') {
            Swal.fire(message.Title, message.Message, 'success');
          } else if (message.Type === 'warning') {
            Swal.fire(message.Title, message.Message, 'warning');
          } else if (message.Type === 'error') {
            Swal.fire(message.Title, message.Message, 'error');
          }
           if (message.Type === 'success') {
            this.atualizarOrcamento.emit();
           }
        });
    }

    pagarTotal(orcamento: Orcamento) {
      this.vendaService.pagarTotal(orcamento)
      .subscribe( message => {
        if (message.Type === 'success') {
          Swal.fire(message.Title, message.Message, 'success');
        } else if (message.Type === 'warning') {
          Swal.fire(message.Title, message.Message, 'warning');
        } else if (message.Type === 'error') {
          Swal.fire(message.Title, message.Message, 'error');
        }
         if (message.Type === 'success') {
          this.atualizarOrcamento.emit();
         }
      });
    }

    close(): void {
      this.modal.hide();
    }
}
