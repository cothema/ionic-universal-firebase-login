import * as firebase from "firebase";
import {
    AnonymousAuth,
    EmailAuth,
    FacebookAuth,
    GithubAuth,
    GoogleAuth,
    TwitterAuth,
} from "..";
import { PhoneAuth } from "../modules/phone/phone-auth";
import { IAuthProvider } from "./i-auth-provider";

export class AuthProvider {
    public constructor(
        public authAnonymous: AnonymousAuth,
        public authEmail: EmailAuth,
        public authFacebook: FacebookAuth,
        public authGithub: GithubAuth,
        public authGoogle: GoogleAuth,
        public authPhone: PhoneAuth,
        public authTwitter: TwitterAuth,
    ) {}

    public getProviderById(providerId: string): IAuthProvider | null {
        switch (providerId) {
            case "password":
                return this.authEmail;
            case "phone":
                return this.authPhone;
            case "facebook.com":
                return this.authFacebook;
            case "github.com":
                return this.authGithub;
            case "google.com":
                return this.authGoogle;
            case "twitter.com":
                return this.authTwitter;
            case "apple.com":
            case "yahoo.com":
            case "hotmail.com":
                throw new Error(`Provider ${providerId} not implemented!`);
        }

        return null;
    }

    public getProviderByUser(user: firebase.User): IAuthProvider | null {
        if (user.isAnonymous) {
            return this.authAnonymous;
        }

        return this.getProviderById(user.providerId);
    }
}
