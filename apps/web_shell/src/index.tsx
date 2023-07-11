import * as Sentry from "@sentry/react";

import  ("./bootstrap");

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.BrowserTracing({
      tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
    }),
    new Sentry.Integrations.GlobalHandlers({
      onunhandledrejection: false,
      onerror: false,
    }),
  ],

  tracesSampleRate: 1.0,
});
