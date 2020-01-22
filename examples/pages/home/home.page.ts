import { Component } from '@angular/core';
import { BaseAuthService } from '../../../src/services/base-auth-service';

@Component({
    selector: 'app-home-page',
    templateUrl: './home.page.html',
    styleUrls: [],
})
export class HomePage {

    public constructor(
        public auth: BaseAuthService,
    ) {
    }

}
