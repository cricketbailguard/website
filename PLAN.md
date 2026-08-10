# Bail Guard Website — Plan

**Goal:** replace 15 scattered links with **one** URL that tells the whole story, so a
college admissions reader, a league official, a journalist or an engineer can each get
what they need without leaving the page.

**Status:** planning. Nothing built yet.
**Owners:** Aashi Anup and Anish Anup.

---

## 1. Decisions

| Question | Decision | Why |
|---|---|---|
| Domain | **cricketbailguard.org** | "Bail" reads as *bail bonds* to a US audience — the term sits among BailSmart, Bail USA, Bodyguard Bail Bonds. Adding "cricket" disambiguates instantly for readers who don't know the sport, and matches how people actually search ("cricket bail"). `.org` reads public-good, matching a design published free under CC BY 4.0. If `bailguard.org` was already bought, keep it as a redirect. Rejected: `bailguard.cricket` — novel TLDs read as less trustworthy and carry steep renewals. |
| Site branding | **"Bail Guard"** | The domain disambiguates; inside the site the context is obvious from the first line, so the short name stays punchy in the header. |
| Hosting | **GitHub Pages** | Free, free HTTPS, full design control, version-controlled, and the site can be built and tested directly. |
| Repository | **New repo: `bailguard`** | Keep the site separate from `cricket-bail-safety-trial-tools`, which is a data/tooling repo with a scientific purpose. See §6. |
| Branding | **Its own project identity**, not "PieceOfAPie presents" | A neutral domain reads as genuinely co-owned rather than sitting inside one person's personal brand. |
| Credit | **"A project by Aashi Anup and Anish Anup"** on every page, plus an explicit *Our roles* section | Matches Zenodo author order. Specific roles let each person truthfully claim their own contribution. |
| pieceofapie.net | Reframe homepage as a **portfolio**, feature Bail Guard, link out to cricketbailguard.org | Keeps tutorials/VEX IQ as breadth; matures the framing. |

### Costs
- Domain: **~$10–15/year**. This is the only cost.
- Hosting, HTTPS, bandwidth: **free**. Limits are 100 GB/month soft bandwidth, 1 GB site
  size, 10 builds/hour — nowhere near reachable.
- Video costs nothing: it is **embedded from YouTube**, not hosted.

---

## 2. Editorial rules (non-negotiable)

These protect credibility. Any technical reader who finds an overclaim will discount
everything else on the site.

1. **No performance claims.** The repo states the project "does not assert performance
   claims." The site holds the same line.
2. **The data measures bail-dislodging dismissals — moments a guard is *engaged*.**
   It is *not* a count of injuries prevented. Never let the phrasing drift.
3. **Always state that counts are a lower bound.** They miss failed run-out/stumping
   attempts, bowled-off-a-no-ball, and any other ball that hits the stumps.
4. **Credit Aashi equally and by name**, everywhere, including in the page byline.
5. **The project does not propose changing the Laws of Cricket.** It is a retrofit.
6. **Cite every historical claim.** The history section is only an asset if it is right.
7. **No personal data** — no home address, phone number, school schedule. The site is
   fully public and cannot be access-controlled (see §6).

---

## 3. Site architecture — one link, one journey

Single scrolling narrative on the landing page, with deeper pages for those who want more.
Everything embeds **in place**; external links are "go deeper," never "go find out."

### Scroll spine

| # | Section | Contains |
|---|---|---|
| 1 | **Hero** | One-sentence problem, 2-min video inline, headline number, 4 CTAs |
| 2 | **The problem** | Why flying bails injure keepers, close fielders and kids. Short, visceral |
| 3 | **250 years of the wicket** | The history timeline (§4) — the narrative hook |
| 4 | **How it works** | Custom SVG mechanism diagram + explainer video |
| 5 | **See it in real matches** | Match-highlights playlist, embedded |
| 6 | **What the data shows** | Live counters + charts rendered *on the page* |
| 7 | **Free for everyone** | Zenodo DOI badge, CC BY 4.0, why we chose not to patent |
| 8 | **Build your own** | Setup flyer, 1.5-min setup video, package guide — all inline |
| 9 | **The people** | Photo gallery: us, contributors, umpires, leagues (§5) |
| 10 | **Recognition** | Press pull-quote, NTCA banquet video, leagues using it |
| 11 | **Support it** | Petition CTA |
| 12 | **Full library** | All resources, organised — nothing is lost |

