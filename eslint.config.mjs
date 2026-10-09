import parser from "@typescript-eslint/parser";
import typescript from "@typescript-eslint/eslint-plugin";
import next from "@next/eslint-plugin-next";
import react from "eslint-plugin-react";
import hooks from "eslint-plugin-react-hooks";

export default [{ ignores: [".next/**", ".open-next/**", ".wrangler/**", "node_modules/**"] }, {
  files: ["src/**/*.{ts,tsx,mjs}"],
  languageOptions: { parser, parserOptions: { project: "./tsconfig.json", ecmaVersion: "latest", sourceType: "module" } },
  plugins: { "@typescript-eslint": typescript, "@next/next": next, react, "react-hooks": hooks },
  settings: { react: { version: "detect" } },
  rules: {
    ...typescript.configs.recommended.rules,
    ...next.configs.recommended.rules,
    ...next.configs["core-web-vitals"].rules,
    "react/jsx-key": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "@typescript-eslint/no-unused-expressions": ["error", { allowTernary: true, allowShortCircuit: true }],
  },
}];
