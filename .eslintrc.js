module.exports = {
  "extends": "airbnb-base",
  "plugins": [
    "import"
  ],
  "globals": {
    "beforeEach": false,
    "describe": false,
    "it": false
  },
  "parserOptions": {
    "sourceType": 'script',
    "ecmaVersion": 6
  },
  "rules": {
    'no-use-before-define': ['error', { functions: false }],
    'spaced-comment': 'off',
    'no-console': 'off',
    'no-bitwise': ["error", { "allow": ["~"] }],
    'no-mixed-operators': ["error", {"allowSamePrecedence": true}],
    'no-plusplus': 'off',
    'comma-dangle': ["error", "never"],
    'import/no-extraneous-dependencies': 'off',
    'func-names': 'off',
    'prefer-arrow-callback': 'off',
    'space-before-function-paren': ['error', 'never'],
    'padded-blocks': 'off',
    'no-unused-expressions': 'off',
    'one-var': 'off',
    'one-var-declaration-per-line': 'off',
    'prefer-template': 'off'
  }
};