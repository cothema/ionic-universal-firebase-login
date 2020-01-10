import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../../../src/services/auth.service';

@Component({
    selector: 'app-home-page',
    templateUrl: './home.page.html',
    styleUrls: [],
})
export class HomePage {

    public constructor(
        public afAuth: AngularFireAuth,
        private router: Router,
        private auth: AuthService,
    ) {
    }

}
