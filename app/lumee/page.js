import Link from 'next/link';
import { DocWindow } from '@/components/DocWindow';

export const metadata = {
  title: 'Lumee',
  description: 'Lumee — legal documents.',
};

export default function LumeePage() {
  return (
    <DocWindow eyebrow="/ lumee" title="✨ Lumee">
      <div className="doc-links">
        <Link href="/lumee/privacy-policy/">Privacy Policy</Link>
        <Link href="/lumee/terms-of-service/">Terms of Service</Link>
      </div>
    </DocWindow>
  );
}
