module.exports = {
  env: {
    browser: true,
    node: true
  },
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    semi: ['error', 'always'],
    // 关闭any校验
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off'
  }
};
