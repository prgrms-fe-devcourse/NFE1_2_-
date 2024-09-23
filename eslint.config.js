import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettier from "eslint-plugin-prettier";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", "node_modules", "tsconfig.json"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { tsx: true },
      },
    },
    settings: { react: { version: "18.3" } },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "@typescript-eslint": tseslint.plugin,
      prettier,
      react,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      "@typescript-eslint/naming-convention": [
        "error",
        // 인터페이스 이름은 PascalCase를 사용하되, 'I'로 시작하지 않아야 함
        {
          selector: "interface",
          format: ["PascalCase"],
          custom: {
            regex: "^I[A-Z]",
            match: false,
          },
        },

        // 타입 별칭은 PascalCase를 사용해야 함
        {
          selector: "typeAlias",
          format: ["PascalCase"],
        },
      ],

      // 사용하지 않는 변수 검사: '_'로 시작하는 변수는 무시합니다.
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],

      // 함수형 컴포넌트 정의: 화살표 함수를 사용하도록 강제합니다.
      "react/function-component-definition": [
        "error",
        { namedComponents: "arrow-function" },
      ],

      // 이벤트 핸들러 이름 규칙: 'handle'로 시작하고, prop은 'on'으로 시작해야 합니다.
      "react/jsx-handler-names": [
        "error",
        {
          eventHandlerPrefix: "handle",
          eventHandlerPropPrefix: "on",
        },
      ],

      // var 키워드 사용 금지: let이나 const를 사용해야 합니다.
      "no-var": "error",

      // const 사용 권장: 재할당이 없는 변수는 const를 사용해야 합니다.
      "prefer-const": "error",

      // 불필요한 else 구문 제거: if 문에서 return 후 else를 사용하지 않습니다.
      "no-else-return": "error",

      // 중괄호 강제: 모든 제어문에 중괄호를 사용해야 합니다.
      curly: ["error", "all"],

      // 화살표 함수 괄호 사용: 매개변수가 하나여도 항상 괄호를 사용합니다.
      "arrow-parens": ["error", "always"],

      // 중첩된 삼항 연산자 금지: 복잡한 조건은 if-else 구문을 사용합니다.
      "no-nested-ternary": "error",

      // 빈 줄 제한: 연속된 빈 줄은 최대 1개까지만 허용합니다.
      "no-multiple-empty-lines": ["error", { max: 1 }],
    },
  }
);
