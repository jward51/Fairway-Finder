# Booking and savings audit — November 4, 2026

The catalog now has 21 courses. Four additions are non-JC: Riverwalk, Mission Trails, The Vineyard at Escondido and Native Oaks. Their map locations are approximate and used only for estimated straight-line distance. Existing Discover filters also control Book & rates and Savings.

## Sources used

| Courses | Official source | Destination / scope |
| --- | --- | --- |
| Torrey North/South | https://www.sandiego.gov/park-and-recreation/golf | City-linked ForeUP 19347/1468; choose North/South and eligible booking category on provider |
| Balboa Park | Same City source | ForeUP 19348/1470 |
| Mission Bay | Same City source | ForeUP 19346/1469 |
| Maderas | https://www.maderasgolf.com/tee-times/ | Course-linked non-member EZLinks portal; separate membership tiers; published fees exclude cart |
| Riverwalk | https://riverwalkgc.com/ | Course-linked EZLinks portal; source also lists twilight/super-twilight options |
| Mission Trails | https://www.missiontrailsgc.com/book-a-tee-time/ | Course-linked TeeItUp standard reservation, 7 days; premium advance options have fees |
| Vineyard | https://www.vineyardatescondido.com/book-a-tee-time/ | Course-linked TeeItUp standard reservation, 7 days; member and senior restrictions apply |
| Native Oaks | https://www.nativeoaksgolfclub.com/faq/ | Official FAQ links Golf with Access with facility filter; paid Oaks Card savings separate from public rates |
| Encinitas | https://www.encinitasranchgolf.com/public-player-tee-times | Public 0–7 day CPS link; separate resident and JC Player categories on official tee-time page |
| Crossings | https://www.thecrossingsatcarlsbad.com/ | Public CPS jcgpub29; separate SoCal/Carlsbad/JC Player links |
| Golf Club of California | https://www.thegolfclubofcalifornia.com/teetimes | Public CPS jcgpub32; Summit and JC Player links separately listed |
| Rancho Bernardo Inn | https://www.ranchobernardoinn.com/rancho-bernardo-inn-golf | Official golf booking page; deepest course-specific CPS destination still unverified |
| Twin Oaks | https://www.jcgolf.com/san-diego-tee-times/san-marcos-ca-golf-courses | Official booking/rate selection page; user-observed SC Resident course/date shortcut separately labeled in JC launcher |

The previous generic JC shortcut pointed to Crossings public booking. The launcher now uses the selected course's sourced destination. Resident and member categories are not selected based solely on a ZIP code. No guessed course IDs or query parameters are added to other providers.

## Savings

- Encinitas: official tee-time page advertises 35% off through November 20, 2026 because greens are recovering; temporary surfaces may be in use. The offer is hidden after its end date. This condition warning is shown with the offer.
- Maderas: official Players Club page advertises a 20% rate reduction within a seven-day window. A paid membership, tier limitations and blackout rules apply. Source: https://www.maderasgolf.com/players-club/ . Public tee-time page lists additional cart charges; compare total cost.
- Native Oaks: official FAQ describes paid Oaks Card savings of 20–25%. No availability or savings for a specific slot are inferred.
- Riverwalk: official home page lists twilight at noon and super twilight at 2 PM when checked. These are rate options, not guaranteed discounts or a price quote.

## Availability access findings

Following official booking links establishes their provenance; it does not establish a working inventory feed. City ForeUP and EZLinks destinations returned 403 to automated browsing. CPS returned a client-rendered shell; Golf with Access returned date/player controls without slot inventory in the fetched response. No real openings or prices were verified for these courses in this audit. The app makes no claims of live in-app results and no test inventory is displayed. Links are a usable handoff to provider-owned live searches, not completion of the aggregation milestone.

The remaining original catalog entries keep their prior official website links and are explicitly labeled as not yet checked for a direct booking route. No production deployment or changes to main are included.
