/* Modules */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ComponentsModule } from '../../components/components.module';

/* Components */
import { ImportarExportarComponent } from './importar-exportar/importar-exportar.component';
import { ImportarExportarClientesComponent } from './importar-exportar/clientes/importar-exportar-clientes.component';


const routes: Routes = [
    { path: '', component: ImportarExportarComponent },
    { path: 'importar-exportar', component: ImportarExportarComponent },
    { path: 'importar-exportar/clientes', component: ImportarExportarClientesComponent },
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        ComponentsModule
    ],
    declarations: [ImportarExportarComponent,
        ImportarExportarClientesComponent ],
    exports: [
        RouterModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConfiguracoesModule { }
