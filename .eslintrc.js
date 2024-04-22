module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ["plugin:@typescript-eslint/recommended", "prettier", "plugin:storybook/recommended"],
    overrides: [
        {
            env: {
                node: true,
            },
            files: ["webpack.config.ts", ".eslintrc.js", ".storybook/preview.ts"],
            parserOptions: {
                sourceType: "script",
            },
        },
    ],
    parserOptions: {
      parser: "@typescript-eslint/parser",
      ecmaFeatures: {
        jsx: true,
      },
      sourceType: "module",
      ecmaVersion: "2020",
    },
    plugins: ["@typescript-eslint", "prettier"],
    rules: {
        "prettier/prettier": "error",
    },
};
