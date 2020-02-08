import { Injectable, Optional } from "@angular/core";
import { User as FirebaseUser } from "firebase";
import { AnonymousAuth } from "../modules/anonymous/anonymous-auth";
import { EmailAuth } from "../modules/email/email-auth";
import { FacebookAuth } from "../modules/facebook/facebook-auth";
import { GithubAuth } from "../modules/github/github-auth";
import { GoogleAuth } from "../modules/google/google-auth";
import { PhoneAuth } from "../modules/phone/phone-auth";
import { TwitterAuth } from "../modules/twitter/twitter-auth";
import { IAuthProvider } from "./i-auth-provider";

@Injectable({
  providedIn: "root",
})
export class AuthProvider {
  public constructor(
    @Optional() public authAnonymous: AnonymousAuth,
    @Optional() public authEmail: EmailAuth,
    @Optional() public authFacebook: FacebookAuth,
    @Optional() public authGithub: GithubAuth,
    @Optional() public authGoogle: GoogleAuth,
    @Optional() public authPhone: PhoneAuth,
    @Optional() public authTwitter: TwitterAuth,
  ) {}

  public getProviderById(
    providerId: string | null | undefined,
  ): IAuthProvider | null {
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

  public getProvidersByUser(user: FirebaseUser): IAuthProvider[] {
    if (user.isAnonymous) {
      return [this.authAnonymous];
    }

    const providers: IAuthProvider[] = [];

    for (const providerData of user.providerData) {
      if (providerData) {
        const provider = this.getProviderById(providerData.providerId);
        if (provider) {
          providers.push(provider);
        }
      }
    }

    return providers;
  }
}
