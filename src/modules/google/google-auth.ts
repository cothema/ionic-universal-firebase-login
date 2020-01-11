import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { Platform } from "@ionic/angular";
import { auth } from "firebase/app";
import { AbstractAuth } from "../../providers/abstract-auth";
import { IAuthProvider } from "../../providers/i-auth-provider";

@Injectable({
    providedIn: "root",
})
export class GoogleAuth extends AbstractAuth implements IAuthProvider {
    public readonly providerOptions = {
        offline: true,
        scopes: "profile email",
        webClientId: "",
    };

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
        const mergedOptions = Object.assign({}, this.providerOptions, options);

        const googleUser = await this.googleAuth.login(mergedOptions);

        return await this.angularFireAuth.auth.signInWithCredential(
            auth.GoogleAuthProvider.credential(googleUser.idToken),
        );
    }

    public async handleBrowserLogin(): Promise<auth.UserCredential | null> {
        const provider = new auth.GoogleAuthProvider();

        return await this.angularFireAuth.auth.signInWithPopup(provider);
    }
}
