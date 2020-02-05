import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Facebook } from "@ionic-native/facebook/ngx";
import { Platform } from "@ionic/angular";
import { auth } from "firebase/app";
import { UniFirebaseLoginConfigProvider } from "../../config/uni-firebase-login-config-provider";
import { AbstractAuth } from "../../providers/abstract-auth";
import { IAuthProvider } from "../../providers/i-auth-provider";
import { IFacebookAuthOptions } from "./i-facebook-auth-options";

@Injectable()
export class FacebookAuth extends AbstractAuth implements IAuthProvider {
    public readonly providerKey = "facebook";
    public readonly defaultOptions: IFacebookAuthOptions = {
        permissions: ["public_profile"],
        scopes: ["public_profile", "email"],
        signInType: "popup",
    };

    public constructor(
        private facebookAuth: Facebook,
        angularFireAuth: AngularFireAuth,
        platform: Platform,
        config: UniFirebaseLoginConfigProvider,
    ) {
        super(angularFireAuth, platform, config);
    }

    public async signInNative(
        options: any,
    ): Promise<auth.UserCredential | null> {
        const mergedOptions = Object.assign({}, this.defaultOptions, options);

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
        const scopes = this.defaultOptions.scopes.join(",");
        return this.facebookAuth.api(
            `/${facebookUserId}/?fields=${scopes}`,
            this.defaultOptions.permissions,
        );
    }

    protected getBrowserSignInProvider() {
        return new auth.FacebookAuthProvider();
    }
}
