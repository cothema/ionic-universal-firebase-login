import { AngularFireAuth } from "@angular/fire/auth";
import { Platform } from "@ionic/angular";
import { auth } from "firebase";
import { IAuthProvider } from "./i-auth-provider";

export abstract class AbstractAuth implements IAuthProvider {
    public readonly providerOptions: any;

    protected constructor(
        protected angularFireAuth: AngularFireAuth,
        protected platform: Platform,
    ) {}

    public abstract handleNativeLogin(
        options: any,
    ): Promise<auth.UserCredential | null>;

    public handleLogin(options: any = {}): Promise<auth.UserCredential | null> {
        if (this.platform.is("cordova")) {
            return this.handleNativeLogin(options);
        } else {
            return this.handleBrowserLogin();
        }
    }

    public async handleNativeLogout(): Promise<void> {
        if (this.angularFireAuth.auth.currentUser === null) {
            console.warn("Unknown currentUser!");
        }
    }

    public async handleBrowserLogout(): Promise<void> {
        return this.angularFireAuth.auth.signOut();
    }

    public async handleSignOut(): Promise<void> {
        if (this.platform.is("cordova")) {
            return this.handleNativeLogout();
        } else {
            return this.handleBrowserLogout();
        }
    }

    public async handleBrowserLogin(): Promise<auth.UserCredential | null> {
        const provider = this.getBrowserLoginProvider();
        const authX = this.angularFireAuth.auth;

        switch (this.providerOptions.signInType) {
            case "popup":
                return await authX.signInWithPopup(provider);
            case "redirect":
                await authX.signInWithRedirect(provider);
                // TODO: implement redirect resolution: https://stackoverflow.com/questions/40219478/firebaseauth-googleauthprovider-signinwithredirect
                throw new Error("Not implemented!");
        }

        throw new Error("Invalid signInType!");
    }

    protected abstract getBrowserLoginProvider(): any | null;
}
