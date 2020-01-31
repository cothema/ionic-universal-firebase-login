import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Facebook } from "@ionic-native/facebook/ngx";
import { Platform } from "@ionic/angular";
import { auth } from "firebase/app";
import { AbstractAuth } from "../../providers/abstract-auth";
import { IAuthProvider } from "../../providers/i-auth-provider";
import { IFacebookAuthOptions } from "./i-facebook-auth-options";

@Injectable({
    providedIn: "root",
})
export class FacebookAuth extends AbstractAuth implements IAuthProvider {
    public readonly providerOptions: IFacebookAuthOptions = {
        permissions: ["public_profile"],
        scopes: ["public_profile", "user_friends", "email"],
        signInType: "popup",
    };

    public constructor(
        private facebookAuth: Facebook,
        angularFireAuth: AngularFireAuth,
        platform: Platform,
    ) {
        super(angularFireAuth, platform);
    }

    public async handleNativeLogin(
        options: any,
    ): Promise<auth.UserCredential | null> {
        const mergedOptions = Object.assign({}, this.providerOptions, options);

        const facebookResult = await this.facebookAuth.login(
            mergedOptions.scopes,
        );

        if (facebookResult.status === "connected") {
            return await this.angularFireAuth.auth.signInWithCredential(
                auth.FacebookAuthProvider.credential(
                    facebookResult.authResponse.accessToken,
                ),
            );
        } else {
            return null;
        }
    }

    /**
     * Fetch user from Facebook API
     *
     * @param facebookUserId
     */
    public fetchUser(facebookUserId: string): Promise<any> {
        const scopes = this.providerOptions.scopes.join(",");
        return this.facebookAuth.api(
            `/${facebookUserId}/?fields=${scopes}`,
            this.providerOptions.permissions,
        );
    }

    protected getBrowserLoginProvider() {
        return new auth.FacebookAuthProvider();
    }
}
