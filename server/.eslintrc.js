module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: [
    '@typescript-eslint',
    'import'
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': [
      'warn',
      {
        ignoreRestArgs: false,
      },
    ],
    'max-len': [
      'error',
      {
        code: 120,
      },
    ],
    'no-unused-vars': 'off',
    'no-restricted-syntax': 'off',
    'no-console': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {},
      node: {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
        ],
      },
    },
  },
};
