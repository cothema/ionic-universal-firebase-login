import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LoginPage } from './login.page';

@NgModule({
    imports: [
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: LoginPage,
            },
        ]),
    ],
    declarations: [LoginPage],
})
export class LoginModule {
}
