import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["src/**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends:
    ["js/recommended"],
    languageOptions: {
      globals: globals.browser,
    }
  },
  {
    files: ["src/**/*.js"],
    languageOptions: {
      sourceType: "module",
      globals: {
        setAttrs: "readonly",
        getAttrs: "readonly",
        getSectionIDs: "readonly",
        startRoll: "readonly",
        finishRoll: "readonly",
        on: "readonly"
      }
    },
    rules: {
      "prefer-const": "error",
      "no-var": "error",
      "curly": "error",
      "newline-before-return": "error"
    }
  },
]);
