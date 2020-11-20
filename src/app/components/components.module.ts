import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TextMaskModule } from 'angular2-text-mask';
import { SelectModule } from 'ng2-select';
import { NgxMaskModule } from 'ngx-mask';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

// Pipes
import { CodigoPipe } from '../pipes/codigo.pipe';

// Directives
import { InputMoneyDirective } from '../directives/input-money.directive';
import { InputPercentageDirective } from '../directives/input-percentage.directive';

// Categoria
import { ListCategoriaComponent } from './categoria/list-categoria/list-categoria.component';
import { AddCategoriaComponent } from './categoria/add-categoria/add-categoria.component';
import { EditCategoriaComponent } from './categoria/edit-categoria/edit-categoria.component';
import { SelectCategoriaComponent } from './categoria/select-categoria/select-categoria.component';


// Cliente
import { ListClientesComponent } from './cliente/list-clientes/list-clientes.component';
import { ListItemClientesComponent } from './cliente/list-item-clientes/list-item-clientes.component';
import { AddClienteComponent } from './cliente/add-cliente/add-cliente.component';
import { MenuClienteComponent } from './cliente/menu-cliente/menu-cliente.component';
import { EditClienteComponent } from './cliente/edit-cliente/edit-cliente.component';
import { SelectClienteComponent } from './cliente/select-cliente/select-cliente.component';
import { AddSimpleClienteComponent } from './cliente/add-simple-cliente/add-simple-cliente.component';

// Fornecedor
import { ListFornecedorComponent } from './fornecedor/list-fornecedor/list-fornecedor.component';
import { AddFornecedorComponent } from './fornecedor/add-fornecedor/add-fornecedor.component';
import { EditFornecedorComponent } from './fornecedor/edit-fornecedor/edit-fornecedor.component';
import { AddSimpleFornecedorComponent } from './fornecedor/add-simple-fornecedor/add-simple-fornecedor.component';
import { SelectFornecedorComponent } from './fornecedor/select-fornecedor/select-fornecedor.component';

// Funcionario
import { ListFuncionariosComponent } from './funcionario/list-funcionario/list-funcionarios.component';
import { AddFuncionarioComponent } from './funcionario/add-funcionario/add-funcionario.component';
import { EditFuncionarioComponent } from './funcionario/edit-funcionario/edit-funcionario.component';
import { ListItemFuncionariosComponent } from './funcionario/list-item-funcionario/list-item-funcionarios.component';

// Imagem
import { ImagemComponent } from './imagem/imagem.component';

// Orçamento
import { ListOrcamentoComponent } from './orcamento/list-orcamento/list-orcamento.component';
import { AddOrcamentoComponent } from './orcamento/add-orcamento/add-orcamento.component';

// Pedido
import { AddPedidoComponent } from './pedido/add-pedido/add-pedido.component';

// Compra
import { AddCompraComponent } from './compra/add-compra/add-compra.component';
import { ListCompraComponent } from './compra/list-compra/list-compra.component';
import { EditCompraComponent } from './compra/edit-compra/edit-compra.component';

// Produto
import { AddProdutoComponent } from './produto/add-produto/add-produto.component';
import { ListItemProdutosComponent } from './produto/list-item-produtos/list-item-produtos.component';
import { ListProdutosComponent } from './produto/list-produtos/list-produtos.component';
import { EditProdutoComponent } from './produto/edit-produto/edit-produto.component';
import { SelectProdutoComponent } from './produto/select-produto/select-produto.component';

// Venda
import { ModalPagamentoComponent } from './venda/modal-pagamento/modal-pagamento.component';

// Pdf
import { PdfOrcamentoComponent } from './pdf/pdf-orcamento.component';

// Inserindo Globalmente Valor monetário Brasileiro
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';

registerLocaleData(ptBr);


@NgModule({
  imports: [
    SharedModule,
    TextMaskModule,
    SelectModule,
    NgxMaskModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  declarations: [
    ModalPagamentoComponent,
    ListCompraComponent,
    AddCompraComponent,
    AddOrcamentoComponent,
    MenuClienteComponent,
    AddClienteComponent,
    AddCategoriaComponent,
    ListCategoriaComponent,
    ListClientesComponent,
    ListItemClientesComponent,
    AddFornecedorComponent,
    AddSimpleFornecedorComponent,
    SelectFornecedorComponent,
    ListFornecedorComponent,
    ImagemComponent,
    ListOrcamentoComponent,
    AddProdutoComponent,
    ListItemProdutosComponent,
    ListProdutosComponent,
    EditProdutoComponent,
    EditClienteComponent,
    EditFornecedorComponent,
    EditCategoriaComponent,
    InputMoneyDirective,
    InputPercentageDirective,
    AddFuncionarioComponent,
    EditFuncionarioComponent,
    ListFuncionariosComponent,
    ListItemFuncionariosComponent,
    EditCompraComponent,
    PdfOrcamentoComponent,
    CodigoPipe,
    SelectCategoriaComponent,
    SelectProdutoComponent,
    SelectClienteComponent,
    AddSimpleClienteComponent,
    AddPedidoComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ModalPagamentoComponent,
    ListCompraComponent,
    AddCompraComponent,
    AddOrcamentoComponent,
    MenuClienteComponent,
    AddClienteComponent,
    AddCategoriaComponent,
    ListCategoriaComponent,
    ListClientesComponent,
    ListItemClientesComponent,
    AddFornecedorComponent,
    AddSimpleFornecedorComponent,
    SelectFornecedorComponent,
    ListFornecedorComponent,
    ImagemComponent,
    ListOrcamentoComponent,
    AddProdutoComponent,
    ListItemProdutosComponent,
    ListProdutosComponent,
    EditProdutoComponent,
    EditClienteComponent,
    EditFornecedorComponent,
    EditCategoriaComponent,
    AddFuncionarioComponent,
    EditFuncionarioComponent,
    ListFuncionariosComponent,
    ListItemFuncionariosComponent,
    EditCompraComponent,
    PdfOrcamentoComponent,
    SelectCategoriaComponent,
    SelectProdutoComponent,
    SelectClienteComponent,
    AddSimpleClienteComponent,
    AddPedidoComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-PT' }]
})
export class ComponentsModule { }
