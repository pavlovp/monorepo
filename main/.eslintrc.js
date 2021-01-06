
const prettierConfig = {
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 100,
};

console.log('eslintrc!');

module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: ['plugin:@typescript-eslint/recommended'], // this is optional 
  rules: {
    'prettier/prettier': ['error', prettierConfig],
    '@typescript-eslint/explicit-module-boundary-type':  'off'
  },
  env:{
    node: "true"
  }
}

/*
const makeConfig = (isProd) => {
    return {
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
      ],
      plugins: ['@typescript-eslint', 'prettier'],
      ignorePatterns: ['node_modules/*', 'dist/*'],
      env: {
        browser: true,
        jasmine: true,
        jest: true,
      },
      rules: {
        'prettier/prettier': ['error', prettierConfig],
        'react/prop-types': 0,
        'no-use-before-define': 'off',
      },
      settings: {
        'import/resolver': { node: { extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'] } },
      },
      parser: '@typescript-eslint/parser'
    };
  }
  */