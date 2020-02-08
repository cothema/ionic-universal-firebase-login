import { auth } from "firebase";

export interface IAuthProvider {
  signInBrowser(): Promise<auth.UserCredential | null>;

  signInNative(options?: any): Promise<auth.UserCredential | null>;

  /**
   * Automatically recognize platform
   */
  signIn(options?: any): Promise<auth.UserCredential | null>;

  signOut(): Promise<void>;
}
