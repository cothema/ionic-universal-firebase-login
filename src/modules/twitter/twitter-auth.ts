import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Platform } from "@ionic/angular";
import { auth } from "firebase/app";
import { UniFirebaseLoginConfigProvider } from "../../config/uni-firebase-login-config-provider";
import { AbstractAuth } from "../../providers/abstract-auth";
import { IAuthProvider } from "../../providers/i-auth-provider";

@Injectable()
export class TwitterAuth extends AbstractAuth implements IAuthProvider {
    public readonly providerKey = "twitter";
    public readonly defaultOptions = {};

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
        throw new Error("Method not implemented!");
    }

    protected getBrowserSignInProvider() {
        return new auth.TwitterAuthProvider();
    }
}
