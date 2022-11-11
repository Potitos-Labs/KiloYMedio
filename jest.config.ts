import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  preset: "ts-jest",
  setupFiles: ["dotenv/config"],
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/src/server/db/singleton.ts"],
  verbose: true,
  coveragePathIgnorePatterns: ["playwright/**/*.ts"],
  testRegex: "src.*\\.(test|spec).(ts|tsx|js)$",
  transform: {
    "^.+\\.(ts|mjs)$": ["ts-jest", {}],
  },
};

export default config;
