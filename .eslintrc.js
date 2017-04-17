module.exports = {
    "parser": "babel-eslint",
    "extends": [
      "eslint:recommended",
      "google",
      "plugin:react/recommended",
    ],
    "env": {
      "browser": true,
      "es6": true,
    },
    "parserOptions": {
      "ecmaVersion": 6,
      "sourceType": "module",
      "ecmaFeatures": {
          "jsx": true,
      }
    },
    "plugins": [
      "react",
      "import"
    ],
    "rules": {
      "semi": [2, "never"],
      "require-jsdoc": 0,
      "react/prop-types": 0,
      "react/no-unknown-property": [2, { ignore: ["class"] }],
      "max-len": [2, 100, { "ignoreUrls": true }],
    },
    "globals": {
      "process": true,
      "Stripe": true,
    }
}
