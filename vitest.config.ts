import react from "@vitejs/plugin-react";
import { configDefaults, defineConfig } from "vitest/config";

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
