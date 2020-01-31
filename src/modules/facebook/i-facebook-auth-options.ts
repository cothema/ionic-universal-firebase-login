import { IAuthOptions } from "../_shared/i-auth-options";

export interface IFacebookAuthOptions extends IAuthOptions {
    permissions: string[];
    scopes: string[];
    signInType: "popup" | "redirect";
}
