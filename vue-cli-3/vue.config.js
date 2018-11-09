"use strict";

/**
 * 
 * @author xgqfrms
 * @license MIT
 * @copyright xgqfrms
 * @created 2018.10.08
 * @modified 2018.10.08
 * 
 * @description vue.config.js
 * @augments 
 * @example 
 * 
 * @ref https://cli.vuejs.org/config/#vue-config-js
 * 
 * @ref https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes
 * @ref https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity
 * 
 * @ref https://cli.vuejs.org/guide/webpack.html#simple-configuration
 * @ref https://cli.vuejs.org/guide/webpack.html#chaining-advanced
 * 
 * @ref https://cli.vuejs.org/guide/css.html#css-modules
 * 
 * @ref https://webpack.js.org/configuration/dev-server/
 * @ref https://betterexplained.com/articles/how-to-optimize-your-site-with-gzip-compression/
 * @ref https://webpack.js.org/configuration/stats/
 * @ref https://webpack.js.org/configuration/watch/
 * @ref http://www.zeroconf.org/
 * 
 * @ref https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/babel-preset-app
 * @ref https://cli.vuejs.org/guide/browser-compatibility.html#polyfills
 * 
 * @ref https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint
 * @ref https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
 * 
 */

// import path from "path";
const path = require("path");

process.env.NODE_ENV = "production";

module.exports = {
    baseUrl: process.env.NODE_ENV === "production" ? "/" : "/test/",
    outputDir: process.env.NODE_ENV === "production" ? "build" : "dist",// --no-clean
    // assetsDir: "",
    // indexPath: "index.html",
    // filenameHashing: true,
    // lintOnSave: true,// "error"
    // runtimeCompiler: false,
    // transpileDependencies: [],
    // productionSourceMap: true,
    // crossorigin: undefined, // "anonymous", "use-credentials"
    // integrity: false,// "sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC" & base64-encoded sha384 hash
    // pages: {
    //     index: {
    //         // entry for the page
    //         entry: "src/index/main.js",
    //         // the source template
    //         template: "public/index.html",
    //         // output as dist/index.html
    //         filename: "index.html",
    //         // when using title option,
    //         // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
    //         title: "Index Page",
    //         // chunks to include on this page, by default includes
    //         // extracted common chunks and vendor chunks.
    //         chunks: ["chunk-vendors", "chunk-common", "index"]
    //     },
    //     // when using the entry-only string format,
    //     // template is inferred to be `public/subpage.html`
    //     // and falls back to `public/index.html` if not found.
    //     // Output filename is inferred to be `subpage.html`.
    //     subpage: "src/subpage/main.js"
    // },
    // configureWebpack: {},// Object | Function
    // chainWebpack: () => {},// Function
    // css: {
    //     modules: false,
    //     extract: true,
    //     sourceMap: false,
    //     // loaderOptions: {
    //     //     css: {
    //     //         // options here will be passed to css-loader
    //     //     },
    //     //     postcss: {
    //     //         // options here will be passed to postcss-loader
    //     //     },
    //     // },
    // },
    // devServer: {
    //     // proxy: "https://localhost:8080",
    //     proxy: {
    //         "/api": {
    //             target: "<url>",
    //             ws: true,
    //             changeOrigin: true
    //         },
    //         "/other_api": {
    //             // target: "<other_url>",
    //             target: "https://other-server.example.com",
    //             secure: false,
    //             pathRewrite: {
    //                 "^/api" : "",
    //             },
    //         },
    //     },
    //     // contentBase: path.join(__dirname, "public"),
    //     // compress: true,
    //     // port: 8888,
    //     // before: function(app, server) {
    //     //     app.get("/some/path", function(req, res) {
    //     //         res.json({
    //     //             custom: "response"
    //     //         });
    //     //     });
    //     // },
    //     // after: function(app, server) {
    //     //     // do fancy stuff
    //     // },
    //     // allowedHosts: [
    //     //     "xgqfrms.xyz",
    //     //     ".xgqfrms.xyz",
    //     //     "subdomain.host.com",
    //     // ],
    //     // bonjour: true,
    //     // clientLogLevel: "none",// "none" | "info" | "error" | "warning"
    //     // color: true,
    //     // compress: true,
    //     // disableHostCheck: true,
    //     // lazy: true,
    //     // filename: "bundle.js",
    //     // index: "index.html",
    //     headers: {
    //         "X-Custom-Foo": "bar",
    //     },
    //     historyApiFallback: true,
    //     host: "0.0.0.0",
    //     hot: true,
    //     hotOnly: true,
    //     // https: true,
    //     https: {
    //         key: fs.readFileSync("/path/to/server.key"),
    //         cert: fs.readFileSync("/path/to/server.crt"),
    //         ca: fs.readFileSync("/path/to/ca.pem"),
    //     },
    //     info: false,
    //     noInfo: true,
    //     inline: false,
    //     open: true,
    //     // open: "Chrome",
    //     openPage: "/different/page",
    //     pfx: "/path/to/file.pfx",
    //     pfxPassphrase: "passphrase",
    //     // overlay: true,
    //     overlay: {
    //         warnings: true,
    //         errors: true,
    //     },
    //     public: "app.xgqfrms.xyz:80",
    //     publicPath: "/assets/",
    //     quiet: true,
    //     setup: function(app, server) {
    //         app.get("/some/path", function(req, res) {
    //             res.json({
    //                 custom: "response"
    //             });
    //         });
    //     },
    //     socket: "socket",
    //     staticOptions: {
    //         redirect: false
    //     },
    //     stats: "errors-only", // "none" | "errors-only" | "minimal" | "normal" | "verbose" object
    //     // stdin: false,
    //     useLocalIp: true,
    //     watchContentBase: true,
    //     watchOptions: {
    //         poll: true,
    //     },
    // },
    // parallel: require("os").cpus().length > 1,
    // pwa: {},
    // pluginOptions: {},
}