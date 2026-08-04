import { SiteShell } from '@/components/sections/SiteShell';
import '../globals.css';

export default function SiteLayout({ children }) {
  return <SiteShell>{children}</SiteShell>;
}
