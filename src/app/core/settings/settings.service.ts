import { Injectable } from '@angular/core';
declare var $: any;

@Injectable()
export class SettingsService {

    public user: any;
    public app: any;
    public layout: any;
    public api: any;
    public urlImagens: any;

    constructor() {

        // User Settings
        // -----------------------------------
        this.user = {
            name: 'John',
            job: 'ng-developer',
            picture: 'assets/img/user/02.jpg'
        };

        // App Settings
        // -----------------------------------
        this.app = {
            name: 'Mandica',
            description: '',
            year: ((new Date()).getFullYear())
        };

        // Layout Settings
        // -----------------------------------
        this.layout = {
            isFixed: true,
            isCollapsed: true,
            isBoxed: false,
            isRTL: false,
            horizontal: false,
            isFloat: false,
            asideHover: false,
            theme: null,
            asideScrollbar: false,
            isCollapsedText: false,
            useFullLayout: false,
            hiddenFooter: false,
            offsidebarOpen: false,
            asideToggled: false,
            viewAnimation: 'ng-fadeInUp'
        };

        // Api Settings
        // -----------------------------------
        this.api = {
            url: 'http://localhost:60621/api'
            // url: 'http://api-mandica.inewaction.com.br/api'
        };
        this.urlImagens = {
            url: 'http://api-mandica.inewaction.com.br/Imagens/Produtos'
            // url: 'http://localhost:60621/Imagens/Produtos'
        };
    }

    getAppSetting(name) {
        return name ? this.app[name] : this.app;
    }
    getUserSetting(name) {
        return name ? this.user[name] : this.user;
    }
    getLayoutSetting(name) {
        return name ? this.layout[name] : this.layout;
    }
    getApiSetting(name) {
        return name ? this.api[name] : this.api;
    }

    getUrlImagens(name) {
        return name ? this.urlImagens[name] : this.api;
    }

    setAppSetting(name, value) {
        if (typeof this.app[name] !== 'undefined') {
            this.app[name] = value;
        }
    }
    setUserSetting(name, value) {
        if (typeof this.user[name] !== 'undefined') {
            this.user[name] = value;
        }
    }
    setLayoutSetting(name, value) {
        if (typeof this.layout[name] !== 'undefined') {
            return this.layout[name] = value;
        }
    }
    setApiSetting(name, value) {
        if (typeof this.api[name] !== 'undefined') {
            return this.api[name] = value;
        }
    }

    toggleLayoutSetting(name) {
        return this.setLayoutSetting(name, !this.getLayoutSetting(name));
    }

    getApi() {
        return this.api;
    }

}
