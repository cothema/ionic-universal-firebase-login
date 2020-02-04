import { Injectable } from '@angular/core';
import { UniFirebaseLoginConfigDefaults } from './uni-firebase-login-config-defaults';
import { UniFirebaseLoginConfig } from './uni-firebase-login-config';

@Injectable({
    providedIn: 'root',
})
export class UniFirebaseLoginConfigProvider {
    public config: UniFirebaseLoginConfig;

    constructor(
        config: UniFirebaseLoginConfig
    ) {
        this.config = Object.assign(
            new UniFirebaseLoginConfigDefaults(),
            config,
        );
    }
}
