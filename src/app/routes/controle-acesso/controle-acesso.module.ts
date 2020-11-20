/* Modules */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ComponentsModule } from '../../components/components.module';

/* Components */
import { ControleAcessoComponent } from './controle-acesso/controle-acesso.component';


const routes: Routes = [
    { path: '', component: ControleAcessoComponent },
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        ComponentsModule
    ],
    declarations: [ControleAcessoComponent],
    exports: [
        RouterModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ControleAcessoModule { }
