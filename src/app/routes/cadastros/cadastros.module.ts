import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { TextMaskModule } from 'angular2-text-mask';

import { CadastroClienteComponent } from './cliente/cliente.component';
import { CadastroOrcamentoComponent } from './orcamento/orcamento.component';
import { CadastroPedidoComponent } from './pedido/pedido.component';
import { CadastroCategoriaComponent } from './categoria/categoria.component';
import { CadastroProdutoComponent } from './produto/produto.component';
import { CadastroAcervoComponent } from './acervo/acervo.component';
import { CadastroServicoComponent } from './servico/servico.component';
import { ComponentsModule } from '../../components/components.module';
import { CadastroCompraComponent } from './compra/compra.component';
import { CadastroFornecedorComponent } from './fornecedor/fornecedor.component';
import { CadastroFuncionarioComponent } from './funcionario/funcionario.component';
import { CadastroFormadePagamentoComponent } from './formade-pagamento/formade-pagamento.component';
import { CargoComponent } from './cargo/cargo.component';
import { CadastroFretesComponent } from './fretes/fretes.component';


const routes: Routes = [
    { path: '', redirectTo: 'cliente' },
    { path: 'cliente', component: CadastroClienteComponent },
    { path: 'funcionario', component: CadastroFuncionarioComponent },
    { path: 'fornecedor', component: CadastroFornecedorComponent },
    { path: 'orcamento', component: CadastroOrcamentoComponent },
    { path: 'pedido', component: CadastroPedidoComponent },
    { path: 'pedido/:id', component: CadastroPedidoComponent },
    { path: 'categoria', component: CadastroCategoriaComponent },
    { path: 'produto', component: CadastroProdutoComponent },
    { path: 'acervo', component: CadastroAcervoComponent },
    { path: 'servico', component: CadastroServicoComponent },
    { path: 'compra', component: CadastroCompraComponent },
    { path: 'forma-de-pagamento', component: CadastroFormadePagamentoComponent },
    { path: 'cargo', component: CargoComponent },
    { path: 'fretes', component: CadastroFretesComponent }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        TextMaskModule,
        ComponentsModule
    ],
    declarations: [
        CadastroClienteComponent,
        CadastroOrcamentoComponent,
        CadastroPedidoComponent,
        CadastroCategoriaComponent,
        CadastroProdutoComponent,
        CadastroServicoComponent,
        CadastroCompraComponent,
        CadastroFornecedorComponent,
        CadastroAcervoComponent,
        CadastroFuncionarioComponent,
        CadastroFormadePagamentoComponent,
        CargoComponent,
        CadastroFretesComponent
    ],
    exports: [
        RouterModule
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class CadastrosModule { }
