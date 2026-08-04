import { LegalDoc } from '../LegalDoc';

export const metadata = {
  title: 'Privacy policy — Photo Cleanup',
  description: 'Photo Cleanup collects nothing. Everything happens on your iPhone.',
};

const EMAIL = 'cistern_scooter.8r@icloud.com';

const sections = [
  {
    id: 'who',
    title: 'Who this policy is from',
    body: (
      <>
        <p>
          Photo Cleanup helps you find duplicates, blurry shots, screenshots and large videos in
          your photo library, and delete or sort them. It is published by{' '}
          <strong>Lucija Tatarević</strong>. In this policy, “the app” means the Photo Cleanup
          iPhone app and “we” means the publisher.
        </p>
        <p>
          This policy covers the app itself. It doesn’t cover the App Store, iCloud or anything else
          Apple operates — those are governed by Apple’s own privacy policy.
        </p>
      </>
    ),
  },
  {
    id: 'collect',
    title: 'What we collect',
    body: (
      <>
        <p>
          <strong>Nothing.</strong> The app has no backend. It does not create an account for you,
          does not ask for your name or email address, and does not send us usage data, crash
          reports, device identifiers or advertising identifiers.
        </p>
        <p>
          There is no analytics SDK in the app. There is no tracking. There are no cookies, because
          there is no website component that reads them and no server to send them to.
        </p>
        <p>
          There is no data for us to collect, sell, share or lose, because none of it reaches us. In
          Apple’s App Store privacy terms the app is declared as <strong>Data Not Collected</strong>
          .
        </p>
      </>
    ),
  },
  {
    id: 'photos',
    title: 'What the app can access',
    body: (
      <>
        <p>
          The app requests exactly one permission: access to your <strong>photo library</strong>,
          for reading it and for making the deletions and album changes you confirm. iOS asks for it
          in these words:
        </p>
        <p>
          “Photo Cleanup analyzes your photos on this iPhone to find duplicates, blurry shots,
          screenshots, and large videos, and to sort photos into albums. Nothing is uploaded and no
          account is required.”
        </p>
        <p>
          It never asks for contacts, location, notifications, tracking, the microphone, the camera,
          your calendar, or anything else. You can change or revoke photo access at any time in{' '}
          <strong>Settings → Privacy &amp; Security → Photos</strong>.
        </p>
        <p>
          If you grant <strong>Limited Access</strong> and pick only some photos, the app analyses
          only the photos you picked and says so in its results, rather than pretending it has seen
          your whole library. It offers you the system picker or Settings if you want to widen the
          selection.
        </p>
        <p>
          Photos in your <strong>Hidden</strong> album are excluded entirely — never indexed, never
          analysed, never shown.
        </p>
        <p>
          If you deny access altogether, the app still opens and can be explored using built-in demo
          photos.
        </p>
      </>
    ),
  },
  {
    id: 'analysis',
    title: 'Where the analysis happens',
    body: (
      <>
        <p>
          All of it happens on your iPhone, inside the app, using Apple’s own on-device frameworks.
          That includes:
        </p>
        <ul>
          <li>Duplicate and near-duplicate detection, using Vision feature prints</li>
          <li>Blur and sharpness scoring, from Laplacian variance</li>
          <li>Screenshot, video and file-size detection</li>
          <li>Grouping similar photos together</li>
        </ul>
        <p>
          No photo, thumbnail, feature print, filename or identifier is uploaded for analysis. There
          is no cloud component to upload it to.
        </p>
      </>
    ),
  },
  {
    id: 'device',
    title: 'What is stored on your device',
    body: (
      <>
        <p>
          The app keeps a small amount of working data on the iPhone itself, so it doesn’t have to
          re-analyse your library every time you open it:
        </p>
        <ul>
          <li>
            <strong>Analysis records</strong> — for each photo: a blur score, a Vision feature
            print, the measured file size, and which version of the analysis produced them, stored
            against Apple’s internal photo identifier.
          </li>
          <li>
            <strong>Similarity groups</strong> — which photos were found to resemble each other, and
            how confident the match was.
          </li>
          <li>
            <strong>Scan progress</strong> — so an interrupted scan can resume where it stopped.
          </li>
          <li>
            <strong>Thumbnail cache</strong> — small previews, capped in size and automatically
            purgeable by iOS.
          </li>
          <li>
            <strong>Your decisions and preferences</strong> — what you chose to keep, delete or
            sort, your session history, your settings, and whether the one-time unlock is active.
          </li>
        </ul>
        <p>
          All of it lives inside the app’s own storage on your device. None of it is backed by a
          server. Deleting the app removes all of it.
        </p>
      </>
    ),
  },
  {
    id: 'erase',
    title: 'Clearing what the app stored',
    body: (
      <p>
        You can clear that working data without deleting the app:{' '}
        <strong>Settings → Erase local analysis data</strong>. It erases the analysis records, the
        thumbnail cache, your decision history and the scan state. It never touches your actual
        photos or albums.
      </p>
    ),
  },
  {
    id: 'network',
    title: 'When the app causes network activity',
    body: (
      <>
        <p>
          The app itself makes no network requests and contains no upload path. Two things can still
          cause traffic, and both are performed by Apple rather than by the app:
        </p>
        <ul>
          <li>
            <strong>iCloud photo downloads.</strong> If your library is stored in iCloud and you
            turn on <strong>Analyze iCloud photos</strong> — which is{' '}
            <strong>off by default</strong> — Apple’s Photos framework downloads full-resolution
            copies from your own iCloud account so they can be analysed on the device. This is your
            iCloud account talking to Apple, exactly as it does in the Photos app. It may use mobile
            data.
          </li>
          <li>
            <strong>The App Store.</strong> Buying or restoring the one-time unlock is handled by
            Apple’s payment system.
          </li>
        </ul>
        <p>Neither route sends anything to us.</p>
      </>
    ),
  },
  {
    id: 'deletion',
    title: 'Deleting photos',
    body: (
      <>
        <p>
          The app never deletes anything on its own. Photos you mark for deletion collect in a queue
          that you review, with its exact count and size. When you confirm, iOS shows its own
          separate confirmation and Apple’s Photos framework performs the deletion — the app only
          requests it, then checks the result against your live library and reports only what
          actually happened.
        </p>
        <p>
          Deleted photos go to <strong>Recently Deleted</strong> in the Photos app and stay
          recoverable there for up to 30 days, as with any deletion on iOS. That recovery window is
          controlled by iOS, not by us.
        </p>
      </>
    ),
  },
  {
    id: 'purchase',
    title: 'Payment',
    body: (
      <>
        <p>
          The app is free to use, with a one-time purchase that removes a limit on how many
          deletions you can commit. The purchase is handled entirely by Apple through the App Store
          using Apple’s own payment system, and verified on your device by StoreKit.
        </p>
        <p>
          We never see your name, your email address, your payment details or your billing address.
          The app stores only whether the unlock is active and the displayed price. No receipts or
          identifiers are sent anywhere by the app. Refunds and billing are handled by Apple under
          Apple’s own policies.
        </p>
      </>
    ),
  },
  {
    id: 'third-parties',
    title: 'Third parties',
    body: (
      <>
        <p>
          There are none. The app contains no analytics, advertising, attribution, crash-reporting
          or tracking components, and no third-party accounts, logins or services. Its dependency
          tree contains none of them and it emits no telemetry.
        </p>
        <p>
          Apple is not a third party in the usual sense here — it is the platform. Your use of
          iCloud and the App Store is governed by Apple’s own privacy policy.
        </p>
      </>
    ),
  },
  {
    id: 'rights',
    title: 'Your rights under the GDPR',
    body: (
      <>
        <p>
          The publisher is based in Germany, so the GDPR applies. Under it you have the right to
          access, correct, delete, restrict, port and object to the processing of your personal
          data.
        </p>
        <p>
          In practice there is nothing to exercise those rights against, because we hold no personal
          data about you: no account, no email address, no identifier, no usage record. Any data the
          app creates lives only on your own device, under your own control, and you can erase it at
          any time from Settings or by deleting the app.
        </p>
        <p>
          If you believe personal data has been processed unlawfully, you may complain to a
          supervisory authority in your country of residence.
        </p>
      </>
    ),
  },
  {
    id: 'children',
    title: 'Children',
    body: (
      <p>
        The app is not directed to children under 16 and does not knowingly process any data about
        them. Since it collects no data from anyone, this holds regardless of who is using it.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    body: (
      <p>
        If this policy changes, the updated version is published on this page with a new date. The
        version shown inside the app is the version that shipped with the copy of the app you
        installed; updating the app updates it.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact',
    body: (
      <p>
        Questions about this policy, or about anything above:{' '}
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalDoc
      title="Privacy policy"
      key="privacy-policy"
      lastUpdated="4 August 2026"
      shortVersion={
        <>
          <p>
            Photo Cleanup has no servers, no accounts and no analytics. Every photo you own stays on
            your iPhone. Nothing you photograph, view, keep, delete or sort is ever sent to us or to
            anyone else.
          </p>
          <ul>
            <li>Nothing is uploaded, shared or sold — the app has no upload path at all.</li>
            <li>No sign-in, no email address, no ad identifiers.</li>
            <li>One permission: your photo library. Nothing else is ever requested.</li>
            <li>
              The App Store privacy label for this app is <strong>Data Not Collected</strong>.
            </li>
          </ul>
        </>
      }
      sections={sections}
    />
  );
}
