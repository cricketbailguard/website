# Bail Guard — cricketbailguard.org

Source for the Bail Guard website: a single place that tells the whole story of a
retrofit safety tether for cricket bails, so it can be shared as **one link**
instead of fifteen.

**A project by Aashi Anup and Anish Anup.**

## What this is

A static site, hosted free on GitHub Pages at `cricketbailguard.org`. No build
step, no framework — plain HTML and CSS, so it stays fast and easy to change.

## Related

| | |
|---|---|
| Defensive publication | https://doi.org/10.5281/zenodo.17284396 (concept DOI — always the latest version) |
| Field trial data & tooling | https://github.com/anishanup/cricket-bail-safety-trial-tools |

## Editorial rules

These are not style preferences — they protect the project's credibility. See
[PLAN.md](PLAN.md) for the full list.

1. **No performance claims.** The project does not assert that the device
   prevents any particular injury.
2. The data counts **bail-dislodging dismissals** — moments a guard is *engaged*.
   That is not a count of injuries prevented.
3. Counts are always a **lower bound**, and say so.
4. **Credit both authors** by name.
5. The project **does not propose changing the Laws of Cricket**. It is a retrofit.
6. **Cite every historical claim.**
7. **No personal data** — the site is public and cannot be access-controlled.

## Data

Figures come from `bailguard-totals.json` in the trial-tools repo, produced by its
scrapers from official league scorecards. Keep the site's numbers in step with
that file rather than editing them by hand.

## Local preview

The YouTube embeds do not load over `file://`. Serve over HTTP instead:

```
npx serve .        # or: python -m http.server 8099
```

## Status

Prototype. Hero and data sections built; remaining sections tracked in
[PLAN.md](PLAN.md).
