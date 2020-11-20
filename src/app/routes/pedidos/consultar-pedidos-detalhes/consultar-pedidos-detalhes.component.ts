import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrcamentoService } from '../../../providers/orcamento.service';
import { Orcamento } from '../../../entity/orcamento';
import { Entrega } from '../../../entity/entrega';
import { Cliente } from '../../../entity/cliente';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consultar-pedidos-detalhes',
  templateUrl: './consultar-pedidos-detalhes.component.html',
  providers: [OrcamentoService],
  styleUrls: ['./consultar-pedidos-detalhes.component.scss']
})
export class ConsultarPedidosDetalhesComponent implements OnInit {

  orcamento: Orcamento;
  formPagt: string;

  constructor(private orcamentoService: OrcamentoService, private route: ActivatedRoute, private router: Router ) { }

  ngOnInit() {
    this.orcamento = new Orcamento();
    this.orcamento.Cliente = new Cliente();
    this.orcamento.Entrega = new Entrega();
    this.getOrcamento();
  }

  getFormPagt(): string {
    let formAux = 0;
    let form = '';
    this.orcamento.Venda.map(x => {
      if (x.NaturezaId !== formAux) {
        if (form !== '') {
          form += ' / ';
        }

        form += x.Natureza.Descricao;
        formAux = x.NaturezaId;
      }
    });
    return form;
  }

  getOrcamento() {
    this.orcamentoService.getOrcamentoById(this.route.snapshot.params['id'])
      .subscribe(x => {
        this.orcamento = x;

        console.log(x);

        this.formPagt = this.getFormPagt();
      });
  }

  getValorBruto(orcamento: Orcamento) {
    let valor = 0;
    if (orcamento && orcamento.OrcamentoProduto) {
      orcamento.OrcamentoProduto.map( x => {
        valor += x.ValorUnitario * x.Quantidade;
      });
    }
    return valor;
  }

  getStatusColor(status: string) {
    if (status === 'Aguardando confirmação') {
      return {'color': 'red'};
    } else if (status === 'Aguardando pagamento') {
      return {'color': 'orange'};
    } else if (status === 'Aguardando entrega') {
      return {'color': 'purple'};
    } else if (status === 'Aguardando recebimento') {
      return {'color': 'blue'};
    } else {
      return {'color': 'green'};
    }
  }

  atualizaStatus(orcamento: Orcamento) {
    this.orcamentoService.atualizaStatus(orcamento)
        .subscribe(x => {
          console.log(x);
          this.getOrcamento();
    });
  }

  confirmarOrcamento(orcamento: Orcamento): void {
    Swal.fire({
      title: 'Converter orçamento em pedido',
      text: 'Deseja realmente confirmar o orçamento?',
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value) {
        this.router.navigate([`/cadastros/pedido/${this.orcamento.Id}`]);
      }
    });
  }

}
