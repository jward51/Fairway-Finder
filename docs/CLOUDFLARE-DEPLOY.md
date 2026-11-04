# Cloudflare Workers Builds

The existing Worker is weathered-mud-02f5, serving weathered-mud-02f5.colemcg2.workers.dev.

Connect jward51/Fairway-Finder, production branch main, root directory the repository root. Use deploy command `npx wrangler deploy`. The dashboard build command may remain empty: Wrangler runs the custom build command in wrangler.jsonc before deploying. Alternatively set the dashboard build command to `npm run build`; rebuilding the same output is safe.

The build copies only the 13 application assets into dist. Repository ZIPs, tests, documentation and deployment scripts are not served as website files. This is an assets-only Worker; there is no custom Worker handler, database, credential storage or availability backend.

Run `npm run build` locally to validate packaging. Production deployment must be confirmed in Cloudflare's build/deployment logs; a successful Git commit alone is not deployment confirmation.
