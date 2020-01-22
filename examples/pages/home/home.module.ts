import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';

@NgModule({
    imports: [
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: HomePage,
            },
        ]),
    ],
    declarations: [HomePage],
})
export class HomeModule {
}
