// src/mocks/browser.js

import { setupWorker } from "msw";

import { handlers as mockHandlers } from "./handlers";

// This configures a Service Worker with the given request handlers.

// src/mocks/browser.js

export const worker = setupWorker(...mockHandlers);
