import { EMAIL, Fill, LegalDoc, Table } from '../LegalDoc';

const TITLE = 'Privacy — Moviest';
const DESCRIPTION = 'What Moviest stores, what leaves your phone, and what it never collects.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/moviest/privacy-policy/' },
  openGraph: {
    type: 'article',
    url: '/moviest/privacy-policy/',
    title: TITLE,
    description: DESCRIPTION,
  },
};

const THIRD_PARTIES = [
  {
    key: 'tmdb',
    cells: [
      'TMDB',
      'Film and show catalogue, artwork',
      'The title being looked up, region, and the proxy’s IP',
    ],
  },
  {
    key: 'jw',
    cells: ['JustWatch', 'Streaming availability, via TMDB', 'The same catalogue request'],
  },
  {
    key: 'apple',
    cells: ['Apple', 'Distribution and crash sharing', 'Whatever Apple’s own terms cover'],
  },
  {
    key: 'host',
    cells: [<Fill key="h">Host</Fill>, 'Serving the API proxy', 'Request logs as described above'],
  },
];

const sections = [
  {
    id: 'device',
    title: 'What’s on your device',
    body: (
      <>
        <p>
          Everything you create in Moviest is written to a database on your phone and stays there.
          That includes:
        </p>
        <ul>
          <li>Your watchlist, watched history and per-episode progress</li>
          <li>Ratings, reviews and any lists you make</li>
          <li>App settings — region, streaming services you subscribe to, appearance</li>
          <li>A cache of artwork and title details so screens open without a connection</li>
        </ul>
        <p>
          None of it is uploaded. It is included in your device’s own backup (iCloud or an encrypted
          local backup) if you have backups turned on, because it’s part of the app’s storage — that
          backup is governed by Apple’s terms, not ours.
        </p>
      </>
    ),
  },
  {
    id: 'leaves',
    title: 'What leaves your device',
    body: (
      <>
        <p>Three things, and they’re worth being precise about.</p>

        <h3>Catalogue requests</h3>
        <p>
          To show you a poster, a cast list or a return date, the app requests it from our proxy,
          which passes it to <b>TMDB</b>. Each request carries the title or person being looked up
          and your chosen region. It does not carry your name, an account, an advertising identifier
          or your library. Our proxy keeps standard short-lived server logs — IP address, timestamp,
          path — used to keep the service running and stop abuse, and kept for <Fill>N days</Fill>{' '}
          before deletion.
        </p>

        <h3>Crash and diagnostic reports</h3>
        <p>
          The app ships <b>no crash-reporting or analytics SDK</b>. If you have turned on Apple’s
          own “Share With App Developers” setting, iOS may send us crash logs — device model, OS
          version and a stack trace, with no identifier that points back to you. That sharing is
          Apple’s, it is off unless you opted in, and you can turn it off in{' '}
          <b>Settings → Privacy &amp; Security → Analytics &amp; Improvements</b>.
        </p>

        <h3>App Store activity</h3>
        <p>
          Downloads, updates and any App Store reviews are handled by Apple and covered by Apple’s
          privacy policy. We see only the aggregate figures Apple shows every developer.
        </p>
      </>
    ),
  },
  {
    id: 'never',
    title: 'What we never collect',
    body: (
      <ul>
        <li>Your name, email address or phone number</li>
        <li>Contacts, photos, location, calendar or microphone</li>
        <li>Advertising identifiers, and no cross-app or cross-site tracking</li>
        <li>
          Anything sold or licensed to a data broker — this has never happened and is not a business
          we’re in
        </li>
      </ul>
    ),
  },
  {
    id: 'third',
    title: 'Third parties',
    body: (
      <>
        <Table head={['Who', 'What for', 'What they receive']} rows={THIRD_PARTIES} />
        <p>
          This product uses the TMDB API but is not endorsed or certified by TMDB. Streaming
          availability is provided by JustWatch.
        </p>
      </>
    ),
  },
  {
    id: 'import',
    title: 'Imports',
    body: (
      <p>
        If you import an IMDb export, the CSV file is read <b>on your device</b> and matched against
        the catalogue there. The file is not uploaded, and only the titles you confirm are written
        into your library. Matching a title uses the same catalogue request as any other lookup.
      </p>
    ),
  },
  {
    id: 'rights',
    title: 'Your rights',
    body: (
      <>
        <p>
          Because we hold no personal data about you, most data-protection requests have a short
          answer: there’s nothing on our side to access, correct or export. You can act on
          everything yourself:
        </p>
        <ul>
          <li>
            <b>See it</b> — it’s all in the app, on the Library and You tabs
          </li>
          <li>
            <b>Change it</b> — every rating, review and list is editable
          </li>
          <li>
            <b>Delete it</b> — clear the library in Settings, or delete the app
          </li>
        </ul>
        <p>
          The publisher is based in Germany, so the GDPR applies. The data controller is{' '}
          <b>Lucija Tatarević</b>, <Fill>[postal address]</Fill>. If you’re in the EU or UK and want
          to make a request about the proxy’s server logs, write to the address below. If you
          believe personal data has been processed unlawfully, you may complain to a supervisory
          authority in your country of residence.
        </p>
      </>
    ),
  },
  {
    id: 'children',
    title: 'Children',
    body: (
      <p>
        Moviest isn’t directed at children under 16 and we don’t knowingly collect anything from
        them. Since the app collects no personal data from anyone, there’s nothing on file to
        remove.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    body: (
      <p>
        If this policy changes in a way that affects what the app collects, the date at the top
        changes and the app shows a notice on next launch.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact',
    body: (
      <p>
        Questions about any of this go to <a href={`mailto:${EMAIL}`}>{EMAIL}</a> and get an answer
        from a person.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalDoc
      key="privacy-policy"
      title={
        <>
          What stays on
          <br />
          your phone
        </>
      }
      lede="Moviest has no accounts and no server holding your library. This page says exactly what the app stores, the few things that leave your phone, and what it never collects."
      lastUpdated="5 August 2026"
      shortVersion={
        <ul>
          <li>
            There’s <b>no account</b>, so there’s nothing to sign up with and nothing to leak.
          </li>
          <li>
            Your watchlist, ratings, reviews and lists are stored <b>on your device only</b>.
          </li>
          <li>
            The app asks a catalogue server for film and show data. Those requests carry a title ID,
            not who you are.
          </li>
          <li>Nothing is sold, shared or used for advertising. There are no ads.</li>
          <li>Delete the app and the data goes with it.</li>
        </ul>
      }
      sections={sections}
    />
  );
}
