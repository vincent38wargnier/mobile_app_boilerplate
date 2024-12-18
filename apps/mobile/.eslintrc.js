module.exports = {
  extends: ['universe/native'],
  rules: {
    'prettier/prettier': 0,
    'import/order': 0
  },
  settings: {
    'import/resolver': {
      'babel-module': {}
    }
  }
}; 