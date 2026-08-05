import { EMAIL, Fill, LegalDoc } from '../LegalDoc';

const TITLE = 'Terms — Moviest';
const DESCRIPTION = 'The terms you agree to by using Moviest.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/moviest/terms-of-service/' },
  openGraph: {
    type: 'article',
    url: '/moviest/terms-of-service/',
    title: TITLE,
    description: DESCRIPTION,
  },
};

const sections = [
  {
    id: 'what',
    title: 'What Moviest is',
    body: (
      <>
        <p>
          Moviest is a mobile app for tracking films and television — a watchlist, episode progress,
          ratings, reviews and lists, stored on your own device. It’s published by{' '}
          <b>Lucija Tatarević</b> (“we”, “us”) and distributed through the App Store.
        </p>
        <p>It’s free. There’s no account, no subscription and no advertising.</p>
      </>
    ),
  },
  {
    id: 'use',
    title: 'Using the app',
    body: (
      <>
        <p>You may use Moviest for personal, non-commercial purposes. You agree not to:</p>
        <ul>
          <li>Use the app or its API proxy to scrape, bulk-download or resell catalogue data</li>
          <li>Interfere with the service, or try to get around rate limits and access controls</li>
          <li>Reverse-engineer the app except where local law says you may</li>
          <li>Use it in any way that breaks the law where you are, or TMDB’s own terms</li>
        </ul>
        <p>If use from a device is causing harm to the service, we may block it.</p>
      </>
    ),
  },
  {
    id: 'yours',
    title: 'Your library',
    body: (
      <p>
        Your watchlist, ratings, reviews and lists are yours. They’re stored on your device, we
        don’t hold a copy, and we claim no rights over them. We can’t recover them for you either —
        if you delete the app without a device backup, the data goes with it.
      </p>
    ),
  },
  {
    id: 'data',
    title: 'Catalogue data',
    body: (
      <>
        <p>
          Titles, artwork, cast and availability come from <b>TMDB</b> and <b>JustWatch</b> and
          remain the property of their owners. This product uses the TMDB API but is not endorsed or
          certified by TMDB.
        </p>
        <p>
          The data is provided for information only. Streaming availability and release dates change
          constantly and can be wrong — check with the provider before you rely on either.
        </p>
      </>
    ),
  },
  {
    id: 'changes',
    title: 'Changes and availability',
    body: (
      <>
        <p>
          Features may change or be removed, and the app or the service behind it may be unavailable
          at times. We may stop offering Moviest altogether; if that happens we’ll give notice in
          the app where we reasonably can, so you have time to export or note anything you want to
          keep.
        </p>
        <p>
          If these terms change materially, the date at the top changes and the app shows a notice
          on next launch. Continuing to use the app after that means you accept the new terms.
        </p>
      </>
    ),
  },
  {
    id: 'warranty',
    title: 'No warranty',
    body: (
      <p>
        Moviest is provided <b>“as is”</b>, without warranties of any kind, express or implied,
        including fitness for a particular purpose and uninterrupted or error-free operation. Some
        jurisdictions don’t allow certain exclusions, so parts of this may not apply to you, and
        your statutory consumer rights are unaffected.
      </p>
    ),
  },
  {
    id: 'liability',
    title: 'Liability',
    body: (
      <p>
        To the extent the law allows, we’re not liable for indirect or consequential loss, or for
        lost data — including a library lost with an uninstalled app or a device without a backup.
        Nothing here limits liability for death, personal injury, or anything else that can’t be
        limited by law.
      </p>
    ),
  },
  {
    id: 'law',
    title: 'Governing law',
    body: (
      <>
        <p>
          These terms are governed by the laws of <b>Germany</b>, and disputes go to the courts of{' '}
          <Fill>[city]</Fill>. If you’re a consumer in the EU, you keep the protections of the law
          where you live.
        </p>
        <p>
          Apple is not a party to these terms and has no obligation to support the app. Apple and
          its subsidiaries are third-party beneficiaries and may enforce these terms against you.
        </p>
      </>
    ),
  },
  {
    id: 'contact',
    title: 'Contact',
    body: (
      <p>
        Write to <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. Postal address:{' '}
        <Fill>[required for an imprint under § 5 DDG]</Fill>.
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
      lede="Moviest is a small app made by one person. These are the terms you agree to by using it — short, because there isn’t much to it."
      lastUpdated="5 August 2026"
      shortVersion={
        <ul>
          <li>Use Moviest for what it’s for. Don’t attack it or abuse the API behind it.</li>
          <li>
            Your library is <b>yours</b> — it lives on your phone and we make no claim to it.
          </li>
          <li>Film and show data comes from TMDB and belongs to its owners, not to us.</li>
          <li>It’s a hobby project, given as-is, with no promise it keeps working forever.</li>
        </ul>
      }
      sections={sections}
    />
  );
}
