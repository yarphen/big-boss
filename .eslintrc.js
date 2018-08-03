module.exports = {
  extends: 'airbnb-base',
  plugins: [
    'async-await',
  ],
  parserOptions: {
    ecmaVersion: 8,
  },
  rules: {
    'object-curly-newline': 0,
    'func-names': 0,
  },
};