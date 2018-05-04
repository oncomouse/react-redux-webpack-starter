const INDENT_SPACES = 4
const LINE_LENGTH = 100
const OFF = 'off'
const WARN = 'warn'
const ERROR = 'error'
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
  , plugins: [
    'chai-friendly'
  ]
  , rules: {
    'comma-dangle': OFF
    , 'comma-style': [
      WARN
      , 'first'
      , {
        'exceptions': {
          'ArrayExpression': false
          , 'ArrayPattern': false
          , 'ArrowFunctionExpression': false
          , 'CallExpression': false
          , 'FunctionDeclaration': false
          , 'FunctionExpression': false
          , 'ImportDeclaration': false
          , 'ObjectExpression': false
          , 'ObjectPattern': false
          , 'VariableDeclaration': false
        }
      }
    ]
    , 'eol-last': OFF
    , 'function-paren-newline': [
      ERROR
      , 'consistent'
    ]
    , 'global-require': OFF
    , 'indent': [
      ERROR
      , INDENT_SPACES
    ]
    , 'no-cond-assign': [
      ERROR
      , 'except-parens'
    ]
    , 'no-unused-expressions': OFF
    , 'one-var': OFF
    , 'semi': [
      ERROR
      , 'never'
    ]
    , 'chai-friendly/no-unused-expressions': ERROR
    , 'import/no-extraneous-dependencies': OFF
    , 'react/jsx-indent': [
      ERROR
      , INDENT_SPACES
    ]
    , 'react/jsx-indent-props': [
      ERROR
      , INDENT_SPACES
    ]
  }
}