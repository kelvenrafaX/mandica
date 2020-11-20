import { LayoutComponent } from '../layout/layout.component';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecoverComponent } from './pages/recover/recover.component';
import { LockComponent } from './pages/lock/lock.component';
import { MaintenanceComponent } from './pages/maintenance/maintenance.component';
import { Error404Component } from './pages/error404/error404.component';
import { Error500Component } from './pages/error500/error500.component';
import { AuthGuardService } from '../guards/auth-guard.service';

export const routes = [

    {
      path: '',
      redirectTo: '',
      pathMatch: 'full',
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', loadChildren: () => import('./home/home.module')
                .then(m => m.HomeModule), canActivate: [AuthGuardService] },
            { path: 'cadastros', loadChildren: () => import('./cadastros/cadastros.module')
                .then(m => m.CadastrosModule) , canActivate: [AuthGuardService]},
            { path: 'cliente', loadChildren: () => import('./cliente/cliente.module')
                .then(m => m.ClienteModule), canActivate: [AuthGuardService] },
            { path: 'pedidos', loadChildren: () => import('./pedidos/pedidos.module')
                .then(m => m.PedidosModule), canActivate: [AuthGuardService] },
            { path: 'produto-servico', loadChildren: () => import('./produto-servico/produto-servico.module')
                .then(m => m.ProdutoServicoModule), canActivate: [AuthGuardService] },
            { path: 'controle-acesso', loadChildren: () => import('./controle-acesso/controle-acesso.module')
                .then(m => m.ControleAcessoModule), canActivate: [AuthGuardService] },
            { path: 'configuracoes', loadChildren: () => import('./configuracoes/configuracoes.module')
                .then(m => m.ConfiguracoesModule), canActivate: [AuthGuardService] }
        ]
    },

    // Not lazy-loaded routes
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'recover', component: RecoverComponent },
    { path: 'lock', component: LockComponent },
    { path: 'maintenance', component: MaintenanceComponent },
    { path: '404', component: Error404Component },
    { path: '500', component: Error500Component },

    // Not found
    { path: '**', redirectTo: '404' }

];
