import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Platform } from "@ionic/angular";
import { auth } from "firebase/app";
import { AbstractAuth } from "../../providers/abstract-auth";
import { IAuthProvider } from "../../providers/i-auth-provider";

@Injectable({
    providedIn: "root",
})
export class TwitterAuth extends AbstractAuth implements IAuthProvider {
    public readonly providerOptions = {};

    public constructor(angularFireAuth: AngularFireAuth, platform: Platform) {
        super(angularFireAuth, platform);
    }

    public async handleNativeLogin(
        options: any,
    ): Promise<auth.UserCredential | null> {
        throw new Error("Method not implemented!");
    }

    protected getBrowserLoginProvider() {
        return new auth.TwitterAuthProvider();
    }
}
