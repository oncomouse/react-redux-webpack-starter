const INDENT_SPACES = 4
const LINE_LENGTH = 80
const PROPS_PER_LINE = 1
const OFF = 0
const WARNING = 1
const ERROR = 2

module.exports = {
  'env': {
    'browser': true
    , 'commonjs': true
    , 'es6': true
	, 'mocha': true
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
  , 'plugins': [
    'react'
  ]
  , 'settings': {
    'react': {
      'pragma': 'React'
    }
  }
  , 'parser': 'babel-eslint'
  , 'rules': {
    'array-callback-return': ERROR
    , 'camelcase': ERROR
    , 'comma-dangle': [
      ERROR
      , 'never'
    ]
    , 'comma-spacing': [
      ERROR
      , {
        'before': false
        , 'after': true
      }
    ]
    // I prefer commas at the start of lists; disable to turn off:
    , 'comma-style': [
      ERROR
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
    , 'eol-last': [
      ERROR
      , 'never'
    ]
    , 'generator-star-spacing': [
      ERROR,
      'after'
    ]
    , 'indent': [
      ERROR
      , INDENT_SPACES
    ]
    , 'jsx-quotes': [
      ERROR
      , 'prefer-double'
    ]
    , 'linebreak-style': [
      ERROR
      , 'unix'
    ]
    // Enforce a max line-length of 80 chars:
    , 'max-len': [
      ERROR
      , { 'code': LINE_LENGTH }
    ]
    , 'no-array-constructor': ERROR
    , 'no-extra-bind': ERROR
    , 'no-extra-parens': [
      ERROR
      , 'all'
      , {
        'conditionalAssign': false
        , 'ignoreJSX': 'all'
        , 'nestedBinaryExpressions': false
        , 'returnAssign': false
      }
    ]
    , 'no-implicit-coercion': ERROR
    , 'no-implicit-globals': ERROR
    , 'no-magic-numbers': [
      ERROR
      , {
        'ignore': [0, 1]
        , 'ignoreArrayIndexes': true
      }
    ]
    , 'no-prototype-builtins': ERROR
    , 'no-template-curly-in-string': ERROR
    , 'no-trailing-spaces': ERROR
    , 'object-curly-spacing': [
      ERROR
      , 'always'
    ]
    , 'prefer-const': ERROR
    , 'prefer-spread': ERROR
    , 'quotes': [
      ERROR
      , 'single'
    ]
    , 'react/jsx-indent': [
      ERROR
      , INDENT_SPACES
    ]
    , 'react/jsx-max-props-per-line': [
      ERROR,
      {
        'maximum': PROPS_PER_LINE
        , 'when': 'always'
      }
    ]
    , 'react/jsx-one-expression-per-line': ERROR
    , 'react/jsx-pascal-case': ERROR
    , 'react/jsx-tag-spacing': ERROR
    , 'react/jsx-uses-react': ERROR
    , 'react/jsx-uses-vars': ERROR
    , 'react/no-direct-mutation-state': ERROR
    , 'react/no-typos': ERROR
    , 'react/no-unknown-property': ERROR
    , 'react/no-unused-state': ERROR
    , 'react/prefer-stateless-function': ERROR
    , 'react/react-in-jsx-scope': ERROR
    , 'react/require-render-return': ERROR
    , 'react/self-closing-comp': ERROR
    , 'react/style-prop-object': ERROR
    , 'react/void-dom-elements-no-children': ERROR
    , 'rest-spread-spacing': [
      ERROR
      , 'never'
    ]
    , 'semi': [
      ERROR
      , 'never'
    ]
  }
};