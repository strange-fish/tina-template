// .eslintrc.js
module.exports = {
  extends: ['plugin:vue/recommended','prettier',"prettier/standard"],
  plugins: ["vue", "prettier"],
  globals: {
    wx: true
  },
  rules: {
    "vue/html-closing-bracket-newline": 0,
    'vue/attribute-hyphenation': 0,
    'vue/valid-template-root': 0,
    'vue/comment-directive': 0,
    "prettier/prettier": "error",
    "vue/max-attributes-per-line": ["error", {
      "singleline": 5,
      "multiline": {
        "max": 1,
        "allowFirstLine": false
      }
    }],
    "vue/html-self-closing": ["error", {
      "html": {
        "void": "always",
        "normal": "always",
        "component": "always"
      },
      "svg": "always",
      "math": "always"
    }],
    "vue/singleline-html-element-content-newline": 0
  },
  parserOptions: {
    sourceType: "module",
    parser: "babel-eslint"
  },
  env: {
    browser: true
  },
}
