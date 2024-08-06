import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js", "**/*.mjs"],
    languageOptions: {
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.browser
      }
    }
  },
  pluginJs.configs.recommended
];
