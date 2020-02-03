import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Platform } from "@ionic/angular";
import { auth } from "firebase/app";
import { UniFirebaseLoginConfig } from "../../config/uni-firebase-login-config";
import { AbstractAuth } from "../../providers/abstract-auth";
import { IAuthProvider } from "../../providers/i-auth-provider";
import { IEmailAuthOptions } from "./i-email-auth-options";

@Injectable()
export class EmailAuth extends AbstractAuth implements IAuthProvider {
    public readonly providerKey = "email";
    public readonly defaultOptions: IEmailAuthOptions = {
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
        return this.handleBrowserLogin();
    }

    protected getBrowserLoginProvider() {
        throw new auth.EmailAuthProvider();
    }
}
