import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BaseAuthService } from '../../../src/services/base-auth-service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login.page.html',
    styleUrls: [],
})
export class LoginPage {

    public constructor(
        public afAuth: AngularFireAuth,
        public auth: BaseAuthService,
    ) {
    }

}
