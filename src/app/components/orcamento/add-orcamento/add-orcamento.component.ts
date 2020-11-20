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
import { Entrega } from '../../../entity/entrega';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr);
import Swal from 'sweetalert2';
import { ProdutoService } from '../../../providers/produto.service';
import { Pessoa } from '../../../entity/pessoa';
import { ClienteService } from '../../../providers/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { Mask } from '../../../models/mask';

@Component({
  selector: 'app-add-orcamento',
  templateUrl: './add-orcamento.component.html',
  providers: [BandeiraService, NaturezaService, OrcamentoService, ProdutoService,
     ClienteService, { provide: LOCALE_ID, useValue: 'pt-PT' }],
  styleUrls: ['./add-orcamento.component.scss']
})
export class AddOrcamentoComponent implements OnInit {

  @ViewChild('inputQtdeProduto', {static: true}) inputQtdeProduto;
  @ViewChild('inputCodigoProduto', {static: true}) inputCodigoProduto;
  @ViewChild('inputCodigoCliente', {static: true}) inputCodigoCliente;
  @ViewChild('dataevento', {static: true}) inputDataEvento;

  @ViewChild('produtoSelectModal', {static: true}) produtoSelectModal;
  @ViewChild('clienteSelectModal', {static: true}) clienteSelectModal;

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

        // this.inputDataEvento.value = this.logistica.DataEvento.toString().substring(0, 10);

        this.logistica.HorarioEvento = new Date(this.logistica.DataEvento).toTimeString().split(' ')[0];

        this.clienteSearch = this.logistica.Cliente;
        this.codigoCliente = this.logistica.ClienteId.toString();
      });
  }

  checaFinalizacao(): void {
      this.finalizarPedido();
  }

  resetAddProduto(): void {
    this.produtoSearch = new ListItemProdutos();
    this.produtoSearch.produto = new Produto();
    this.produtoSearch.quantidade = 0;
    this.codigoProduto = '';
  }

  getUrlFlag(flag) {
    return `assets/img/flags/${flag.replace(' ', '_')}.png`;
  }

  setFormDefault() {
    this.produtos = [];
    this.logistica = new Orcamento();
    this.logistica.Entrega = new Entrega();
    this.orcamentoService.getIdLastOrder().subscribe( x => this.lastId = x );
    this.logistica.TipoEntregaId = 1;
    this.entregaEstimada = 0;
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

  validaPasso1(): boolean {
    return this.produtos.length > 0;
  }

  validaPasso2(): boolean {
    return this.validaPasso1() && this.clienteSearch != null;
  }

  validaPasso3(): boolean {
    return this.validaPasso1() && this.validaPasso2()
    && ((this.logistica.TipoEntregaId === 1 || this.logistica.TipoEntregaId === 2)
    && this.logistica.DataEvento !== undefined && this.logistica.DataEvento.toString() !== ''
    && this.logistica.Diarias !== 0 && this.logistica.Diarias !== undefined);
  }

  validaTudo(): boolean {
      return this.validaPasso1() &&
             this.validaPasso2() &&
             this.validaPasso3();
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
      return this.atualizaValorTotal() + this.entregaEstimada;
    } else {
      return this.atualizaValorTotal();
    }
  }

  populaOrcamento(): Orcamento {
    // Popula logística
    // tslint:disable-next-line:prefer-const
    let orcamento: Orcamento = Object.assign({}, this.logistica);

    orcamento.TipoPedido = 'Orçamento';

    let dateFormat;

    if (this.logistica.HorarioEvento !== undefined && this.logistica.HorarioEvento !== '') {
      dateFormat = this.logistica.DataEvento.toString().split('-');

      orcamento.DataEvento = new Date(
        new Date(dateFormat[1] + '-' + dateFormat[2] + '-' + dateFormat[0])
        .setHours(parseInt(this.logistica.HorarioEvento.split(':')[0], 0), parseInt(this.logistica.HorarioEvento.split(':')[1], 0)
      ));
    }

    // Popula Cliente
    orcamento.ClienteId = this.clienteSearch.Id;

    // Popula passo 4
    orcamento.Frete = this.entregaEstimada;

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
    const orcamento: Orcamento = this.populaOrcamento();

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
       }
    });
  }

  setTipoEntrega(i: number): void {
    this.logistica.TipoEntregaId = i;
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

  // Output's do component add Cliente
  eventAddCliente(cliente: Cliente) {
    // this.getClientes();
  }
}
