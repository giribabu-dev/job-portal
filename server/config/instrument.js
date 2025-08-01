// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node";
// import {nodeProfilingIntegration} from "@sentry/profiling-node"

Sentry.init({
  dsn: "https://bb0eff95b79d1655fc466a4a30108ebb@o4509768243347456.ingest.us.sentry.io/4509768251867136",
  integrations: [Sentry.mongooseIntegration()],

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});