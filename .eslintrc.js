module.exports = {
  'env': {
    'browser': true
    , 'commonjs': true
    , 'es6': true
  }
  , 'extends': 'eslint:recommended'
  , 'globals': {
    'process': false
    , 'APP_TITLE': false
  }
  , 'parserOptions': {
    'ecmaFeatures': {
      'experimentalObjectRestSpread': true
      , 'jsx': true
    }
    , 'sourceType': 'module'
  }
  , 'plugins': {
    'react'
  }
  , 'rules': {
    'comma-spacing': [
      'error'
      , {
        'before': false
        , 'after': true
      }
    ]
    // I prefer commas at the start of lists; disable to turn off:
    , 'comma-style': [
      'error'
      , 'first'
    ]
    , 'indent': [
      'error'
      , 2
    ]
    // Enforce a max line-length of 80 chars:
    , 'max-len': [
      'error'
      , { 'code': 80 }
    ]
    , 'linebreak-style': [
      'error'
      , 'unix'
    ]
    , 'quotes': [
      'error'
      , 'single'
    ]
    , 'semi': [
      'error'
      , 'never'
    ]
  }
}