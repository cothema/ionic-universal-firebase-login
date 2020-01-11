import { Platform } from "@ionic/angular";
import { auth } from "firebase";
import { IAuthProvider } from "./i-auth-provider";

export abstract class AbstractAuth implements IAuthProvider {
    public readonly providerOptions: any;

    protected constructor(private platform: Platform) {}

    public abstract handleBrowserLogin(): Promise<auth.UserCredential | null>;

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
}