### Audience quick-paths
Pinned near the top, because these people need different depths from the same page:
- *"I run a league"* → setup flyer, presentation, cost, adoption steps
- *"I want to build one"* → package guide + setup video
- *"Show me the engineering"* → Zenodo, technical FAQ, trial data
- *"Just show me in 2 minutes"* → the hero video

### Sharing
- Open Graph + Twitter card tags so pasting the URL anywhere renders a preview card
- A downloadable **QR code** and a **one-page PDF brief** for applications, slides and
  interviews (Common App activity fields cap at 150 characters — the one-pager carries
  the rest)

---

## 4. History timeline — "the wicket has always changed"

**The hook:** the third stump exists because in 1775 a bowler complained the wicket was
unfair. Cricket equipment has *always* evolved in response to real problems on the field.
The bail guard continues that tradition — for safety, and **without changing the Laws**.

Tone: light and fun, with real citations.

| When | What | Note |
|---|---|---|
| ~1550s | Earliest definite reference to cricket being played | |
| **1744** | First written Laws. Wicket is **two stumps and one bail**; stumps 22 in, bail 6 in | |
| **22–23 May 1775** | Artillery Ground, London. Five of Kent v Five of Hambledon. Edward "Lumpy" Stevens bowls three balls clean **through** John Small's two stumps without dislodging the bail. The crowd judges it unfair to the bowler; a petition follows and the **third stump** is added | **The fun fact: this is one year before the US Declaration of Independence.** |
| Late 1700s | Third stump — and the second bail — adopted **gradually**; two-stump wickets persisted for years | Must be stated as gradual, not a clean switch |
| 1800s–1900s | Wicket dimensions standardised to the modern 28 in × 9 in | Verify exact figures before publishing |
| 1970s–80s | **Helmets** appear. Initially mocked and resisted; now near-universal | **Strong parallel** — cricket safety gear has a precedent for slow acceptance |
| 2013 | **LED "Zing" bails** adopted in top-flight cricket | Proves bails are not sacred and can be re-engineered |
| **Oct 7, 2025** | Safety-tethered bails defensive publication v1 (Zenodo) | |
| Jan–Feb 2026 | Field trials, GPCC Cup matches | |
| Feb 2026 | NTCA banquet; Star Local Media article | |
| Feb 14, 2026 | Publication v4 (v3.0 + Supplemental FAQ v1.1) | |
| Jun–Aug 2026 | League-scale data: 491 games, 2,582 bail-dislodging dismissals | |

**To verify before publishing:** modern wicket dimensions, helmet adoption dates, Zing
bail introduction year. Everything from 1744/1775 is sourced (see §10).

---

## 5. Photos

A gallery of the two of us and the people who contributed is a genuine asset — it turns
the project from an object into a community effort.

**Before publishing any identifiable photo:**
1. **Get permission** from the people in it. For anyone under 18, ask a parent or guardian.
   Many leagues also have their own photo policy — check with NTCA/GPCC before posting
   match photos of players.
2. **No names without consent.** Prefer "with the umpires at the GPCC Cup final" over
   naming individuals, unless they've agreed.
3. **No identifying details of minors** — no school names, jersey numbers plus full names,
   or locations of practice sessions.

If permission isn't available for a photo, it doesn't go up. There will be plenty that do.

**Technical:** convert to WebP, resize to ~1600 px max, lazy-load. Keeps the site fast and
well inside the 1 GB limit. Every photo gets a caption and alt text.

---

## 6. Technical setup

### Repository
GitHub Pages does **not** provide a repo — you supply one. Two options were considered:

- **Reuse `cricket-bail-safety-trial-tools`** — rejected. It is a focused data/tooling
  repo; mixing in a website muddies its purpose, and the site will churn far more.
- **New repo `bailguard`** — **chosen.** Clean history, own issue tracker, and the trial
  repo stays a citable scientific artifact.

Layout: publish from `main` → `/` (or `/docs`), with `CNAME` containing `cricketbailguard.org`.

### Keeping the data live
The site shows numbers produced by `aggregate_totals.mjs` in the trial repo. To avoid
manual copying, a small **GitHub Action** in the site repo fetches `bailguard-totals.json`
from the trial repo on a schedule and commits it. The page renders from that file and
shows a "last updated" date, so the site visibly stays current.

