import { Component, OnInit, LOCALE_ID, Input, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrcamentoService } from '../../../providers/orcamento.service';
import { Produto, Tipo } from '../../../entity/produto';
import { Orcamento } from '../../../entity/orcamento';
import { Cliente } from '../../../entity/cliente';
import { SettingsService } from '../../../core/settings/settings.service';
import { OrcamentoProduto } from '../../../entity/orcamento-produto';
import { DatePipe } from '@angular/common';
import { BandeiraService } from '../../../providers/bandeira.service';
import { NaturezaService } from '../../../providers/natureza.service';
import { ListItemProdutos } from '../../../entity/list-item-produtos';
import { Natureza } from '../../../entity/natureza';
import { Bandeira } from '../../../entity/bandeira';
import { Entrega } from '../../../entity/entrega';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr);
import Swal from 'sweetalert2';
import { Venda } from '../../../entity/venda';
import { NaturezaParcelas } from '../../../entity/natureza-parcelas';
import { ProdutoService } from '../../../providers/produto.service';
import { Pessoa } from '../../../entity/pessoa';
import { ClienteService } from '../../../providers/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { Mask } from '../../../models/mask';

@Component({
  selector: 'app-add-pedido',
  templateUrl: './add-pedido.component.html',
  providers: [BandeiraService, NaturezaService, OrcamentoService, ProdutoService,
     ClienteService, { provide: LOCALE_ID, useValue: 'pt-PT' }],
  styleUrls: ['./add-pedido.component.scss']
})
export class AddPedidoComponent implements OnInit {

  @ViewChild('inputQtdeProduto', {static: true}) inputQtdeProduto;
  @ViewChild('inputCodigoProduto', {static: true}) inputCodigoProduto;
  @ViewChild('inputCodigoCliente', {static: true}) inputCodigoCliente;
  @ViewChild('dataentrega', {static: true}) inputDataEntrega;
  @ViewChild('datadevolucao', {static: true}) inputDataDevolucao;
  @ViewChild('dataevento', {static: true}) inputDataEvento;

  @ViewChild('produtoSelectModal', {static: true}) produtoSelectModal;
  @ViewChild('clienteSelectModal', {static: true}) clienteSelectModal;
  @ViewChild('formaPagamentoModal', {static: true}) formaPagamentoModal;

  @Input() type;

  url: any;

  lastId: number;

  orcamentoImportado: boolean;

  // Add Produto
  codigoProduto: string;
  produtoSearch: ListItemProdutos;

  // Add Cliente
  codigoCliente: string;
  clienteSearch: Cliente;

  // Passo: 1
  produtos: ListItemProdutos[];

  // Passo: 2
  clienteSelecionado: Cliente;

  // Passo: 3
  logistica: Orcamento;

  // Passo: 4
  entregaEstimada: number;
  desconto: number;
  descontoPercentual: number;
  naturezas: Natureza[];
  bandeiras: Bandeira[];
  venda: Venda;

  pipe = new DatePipe('pt');

  /** Mask's */
  mask: Mask = new Mask();

  constructor(private bandeiraService: BandeiraService, private naturezaService: NaturezaService,
    private configuracao: SettingsService, private http: HttpClient,
    private orcamentoService: OrcamentoService, private produtoService: ProdutoService,
    private clienteService: ClienteService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.orcamentoImportado = false;

    this.url = this.configuracao.getUrlImagens('url');
    this.clienteSelecionado = new Cliente();
    this.resetAddProduto();
    this.setFormDefault();
    this.getNaturezas();
    this.getBandeiras();

    this.clienteSearch = new Cliente();
    this.clienteSearch.Pessoa = new Pessoa();
    this.codigoCliente = '';

    const id = this.route.snapshot.params['id'];
    if ( id !== undefined && id !== '' ) {
      this.getOrcamentoImportado(id);
    }
  }

