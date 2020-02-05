## Facebook provider implementation

[Go back to README](../../README.md)

Documentation from Ionic: https://ionicframework.com/docs/native/facebook.

- Start with installation steps on [README page](../../README.md).
- Install required packages via npm:
```bash
npm install @ionic-native/facebook
```

- Go to https://developers.facebook.com/apps and create your app (if not have one already)

- Create your Facebook Login app (in left menu → +). Select Web platform and click through
all steps. For Android / iOS create another Web platforms.

- Go to Firebase > select your project > Authentication.
Enable Facebook provider and fill in App ID and App secret from app created at the previous step.
Save it.

- Install cordova module package via npm:

(Change APP_ID and APP_NAME variables to your Facebook App ID and Facebook Display name!)
```bash
ionic cordova plugin add cordova-plugin-facebook4 --variable APP_ID="000000" --variable APP_NAME="App name"
```

## Usage

See [example project](https://github.com/cothema/ionic-firebase-login-tutorial)
