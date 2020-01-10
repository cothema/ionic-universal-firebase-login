import { IFacebookAuthOptions } from "../providers/i-facebook-auth-options";
import { IGithubAuthOptions } from "../providers/i-github-auth-options";
import { IGoogleAuthOptions } from "../providers/i-google-auth-options";
import { ITwitterAuthOptions } from "../providers/i-twitter-auth-options";

export interface IAuthOptions {
    facebook?: IFacebookAuthOptions;
    google?: IGoogleAuthOptions;
    twitter?: ITwitterAuthOptions;
    github?: IGithubAuthOptions;
}
