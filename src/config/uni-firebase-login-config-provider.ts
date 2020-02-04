import { Injectable } from "@angular/core";
import { UniFirebaseLoginConfig } from "./uni-firebase-login-config";
import { UniFirebaseLoginConfigDefaults } from "./uni-firebase-login-config-defaults";

@Injectable({
    providedIn: "root",
})
export class UniFirebaseLoginConfigProvider {
    public config: UniFirebaseLoginConfig;

    public constructor(config: UniFirebaseLoginConfig) {
        this.config = Object.assign(
            new UniFirebaseLoginConfigDefaults(),
            config,
        );
    }
}
