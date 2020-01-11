import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthGuard } from '../src/guards/auth-guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        loadChildren: () =>
            import('./pages/home/home.module').then(m => m.HomeModule),
        canActivate: [AuthGuard],
    },
    {
        path: 'login',
        loadChildren: './pages/login/login.module#LoginModule',
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}),
        TranslateModule.forChild(),
    ],
    exports: [RouterModule],
})
export class RoutingModule {
}
