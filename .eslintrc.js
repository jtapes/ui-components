module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/typescript/recommended',
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    '@typescript-eslint/ban-ts-ignore': 0,
    'no-useless-constructor': 'off',
    'vue/no-v-html': 'off',
    'linebreak-style': ['error', 'unix'],
    'semi': ['error', 'never'],
    'quotes': ['error', 'single'],
    'max-len': [
      'error',
      {
        'code': 100,
        'tabWidth': 2,
        'ignoreComments': true,
        'ignoreTrailingComments': true,
        'ignoreUrls': true
      }
    ],
    'object-curly-spacing': ['error', 'always', { 'objectsInObjects': true } ],
    'vue/object-curly-spacing': ['error', 'always', { 'objectsInObjects': true } ],
    'vue/component-name-in-template-casing': ['error', 'kebab-case', {
      'ignores': []
    }],
    'vue/require-default-prop': 'off',
    'vue/html-self-closing': ['error', {
      'html': {
        'void': 'any',
        'normal': 'always',
        'component': 'always'
      },
      'svg': 'always',
      'math': 'always'
    }],
    'vue/max-attributes-per-line': ['error', {
      'singleline': {
        'max': 3,
        'allowFirstLine': true
      },
      'multiline': {
        'max': 1,
        'allowFirstLine': false
      }
    }],
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/ban-ts-comment': 0
  },
}
