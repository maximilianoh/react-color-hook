module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb',
  ],
  ignorePatterns: ["node_modules/", "lib/", "bundle/", "devWebpackServer/"],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    allowImportExportEverywhere: true,
    "allowImportExportEverywhere": true
  },
  plugins: [
    'react',
  ],
  rules: {
    //"react/prop-types": 0,
    "react/jsx-props-no-spreading": 0
  },
  "settings": {
    "import/resolver" : {
      "alias" : {
        "map" : [
          ["components","./src/"]
        ],
        "extensions": [".js", ".jsx"]
      }
    }
  }
};
