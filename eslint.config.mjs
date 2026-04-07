import nextTypescript from "eslint-config-next/typescript";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript-eslint";
import prettierConfigRecommended from "eslint-plugin-prettier/recommended";
import { fixupConfigRules } from "@eslint/compat";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const patchedConfig = fixupConfigRules([
  ...nextCoreWebVitals,
]);

const config = [
  ...nextTypescript,
  ...patchedConfig,
  ...ts.configs.recommended,
  prettierConfigRecommended,
  { ignores: [".next/*"] }
];

export default config;
