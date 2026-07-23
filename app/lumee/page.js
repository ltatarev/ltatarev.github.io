import Link from 'next/link';
import { DocLinks, DocWindow } from '@/components/ui/DocWindow';

export const metadata = {
  title: 'Lumee',
  description: 'Lumee — legal documents.',
};

export default function LumeePage() {
  return (
    <DocWindow eyebrow="/ lumee" title="✨ Lumee">
      <DocLinks>
        <Link href="/lumee/privacy-policy/">Privacy Policy</Link>
        <Link href="/lumee/terms-of-service/">Terms of Service</Link>
      </DocLinks>
    </DocWindow>
  );
}
