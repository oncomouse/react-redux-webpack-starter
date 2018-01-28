const INDENT_SPACES = 4
const LINE_LENGTH = 80
const PROPS_PER_LINE = 1
const OFF = 'off'
const WARN = 'warn'
const ERROR = 'error'
const RESTRICTED_GLOBALS = [
  'addEventListener',
  'blur',
  'close',
  'closed',
  'confirm',
  'defaultStatus',
  'defaultstatus',
  'event',
  'external',
  'find',
  'focus',
  'frameElement',
  'frames',
  'history',
  'innerHeight',
  'innerWidth',
  'length',
  'location',
  'locationbar',
  'menubar',
  'moveBy',
  'moveTo',
  'name',
  'onblur',
  'onerror',
  'onfocus',
  'onload',
  'onresize',
  'onunload',
  'open',
  'opener',
  'opera',
  'outerHeight',
  'outerWidth',
  'pageXOffset',
  'pageYOffset',
  'parent',
  'print',
  'removeEventListener',
  'resizeBy',
  'resizeTo',
  'screen',
  'screenLeft',
  'screenTop',
  'screenX',
  'screenY',
  'scroll',
  'scrollbars',
  'scrollBy',
  'scrollTo',
  'scrollX',
  'scrollY',
  'self',
  'status',
  'statusbar',
  'stop',
  'toolbar',
  'top',
];

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
    , 'jsx-a11y'
	, 'import'
	//, 'flowtype'
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
    , 'max-len': [
      WARN
      , {
          'code': LINE_LENGTH
          , 'ignoreComments': true
          , 'ignoreTrailingComments': true
          , 'ignoreUrls': true
          , 'ignoreTemplateLiterals': true
          , 'ignoreStrings': true
      }
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
	, 'no-restricted-globals': [ERROR].concat(RESTRICTED_GLOBALS)
    , 'no-prototype-builtins': ERROR
    , 'no-template-curly-in-string': ERROR
    , 'no-trailing-spaces': ERROR
    , 'object-curly-spacing': [
      ERROR
      , 'always'
    ]
    , 'prefer-const': WARN
    , 'prefer-spread': WARN
    , 'quotes': [
      ERROR
      , 'single'
    ]
    , 'rest-spread-spacing': [
      ERROR
      , 'never'
    ]
    , 'semi': [
      ERROR
      , 'never'
    ]
	// Plugins
	// =====================================
	/*, 'flowtype/define-flow-type': WARN
    , 'flowtype/require-valid-file-annotation': WARN
    , 'flowtype/use-flow-type': WARN*/
	, 'jsx-a11y/accessible-emoji': WARN
	, 'jsx-a11y/alt-text': WARN
	, 'jsx-a11y/anchor-has-content': WARN
	, 'jsx-a11y/aria-activedescendant-has-tabindex': WARN
	, 'jsx-a11y/aria-props': WARN
	, 'jsx-a11y/aria-proptypes': WARN
	, 'jsx-a11y/aria-role': WARN
	, 'jsx-a11y/aria-unsupported-elements': WARN
	, 'jsx-a11y/heading-has-content': WARN
    , 'jsx-a11y/anchor-is-valid': [
        ERROR, {
            'aspects': ['invalidHref']
        }
    ]
	, 'jsx-a11y/iframe-has-title': WARN
	, 'jsx-a11y/img-redundant-alt': WARN
	, 'jsx-a11y/no-access-key': WARN
	, 'jsx-a11y/no-distracting-elements': WARN
	, 'jsx-a11y/no-redundant-roles': WARN
	, 'jsx-a11y/role-has-required-aria-props': WARN
	, 'jsx-a11y/role-supports-aria-props': WARN
	, 'jsx-a11y/scope': WARN
	, 'import/first': ERROR
	, 'import/no-amd': ERROR
	, 'import/no-webpack-loader-syntax': ERROR
	, 'react/jsx-max-props-per-line': [
	  ERROR,
	  {
		'maximum': PROPS_PER_LINE
		, 'when': 'always'
	  }
	]
	, 'react/jsx-indent': [
	  ERROR
	  , INDENT_SPACES
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
	, 'react/prefer-stateless-function': WARN
	, 'react/react-in-jsx-scope': ERROR
	, 'react/require-render-return': ERROR
	, 'react/self-closing-comp': ERROR
	, 'react/style-prop-object': ERROR
	, 'react/void-dom-elements-no-children': ERROR
  }
};