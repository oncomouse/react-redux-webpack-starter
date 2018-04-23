module.exports = {
	'extends': 'eslint-config-airbnb'
  , 'env': {
    'mocha': true
    , 'browser': true
  }
  , 'parser': 'babel-eslint'
  , 'globals': {
    'process': false
    , 'APP_TITLE': false
  }
}