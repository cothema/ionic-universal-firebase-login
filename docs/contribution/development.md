## Contribution

[Go back to README](../../README.md)

### Package development

#### Before you begin

- Install dependencies
```` bash
npm install
````
- Do your changes and write tests if possible
- Run tests
```` bash
npm test
````
- Build package (to pkg/ folder)
``` bash
npm run build
```
- If you want to test library before new version is published,
you can create a script for your project that will copy `/pkg` folder content
to your project's `node_modules/ionic-universal-firebase-login`
    - `npm link` does not work as expected, because it creates
    only a symlink and it causes errors. 

#### Pull requests

- Package has set up pre commit lint, so be sure that the lint run before pull request is made.
    - You can also run lint manually: ``npm run lint``


#### NPM

_Only for NPM package admins._

**Publish new package version:**
```` bash
npm run pub
````
