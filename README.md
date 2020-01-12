# Universal Firebase login for Ionic

Easy to use hybrid module for Ionic (Angular) with complete
documentation and step-by-step guide. We use Firestore for
authentication service and its Firestore for storing information
about users.

No more pain with login implementation troubles!

**Platforms:**
- Browser
- Android
- iOS

**Supported providers:**
- [Google - see guide](docs/google.md)
- [Facebook - see guide](docs/facebook.md)
- Twitter (browser only)
- Github (browser only)
- Email
- Phone

## Contribution

**Feel free to send pull requests or create new issues.**

## Installation

Install with `npm`:

``` bash
npm install ionic-universal-firebase-login --save
```

Go to https://firebase.google.com/ and create an account for your app 
if you don't have it already.
- Open your app settings and in General section at the bottom copy
Firebase SDK snippet (in Config format).

Edit `src/environments/environment.ts` and copy the config as in
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

Edit `src/app/app.module.ts` and add:

```` typescript
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

In Firebase go in menu to Authentication and enable methods
you want to use and set configuration in your app. See our guide for each provider
(links are at the top of this page).

## Example implementations

See [examples/](examples/) folder

## Changelog

[See CHANGELOG.md](CHANGELOG.md)

## License

[MIT license](LICENSE.md)
