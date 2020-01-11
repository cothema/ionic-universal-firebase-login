import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { Platform } from "@ionic/angular";
import { auth } from "firebase/app";
import { AbstractAuthentication } from "./abstract-authentication";
import { IAuthProvider } from "./i-auth-provider";

@Injectable()
export class TwitterAuthentication extends AbstractAuthentication
    implements IAuthProvider {
    public readonly providerOptions = {};

    public constructor(
        private angularFireAuth: AngularFireAuth,
        private googleAuth: GooglePlus,
        platform: Platform,
    ) {
        super(platform);
    }

    public async handleNativeLogin(
        options: any,
    ): Promise<auth.UserCredential | null> {
        console.error("Method not implemented!");
        return null;
    }

    public async handleBrowserLogin(): Promise<auth.UserCredential | null> {
        const provider = new auth.TwitterAuthProvider();

        return await this.angularFireAuth.auth.signInWithPopup(provider);
    }
}
