import { auth } from "firebase";

export interface IAuthProvider {
    handleBrowserLogin(): Promise<auth.UserCredential | null>;

    handleNativeLogin(options?: any): Promise<auth.UserCredential | null>;

    /**
     * Automatically recognize platform
     */
    handleLogin(options?: any): Promise<auth.UserCredential | null>;

    handleSignOut(): Promise<void>;
}
