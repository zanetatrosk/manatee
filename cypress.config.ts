import { defineConfig } from "cypress";

export default defineConfig({
  viewportWidth: 1440,
  viewportHeight: 1080,
  e2e: {
    slowTestThreshold: 9000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
    },
  },
});
