import { DocWindow } from '@/components/DocWindow';

export const metadata = {
  title: '404 — lucija tatarević',
};

export default function NotFound() {
  return (
    <DocWindow eyebrow="/ error" title="404: not found">
      <p>You just hit a route that doesn’t exist... the sadness.</p>
    </DocWindow>
  );
}
