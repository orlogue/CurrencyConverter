module.exports = {
  parserOptions: {
    ecmaVersion: 'es6',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:react-hooks/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-refresh', 'prettier', 'import'],
  settings: {
    react: {
      version: "detect"
    },
    "import/resolver": {
      "typescript": {}
    }
  },
  rules: {
    'react-hooks/exhaustive-deps': 'off',
    "prettier/prettier": 2,
    "import/order": [
      2,
      {
        "groups": ["external", "builtin", "index", "sibling", "parent", "internal", "type"],
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        },
        "newlines-between": "always-and-inside-groups"
      }
    ]
  }
}
