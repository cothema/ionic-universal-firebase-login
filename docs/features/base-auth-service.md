## Basic authentication service

[Go back to README](../../README.md)

**Class: BaseAuthService**

_Purpose of the class is to simplify working with authentication package features._

You can use this class as a **simple authentication service directly** from this
package or you can **extend the service** and implement it in your way and
override methods which you want to implement differently.

**It is not required to use this service.** If you want, you can completely omit it.

### Options

Override or change `options` property of BaseAuthService

| Option name | Default value | Description
| --- | --- | ---
| afterLoginPage | "/" | Path where user will be redirected after successful login. If false, no redirect will be done.
| loginPage | "/login" | Path where user will be redirected when login is required (and after logout). If false, no redirect will be done.
| storage | false | You can store user profile data in Firestore ('firestore') or nowhere (false).
| storageUserTable | "users" | If you specify storage, than this table name / key will be used.

#### Examples
``` typescript
baseAuthService.options.afterLoginPage = false; // No redirect after login
baseAuthService.options.storage = "firestore"; // Store user profile data in Firestore
```
