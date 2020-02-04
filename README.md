# Universal Firebase login for Ionic

[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/cothema/ionic-universal-firebase-login/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/cothema/ionic-universal-firebase-login/?branch=master)
[![Build Status](https://scrutinizer-ci.com/g/cothema/ionic-universal-firebase-login/badges/build.png?b=master)](https://scrutinizer-ci.com/g/cothema/ionic-universal-firebase-login/build-status/master)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Do you want to implement native authentication as well as in browser authetication
for your Ionic application? This package is for you!

The easiest to use flexible hybrid module for Ionic (Angular) with complete
documentation and step-by-step guide. We use Firestore for
authentication service and its Firestore for storing information
about users.

No more pain with login implementation troubles!

**Platforms:**
- Browser
- Android
- iOS

**See documentation and guides on:** https://github.com/cothema/ionic-universal-firebase-login

## Supported providers
- [Google - see guide](docs/providers/google.md)
- [Facebook - see guide](docs/providers/facebook.md)
- Twitter (browser only)
- Github (browser only)
- Email
- Phone
- Anonymous

**Supported login types:**
- Pop up / Native
- Redirect (not implemented at this time)

**What's included?**
- Basic authentication service: [see documentation](./docs/features/base-auth-service.md)
    - Unified providers API, platform recognition
- Simple authentication guard: [see documentation](./docs/features/guard.md)
- Basic user model

You can customize almost everything to your own needs (e.g. by extending, overloading or composition).


### Configuration

Override or change `options` property of BaseAuthService

| Option name | Default value | Description
| --- | --- | ---
| afterSignInPage | "/" | Path where user will be redirected after successful sign in. If false, no redirect will be done.
| providers | {} | List of provider configurations. See example configuration.
| signInPage | "/sign-in" | Path where user will be redirected when sign in is required (and after logout). If false, no redirect will be done.
| storage | false | You can store user profile data in Firestore ('firestore') or nowhere (false).
| storageUserTable | "users" | If you specify storage, than this table name / key will be used.
| mapUserToStorageFunc | | You can use custom strategy to map user model to storage. See example configuration.
| storageUserFactoryFunc | | You can use custom model object for user in storage. See example configuration. 
| userFactoryFunc | | You can use custom model object for user. See example configuration.

#### Example configuration
```typescript
import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { FacebookAuthModule, GoogleAuthModule, UniFirebaseLoginModule } from "ionic-universal-firebase-login";
import { environment } from "../environments/environment";
import { Player } from "./model/player.model";
import * as firebase from "firebase";

export function mapFirebaseUserToStorageFunc(user: firebase.User) {
    return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
    };
}

export function userFactoryFunc(): Player {
    return new Player();
}

@NgModule({
    imports: [
        ...
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        UniFirebaseLoginModule.forRoot({
            storage: "firestore",
            storageUserTable: "players",
            signInPage: "login",
            userFactoryFunc,
            mapFirebaseUserToStorageFunc
        }),
        GoogleAuthModule,
        FacebookAuthModule,
    ],
    ...
})
export class AppModule {
}
```

## Installation

- Before you start, be sure that you have signed your application.
It is required for native authentication on Android and iOS.

Install with `npm`:

```bash
npm install firebase @angular/fire ionic-universal-firebase-login ngx-cacheable
```

- Go to https://firebase.google.com/ → **create a new Firebase project** 
(if you don't have it already).
  - Project overview → **Create Web app**
  - **Firebase settings → General tab → Web app project (at the bottom)
   → Config → copy Firebase SDK snippet**
  (Configuration is the same for all platforms,
  so you have to do this step only once.)
- Edit `src/environments/environment.ts` and paste the config from previous step as in
example below:

```typescript
export const environment = {
    ...
    firebase: {
        apiKey: "XXX",
        authDomain: "XXX.firebaseapp.com",
        databaseURL: "https://XXX.firebaseio.com",
        projectId: "XXX",
        storageBucket: "XXX.appspot.com",
        messagingSenderId: "XXX",
        appId: "XXX",
        measurementId: "G-XXX",
    },
}
```

- Edit `src/app/app.module.ts` and add:

````typescript
import { NgModule } from '@angular/core'; 
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {UniFirebaseLoginModule, GoogleAuthModule, FacebookAuthModule} from 'ionic-universal-firebase-login';

@NgModule({
    ...
    imports: [
        ...
        AngularFireModule.initializeApp(environment.firebase),
        UniFirebaseLoginModule.forRoot(),
        GoogleAuthModule, // if you want to use Google as a provider
        FacebookAuthModule, // if you want to use Facebook as a provider
    ]
})
````

**App for Android platform:**
- Create Android app in Firebase similarly as Web app
- Android package name have to be same as you have in `config.xml` (`<widget id="..."`). If you have
 some default package id in `config.xml`, edit it.
- If you don't have SHA-1 key, see guide for Android:
  - Create your keystore with a key: https://coderwall.com/p/r09hoq/android-generate-release-debug-keystores
  - Get SHA-1 from your keystore: https://developers.google.com/android/guides/client-auth
- Enter SHA1 key in the first step of Android app creation. 
- Click to Download google-services.json and copy it to your project root 
- Skip last (4th) step, because its for Android Studio project only.

**See our guide for each provider:**
  - [Google - see guide](docs/providers/google.md)
  - [Facebook - see guide](docs/providers/facebook.md)

- Use `AuthGuard` in your router like this:
````typescript
import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "ionic-universal-firebase-login";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./home.module").then(m => m.HomePageModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  },
  {
    path: "sign-in",
    loadChildren: () => import("./sign-in/sign-in.module").then(m => m.SignInPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
````

## Example implementations

_See [examples/](examples/) folder_

**Real use cases:**
- https://gitlab.com/cothema/cook-pocket

## Changelog

[See CHANGELOG.md](CHANGELOG.md)

## Contribution

**Feel free to send pull requests or create new issues.**

## License

[MIT license](LICENSE.md)
