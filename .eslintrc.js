module.exports = {
	'extends': 'eslint-config-airbnb'
  , 'env': {
    'mocha': true
    , 'browser': true
  }
  , 'parser': 'babel-eslint'
  , 'plugins': [
    'chai-friendly'
  ]
  , 'globals': {
    'process': false
    , 'APP_TITLE': false
  }
  , 'rules': {
    'no-unused-expressions': 0
    , 'chai-friendly/no-unused-expressions': 2
  }
}