  getOrcamentoImportado(id: number) {
    this.orcamentoService.getOrcamentoById(this.route.snapshot.params['id'])
      .subscribe(x => {
        this.orcamentoImportado = true;

        this.logistica = x;

        if (x.Entrega === null) {
          this.logistica.Entrega = new Entrega();
          this.logistica.Entrega = this.logistica.Cliente.Pessoa.Enderecos[0];
        }

        this.logistica.OrcamentoProduto.map(item => {
          this.produtos.push({ produto: item.Produto, quantidade: item.Quantidade, checked: true });
        });

        // this.inputDataEntrega.value = this.logistica.DataEntrega.toString().substring(0, 10);
        // this.inputDataDevolucao.value = this.logistica.DataDevolucao.toString().substring(0, 10);
        // this.inputDataEvento.value = this.logistica.DataEvento.toString().substring(0, 10);

        this.logistica.HorarioEntrega = new Date(this.logistica.DataEntrega).toTimeString().split(' ')[0];
        this.logistica.HorarioDevolucao = new Date(this.logistica.DataDevolucao).toTimeString().split(' ')[0];
        this.logistica.HorarioEvento = new Date(this.logistica.DataEvento).toTimeString().split(' ')[0];

        this.clienteSearch = this.logistica.Cliente;
        this.codigoCliente = this.logistica.ClienteId.toString();

        this.logistica.TipoPedido = this.type;
      });
  }

  checaFinalizacao(): void {
    if (this.type === 'Orçamento') {
      this.finalizarPedido();
    } else {
      this.formaPagamentoModal.show();
    }
  }

  resetAddProduto(): void {
    this.produtoSearch = new ListItemProdutos();
    this.produtoSearch.produto = new Produto();
    this.produtoSearch.quantidade = 0;
    this.codigoProduto = '';
  }

  decimalAdjust(type, value, exp) {
    // Se exp é indefinido ou zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // Se o valor não é um número ou o exp não é inteiro...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Transformando para string
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Transformando de volta
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
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
    this.logistica.Venda.push(aux);
    this.setVendaDefault();
  }

  getParcelas(naturezaId: number): NaturezaParcelas[] {
    // tslint:disable-next-line:triple-equals
    const parcelas = this.naturezas.filter( x => x.Id == naturezaId);
    // this.venda.Plano = parcelas.length > 0 ? parcelas[0].NaturezaParcelas[0].Parcela : 0;
    return parcelas.length > 0 ? parcelas[0].NaturezaParcelas : [];
  }

  getBandeiras() {
    this.bandeiras = [];
    this.bandeiraService.getBandeiras()
      .subscribe( x => {
        x.map( item => {
          if (item.Ativa) {
            this.bandeiras.push(item);
          }
        });
      });
  }

