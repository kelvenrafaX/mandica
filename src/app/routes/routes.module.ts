import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatorService } from '../core/translator/translator.service';
import { MenuService } from '../core/menu/menu.service';
import { SharedModule } from '../shared/shared.module';
import { PagesModule } from './pages/pages.module';

import { menu } from './menu';
import { routes } from './routes';
import { AuthGuardService } from '../guards/auth-guard.service';
import { LoginService } from '../providers/login.service';

// Inserindo Globalmente Valor monetário Brasileiro
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr);

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forRoot(routes),
        PagesModule
        // HttpClientModule
    ],
    declarations: [],
    exports: [
        RouterModule
    ],
    providers: [
        LoginService, AuthGuardService, { provide: LOCALE_ID, useValue: 'pt-PT' }
    ]
})

export class RoutesModule {
    constructor(public menuService: MenuService, tr: TranslatorService) {
        menuService.addMenu(menu);
    }
}
