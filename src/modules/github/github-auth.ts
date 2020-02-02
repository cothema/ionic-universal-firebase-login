import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Platform } from "@ionic/angular";
import { auth } from "firebase/app";
import { UniFirebaseLoginConfig } from "../../config/uni-firebase-login-config";
import { AbstractAuth } from "../../providers/abstract-auth";
import { IAuthProvider } from "../../providers/i-auth-provider";
import { IGithubAuthOptions } from "./i-github-auth-options";

@Injectable({
    providedIn: "root",
})
export class GithubAuth extends AbstractAuth implements IAuthProvider {
    public readonly providerKey = "github";
    public readonly defaultOptions: IGithubAuthOptions = {
        signInType: "popup",
    };

    public constructor(
        angularFireAuth: AngularFireAuth,
        platform: Platform,
        config: UniFirebaseLoginConfig,
    ) {
        super(angularFireAuth, platform, config);
    }

    public async handleNativeLogin(
        options: any,
    ): Promise<auth.UserCredential | null> {
        throw new Error("Method not implemented!");
    }

    protected getBrowserLoginProvider() {
        return new auth.GithubAuthProvider();
    }
}
