import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/production",
  use: {
    baseURL: "http://127.0.0.1:4173",
    launchOptions: { executablePath: process.env.CHROME_PATH },
  },
  webServer: {
    command: "python -m http.server 4173 --bind 127.0.0.1 --directory out",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: false,
  },
});
