import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Platform } from "@ionic/angular";
import { auth } from "firebase/app";
import { UniFirebaseLoginConfig } from "../../config/uni-firebase-login-config";
import { AbstractAuth } from "../../providers/abstract-auth";
import { IAuthProvider } from "../../providers/i-auth-provider";
import { IAnonymousAuthOptions } from "./i-anonymous-auth-options";

@Injectable()
export class AnonymousAuth extends AbstractAuth implements IAuthProvider {
    public readonly providerKey = "anonymous";
    public readonly defaultOptions: IAnonymousAuthOptions = {};

    public constructor(
        angularFireAuth: AngularFireAuth,
        platform: Platform,
        config: UniFirebaseLoginConfig,
    ) {
        super(angularFireAuth, platform, config);
    }

    public async handleNativeLogin(options: any): Promise<auth.UserCredential> {
        return this.handleBrowserLogin();
    }

    public async handleBrowserLogin(): Promise<auth.UserCredential> {
        return await auth().signInAnonymously();
    }

    protected getBrowserLoginProvider(): null {
        return null;
    }
}
