import Link from 'next/link';
import { EMAIL, LegalDoc } from '../LegalDoc';

export const metadata = {
  title: 'Privacy policy — Lumee',
  description:
    'How Lumee handles your data: on your device, in your own iCloud, and nowhere else. Plus exactly what the analytics and crash reporting do send.',
};

const sections = [
  {
    id: 'who',
    title: 'Who we are',
    body: (
      <>
        <p>
          <strong>Lucija Tatarević</strong> is responsible for the Lumee app and for this policy.
          You can reach us at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>
        <p>
          This policy covers the app itself. It doesn’t cover the App Store or iCloud — those are
          Apple’s, and Apple’s own privacy policy governs them.
        </p>
      </>
    ),
  },
  {
    id: 'storage',
    title: 'What Lumee stores, and where',
    body: (
      <>
        <p>
          Everything you create in Lumee — your grid order, placeholders, captions, hashtag sets,
          planned dates and the photos you add — is stored locally on your device.
        </p>
        <p>
          If iCloud Drive is enabled, that same data is also written to your private iCloud
          container so it can reach your other devices and survive a reinstall. This uses your Apple
          Account. We have no access to it, and Apple’s terms and privacy policy apply to that
          storage.
        </p>
        <p>
          Lumee does not upload your content to any server operated by us. There is no Lumee account
          to create.
        </p>
      </>
    ),
  },
  {
    id: 'permissions',
    title: 'Permissions the app asks for',
    body: (
      <>
        <ul>
          <li>
            <strong>Photos.</strong> To let you pick images for your plan. Lumee reads only the
            photos you choose, and copies them into its own storage on your device.
          </li>
          <li>
            <strong>Notifications.</strong> Only if you turn on a reminder for a planned post.
            Reminders are scheduled locally on your device.
          </li>
        </ul>
        <p>You can change or withdraw either permission at any time in the iOS Settings app.</p>
      </>
    ),
  },
  {
    id: 'instagram',
    title: 'Instagram',
    body: (
      <p>
        Lumee is a planning tool. It does not ask for your Instagram login, does not connect to your
        Instagram account, and does not post on your behalf. Lumee is not affiliated with, endorsed
        by, or connected to Instagram or Meta Platforms, Inc.
      </p>
    ),
  },
  {
    id: 'purchases',
    title: 'Purchases',
    body: (
      <>
        <p>
          Lumee Pro is a single one-time purchase, handled entirely by Apple through the App Store.
          We never see your card details, your name or your billing address, and there is no account
          with us to create — the app simply checks with Apple whether Pro is unlocked on your
          device.
        </p>
        <p>
          Restoring a purchase, and unlocking Pro through Family Sharing, work the same way: the app
          asks Apple, and Apple answers. We are not told who is in your family group. Refunds and
          billing are handled by Apple under Apple’s own policies. What the purchase costs and what
          it unlocks is set out in the <Link href="/lumee/terms-of-service/">Terms of Service</Link>
          .
        </p>
      </>
    ),
  },
  {
    id: 'analytics',
    title: 'Analytics and crash reporting',
    body: (
      <>
        <p>
          Two things in the app do send data off your device. Neither of them can see what you are
          planning.
        </p>
        <ul>
          <li>
            <strong>Amplitude</strong> receives usage data: which screens you open, which features
            you use, and general device information such as the model and iOS version. We use it to
            work out which parts of the app people get stuck in. It never receives your photos,
            captions, hashtags or planned dates.
          </li>
          <li>
            <strong>Sentry</strong> receives crash and error reports: a crash log, the device and
            system state at that moment, the app version and basic performance data. We use it only
            to find and fix what breaks.
          </li>
        </ul>
        <p>
          Neither is tied to a name or an email address, because the app never asks you for one. The
          data is aggregated and is not used to identify you individually.
        </p>
        <p>
          Lumee contains no advertising SDKs and no ad identifiers, and does not track you across
          other apps or websites. We do not sell this data, share it for advertising, or use it to
          build a profile of you.
        </p>
        <p>
          Both are third-party services processing this data under their own privacy policies:{' '}
          <a href="https://amplitude.com/privacy" target="_blank" rel="noreferrer">
            Amplitude
          </a>{' '}
          and{' '}
          <a href="https://sentry.io/privacy/" target="_blank" rel="noreferrer">
            Sentry
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: 'retention',
    title: 'How long any of it is kept',
    body: (
      <p>
        The usage and crash data above is retained only for as long as it is useful for the purposes
        described, or for as long as the law requires. Everything else — your grid, your captions,
        your photos — never reaches us at all, so there is nothing on our side to keep or to lose.
      </p>
    ),
  },
  {
    id: 'deleting',
    title: 'Deleting your data',
    body: (
      <>
        <p>
          Deleting the app removes its local data from that device. To remove the iCloud copy as
          well, open Settings › your name › iCloud › Manage Account Storage and delete Lumee’s data.
        </p>
        <p>
          For the usage and crash records described above, write to us and we will have them
          deleted.
        </p>
      </>
    ),
  },
  {
    id: 'children',
    title: 'Children',
    body: (
      <p>
        Lumee is not directed at children under 16, and we do not knowingly collect any information
        from them.
      </p>
    ),
  },
  {
    id: 'rights',
    title: 'Your rights',
    body: (
      <>
        <p>
          The publisher is based in Germany, so the GDPR applies. Under it you have the right to
          access, correct, export, delete, restrict and object to the processing of personal data
          held about you, and to complain to a supervisory authority in your country of residence.
        </p>
        <p>
          In practice this covers the usage and crash records described above — write to us and we
          will act on it. Your Lumee content itself never leaves your device and your own iCloud, so
          you already hold and control all of it.
        </p>
      </>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    body: (
      <p>
        If this policy changes we will update the date at the top of this page and, for anything
        significant, mention it in the app’s release notes.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact',
    body: (
      <p>
        Questions about privacy? Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. We read everything.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalDoc
      title="Privacy Policy"
      lastUpdated="5 August 2026"
      shortVersion={
        <>
          <p>
            <strong>The short version.</strong> Lumee has no accounts and no servers of its own.
            What you plan — your grid, your captions, your photos — stays on your iPhone or iPad,
            and backs up to your own iCloud if you have iCloud Drive switched on.
          </p>
          <p>
            We can’t see any of it, and we don’t sell or share anything about you. The app does send
            anonymous usage and crash data to two services so we can tell what people get stuck in
            and what’s broken — that’s the only thing that ever leaves your device for us, and it’s
            set out in full below.
          </p>
        </>
      }
      sections={sections}
    />
  );
}
