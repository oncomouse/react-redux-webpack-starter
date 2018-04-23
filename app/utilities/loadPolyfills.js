export default function loadPolyfills(cb) {
  const fillFetch = () => new Promise((resolve) => {
    if ('fetch' in window) return resolve();

    return require.ensure([], () => {
      // eslint-disable-next-line global-require
      require('whatwg-fetch');

      return resolve();
    }, 'fetch');
  });

  /* const fillIntl = () => new Promise((resolve) => {
    if ('Intl' in window) return resolve();

    require.ensure([], () => {
      require('intl');
      require('intl/locale-data/jsonp/en.js');

      resolve();
    }, 'Intl');
  }); */

  const fillCoreJs = () => new Promise((resolve) => {
    if (
      'startsWith' in String.prototype &&
      'endsWith' in String.prototype &&
      'includes' in Array.prototype &&
      'Symbol' in window &&
      'assign' in Object &&
      'keys' in Object
    ) return resolve();

    return require.ensure([], () => {
      // eslint-disable-next-line global-require,import/no-extraneous-dependencies
      require('core-js');

      return resolve();
    }, 'core-js');
  });

  const doIt = () => Promise.all([
    fillCoreJs(),
    fillFetch(),
    // , fillIntl()
  ]).then();

  if (!window.Promise) {
    // Load Promise
    require.ensure([], () => {
      // eslint-disable-next-line global-require
      const PolyfilledPromise = require('promise-polyfill');

      window.Promise = PolyfilledPromise;

      doIt().then(cb);
      return true;
    }, 'promises');
  } else {
    doIt().then(cb);
  }
}
