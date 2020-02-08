import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { Platform } from "@ionic/angular";
import { auth } from "firebase/app";
import { UniFirebaseLoginConfigProvider } from "../../config/uni-firebase-login-config-provider";
import { AbstractAuth } from "../../providers/abstract-auth";
import { IAuthProvider } from "../../providers/i-auth-provider";
import { IGoogleAuthOptions } from "./i-google-auth-options";

@Injectable()
export class GoogleAuth extends AbstractAuth implements IAuthProvider {
  public readonly providerKey = "google";
  public readonly defaultOptions: IGoogleAuthOptions = {
    offline: true,
    scopes: "profile email",
    signInType: "popup",
  };

  public constructor(
    private googleAuth: GooglePlus,
    angularFireAuth: AngularFireAuth,
    platform: Platform,
    config: UniFirebaseLoginConfigProvider,
  ) {
    super(angularFireAuth, platform, config);
  }

  public async signInNative(options: any): Promise<auth.UserCredential | null> {
    const mergedOptions = Object.assign({}, this.defaultOptions, options);

    const googleUser = await this.googleAuth.login(mergedOptions);

    return await this.angularFireAuth.auth.signInWithCredential(
      auth.GoogleAuthProvider.credential(googleUser.idToken),
    );
  }

  protected getBrowserSignInProvider() {
    const provider = new auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    return provider;
  }
}
