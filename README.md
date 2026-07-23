# 💫 ltatarev.github.io

[![GitHub Pages](https://github.com/ltatarev/ltatarev.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/ltatarev/ltatarev.github.io/actions/workflows/deploy.yml)
![eslint](https://user-images.githubusercontent.com/38048916/207945659-c4ed8358-6824-4aa1-9860-652834aa6308.svg)

Personal landing page built with Next.js (App Router), statically exported and deployed to GitHub Pages.

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export to ./out
npm run lint
```

## Structure

```
app/          routes (/, /lumee, /lumee/privacy-policy, /lumee/terms-of-service) + globals.css
components/   UI — MenuBar, Hero/Scrapbook, Finder, ControlCenter, Reminders, Contact, Dock
lib/          project + experience data, shared clock and reveal hooks
public/       static assets (committed — not a build directory)
```

The design is a desktop-OS pastiche: a menu bar, a Finder window for projects, a Control
Center grid for the about section, a Reminders list for experience, and a Windows 95 dialog
for contact. Styles live in a single `app/globals.css` using CSS custom properties.

## Deployment

Pushes to `main` run `.github/workflows/deploy.yml`, which builds the static export and
publishes `./out` to GitHub Pages. `public/.nojekyll` keeps Pages from stripping `_next/`.

## Useful links

- [meta tags](https://gist.github.com/whitingx/3840905)
- [ogp](https://ogp.me/)
