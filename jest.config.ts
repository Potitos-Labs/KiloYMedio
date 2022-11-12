import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  preset: "ts-jest",
  setupFiles: ["dotenv/config"],
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@server/(.*)$": "<rootDir>/src/server/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
  },
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/src/server/db/singleton.ts"],
  verbose: true,
  coveragePathIgnorePatterns: ["playwright/**/*.ts"],
  testRegex: "src.*\\.(test|spec).(ts|js)$",
  transform: {
    "^.+\\.(ts|mjs)$": ["ts-jest", {}],
  },
};

export default config;
