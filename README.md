# Copyisto

Landing page, material-submission form, and legal documents for Copyisto.
Ported from the claude.ai design project `691bddb6-2461-4a79-aa1f-283af5e6c65c`.

Astro 5, TypeScript, plain CSS.
Three prerendered pages, no client framework.

## Running it

Node is installed through nvm and bun lives in `~/.bun/bin`, so neither is on a bare `PATH`:

```sh
export PATH="$HOME/.bun/bin:$HOME/.nvm/versions/node/v24.11.1/bin:$PATH"

bun install
bun run dev        # http://localhost:4321
bun run build      # astro check + astro build
bun run preview
bun run lint       # stylelint, including the <style> block in every .astro
```

## Routes

| Route | Source design file |
|---|---|
| `/` | `Copyisto Landing.dc.html` |
| `/formularz` | `Copyisto Formularz.dc.html` |
| `/regulamin` | `Copyisto Regulamin.dc.html` |

The original `.dc.html` files are kept in `design/` for reference.
They are not built or served.

## How the code is arranged

```
src/
├─ pages/          one .astro per route
├─ layouts/        Base.astro: head, metadata, icons, global stylesheet
├─ components/     one .astro per component: markup, script and scoped styles
├─ content/        every string on the site, typed
├─ lib/            routes.ts for all hrefs, submissions.ts for the backend seam
├─ styles/         global.css: tokens, reset, and the few shared classes
└─ assets/         hero-illustration.svg, inlined at build
```

Every component is a single file.
Its styles live in its own `<style>` block, scoped by Astro, extracted into a real stylesheet at build rather than inlined into the HTML.

All copy lives in `src/content/`.
No Polish text is written inside a component, so wording changes never touch markup.

### Design tokens

Every colour, font, section rhythm and repeated size is a custom property in `src/styles/global.css`.
Components reference them with `var(--…)` and never write a literal.

| Group | Prefix | Example |
|---|---|---|
| Palette and hairlines | `--color-` | `--color-rust`, `--color-rule-30`, `--color-ink-22` |
| Fonts | `--font-` | `--font-serif`, `--font-script`, `--font-sans` |
| Section rhythm | `--space-` | `--space-section`, `--space-column`, `--space-card` |
| Fixed gaps | `--gap-` | `--gap-xs` (12px) through `--gap-2xl` (24px) |
| Body type ramp | `--text-` | `--text-body` (15.5px), `--text-meta` (13.5px) |

**This is enforced, not just documented.**
`bun run lint` fails on a raw hex, an `rgb()`/`hsl()` literal in a colour property, or a bare font stack anywhere outside `global.css`:

```
29:12  ✖  Disallowed hex color "#7c2d12"
30:17  ✖  Use a token for "background" (see :root in src/styles/global.css) instead of a literal value.
```

Two deliberate exceptions.
Display headings keep their `clamp()` at the use site, because each heading level is tuned individually in the design and a shared token would flatten that.
Ten font sizes stay literal because each is used exactly once (the logo, the team avatar, the footer wordmark); a token used once is indirection, not a scale.

### Two scoping rules worth knowing

Astro scopes a component's styles by adding a `data-astro-cid-*` attribute to the elements in *that* component's template.
Two consequences shaped the code:

1. **A parent's scoped styles never reach a child component.**
   Passing `class="hero-eyebrow"` to `<Eyebrow>` and styling `.hero-eyebrow` in the parent silently does nothing, because the rendered element carries the child's id, not the parent's.
   Where a parent genuinely needs to adjust a child, the rule is wrapped in `:global()` and carries a comment saying why.
   Where it was really a variant, it became a prop instead: `PlaceholderTile` has `tone`, `Button` has `compact`.
2. **Anything shared across components has to be global.**
   That is why `global.css` holds the form controls (`.field`, `.check`, `.consent-tag`), the ornament numerals, `.display`, and `.hatch`.
   Everything used by exactly one component stays scoped inside it.

### No client framework

The four interactive pieces are plain `<script>` blocks inside their own components: the mobile drawer, the credits lookup, the newsletter and the upload form.
Together they ship under 2 KB of JavaScript.
An earlier draft kept them as React islands; that pulled in 8 MB of dependencies and undercut the one-file-per-component goal, so React was dropped.

### The backend seam

All three forms reproduce the design's mock behaviour and route through `src/lib/submissions.ts`.
Each function resolves `{ ok: true }` and is marked `TODO`.

`@astrojs/vercel` is already configured, so adding `src/pages/api/upload.ts` with `export const prerender = false` turns it into a Vercel function while the three pages stay static.
Note that the upload accepts files up to 20 MB each, which exceeds a serverless request body limit: the real implementation should mint a signed URL and let the browser upload straight to blob storage.

## Deliberate departures from the design

Everything else is a faithful port.
These three are not.

1. **Mobile navigation.**
   The design hides the nav links below 1090px and the credits button below 620px, leaving phones with no navigation at all.
   A hamburger drawer now carries both, with focus trapping and Escape to close.
   See `src/components/layout/MobileNav.astro`.
2. **Legal page on phones.**
   `/regulamin` had a fixed `220px + 1fr` grid with no media query, leaving roughly 135px of text at 375px.
   It now collapses to one column below 760px, with the document nav as a horizontal row.
   See `src/components/regulamin/DocNav.astro`.
3. **The italic display face.**
   The design asks for IM Fell English, which ships a `latin` subset only, so "drugie życie" rendered its `ż` in a fallback serif mid-word.
   Swapped for EB Garamond italic, the design's own declared fallback, which covers `latin-ext`.
   Fonts are self-hosted through Fontsource.

Four things in the source were not ported because they are dead code:
the `serifFont` font-switcher and its `applySerif()`, `setupReveal()` (whose first statement is `return`), the unused `showUpload` and `showConfidenceLabels` props, and `support.js` (the design tool's own runtime).

## Open items

Content the design leaves blank on purpose.
All of it lives in `src/content/`.

- **Team bios.** `UZUPEŁNIJ OPIS MICHAŁ` and `UZUPEŁNIJ OPIS OLEŚ`, plus two photo placeholders, in `content/team.ts`.
- **Legal blanks.** `[data wejścia w życie]`, `[nazwa podmiotu, adres, NIP]`, and eight `Placeholder prawny` blocks, in `content/legal.ts`.
  The source also skips §5, jumping from §4 to §6; that is left as found.
- **Six placeholder tiles.** Two icons on `/`, three scanning illustrations, and one MusicXML animation, in `content/landing.ts` and `content/formularz.ts`.

### `public/assets/step-02-detection.svg` is incomplete

The design tool caps file reads at 256 KiB and this illustration exceeds it, so only the first 254 KiB could be recovered.
It renders as coloured detection masks over grey blocks, missing the handwritten manuscript underneath.

Export it from the design project and overwrite the file in place.
Nothing else needs to change.
`step-01-scan.svg` came through complete.

### Illustration weight

The two step illustrations are traced bitmaps of about 250 KB each, and the two background illustrations are roughly 100 KB each.
Converting the two traced scans to WebP would cut most of that, at some cost in fidelity.

## Icons

The favicon is the wordmark's alla breve, the cut-time C, redrawn as geometry in `public/icon.svg`.
It is geometry rather than type on purpose: an SVG favicon renders in the visitor's browser, where Bodoni Moda is not installed, so a `<text>` element would fall back to Georgia and draw the wrong shape.

`favicon.ico` (16, 32, 48) and `apple-icon.png` (180, full bleed, since iOS applies its own mask) are both rendered from that one SVG with `rsvg-convert`.
Regenerate them whenever `icon.svg` changes.
