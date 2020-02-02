import { IAnonymousAuthOptions } from "../modules/anonymous/i-anonymous-auth-options";
import { IEmailAuthOptions } from "../modules/email/i-email-auth-options";
import { IFacebookAuthOptions } from "../modules/facebook/i-facebook-auth-options";
import { IGithubAuthOptions } from "../modules/github/i-github-auth-options";
import { IGoogleAuthOptions } from "../modules/google/i-google-auth-options";
import { IPhoneAuthOptions } from "../modules/phone/i-phone-auth-options";
import { ITwitterAuthOptions } from "../modules/twitter/i-twitter-auth-options";

export interface IAuthProviderOptions {
    anonymous?: Partial<IAnonymousAuthOptions>;
    email?: Partial<IEmailAuthOptions>;
    facebook?: Partial<IFacebookAuthOptions>;
    google?: Partial<IGoogleAuthOptions>;
    phone?: Partial<IPhoneAuthOptions>;
    twitter?: Partial<ITwitterAuthOptions>;
    github?: Partial<IGithubAuthOptions>;
}
