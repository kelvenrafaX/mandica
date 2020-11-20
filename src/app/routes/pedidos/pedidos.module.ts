import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { ConsultarPedidosComponent } from './consultar-pedidos/consultar-pedidos.component';
import { ComponentsModule } from '../../components/components.module';
import { ConsultarPedidosDetalhesComponent } from './consultar-pedidos-detalhes/consultar-pedidos-detalhes.component';

const routes: Routes = [
    { path: '', redirectTo: 'consultar' },
    { path: 'consultar', component: ConsultarPedidosComponent },
    { path: 'consultar-detalhe/:id', component: ConsultarPedidosDetalhesComponent }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        ComponentsModule,
        PdfViewerModule
    ],
    declarations: [
        ConsultarPedidosComponent,
        ConsultarPedidosDetalhesComponent
    ],
    exports: [
        RouterModule
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class PedidosModule { }
