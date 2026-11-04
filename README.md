# Fairway Finder SD

Static iPhone-friendly San Diego golf directory and local watch organizer. Run `npm start` and open http://localhost:8000. No build or runtime dependencies. Run `npm test` for search-contract tests.

The JC tee times tab now prepares a multi-course search with date, golfers, time window and optional USD price cap. **Live inventory is not connected.** No fake slots are shown; the app does not send cancellation alerts. Use the official booking shortcut to check and book. Form selections are retained in memory while navigating tabs; existing launcher preferences and watches remain locally saved as before.

See [provider access findings](docs/PROVIDER-ACCESS.md) for the remaining integration requirements. `availability.js` is an internal filtering contract, not a provider API implementation.

Feature work is for review only and has not been deployed. Keep Cloudflare production unchanged until reviewed. Static assets include the new availability modules and should be uploaded together. Do not deploy repository ZIPs, tests or documentation as public app assets.

Twin Oaks booking uses the course/date destination observed from the user's Noteefy redirect on `jcgsc4.cps.golf`. This skips the Noteefy link but does not guarantee persistent login, correct rate selection or retention through authentication. Golfers and exact slots must still be selected on CPS.
