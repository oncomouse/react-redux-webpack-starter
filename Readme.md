# react-redux-webpack-starter

This is my starter app for React, Redux, and Webpack. It includes [redux-saga](https://github.com/redux-saga/redux-saga) for side effects, including calls to APIs. It also includes support for a [persistent](https://github.com/rt2zz/redux-persist) store. You can use [CSS modules](https://github.com/css-modules/css-modules) or [styled-components](https://www.styled-components.com/).

There are branches available for developing with an [immutable](, [immutable](https://github.com/facebook/immutable-js/) store (`react-immutable`), with [preact](https://preactjs.com/) (`preact`) for faster sites, and for preact and Immutable (`preact-immutable`).

## Installation

Run `npm install` to install packages. `npm run start` starts webpack-dev-server. `npm run build` will produce a production version of the app.

## Customizing

In `webpack.config.js`, set the variable `APP_TITLE` to the name of the application. This will set the cache key for redux persistence and the HTML title for the landing page (which you can change using [react-helmet](https://github.com/nfl/react-helmet), if you install it).

## Debugging

`npm run analyze`

Also: `env NODE_ENV=production webpack --json > stats.json` and upload to [Webpack Visualizer](https://chrisbateman.github.io/webpack-visualizer/)