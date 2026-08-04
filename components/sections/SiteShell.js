import { Dock } from '@/components/sections/Dock';
import { Footer } from '@/components/sections/Footer';
import { MenuBar } from '@/components/sections/MenuBar';
import { Cursor } from '@/components/ui/Cursor';
import { LinkPreview } from '@/components/ui/LinkPreview';
import styles from './SiteShell.module.css';

// The desktop: wallpaper, menu bar, dock and the charm cursor. Everything under
// app/(site) renders inside this, and so does the 404 — which is why the chrome
// lives here rather than in the root layout. The root layout is only the document
// itself, so app/(product) can paint its own surface without fighting this one.
export function SiteShell({ children }) {
  return (
    <>
      <div className={styles.wallpaper} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />
      <MenuBar />
      <main>{children}</main>
      <Footer />
      <Dock />
      <Cursor />
      <LinkPreview />
    </>
  );
}
