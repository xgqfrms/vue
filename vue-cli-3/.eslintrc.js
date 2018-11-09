"use strict";

/**
 * 
 * @author xgqfrms
 * @license MIT
 * @copyright xgqfrms
 * @created 2018.10.08
 * @modified 2018.10.08
 * 
 * @description .eslintrc.js
 * @augments 
 * @example 
 * @ref https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint
 * 
 */

module.exports = {
    root: true,
    env: {
        node: true,
    },
    "extends": [
        "plugin:vue/essential",
        "eslint:recommended",
    ],
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    },
    parserOptions: {
        parser: "babel-eslint",
    },
};
