# app icons

One PNG per app in `lib/apps.js`, named after its `slug` — `lumee.png`, `plotted.png`
and so on — then set that entry's `icon` to `/icons/<slug>.png`.

- **1024×1024**, the size App Store Connect wants, so the same file works in both places.
- **Square, unrounded art, edge to edge.** The dock masks it into the squircle itself
  (`--squircle` in `app/globals.css`); art that arrives pre-rounded gets rounded twice
  and the corners go muddy.

Entries with `icon: null` fall back to a gradient placeholder, so the dock stays
complete while art is still being drawn.
