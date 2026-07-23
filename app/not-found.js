import { DocWindow } from '@/components/ui/DocWindow';

export const metadata = {
  title: '404 — lucija tatarevic',
};

export default function NotFound() {
  return (
    <DocWindow eyebrow="/ error" title="404: not found">
      <p>You just hit a route that doesn’t exist... the sadness.</p>
    </DocWindow>
  );
}
