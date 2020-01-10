import { AngularFireAuth } from "@angular/fire/auth";
import { Facebook } from "@ionic-native/facebook/ngx";
import { Platform } from "@ionic/angular";
import { auth } from "firebase/app";
import { AbstractAuthentication } from "./abstract-authentication";
import { IAuthProvider } from "./i-auth-provider.interface";

export class FacebookAuthentication extends AbstractAuthentication
    implements IAuthProvider {
    public readonly providerOptions = {
        permissions: ["public_profile"],
        scopes: ["public_profile", "user_friends", "email"],
    };

    public constructor(
        private angularFireAuth: AngularFireAuth,
        private facebookAuth: Facebook,
        platform: Platform,
    ) {
        super(platform);
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

    public async handleBrowserLogin(): Promise<auth.UserCredential | null> {
        const provider = new auth.FacebookAuthProvider();

        return await this.angularFireAuth.auth.signInWithPopup(provider);
    }

    public fetchUser(facebookUserId: string): Promise<any> {
        const scopes = this.providerOptions.scopes.join(",");
        return this.facebookAuth.api(
            `/${facebookUserId}/?fields=${scopes}`,
            this.providerOptions.permissions,
        );
    }
}
