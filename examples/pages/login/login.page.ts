import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../../../src/services/auth.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login.page.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginPage {

    public constructor(
        public afAuth: AngularFireAuth,
        private router: Router,
        private auth: AuthService,
    ) {
    }

}
