# ESLint for vue

> ESLint

```json
{
    "name": "app",
    "version": "1.0.1",
    "private": true,
    "description": "JT APP",
    "directories": {
        "lib": "lib"
    },
    "scripts": {
        "dev": "light release -wb ",
        "prod": "light release -p --product",
        "lint": "eslint view/**/*.{js,vue}"
    },
    "bin": {
        "testing": "testing",
        "local": "local",
        "staging": "staging",
        "product": "product",
        "app": "app",
        "dev": "dev",
        "lint": "lint"
    },
    "author": "xgqfrms",
    "license": "MIT",
    "dependencies": {},
    "devDependencies": {
        "eslint": "^5.16.0",
        "eslint-plugin-vue": "^5.2.2"
    }
}
```
## .eslintrc

```js

module.exports = {
    extends: [
        // add more generic rulesets here, such as:
        // "eslint:recommended",
        "plugin:vue/recommended",
    ],
    rules: {
        // override/add rules settings here, such as:
        // "vue/no-unused-vars": "error",
    }
}


```


```sh
$ yarn add -D eslint eslint-plugin-vue

```

## vscode 

```md

Integrates ESLint into VS Code. If you are new to ESLint check the documentation.

The extension uses the ESLint library installed in the opened workspace folder. If the folder doesn't provide one the extension looks for a global install version. If you haven't installed ESLint either locally or globally do so by running npm install eslint in the workspace folder for a local install or npm install -g eslint for a global install.

On new folders you might also need to create a .eslintrc configuration file. You can do this by either using the VS Code command Create ESLint configuration or by running the eslint command in a terminal. 

If you have installed ESLint globally (see above) then run `eslint --init` in a terminal.
If you have installed ESLint locally then run `.\node_modules\.bin\eslint --init` under Windows,
and `./node_modules/.bin/eslint --init` under Linux and Mac.

```


`.\node_modules\.bin\eslint --init` => `.\lib\node_modules\.bin\eslint --init`
`./node_modules/.bin/eslint --init` => `./lib/node_modules/.bin/eslint --init`



```json

    "scripts": {
        "dev": "light release -wb ",
        "prod": "light release -p --product",
        "lint": "./lib/node_modules/.bin/eslint view/**/*.{js,vue}",
        "li": "./lib/node_modules/.bin/eslint --init",
        "test": "eslint view/**/*.{js,vue}"
    },
    "bin": {
        "testing": "testing",
        "local": "local",
        "staging": "staging",
        "product": "product",
        "app": "app",
        "dev": "dev",
        "lint": "lint"
    }

```

## OK

> \\ 路径, 转义字符

```json
{
    "scripts": {
        "dev": "light release -wb ",
        "prod": "light release -p --product",
        "lint": ".\\lib\\node_modules\\.bin\\eslint view/**/*.{js,vue}",
        "test": ".\\lib\\node_modules\\.bin\\eslint --init",
        "global-lint": "eslint view/**/*.{js,vue}"
    },
    "bin": {
        "testing": "testing",
        "local": "local",
        "staging": "staging",
        "product": "product",
        "app": "app",
        "dev": "dev",
        "lint": "lint"
    }
}
```

# solution

```json
{
    "name": "app",
    "version": "1.0.1",
    "private": true,
    "description": "JT APP",
    "author": "xgqfrms",
    "license": "MIT",
    "directories": {
        "lib": "lib"
    },
    "scripts": {
        "dev": "light release -wb ",
        "prod": "light release -p --product",
        "lint": ".\\lib\\node_modules\\.bin\\eslint view/**/*.{js,vue}",
        "test": ".\\lib\\node_modules\\.bin\\eslint --init",
        "global-lint": "eslint view/**/*.{js,vue}"
    },
    "bin": {
        "testing": "testing",
        "local": "local",
        "staging": "staging",
        "product": "product",
        "app": "app",
        "dev": "dev",
        "lint": "lint"
    }
}
```

