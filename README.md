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

## Supported providers:
- [Google - see guide](docs/google.md)
- [Facebook - see guide](docs/facebook.md)
- Twitter (browser only)
- Github (browser only)
- Email
- Phone

**What's included?** Unified providers API, platform recognition,
simple authentication guard, basic authentication service and
basic user model. You can customize almost everything to your
own needs.

## Contribution

**Feel free to send pull requests or create new issues.**

## Installation

- Before you start, be sure that you have signed your application.
It is required for native authentication on Android and iOS.

Install with `npm`:

``` bash
npm install firebase @angular/fire ionic-universal-firebase-login
```

- Go to https://firebase.google.com/ and create an account for your app 
if you don't have it already.
  - Create Web app, Android app (optionally) and iOS app (optionally)
  - In the second step of app creation copy values from firebaseConfig object
  (if you already have created your app you can also get configuration in
  your Firebase app settings -> General section at the bottom -> copy
  Firebase SDK snippet - Config format).
  Configuration is the same for all platforms (apps) - e.g. browser and Android

- Edit `src/environments/environment.ts` and copy the config from previous step as in
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

```` typescript
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {GoogleAuthModule, FacebookAuthModule} from 'ionic-universal-firebase-login';

@NgModule({
    ...
    imports: [
        ...
        AngularFireModule.initializeApp(environment.firebase),
        GoogleAuthModule, // if you want to use Google as a provider
        FacebookAuthModule, // if you want to use Facebook as a provider
    ]
})
````

- In Firebase go in menu to Authentication and enable methods
you want to use and set configuration in your app. See our guide for each provider
(links are at the top of this page).

## Example implementations

See [examples/](examples/) folder

## Changelog

[See CHANGELOG.md](CHANGELOG.md)

## License

[MIT license](LICENSE.md)
