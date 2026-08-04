import { SiteShell } from '@/components/sections/SiteShell';
import { DocWindow } from '@/components/ui/DocWindow';
import './globals.css';

export const metadata = {
  title: '404 — lucija tatarevic',
};

// Lives at the app root rather than inside (site) so it catches every unmatched
// URL, including the ones under (product) — so it pulls the desktop in itself.
export default function NotFound() {
  return (
    <SiteShell>
      <DocWindow eyebrow="/ error" title="404: not found">
        <p>You just hit a route that doesn’t exist... the sadness.</p>
      </DocWindow>
    </SiteShell>
  );
}