  getUrlFlag(flag) {
    return `assets/img/flags/${flag.replace(' ', '_')}.png`;
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

  setFormDefault() {
    this.produtos = [];
    this.logistica = new Orcamento();
    this.logistica.Entrega = new Entrega();
    this.orcamentoService.getIdLastOrder().subscribe( x => this.lastId = x );
    // this.logistica.NaturezaId = 0;
    // this.logistica.Plano = 1;
    this.logistica.TipoEntregaId = 1;
    this.logistica.TipoPedido = this.type;
    this.entregaEstimada = 0;
    this.desconto = 0;

    this.logistica.Venda = [];

    this.setVendaDefault();
  }

  setVendaDefault(): void {
    this.venda = new Venda();
    this.venda.Natureza = new Natureza();
    this.venda.NaturezaId = 0;
    this.venda.Natureza.NaturezaParcelas = [];
  }

  openModal(modal: any) {
    modal.show();
  }

  getUrlImagem(produto: Produto): string {
    if (produto.ImagemProdutos.filter(x => x.Imagem.Principal === true)[0] !== undefined) {
      return produto.ImagemProdutos.filter(x => x.Imagem.Principal === true)[0].Imagem.Descricao;
    } else {
      return 'assets/img/upload_gray.png';
    }
  }

  validDateEntrega(): boolean {
    return  this.logistica.DataEntrega !== undefined
    && this.logistica.DataEntrega !== null
    && this.logistica.DataEntrega.toString() !== '';
  }

  validaPasso1(): boolean {
    return  this.validDateEntrega()
    && this.logistica.DataDevolucao !== undefined
    && this.logistica.DataDevolucao !== null
    && this.logistica.DataDevolucao.toString() !== '';
  }

  validaPasso2(): boolean {
    return this.validaPasso1() && (this.produtos.length > 0);
  }

  validaPasso3(): boolean {
    return this.validaPasso1() && this.validaPasso2() && this.clienteSearch != null;
  }

  validaPasso4(): boolean {
    // console.log(this.logistica.DataEvento);
    return this.validaPasso1() && this.validaPasso2() && this.validaPasso3()
    && ((this.logistica.TipoEntregaId === 1 || this.logistica.TipoEntregaId === 2)
    // && (this.logistica.TipoPedido === 'Orçamento' || this.logistica.TipoPedido === 'Pedido')
    && this.logistica.DataEvento !== undefined && this.logistica.DataEvento.toString() !== ''
    && this.logistica.Diarias !== 0 && this.logistica.Diarias !== undefined
    && this.logistica.Entrega.Cep !== '' && this.logistica.Entrega.Cep !== undefined
    && this.logistica.Entrega.Rua !== '' && this.logistica.Entrega.Rua !== undefined
    && this.logistica.Entrega.Bairro !== '' && this.logistica.Entrega.Bairro !== undefined
    && this.logistica.Entrega.Numero !== '' && this.logistica.Entrega.Numero !== undefined);

  }

  validaPasso5(): boolean {
    return this.validaPasso1() && this.validaPasso2() && this.validaPasso3() && this.validaPasso4();
  }

  validaTudo(): boolean {
    if (this.type === 'Orçamento') {
      return this.validaPasso1() &&
             this.validaPasso2() &&
             this.validaPasso3();
    } else {
      return this.validaPasso1() &&
             this.validaPasso2() &&
             this.validaPasso3() &&
             this.validaPasso4() &&
             this.validaPasso5();
    }
  }

  getEstoque(produto: Produto): number {
    let qtd = 0;
    if (produto.Terceiros === false && this.type === 'Pedido') {
      qtd = produto.Quantidade;
      if (produto.EstoqueComprometido && produto.EstoqueComprometido.length > 0) {
        produto.EstoqueComprometido.map( x => {
          if (!((x.DataInicio < this.logistica.DataEntrega && x.DataFim < this.logistica.DataEntrega)
            || (x.DataInicio > this.logistica.DataDevolucao && x.DataFim > this.logistica.DataDevolucao))) {
              qtd -= x.Quantidade;
          }
        });
      }
    }
    return qtd;
  }

  recebeClienteSelecionado(cliente: Cliente): void {
    this.codigoCliente = cliente.Id.toString();
    this.clienteSearch = Object.assign({}, cliente);
    this.logistica.Entrega = Object.assign({}, cliente.Pessoa.Enderecos[0]);
    this.clienteSelectModal.hide();
  }

  recebeRemoveProduto(produto: ListItemProdutos): void {
    const index = this.produtos.indexOf(produto, 0);
    if (index > -1) {
      this.produtos.splice(index, 1);
    }
  }

  qtdTotalProduto(): number {
    return this.produtos.reduce((total, p) => p.quantidade + total, 0 );
  }

  atualizaValorTotalAcervo(): number {
    return this.produtos.filter( x => x.produto.Tipo === Tipo.ACERVO)
      .reduce((total, p) => (p.produto.ValorUnitarioLocacao * p.quantidade) + total, 0 );
  }

  atualizaValorTotalProduto(): number {
    return this.produtos.filter( x => x.produto.Tipo === Tipo.PRODUTO)
      .reduce((total, p) => (p.produto.ValorUnitarioLocacao * p.quantidade) + total, 0 );
  }

  atualizaValorTotalServico(): number {
    return this.produtos.filter( x => x.produto.Tipo === Tipo.SERVICO)
      .reduce((total, p) => (p.produto.ValorUnitarioLocacao * p.quantidade) + total, 0 );
  }

  atualizaValorTotal(): number {
    return this.atualizaValorTotalAcervo() + this.atualizaValorTotalProduto() + this.atualizaValorTotalServico();
  }

  atualizaValorTotalOrcamento(): number {
    if (this.logistica.TipoEntregaId === 2) {
      return this.atualizaValorTotal() + this.entregaEstimada - this.desconto;
    } else {
      return this.atualizaValorTotal() - this.desconto;
    }
  }

  atualizaValorRestante(): number {
    const valorVenda = this.logistica.Venda.reduce((total, p) => (p.ValorParcela * p.Plano) + total, 0 );
    return this.atualizaValorTotalOrcamento() > valorVenda ? this.atualizaValorTotalOrcamento() - valorVenda : 0;
  }

  atualizaValorTroco(): number {
    const valorVenda = this.logistica.Venda.reduce((total, p) => (p.ValorParcela * p.Plano) + total, 0 );
    return valorVenda > this.atualizaValorTotalOrcamento() ? valorVenda - this.atualizaValorTotalOrcamento() : 0 ;
  }

  populaOrcamento(): Orcamento {
    // Popula logística
    // tslint:disable-next-line:prefer-const
    let orcamento: Orcamento = Object.assign({}, this.logistica);

    if (this.logistica.HorarioEntrega === undefined || this.logistica.HorarioEntrega === '') {
      this.logistica.HorarioEntrega = '00:00';
    }

    if (this.logistica.HorarioDevolucao === undefined || this.logistica.HorarioDevolucao === '') {
      this.logistica.HorarioDevolucao = '23:59';
    }

    let dateFormat = this.logistica.DataEntrega.toString().split('-');

    orcamento.DataEntrega = new Date(
      new Date(dateFormat[1] + '-' + dateFormat[2] + '-' + dateFormat[0])
      .setHours(parseInt(this.logistica.HorarioEntrega.split(':')[0], 0), parseInt(this.logistica.HorarioEntrega.split(':')[1], 0)
    ));

    if (this.logistica.HorarioEvento !== undefined && this.logistica.HorarioEvento !== '') {
      dateFormat = this.logistica.DataEvento.toString().split('-');

      orcamento.DataEvento = new Date(
        new Date(dateFormat[1] + '-' + dateFormat[2] + '-' + dateFormat[0])
        .setHours(parseInt(this.logistica.HorarioEvento.split(':')[0], 0), parseInt(this.logistica.HorarioEvento.split(':')[1], 0)
      ));
    }

    dateFormat = this.logistica.DataDevolucao.toString().split('-');

    orcamento.DataDevolucao = new Date(
      new Date(dateFormat[1] + '-' + dateFormat[2] + '-' + dateFormat[0])
      .setHours(parseInt(this.logistica.HorarioDevolucao.split(':')[0], 0), parseInt(this.logistica.HorarioDevolucao.split(':')[1], 0)
    ));

    // Popula Cliente
    orcamento.ClienteId = this.clienteSearch.Id;

    // Popula passo 4
    orcamento.Frete = this.entregaEstimada;
    orcamento.Desconto = parseFloat(this.desconto.toString().replace(',', '.'));

    /* if (orcamento.NaturezaId.toString() !== '3') {
      orcamento.Plano = 1;
      orcamento.BandeiraId = 0;
    } */

    // Popula produtos
    orcamento.OrcamentoProduto = [];
    this.produtos.map( function(x) {
      // tslint:disable-next-line:prefer-const
      let item = new OrcamentoProduto(x.produto, x.quantidade, x.produto.ValorUnitarioLocacao);
      item.ProdutoId = item.Produto.Id;
      item.Produto = null;
      orcamento.OrcamentoProduto.push(item);
     }
    );

    return orcamento;
  }

  finalizarPedido(): void {
    if (this.logistica.PercentualEntrada > 0) {
      if (this.getTotalParcelas() < (this.atualizaValorTotalOrcamento() * this.logistica.PercentualEntrada / 100) ) {
        Swal.fire({
          // tslint:disable-next-line:max-line-length
          title: `O valor pago (${this.getTotalParcelas()}) é menor que o valor de entrada (${(this.atualizaValorTotalOrcamento() * this.logistica.PercentualEntrada / 100)})!`,
          text: `Desejas realmente finalizar o pedido?`,
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sim',
          cancelButtonText: 'Não'
      }).then((result) => {
          if (result.value) {
            this.finalizarPedidoEnd();
          }
      });
      } else {
        this.finalizarPedidoEnd();
      }
    } else {
      this.finalizarPedidoEnd();
    }
  }

  finalizarPedidoEnd(): void {
    const orcamento: Orcamento = this.populaOrcamento();
    console.log(orcamento);
    this.orcamentoService.addOrcamentos(orcamento)
    .subscribe( message => {
      if (message.Type === 'success') {
        Swal.fire(message.Title, message.Message, 'success');
      } else if (message.Type === 'warning') {
        Swal.fire(message.Title, message.Message, 'warning');
      } else if (message.Type === 'error') {
        Swal.fire(message.Title, message.Message, 'error');
      }
       if (message.Type === 'success') {
        this.ngOnInit();
        this.formaPagamentoModal.hide();
       }
    });
  }

  setTipoEntrega(i: number): void {
    this.logistica.TipoEntregaId = i;
  }

  setTipoPedido(nome: string): void {
    this.logistica.TipoPedido = nome;
  }

  CodProduto_KeyUp(event: any): void {
    if ( event.keyCode === 13 ) {
      if ( this.codigoProduto.trim() === '' ) {
        this.produtoSelectModal.show();
      } else if ( event.target.value.substring(0, 1) === 'A' ) {
        this.produtoService.get(event.target.value.substring(1), Tipo.ACERVO)
          .subscribe(acervo => {
            this.SelecionarProduto(acervo);
          });
      } else if ( event.target.value.substring(0, 1) === 'P' ) {
        this.produtoService.get(event.target.value.substring(1), Tipo.PRODUTO)
          .subscribe(produto => {
            this.SelecionarProduto(produto);
          });
      } else if ( event.target.value.substring(0, 1) === 'S' ) {
        this.produtoService.get(event.target.value.substring(1), Tipo.SERVICO)
          .subscribe(servico => {
            this.SelecionarProduto(servico);
          });
      }
    }
  }

  SelectedProduto(produtoId: number): void {
    this.produtoService.get(produtoId.toString(), Tipo.TODOS)
          .subscribe(produto => {
            this.SelecionarProduto(produto);
          });
  }

  SelecionarProduto(produto: Produto): void {
    this.produtoSelectModal.hide();
    if (produto !== null) {
      this.codigoProduto = produto.Id.toString();
      this.produtoSearch.quantidade = 1;
      this.produtoSearch.produto = produto;
      this.inputQtdeProduto.nativeElement.focus();
    } else {
      Swal.fire('Produto', 'Produto não cadastrado!', 'warning');
    }
  }

  QtdProduto_KeyUp(event: any): void {
    if ( event.keyCode === 13 ) {
      const filter = this.produtos.filter( x => x.produto.Id == this.produtoSearch.produto.Id);
      if (filter.length > 0) {
        filter[0].quantidade = parseInt(filter[0].quantidade.toString(), 0) + parseInt(this.produtoSearch.quantidade.toString(), 0);
      } else {
        this.produtos.push(this.produtoSearch);
      }
      this.resetAddProduto();
      this.inputCodigoProduto.nativeElement.focus();
    }
  }

  CodCliente_KeyUp(event: any): void {
    if ( event.keyCode === 13 ) {
      if ( this.codigoCliente.trim() === '' ) {
        this.clienteSelectModal.show();
      } else {
        this.clienteService.getCliente(event.target.value)
          .subscribe(cliente => {
            if (cliente !== null) {
              this.clienteSearch = cliente;
              this.logistica.Entrega = cliente.Pessoa.Enderecos[0];
            } else {
              Swal.fire('Cliente', 'Cliente não cadastrado!', 'warning');
            }
          });
      }
    }
  }

  getActiveProduto(): any {
    return this.produtoSearch && this.produtoSearch.produto && this.produtoSearch.produto.Nome ?
      [{id: this.produtoSearch.produto.Id, text: this.produtoSearch.produto.Nome}] : [];
  }

  getActiveCliente(): any {
    return this.clienteSearch && this.clienteSearch.Pessoa && this.clienteSearch.Pessoa.Nome ?
      [{id: this.clienteSearch.Id, text: this.clienteSearch.Pessoa.Nome}] : [];
  }

  AtualizaDesconto(tipo: string): any {
    if (tipo === 'percentual') {
      this.desconto = this.atualizaValorTotal() * (this.descontoPercentual / 100);
    } else {
      this.descontoPercentual = this.desconto * 100 / this.atualizaValorTotal();
    }
  }

  selectParcelaPadrao(): void {
    this.venda.Plano = this.getParcelas(this.venda.NaturezaId)[0].Parcela;
  }

  getTotalParcelas(): number {
    return this.logistica.Venda.reduce((total, p) => (p.ValorParcela * p.Plano) + total, 0);
  }

  // Output's do component add Cliente
  eventAddCliente(cliente: Cliente) {
    // this.getClientes();
  }
}
