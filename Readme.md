# react-redux-webpack-starter

This is my starter app for React, Redux, and Webpack. It includes redux-thunk and middleware for making API calls to an AJAX store. It also includes support for a persistent, immutable store. You can use [CSS modules](https://github.com/css-modules/css-modules).

This also makes use of webpack 2.

## Installation

Run `npm install` to install packages. `npm run start` starts webpack-dev-server. `npm run build` will produce a production version of the app.

## Customizing

In `webpack.config.js`, set the variable `APP_TITLE` to the name of the application. This will set the cache key for redux persistence and the HTML title for the landing page (which you can change using [react-helmet](https://github.com/nfl/react-helmet), if you install it).