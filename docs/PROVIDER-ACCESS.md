# JC availability milestone — access findings (2026-11-04)

Main is initialized at db05448dc9f0a4c8ff3e00d688b0d1f93198a538 with the uploaded baseline. Feature work must remain separate; no production deployment has been performed.

## What is verified

- Club Prophet offers a technology integration request: https://www.clubprophet.com/contact/integration-request . Its policy prioritizes existing customer demand and mutually beneficial partnerships. Submitting does not guarantee approval.
- JC Golf documents a multi-course view in its own portal for Encinitas, Rancho Bernardo, The Crossings and Twin Oaks: https://www.jcgolf.com/news/how-to-use-jc-golfs-online-tee-time-reservation-system . This does not authorize third-party inventory retrieval. That article does not confirm Golf Club of California is in the same aggregate view.
- An existing partner documents a Club Prophet API endpoint and key obtained from Club Prophet: https://help.campaignpilot.com/app-integrations/using-campaignpilot-with-club-prophet . That integration is for customer/order/gift-card operations; it is NOT evidence of a publicly accessible availability API or the exact credentials needed for this app.
- Club Prophet release notes mention OAuth: https://learn.clubprophet.com/release-notes/2026-q3-release-notes . Delegated linking is a later evaluation; it is not wired into Fairway Finder.

No supported public availability endpoint or permission for Fairway Finder was established. No internal booking API has been reverse-engineered, browser keys copied, or inventory scraped. No live adapter, fake live results, or production background checks are included.

## Request to Club Prophet and JC Golf

Please approve Fairway Finder SD as a read-only, public tee-time availability integration for Twin Oaks, Encinitas Ranch, The Crossings at Carlsbad, Rancho Bernardo Inn, and The Golf Club of California. Bookings, payments and golfer authentication stay on official provider sites.

Please supply or confirm:

1. Written permission to display availability and pricing across those five courses and to poll for openings/cancellations and send user-requested notifications.
2. Supported availability API documentation and version, sandbox and production base URLs, authentication method and required scopes, and how approved credentials are issued. Do not send provider passwords. Provision production credentials through backend secrets, not chat or source control.
3. Facility/tenant and course/tee-sheet identifiers for all five courses, public rate groups, booking horizons, minimum group sizes, taxes/cart/fee semantics, timestamps/time zone, and which availability represents a bookable group together.
4. Allowed polling frequency, rate limits, caching/retention/display requirements, commercial terms, and any availability/cancellation webhook support.
5. Documented official deep-link fields for course/date/player count or a specific slot; otherwise use official landing pages without guessed IDs.

The endpoint/key details above are questions for the provider, not a claim that a particular credential alone unlocks access. A golfer login is insufficient for this integration.

## Next implementation after approval

Build a server-side Cloudflare adapter against the supplied documentation; keep secrets out of frontend assets. Normalize verified inventory into the internal schema in availability.js: courseId, San Diego date/time, availablePlayers, optional numeric pricePerPlayer and currency. Add provider slot IDs, checkedAt timestamps and allowlisted official booking URLs. Keep no-results, partial course failure, stale results and provider errors distinct. Never show an error as zero openings. Validate live samples for all five course mappings and filters before enabling watches.

Only then implement durable per-user watches, scheduled polling or verified webhooks, Web Push subscriptions and atomic notification deduplication. Track stable slot/rate identities and open/closed transitions; retry delivery safely without duplicates. A cancellation inferred from renewed availability is an opening, not proof of why it became available. Failed/partial polls must not mark slots closed. Require confirmed closure before a later reopening can alert again. Credentials and push subscriptions stay server-side. No background scheduler is implemented in this change.

For iPhone, validate actual push delivery with the app installed on the Home Screen, HTTPS, supported iOS, user-initiated permission, service-worker push handling and a backend Web Push sender. A local notification test is not evidence background alerts work.

## ForeUP second

Official partnership entry point: https://www.foreupgolf.com/partner-integrations/ and API terms: https://foreupgolf.com/wp-content/uploads/2024/03/foreUp-API-TOU.pdf . Request City of San Diego approval and provider-issued read-only API access, correct facility/tee-sheet/rate mappings for both Torrey Pines courses, Balboa Park and Mission Bay, residency/rate restrictions, polling rights and approved booking links. No ForeUP scraping or guessed booking endpoints are included.

## Observed Twin Oaks booking destination

The user followed a Noteefy Book link and supplied this final destination:
`https://jcgsc4.cps.golf/onlineresweb/m/search-teetime/default?Date=2026-11-8&CourseId=4`.
The Twin Oaks launcher now constructs links on that exact host/path with CourseId=4 and an optional selected date in the observed format. No time, group size, rate or account parameter is inferred. Other courses retain the original general shortcut. This is a user-observed booking destination, not API documentation or proof parameters survive authentication. Automated browsing could not access the page. The user's Safari session and provider-controlled login/2FA still need on-device testing. The app does not store provider credentials or claim authenticated status.
