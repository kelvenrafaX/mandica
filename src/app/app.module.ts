/* Modules */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { RoutesModule } from './routes/routes.module';
import { ComponentsModule } from './components/components.module';

import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';

/* Components */
import { AppComponent } from './app.component';

/* Services */
import { UtilService } from './core/services/util.service';

/* Directives */
import { InputMoneyDirective } from './directives/input-money.directive';

import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr);

import { LoginService } from './providers/login.service';
import { AuthGuardService } from './guards/auth-guard.service';

// https://github.com/ocombe/ng2-translate/issues/218
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        HttpClientModule,
        BrowserAnimationsModule, // required for ng2-tag-input
        CoreModule,
        LayoutModule,
        SharedModule.forRoot(),
        RoutesModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        ComponentsModule
    ],
    providers: [
      UtilService,
      Location, {provide: LocationStrategy, useClass: HashLocationStrategy},
      LoginService, AuthGuardService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
