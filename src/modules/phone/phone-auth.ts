import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Platform } from "@ionic/angular";
import { auth } from "firebase/app";
import { AbstractAuth } from "../../providers/abstract-auth";
import { IAuthProvider } from "../../providers/i-auth-provider";

@Injectable({
    providedIn: "root",
})
export class PhoneAuth extends AbstractAuth implements IAuthProvider {
    public readonly providerOptions = {};

    public constructor(
        private angularFireAuth: AngularFireAuth,
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
        const provider = new auth.PhoneAuthProvider();

        return await this.angularFireAuth.auth.signInWithPopup(provider);
    }
}