### DNS (the one manual step)
At GoDaddy, for `cricketbailguard.org`:
- `A` records for the apex → GitHub Pages IPs, **or** `ALIAS`/`ANAME` if offered
- `CNAME` for `www` → `<username>.github.io`
- Then in repo Settings → Pages, set the custom domain and enable **Enforce HTTPS**

Propagation is typically 5–60 minutes; HTTPS can take up to 24 hours to become available.
Exact record values will be supplied at that step.

### Security and access
- **Only accounts with write access can change the site.** Every change is attributed and
  revertible — safer than a drag-and-drop builder.
- **The site is fully public.** Password protection requires GitHub Enterprise Cloud and is
  not planned. This is correct: the goal is to be found.
- A public repo means the *source* is readable and copyable, but not writable by others —
  consistent with a project already published under CC BY 4.0.

---

## 7. Where each existing link goes

| Asset | Lands in |
|---|---|
| 2-min video | Hero, inline |
| Explainer video | How it works |
| Setup flyer (PDF) | Build your own, inline viewer |
| Setup video (1.5 min short) | Build your own |
| Package-making guide (PDF) | Build your own |
| "All about bail guards" playlist | Full library + How it works |
| Match highlights playlist | See it in real matches |
| Zenodo publication | Free for everyone — via **concept DOI** |
| Supplemental technical FAQ | Free for everyone / engineering path |
| GitHub trial repo | What the data shows |
| Star Local Media article | Recognition, as a pull-quote |
| NTCA banquet video | Recognition |
| Petition | Support it (persistent CTA) |
| Presentation (PPTX + PDF) | For leagues |
| Photos | The people |

### Link hygiene
- Use the **concept DOI** `https://doi.org/10.5281/zenodo.17284396` — it always resolves to
  the newest version. The v4 record URL will go stale at v5.
- Replace the `c.org/...` shortlink with the **full change.org URL**. Shorteners look
  untrustworthy and can rot.

---

## 8. Build phases

| Phase | Work | Who |
|---|---|---|
| 0 | Buy `cricketbailguard.org` | Anish |
| 1 | Create `bailguard` repo; build hero + data section as a working prototype | Claude |
| 2 | Review the prototype, redirect on design | Anish + Aashi |
| 3 | Build remaining sections; write all copy | Claude |
| 4 | Collect photos + permissions; write the *Our roles* section | Anish + Aashi |
| 5 | History timeline with citations | Claude |
| 6 | Polish: OG tags, QR, one-page PDF brief, mobile + link check | Claude |
| 7 | Attach domain, enable HTTPS | Anish (DNS) + Claude |
| 8 | Hub-and-spoke: point GitHub README, YouTube descriptions, Zenodo and petition at the site | Both |
| 9 | Reframe pieceofapie.net homepage as portfolio | Anish |

Everything works on the free `*.github.io` URL until Phase 7, so the domain is not blocking.

---

## 9. Anish's action list

1. **Buy `cricketbailguard.org`** (confirm availability at the registrar first — DNS checks
   suggest it is free, but that is a signal, not proof).
2. Gather photos into one folder; start asking permission for the ones with other people.
3. Send any logo, colours, or device photos you want used.
4. Draft, with Aashi, a couple of sentences each on **who did what** — for the *Our roles*
   section.

---

## 10. Sources

- [History of English cricket (1751–1775) — Wikipedia](https://en.wikipedia.org/wiki/History_of_English_cricket_(1751%E2%80%931775))
- [1775 English cricket season — Wikipedia](https://en.wikipedia.org/wiki/1775_English_cricket_season)
- [The incident that led to the middle stump — Cricket Country](https://www.cricketcountry.com/articles/the-incident-that-led-to-the-middle-stump-in-cricket-495539/)
- [Laws of Cricket — Wikipedia](https://en.wikipedia.org/wiki/Laws_of_Cricket)
- [History of cricket — ICC](https://www.icc-cricket.com/about/cricket/history-of-cricket/early-cricket)
- [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)
- [GitHub Pages visibility](https://docs.github.com/en/pages/getting-started-with-github-pages/changing-the-visibility-of-your-github-pages-site)
- [Managing a custom domain for GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
