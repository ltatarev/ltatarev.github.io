import { EMAIL, LegalDoc } from '../LegalDoc';

const TITLE = 'Privacy — Keepsake Journal';
const DESCRIPTION =
  'Keepsake Journal has no account, no server and no analytics. Everything you write stays on your device.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/keepsake/privacy-policy/' },
  openGraph: {
    type: 'article',
    url: '/keepsake/privacy-policy/',
    title: TITLE,
    description: DESCRIPTION,
  },
};

const sections = [
  {
    id: 'collect',
    title: 'What we collect',
    body: (
      <>
        <p>
          <b>Nothing.</b> The app has no account system, no sign-in and no backend. It does not send
          your entries, photos, settings or usage anywhere, because there is nowhere for it to send
          them.
        </p>
        <p>
          We do not use analytics, crash reporting, advertising identifiers or third-party tracking
          software of any kind.
        </p>
      </>
    ),
  },
  {
    id: 'device',
    title: 'What lives on your device',
    body: (
      <>
        <p>All of it, and only there:</p>
        <ul>
          <li>Your written entries, and the day each belongs to.</li>
          <li>Photos you attach to a day, stored as copies inside the app.</li>
          <li>Which pieces are placed, sealed or left as quiet days.</li>
          <li>Your settings — look, appearance, hemisphere, reminder.</li>
        </ul>
        <p>
          This data is held in the app’s private storage on your phone, which other apps cannot
          read.
        </p>
      </>
    ),
  },
  {
    id: 'offline',
    title: 'Nothing leaves your phone',
    body: (
      <>
        <p>
          Keepsake makes <b>no network requests at all</b>. There is no server behind it, no API to
          call, no sync and no remote configuration. The questions, the twelve months of pigment and
          every board you fill are already in the app when you install it, which is why it works the
          same in airplane mode as it does at home.
        </p>
        <p>
          There are also <b>no in-app purchases and no subscriptions</b>, so the app never handles
          or sees payment information. Nothing about you is collected, so nothing about you can be
          sold, shared or lost in someone else’s breach.
        </p>
      </>
    ),
  },
  {
    id: 'photos',
    title: 'Photos',
    body: (
      <p>
        If you attach a photo, iOS asks your permission first. The app copies the image into its own
        storage so the piece keeps its face even if you later remove the original from your library.
        Copies are never uploaded.
      </p>
    ),
  },
  {
    id: 'notifications',
    title: 'Notifications',
    body: (
      <p>
        The daily reminder is scheduled locally by iOS on your device. It is not a push
        notification, so no server is involved and nothing about your schedule leaves the phone.
        Turning the reminder off cancels it.
      </p>
    ),
  },
  {
    id: 'exports',
    title: 'Exports and device backups',
    body: (
      <>
        <p>
          “Export my data” writes your journal to a file and hands it to the iOS share sheet. Where
          it goes from there is entirely your choice, and once it leaves the app it is covered by
          whatever you share it with rather than by this policy.
        </p>
        <p>
          If you have iCloud Backup or encrypted local backups switched on, iOS may include the
          app’s storage in those backups. That is a setting on your phone, managed by Apple under
          Apple’s terms — we have no access to it and cannot read anything in it.
        </p>
      </>
    ),
  },
  {
    id: 'delete',
    title: 'Deleting everything',
    body: (
      <p>
        Deleting the app from your phone removes its storage and everything in it. There is no copy
        anywhere else for us to delete, and no request to send us. If you keep device backups,
        remove those separately through iOS.
      </p>
    ),
  },
  {
    id: 'rights',
    title: 'Your rights',
    body: (
      <>
        <p>
          Rules such as the GDPR and the CCPA give you rights over personal data a company holds
          about you. We hold none, so there is nothing to request, correct, port or erase. Your
          export and your delete are both in your own hands, inside the app.
        </p>
        <p>
          The publisher is based in Germany, so the GDPR applies. The data controller is{' '}
          <b>Lucija Tatarević</b>. If you believe personal data has been processed unlawfully, you
          may complain to a supervisory authority in your country of residence — though in this case
          there is no processing to complain about.
        </p>
      </>
    ),
  },
  {
    id: 'store',
    title: 'The App Store',
    body: (
      <p>
        Downloading and updating the app happens through Apple, and is covered by Apple’s privacy
        policy rather than this one. We see only the aggregate figures Apple shows every developer.
        If you have turned on Apple’s own “Share With App Developers” setting, iOS may send us crash
        logs — device model, OS version and a stack trace, with no identifier that points back to
        you. That sharing is Apple’s, it is off unless you opted in, and you can turn it off in{' '}
        <b>Settings → Privacy &amp; Security → Analytics &amp; Improvements</b>.
      </p>
    ),
  },
  {
    id: 'children',
    title: 'Children',
    body: (
      <p>
        The app collects no personal data from anyone, of any age. It isn’t directed at children
        under 16, and since nothing is collected there is nothing on file to remove.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes',
    body: (
      <p>
        If a future version of the app changes what it does with your data, this page changes with
        it and the date at the top moves. Material changes will be noted in the App Store release
        notes.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact',
    body: (
      <p>
        Keepsake Journal is made by <b>Lucija Tatarević</b> (“we”, “us”). Questions about anything
        on this page go to <a href={`mailto:${EMAIL}`}>{EMAIL}</a> and get an answer from a person.
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
      lede="Keepsake Journal has no account, no server and no analytics. What you write stays in the app’s own storage on your phone, and we never see it."
      lastUpdated="5 August 2026"
      shortVersion={
        <ul>
          <li>
            There’s <b>no account</b>, so there’s nothing to sign up with and nothing to leak.
          </li>
          <li>
            The app makes <b>no network requests at all</b> — there is no server behind it.
          </li>
          <li>Your entries, photos and finished boards are stored on your device only.</li>
          <li>No analytics, no crash SDK, no advertising identifiers, no trackers.</li>
          <li>Nothing to buy, so no payment information ever passes through the app.</li>
          <li>Export the journal whenever you like; delete the app and the data goes with it.</li>
        </ul>
      }
      sections={sections}
    />
  );
}
