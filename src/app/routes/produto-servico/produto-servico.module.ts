import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ListarProdutosComponent } from './listar-produtos/lista-produto.component';
import { ComponentsModule } from '../../components/components.module';


const routes: Routes = [
    { path: '', redirectTo: 'consultar' },
    { path: 'consultar', component: ListarProdutosComponent }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        ComponentsModule
    ],
    declarations: [
        ListarProdutosComponent
    ],
    exports: [
        RouterModule
    ]
})
export class ProdutoServicoModule { }
