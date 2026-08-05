import { EMAIL, LegalDoc } from '../LegalDoc';

const TITLE = 'Terms — Keepsake Journal';
const DESCRIPTION =
  'The terms for using Keepsake Journal: a free, offline journalling app with no account and no purchases.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/keepsake/terms-of-service/' },
  openGraph: {
    type: 'article',
    url: '/keepsake/terms-of-service/',
    title: TITLE,
    description: DESCRIPTION,
  },
};

const sections = [
  {
    id: 'agree',
    title: 'Agreeing to these terms',
    body: (
      <p>
        By installing or using Keepsake Journal you agree to what follows. It is an agreement
        between you and <b>Lucija Tatarević</b> (“we”, “us”). If you do not agree, please don’t use
        the app.
      </p>
    ),
  },
  {
    id: 'licence',
    title: 'Your licence',
    body: (
      <>
        <p>
          We give you a personal, non-exclusive, non-transferable licence to use the app on devices
          you own or control, for as long as these terms are kept. The app is licensed, not sold,
          and we keep ownership of it.
        </p>
        <p>You agree not to:</p>
        <ul>
          <li>copy, sell, rent or redistribute the app;</li>
          <li>reverse engineer, decompile or modify it, except where law allows;</li>
          <li>remove any notice of ownership from it.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'yours',
    title: 'Your writing is yours',
    body: (
      <p>
        <b>You own everything you write, photograph and store in the app.</b> We claim no rights
        over it, no licence to it, and we cannot see it — it never leaves your device. You are
        responsible for what you choose to record.
      </p>
    ),
  },
  {
    id: 'price',
    title: 'Price',
    body: (
      <p>
        The app is free. There are <b>no in-app purchases and no subscriptions</b>, and it makes no
        network requests, so there is nothing in it that can charge you or run up data. If that ever
        changes, it will change in a future version and will not alter what you already have.
      </p>
    ),
  },
  {
    id: 'backups',
    title: 'Backups are your responsibility',
    body: (
      <p>
        Because the app has no server, there is no copy of your journal anywhere but your phone. If
        you lose the device, delete the app or reset it, we cannot recover anything for you. Use the
        app’s export, or keep device backups switched on, if the journal matters to you.
      </p>
    ),
  },
  {
    id: 'updates',
    title: 'Updates and availability',
    body: (
      <p>
        We may update the app, change how features work, or stop distributing it altogether. We’ll
        avoid changes that would strand data you already have, but we don’t promise any particular
        feature will exist forever, or that the app will work on every future version of iOS.
      </p>
    ),
  },
  {
    id: 'warranty',
    title: 'No warranty',
    body: (
      <p>
        The app is provided <b>“as is” and “as available”</b>, without warranty of any kind, express
        or implied, including merchantability, fitness for a particular purpose and
        non-infringement. We don’t warrant that it will be uninterrupted, error-free, or that it
        will preserve your data.
      </p>
    ),
  },
  {
    id: 'liability',
    title: 'Limitation of liability',
    body: (
      <>
        <p>
          To the fullest extent the law allows, we are not liable for any indirect, incidental or
          consequential loss arising from your use of the app, including loss of entries, photos or
          other data. Nothing here limits liability that cannot be limited by law — including for
          death, personal injury or fraud.
        </p>
        <p>
          Some places do not allow certain exclusions, so parts of this section may not apply to
          you. You may also have statutory consumer rights that these terms do not affect.
        </p>
      </>
    ),
  },
  {
    id: 'apple',
    title: 'Apple',
    body: (
      <p>
        These terms are between you and us, not Apple. Apple is not responsible for the app or its
        content, and has no obligation to provide support for it. Apple and its subsidiaries are
        third-party beneficiaries of these terms and may enforce them against you. Your use of the
        app must also follow the App Store Terms of Service.
      </p>
    ),
  },
  {
    id: 'ending',
    title: 'Ending it',
    body: (
      <p>
        You can end this agreement at any time by deleting the app. We may end it if you break these
        terms. Either way, the sections on ownership, warranty and liability survive.
      </p>
    ),
  },
  {
    id: 'law',
    title: 'Governing law',
    body: (
      <p>
        These terms are governed by the laws of <b>Germany</b>. If you’re a consumer in the EU, you
        keep the protections of the law where you live.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to these terms',
    body: (
      <p>
        We may revise this page. The date at the top shows when it last moved, and continuing to use
        the app after a change means accepting the new version.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact',
    body: (
      <p>
        Write to <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
      </p>
    ),
  },
];

export default function TermsOfServicePage() {
  return (
    <LegalDoc
      key="terms-of-service"
      alt
      title={
        <>
          The deal, in
          <br />
          plain terms
        </>
      }
      lede="Keepsake Journal is a small app made by one person. These are the terms you agree to by using it — short, because there isn’t much to it."
      lastUpdated="5 August 2026"
      shortVersion={
        <ul>
          <li>The app is free, and there is nothing in it to buy.</li>
          <li>It runs entirely on your phone and makes no network requests.</li>
          <li>
            What you write is <b>yours</b> — we make no claim to it and cannot see it.
          </li>
          <li>It’s offered as it is, with no promise it keeps working forever.</li>
          <li>Keeping a copy of anything you’d hate to lose is up to you.</li>
        </ul>
      }
      sections={sections}
    />
  );
}
