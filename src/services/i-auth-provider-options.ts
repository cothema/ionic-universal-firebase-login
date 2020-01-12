import { IFacebookAuthOptions } from "../modules/facebook/i-facebook-auth-options";
import { IGithubAuthOptions } from "../modules/github/i-github-auth-options";
import { IGoogleAuthOptions } from "../modules/google/i-google-auth-options";
import { ITwitterAuthOptions } from "../modules/twitter/i-twitter-auth-options";

export interface IAuthProviderOptions {
    facebook?: IFacebookAuthOptions;
    google?: IGoogleAuthOptions;
    twitter?: ITwitterAuthOptions;
    github?: IGithubAuthOptions;
}
