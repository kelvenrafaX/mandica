import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { TextMaskModule } from 'angular2-text-mask';
import { ComponentsModule } from '../../components/components.module';
import { ClienteComponent } from './cliente.component';

const routes: Routes = [
    { path: '', component: ClienteComponent }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        TextMaskModule,
        ComponentsModule
    ],
    declarations: [
        ClienteComponent
    ],
    exports: [
        RouterModule
    ]
})
export class ClienteModule { }
