module.exports = {
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
          "jsx": true
      }
    },
    "plugins": [
      "react",
      "import"
    ],
    "settings": {
      "react": {
        "createClass": "h",
        "pragma": "Preact",
      }
    },
    "rules": {
      "semi": [2, "never"],
      "require-jsdoc": 0,
      "react/prop-types": 0,
    },
    "globals": {
      "CONFIG": true,
    }
};
