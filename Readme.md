# react-redux-webpack-starter

This is my starter app for React, Redux, and Webpack. It includes [redux-saga](https://github.com/redux-saga/redux-saga) for side effects, including calls to APIs. It also includes support for a [persistent](https://github.com/rt2zz/redux-persist) store. You can use [CSS modules](https://github.com/css-modules/css-modules) or [tachyons](https://www.tachyons.io/).

There are branches available for developing with an [immutable](https://github.com/facebook/immutable-js/) store (`react-immutable`), with [preact](https://preactjs.com/) (`preact`) for faster sites, and for preact and Immutable (`preact-immutable`).

## Installation

Run `npm install` to install packages. `npm run start` starts webpack-dev-server. `npm run build` will produce a production version of the app.

## Customizing

In `package.json`, set the key `title` to the name of the application. This will set the cache key for redux persistence and the HTML title for the landing page (which you can change using [react-helmet](https://github.com/nfl/react-helmet), if you install it).

## Deploying

Run `yarn build` or `npm run build` to build an optimized, production version of your app. It will be in the `build/` directory.

If you add a `homepage` key to `package.json` and set it equal to the root URL of your application, the React app will set up a ServiceWorker to cache resources and greatly speed up your app.


## Debugging

`npm run analyze`

Also: `env NODE_ENV=production webpack --json > stats.json` and upload to [Webpack Visualizer](https://chrisbateman.github.io/webpack-visualizer/)