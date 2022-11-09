import { configDefaults, defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    include: ["src/**/*.test.tsx"],
    exclude: [
      ...configDefaults.exclude,
      "**/__tests__/**",
      "**/tests-examples/**",
    ],
    environment: "jsdom",
  },
});
