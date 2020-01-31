import { IAuthOptions } from "../_shared/i-auth-options";

export interface IGoogleAuthOptions extends IAuthOptions {
    offline?: boolean;
    scopes?: string;
    webClientId?: string;
}
