import Link from 'next/link';
import { EMAIL, LegalDoc } from '../LegalDoc';

export const metadata = {
  title: 'Terms of service — Lumee',
  description: 'The end user licence agreement that applies when you use Lumee.',
};

const sections = [
  {
    id: 'agreement',
    title: 'Agreement',
    body: (
      <p>
        These terms are an End User Licence Agreement between you and{' '}
        <strong>Lucija Tatarević</strong> (“we”, “us”). By downloading, installing or using Lumee
        (“the app”) you agree to them. If you do not agree, please delete the app.
      </p>
    ),
  },
  {
    id: 'licence',
    title: 'Your licence to use Lumee',
    body: (
      <p>
        The app is licensed to you, not sold. You get a personal, non-exclusive, non-transferable,
        revocable licence to use Lumee on Apple devices you own or control, in line with the App
        Store Terms of Service.
      </p>
    ),
  },
  {
    id: 'restrictions',
    title: 'What you may not do',
    body: (
      <>
        <ul>
          <li>Reverse-engineer, decompile or disassemble the app.</li>
          <li>Modify it or create derivative works from it.</li>
          <li>Copy, resell, redistribute or transfer it to anyone else.</li>
          <li>Use it on devices you do not own or control.</li>
          <li>Use it to break the law.</li>
        </ul>
        <p>Except where applicable law expressly permits it despite this restriction.</p>
      </>
    ),
  },
  {
    id: 'content',
    title: 'Your content',
    body: (
      <>
        <p>
          Your photos, captions, hashtags and plans stay yours. We claim no rights over them and,
          since they never reach a server of ours, we have no access to them either.
        </p>
        <p>
          You are responsible for having the right to use the images you add, and for everything you
          eventually publish elsewhere.
        </p>
      </>
    ),
  },
  {
    id: 'data',
    title: 'Data you agree to us collecting',
    body: (
      <p>
        By using the app you consent to the collection of limited, non-personal usage and crash data
        — which screens and features you use, general device and system information, app version and
        performance data — through Amplitude and Sentry. It never includes your photos, captions,
        hashtags or planned dates. This is set out in full in the{' '}
        <Link href="/lumee/privacy-policy/">Privacy Policy</Link>.
      </p>
    ),
  },
  {
    id: 'instagram',
    title: 'Not affiliated with Instagram',
    body: (
      <p>
        Lumee is an independent app. It is not affiliated with, endorsed by, sponsored by or
        connected to Instagram or Meta Platforms, Inc. Lumee does not post to Instagram for you and
        does not access your Instagram account. You remain responsible for following Instagram’s own
        terms when you publish.
      </p>
    ),
  },
  {
    id: 'payment',
    title: 'Purchases and payment',
    body: (
      <>
        <p>
          Lumee Pro is a single one-time, non-consumable in-app purchase. It permanently unlocks
          every Pro feature in the app, including the ones we add later. There is no subscription
          and nothing renews. You can buy it at the end of onboarding, before the home screen opens,
          or later from Settings › Upgrade to Pro. Pro features are enabled straight away once the
          purchase goes through.
        </p>
        <p>
          Lumee Pro costs 6.99 USD, or the equivalent Apple sets for your region — the price shown
          in the app before you confirm is the one you pay. The purchase is made through Apple’s
          In-App Purchase system only and charged to your Apple Account. No account with us is
          required. Refunds are handled by Apple under its own policy.
        </p>
        <p>
          Pro is included in Apple’s Family Sharing, so everyone in your family group can unlock it
          from your single purchase. If you reinstall Lumee, move to another device signed in to the
          same Apple Account, or join the family group later, use Restore Purchases to unlock Pro
          again at no further cost.
        </p>
      </>
    ),
  },
  {
    id: 'backups',
    title: 'Backups are your copy, not ours',
    body: (
      <p>
        Lumee can back up to your iCloud, but that storage belongs to you and depends on your Apple
        Account, your storage limit and your connection. We cannot restore anything for you, and we
        are not responsible for data lost through iCloud, a device failure, or deleting the app.
        Keep your original photos in your photo library.
      </p>
    ),
  },
  {
    id: 'support',
    title: 'Maintenance and support',
    body: (
      <p>
        We are solely responsible for providing maintenance and support for the app, except where
        applicable law requires otherwise. Apple has no obligation to provide any support for it.
        Support requests go to <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
      </p>
    ),
  },
  {
    id: 'changes-app',
    title: 'Changes to the app',
    body: (
      <p>
        We may add, change or remove features, and we may stop supporting older versions of iOS. If
        we ever discontinue Lumee we will say so in the app and in the App Store listing with
        reasonable notice.
      </p>
    ),
  },
  {
    id: 'termination',
    title: 'Termination',
    body: (
      <p>
        This agreement stays in effect until terminated. Your rights under it end automatically if
        you fail to comply with any of its terms. On termination you must stop using the app and
        delete it from your devices.
      </p>
    ),
  },
  {
    id: 'warranty',
    title: 'No warranty',
    body: (
      <p>
        The app is provided “as is” and “as available”. We do our best to keep it stable and
        correct, but we cannot promise it will be free of bugs or available without interruption.
        Nothing here excludes rights you have under mandatory consumer law.
      </p>
    ),
  },
  {
    id: 'liability',
    title: 'Liability',
    body: (
      <p>
        To the extent permitted by law, we are not liable for indirect or consequential loss,
        including lost posts, lost time or lost income arising from your use of the app. Where
        liability cannot be excluded, it is limited to the amount you paid for Lumee.
      </p>
    ),
  },
  {
    id: 'law',
    title: 'Governing law',
    body: (
      <p>
        This agreement is governed by the laws of the Federal Republic of Germany, excluding its
        conflict-of-law rules. If you are a consumer, this choice of law does not deprive you of the
        protection of mandatory provisions of the law of the country in which you have your habitual
        residence.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact',
    body: (
      <p>
        Questions about these terms? Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
      </p>
    ),
  },
];

export default function TermsOfServicePage() {
  return (
    <LegalDoc
      title="Terms of Service"
      lastUpdated="5 August 2026"
      numbered
      shortVersion={
        <p>
          <strong>The short version.</strong> Lumee is a planning tool for your own use. You keep
          everything you make in it, we keep the app running as best we can, and neither of us gets
          to blame the other for what Instagram does.
        </p>
      }
      sections={sections}
    />
  );
}
