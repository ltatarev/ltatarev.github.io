import Link from 'next/link';
import { Callout, LegalDoc } from '../LegalDoc';

export const metadata = {
  title: 'Terms of service — Photo Cleanup',
  description: 'The end user licence agreement for Photo Cleanup for iPhone.',
};

const EMAIL = 'cistern_scooter.8r@icloud.com';

const sections = [
  {
    id: 'agreement',
    title: 'This agreement',
    body: (
      <>
        <p>
          By downloading, installing or using Photo Cleanup (“the app”), you agree to this End User
          Licence Agreement (“this agreement”) between you and <strong>Lucija Tatarević</strong>{' '}
          (“the publisher”). If you do not agree, do not install or use the app.
        </p>
        <p>
          Questions about any of it: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>
      </>
    ),
  },
  {
    id: 'licence',
    title: 'Licence',
    body: (
      <p>
        The app is licensed to you, not sold. You get a personal, non-exclusive, non-transferable,
        revocable licence to use the app on Apple devices that you own or control, in accordance
        with Apple’s App Store Terms of Service.
      </p>
    ),
  },
  {
    id: 'restrictions',
    title: 'What you may not do',
    body: (
      <ul>
        <li>Rent, lease, lend, sell, redistribute or sublicense the app</li>
        <li>Copy or modify the app, or create works derived from it</li>
        <li>
          Reverse-engineer, decompile or disassemble the app, except to the extent that applicable
          law expressly permits it despite this restriction
        </li>
        <li>Remove or obscure any proprietary notices</li>
      </ul>
    ),
  },
  {
    id: 'deletions',
    title: 'Deleting your photos',
    body: (
      <>
        <Callout>
          <p>
            <strong>This is the most important section of this agreement. Read it.</strong>
          </p>
        </Callout>
        <p>
          The app helps you find photos and videos worth deleting. <strong>You</strong> decide what
          goes. Nothing is deleted without you first reviewing a queue of what you marked,
          confirming it in the app, and then confirming again in the separate dialog that iOS itself
          presents. The app requests the deletion; Apple’s Photos framework performs it.
        </p>
        <p>
          Deletion is real. Deleted items go to <strong>Recently Deleted</strong> in the Photos app
          and remain recoverable there for up to 30 days, after which they are gone permanently. The
          app cannot recover them for you, and neither can the publisher.
        </p>
        <p>
          You are responsible for the deletions you confirm, and for keeping backups of anything you
          care about. The app’s suggestions — that photos look like duplicates, that a shot looks
          blurry, that a video is large — are automated judgements about image data, not statements
          about what matters to you. They can be wrong, and reviewing them is your job.
        </p>
        <p>
          Sorting photos into albums and marking photos as favourites likewise change your photo
          library, and are performed only when you ask for them.
        </p>
      </>
    ),
  },
  {
    id: 'unlock',
    title: 'Free use and the one-time unlock',
    body: (
      <>
        <p>
          The app is free to install and use. Reviewing, browsing, scanning and sorting are not
          limited. There is a limit on how many photo deletions you can commit before a one-time
          purchase is required; that limit is stated in the app.
        </p>
        <p>
          The purchase is a one-time, non-consumable unlock — not a subscription. It does not renew
          and is not billed again. It is processed by Apple through the App Store, and it is tied to
          your Apple Account, so you can restore it on your other devices. The publisher receives no
          payment details.
        </p>
        <p>
          Refunds are handled by Apple under Apple’s policies. The publisher cannot issue or deny
          them.
        </p>
      </>
    ),
  },
  {
    id: 'data',
    title: 'Your data',
    body: (
      <p>
        The app collects nothing about you and sends nothing anywhere. What it stores, it stores on
        your device. This is described in full in the{' '}
        <Link href="/photo-cleanup/privacy-policy/">privacy policy</Link>, which forms part of this
        agreement.
      </p>
    ),
  },
  {
    id: 'support',
    title: 'Availability, maintenance and support',
    body: (
      <>
        <p>
          The publisher is solely responsible for the app and for any maintenance and support for
          it, except where applicable law requires otherwise. Apple has no obligation to provide
          maintenance or support for the app.
        </p>
        <p>
          The app is developed by one person and is offered as-is on a best-effort basis. There is
          no guarantee of updates, of continued availability in the App Store, or of compatibility
          with future versions of iOS.
        </p>
      </>
    ),
  },
  {
    id: 'warranty',
    title: 'Warranty',
    body: (
      <>
        <p>
          The app is provided without any guarantee that it will be uninterrupted, error-free, or
          that its automated suggestions will be accurate.
        </p>
        <p>
          Nothing in this agreement limits your statutory warranty rights as a consumer under
          applicable law. If you are a consumer in the EU, those rights apply in full regardless of
          anything stated here.
        </p>
      </>
    ),
  },
  {
    id: 'liability',
    title: 'Liability',
    body: (
      <>
        <p>
          The publisher is liable without limitation for damages caused intentionally or by gross
          negligence, for injury to life, body or health, and under the German Product Liability Act
          (Produkthaftungsgesetz).
        </p>
        <p>
          For slight negligence, the publisher is liable only where an obligation essential to the
          purpose of this agreement has been breached, and in that case only for damage that was
          foreseeable and typical for this kind of agreement.
        </p>
        <p>
          Any further liability is excluded. This limitation also applies in favour of the publisher
          personally.
        </p>
      </>
    ),
  },
  {
    id: 'apple',
    title: 'Apple',
    body: (
      <>
        <p>
          You acknowledge that this agreement is between you and the publisher, and not with Apple;
          that Apple is not responsible for the app or its content; that in the event of any failure
          of the app to conform to any applicable warranty, Apple may refund the purchase price and
          otherwise has no obligation whatsoever; and that Apple is not responsible for addressing
          any claim by you or a third party relating to the app, including product liability, legal
          or regulatory non-compliance, and intellectual property claims.
        </p>
        <p>
          You confirm that you are not located in a country subject to a US Government embargo or
          designated as a terrorist-supporting country, and that you are not on any US Government
          list of prohibited or restricted parties.
        </p>
        <p>
          Apple and Apple’s subsidiaries are third-party beneficiaries of this agreement and have
          the right to enforce it against you.
        </p>
      </>
    ),
  },
  {
    id: 'termination',
    title: 'Termination',
    body: (
      <p>
        This agreement applies until terminated. Your rights under it end automatically if you
        breach it. You can end it at any time by deleting the app from your devices.{' '}
        <strong>Deleting your photos</strong>, <strong>Warranty</strong>, <strong>Liability</strong>{' '}
        and <strong>Apple</strong> survive termination.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to this agreement',
    body: (
      <p>
        This agreement may be updated. The current version is published on this page. The version
        shown inside the app is the version that shipped with the copy of the app you installed.
        Continued use after an update reaches you constitutes acceptance of it.
      </p>
    ),
  },
  {
    id: 'law',
    title: 'Governing law',
    body: (
      <>
        <p>
          This agreement is governed by the laws of the Federal Republic of Germany, excluding its
          conflict-of-law rules and the UN Convention on Contracts for the International Sale of
          Goods.
        </p>
        <p>
          If you are a consumer, this choice of law does not deprive you of the protection of
          mandatory provisions of the law of the country in which you have your habitual residence.
        </p>
      </>
    ),
  },
  {
    id: 'severability',
    title: 'Severability',
    body: (
      <p>
        If any provision of this agreement is found invalid or unenforceable, the rest remains in
        force.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact',
    body: (
      <p>
        Questions about this agreement: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
      </p>
    ),
  },
];

export default function TermsOfServicePage() {
  return (
    <LegalDoc
      title="Terms of service"
      key="terms-of-service"
      lastUpdated="4 August 2026"
      shortVersion={
        <>
          <p>
            The app is licensed to you, not sold. It is free to install, with a one-time unlock once
            you pass a deletion limit. You decide what gets deleted, and nobody can undo it for you
            — keep a backup of anything you’d hate to lose.
          </p>
          <ul>
            <li>Every deletion is confirmed twice: once in the app, once by iOS.</li>
            <li>Deleted photos sit in Recently Deleted for 30 days, then they’re gone.</li>
            <li>The unlock is a single purchase, not a subscription. Refunds are Apple’s.</li>
            <li>Nothing about you is collected or sent anywhere.</li>
          </ul>
        </>
      }
      sections={sections}
    />
  );
}
