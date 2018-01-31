export default function loadPolyfills(cb) {
    const fillFetch = () => new Promise((resolve) => {
        if ('fetch' in window) return resolve()

        require.ensure([], () => {
            require('whatwg-fetch')

            resolve()
        }, 'fetch')
    })

    /*const fillIntl = () => new Promise((resolve) => {
		if ('Intl' in window) return resolve();

		require.ensure([], () => {
			require('intl');
			require('intl/locale-data/jsonp/en.js');

			resolve();
		}, 'Intl');
	});*/

    const fillCoreJs = () => new Promise((resolve) => {
        if (
            'startsWith' in String.prototype &&
			'endsWith' in String.prototype &&
			'includes' in Array.prototype &&
			'Symbol' in window &&
			'assign' in Object &&
			'keys' in Object
        ) return resolve()

        require.ensure([], () => {
            require('core-js')

            resolve()
        }, 'core-js')
    })

    const doIt = () => Promise.all([
        fillCoreJs()
        , fillFetch()
        //, fillIntl()
    ]).then()

    if (!window.Promise) {
        // Load Promise
        require.ensure([], () => {
            const PolyfilledPromise = require('promise-polyfill')

            window.Promise = PolyfilledPromise

            doIt().then(cb)
        }, 'promises')
    } else {
        doIt().then(cb)
    }
}