# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start                      # dev server on http://localhost:4200
npm run build                  # production build into dist/
npm run watch                  # development build, rebuild on change
npm test                       # Vitest via ng test (watch mode)
npx ng test --watch=false      # single run, use this for verification
npx ng test --watch=false -- -t "should create"   # run tests matching a name
npx prettier --write "src/**/*.{ts,html,scss}"    # no lint setup, Prettier only
```

`scripts/up.bat "message"` is a shortcut for `git add . && git commit -m … && git push`.

## Architecture

Angular 22 single-page portfolio site (`CMW Media`, German copy). Standalone components
throughout, **zoneless** — there is no `zone.js` dependency, so change detection relies on
signals. Prefer `signal`/`computed`/`effect` and the signal-based `input()`, `viewChild()`
APIs over decorators and manual subscriptions.

### No routing

`app.routes.ts` is intentionally empty. Navigation is in-page scrolling: the header calls
`scrollIntoView` on section `id`s, and `scroll-padding-top` in `styles.scss` offsets the
fixed header. Do not introduce routes for new sections.

### Section vs. component split

- `src/app/sections/*` — the page's vertical slices, composed in order in `app.html`
- `src/app/components/*` — reusable pieces (`layout/`, `legal/`, `contact-form/`,
  `youtube-embed/`, `testimonial/`)

### Legal drawer

Imprint and privacy policy are not pages but an overlay driven by `LegalDrawerService`
(`src/app/legal-drawer.ts`), a root-provided signal store. `App` owns all the side effects
around it via `effect()`: body scroll lock, deferred `scrollIntoView` to a target section,
and a `history.pushState` entry so the browser back button closes the drawer. Escape is
handled by a `@HostListener` on `App`. Content is loaded with `@defer (on immediate)`.

Any component can deep-link into the drawer:
`legalDrawer.open('privacy-policy', 'section-youtube')`.

### `private-data.config.ts` is git-ignored

`src/app/private-data.config.ts` exports `LEGAL_DATA` (address, VAT ID, contact) and is
imported by the imprint and privacy-policy components, but `.gitignore` excludes it. **A
fresh clone will not build without it.** The values currently in the working tree are
placeholders (`Straße 123`, `DE999999999`), not real data.

### Styling

SCSS with `src/styles` on the preprocessor include path (`angular.json` →
`stylePreprocessorOptions`), so every component stylesheet starts with:

```scss
@use 'abstracts' as *;
```

`src/styles/abstracts.scss` is the single source of design tokens (`$brand-blue`,
`$general-background-color`, `$radius-card`, …) and the mobile-first breakpoint mixins
`sd` (600px), `md` (768px), `ld` (1024px). Use these rather than raw media queries or
hex literals. Shared mixins: `card-surface`, `card-shadow`, `section-glow`.

Global utility classes (`.container`, `.primary-btn`, `.grey-text`, `.visually-hidden`,
`.header-footer-link`) live in `src/styles.scss` — check there before writing new ones.
Per-component style budget is 4 kB (warning) / 8 kB (error).

### Swiper integration (thumbnail gallery)

`thumbnail-gallery` uses Swiper's **web component**, not the Angular wrapper: the module
calls `registerSwiperElements()` at import time and the component declares
`CUSTOM_ELEMENTS_SCHEMA`. Swiper builds its loop exactly once during init, so the element
carries `init="false"` and is initialized from `afterNextRender()` — after Angular has
rendered the slides into its light DOM. Changing this ordering breaks loop mode.

Because loop mode needs more slides than there are source images, `buildLoopSafeSlides()`
repeats the four thumbnails up to `MIN_SLIDES_FOR_LOOP`. Remove that once enough real
thumbnails exist.

### YouTube embeds are consent-gated

`youtube-embed` renders a placeholder until the user clicks; only then is a
`youtube-nocookie.com` iframe created via `bypassSecurityTrustResourceUrl`. This is a
GDPR requirement for this site — keep the gate when touching video markup.

### Contact form

`contact-form` posts `FormData` to a hard-coded external endpoint
(`https://portfolio.cwgermany.de/send_mail/send_mail.php`). `public/send_mail.php` is the
reference copy of that script; it is deployed separately to the host, not served by this
app. `custom-select` is a hand-rolled `ControlValueAccessor` used for the topic field.

## Conventions

- User-facing copy is German; code, comments, and identifiers are English
- Class names carry no `Component`/`Service` suffix (`ThumbnailGallery`, `LegalDrawerService`
  is the one exception), selector prefix is `app-`
- Template-only members are `protected`, injected dependencies `private`
- Use the built-in control flow (`@if`, `@for`, `@defer`), not `*ngIf`/`*ngFor`
- New files open with a banner comment naming the file — this project uses the boxed form
  (`<!-- ==== \n thumbnail-gallery.html \n ==== -->`), not the plain one-liner
- Prettier: 100 columns, single quotes, Angular HTML parser

## Known state

The generated `.spec.ts` files were never adapted and the suite does **not** compile:
`legal-drawer.spec.ts` imports `LegalDrawer` instead of `LegalDrawerService`, and
`app.spec.ts` still asserts the CLI placeholder heading `Hello, video-portfolio`.

**This is deliberate — leave it alone.** Do not offer to fix or delete these specs. There
is no working test suite in this project; verify changes by running the app, not by
running `ng test`.

## Antwortstil

Arbeite möglichst selbstständig und halte die Kommunikation auf ein Minimum. Diese Regeln
gehen der `## Antwortstil`-Sektion der globalen CLAUDE.md vor.

Erzähle nicht den Denkprozess, Überlegungen oder Zwischenschritte. Nicht erklären:

- was als Nächstes getan wird
- welche Dateien geprüft werden
- interne Überlegungen
- gewöhnliche Tool-Nutzung
- Fortschrittsmeldungen
- offensichtliche Umsetzungsschritte

Analyse und Arbeit möglichst still im Hintergrund durchführen.

Nach Abschluss einer Aufgabe nur mit einer kurzen Zusammenfassung antworten:

- was geändert wurde
- wichtige Probleme oder Entscheidungen
- was manuell noch zu tun ist

Keine ausführlichen Erklärungen, außer sie werden ausdrücklich angefordert. Kurze
Endergebnisse haben Vorrang vor Prozessbeschreibungen. Interne Überlegungen bleiben privat;
keine detaillierten Gedankengänge oder Schritt-für-Schritt-Denkprozesse ausgeben.
