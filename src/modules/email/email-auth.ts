import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Platform } from "@ionic/angular";
import { auth } from "firebase/app";
import { UniFirebaseLoginConfigProvider } from "../../config/uni-firebase-login-config-provider";
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
        config: UniFirebaseLoginConfigProvider,
    ) {
        super(angularFireAuth, platform, config);
    }

    public async signInNative(
        options: any,
    ): Promise<auth.UserCredential | null> {
        return this.signInBrowser();
    }

    protected getBrowserSignInProvider() {
        return new auth.EmailAuthProvider();
    }
}
