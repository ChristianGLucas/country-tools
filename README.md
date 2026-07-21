# christiangeorgelucas/country-tools

Composable [Axiom](https://axiom.co) nodes for the ISO 3166-1 **country entity**
itself — code interconversion, name lookup, validation, listing, and static
reference facts. Built for the Axiom marketplace.

This package is deliberately **not** about locale-aware display formatting
(pair with [`christiangeorgelucas/locale-tools`](https://github.com/ChristianGLucas/locale-tools)
for CLDR formatting) and **not** about phone-number parsing (pair with
[`christiangeorgelucas/phone-tools`](https://github.com/ChristianGLucas/phone-tools)
for that) — it is the country code/reference-data surface: what code is this,
what is it called, is it real, and what static facts does it carry.

Every node is stateless, deterministic, and fully offline — no network calls,
no wall-clock, no randomness. All reference data is bundled at build time.
Malformed or unrecognized input returns a structured error, never a crash.

## Nodes

| Node | What it does |
|---|---|
| `ConvertCode` | Convert a code between alpha-2, alpha-3, and numeric form |
| `GetName` | Look up a country's name in a given language |
| `FindCountryByName` | Find countries by (optionally fuzzy) name search |
| `ValidateCountryCode` | Validate whether a string is a real ISO 3166-1 code |
| `ListCountries` | List every country, optionally filtered by continent |
| `GetCallingCode` | Look up a country's calling/dialing code(s) |
| `GetTLD` | Look up a country's ccTLD |
| `GetFlagEmoji` | Compute a country's flag emoji from its code |
| `DetectCountryFromFlag` | Detect a country from its flag emoji |
| `GetRegion` | Map a country to its continent |
| `GetCurrency` | Look up a country's ISO 4217 currency code(s) |
| `GetCountryInfo` | Look up every fact above for one country in a single call |

## Data sources & licenses

- **[i18n-iso-countries](https://github.com/michaelwittig/node-i18n-iso-countries)** (MIT) —
  ISO 3166-1 alpha-2/alpha-3/numeric codes and localized names.
- **[countries-list](https://github.com/annexare/Countries)** (MIT) — capital,
  continent, calling code(s), and ISO 4217 currency code(s) per country;
  documented by its maintainer as compiled from ISO standards, Unicode CLDR,
  and other public (non-share-alike) sources.
- **ccTLD table** — our own small, hand-compiled table of country→TLD
  assignments (bare factual IANA root-zone delegation records, e.g. "GB
  delegates .uk"; source: https://www.iana.org/domains/root/db), not derived
  from any third-party package. We deliberately did **not** wrap any of the
  several third-party "country data" npm packages that bundle richer facts
  (subregion breakdown, ISO 3166-2 subdivisions) because their underlying
  data traces back to OpenStreetMap (ODbL) and/or Wikipedia (CC-BY-SA) —
  share-alike sources that fail this marketplace's permissive-license gate.
  Those facts are intentionally left out of this package rather than shipped
  on a tainted source.

Every third-party dependency here is MIT-licensed with no share-alike
obligations, verified from each project's own `LICENSE` file and repository
history, not merely its package registry metadata.

## License

MIT — see [LICENSE](./LICENSE).
