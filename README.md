# BEAM — stealth landing page

The pre-launch site for **BEAM** (Bioengineering & Machine Learning, Europe).
A single static page: centered logo, wordmark, teaser line, and an email signup.
No build step, no framework — just HTML, CSS, and a little vanilla JS.

## Structure

```
public/
├── index.html              # the page (markup + inline SVG logo)
└── static/
    ├── css/styles.css         # all styling, animations, responsive rules
    ├── js/script.js           # email validation + signup success state
    └── img/favicons           # all images for the website
```

Everything that ships to the web lives under `public/`. That folder is the
deploy root — point your host at it and the site is live.

- **`index.html`** — the markup. The logo is an inline `<svg>` so it stays crisp
  at any size and needs no extra requests. References the two static files with
  absolute paths (`/static/styles.css`, `/static/script.js`).
- **`static/styles.css`** — design tokens (colors, type) live in `:root` at the
  top, followed by layout, the load-in animations, and the responsive
  breakpoints. The logo's draw-in animation and the travelling "beam" pulse are
  defined here.
- **`static/script.js`** — handles the signup gesture: validates the email and
  swaps in the success message. Loaded with `defer` so the DOM is ready before
  it runs.

## Fonts

Loaded from Google Fonts via a `<link>` in `index.html`:

- **Fraunces** — the teaser line (soft serif, sets the tone)
- **Space Grotesk** — the BEAM wordmark and UI text
- **JetBrains Mono** — small labels and the footer

No font files are vendored; they load over the network.

## Running locally

It's a static site, so any static server works. From the repo root:

```bash
cd public
python3 -m http.server 8000
# open http://localhost:8000
```

Use a server rather than opening `index.html` directly with `file://`, so the
absolute `/static/...` paths resolve correctly.

## Deploying

The site is meant for a static host (GitHub Pages, Cloudflare Pages, Netlify,
etc.). Set the **publish / output directory** to `public`.

- **GitHub Pages** — if serving from a project repo, the site lives under a
  subpath (e.g. `username.github.io/repo/`). In that case the absolute paths
  `/static/...` will resolve to the domain root, not the subpath. Either:
  1. serve from a custom domain / user-root repo so the site is at `/`, or
  2. change the two references in `index.html` to relative paths
     (`static/styles.css` and `static/script.js`) and the favicon/share links
     accordingly.
- **Cloudflare Pages / Netlify** — set the build command to none and the output
  directory to `public`. Absolute paths work as-is.

## Connecting the signup

The form currently validates the email and shows a success state, but does
**not** send the address anywhere yet. To wire it up, edit
`static/script.js` — there's a clearly marked block inside `submit()`:

```js
// WIRE UP BACKEND HERE
// Send `v` (the email) to your Resend endpoint / form handler.
```

Drop in a `fetch()` to your subscribe endpoint (e.g. a small serverless function
that calls Resend) and you're done.

## Status

Stealth. Keep copy vague until launch.
