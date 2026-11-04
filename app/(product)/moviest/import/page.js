import { APP_STORE } from '../appstore';
import { PAGE_URL, UPDATED, UPDATED_ISO } from '../facts';
import { JsonLd } from '../JsonLd';
import { LegalDoc } from '../LegalDoc';
import styles from '../legal.module.css';

// The steps match the import sheets in the app (i18n keys
// settings.import.sheet.imdb.steps.* and settings.import.sheet.trakt.steps.*).
// Change both together. Letterboxd import is not shipped: do not add it here
// until it is in the App Store listing.

const TITLE = 'Import your IMDb or Trakt history into Moviest';
const DESCRIPTION =
  'Move your ratings, watch history and watchlist from IMDb or Trakt to Moviest, the free film and TV tracker for iPhone and iPad. Step by step, with the files to pick.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/moviest/import/' },
  openGraph: {
    type: 'article',
    url: '/moviest/import/',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/moviest/og.png'],
  },
};

const IMDB_STEPS = [
  'Open IMDb on the web and go to Your Ratings.',
  'Choose Export. IMDb emails you a download link, usually within a few minutes.',
  'Download the CSV file to your iPhone or iPad. For your watchlist, do the same from the Your Watchlist page.',
  'In Moviest, open the You tab and choose Import from IMDb or Trakt, then Import from IMDb.',
  'Choose the CSV file. Moviest shows how many titles it found before it imports them.',
];

const TRAKT_STEPS = [
  'Open Trakt on the web and go to Settings, then Data.',
  'Ask for an export. Trakt builds a zip of your data and emails you a link when it is ready.',
  'Download the zip and unzip it on your iPhone or iPad, for example in the Files app.',
  'In Moviest, open the You tab and choose Import from IMDb or Trakt, then Import from Trakt.',
  'Choose the JSON files from the folder. Pick them all, or at least the history, ratings and watchlist files.',
];

const howTo = (name, steps, supply) => ({
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name,
  url: `${PAGE_URL}import/`,
  dateModified: UPDATED_ISO,
  supply: [{ '@type': 'HowToSupply', name: supply }],
  tool: [{ '@type': 'HowToTool', name: 'Moviest for iPhone or iPad' }],
  step: steps.map((text, i) => ({ '@type': 'HowToStep', position: i + 1, text })),
});

const Steps = ({ steps }) => (
  <ol className={styles.steps}>
    {steps.map((s) => (
      <li key={s}>{s}</li>
    ))}
  </ol>
);

const sections = [
  {
    id: 'imdb',
    title: 'Import from IMDb',
    body: (
      <>
        <p>
          IMDb does not send its data to other apps directly. You ask IMDb for an export, and it
          sends you a CSV file. Moviest reads your <b>ratings</b> and your <b>watchlist</b>.
        </p>
        <Steps steps={IMDB_STEPS} />
        <p>
          If Moviest says the file is not an IMDb export, make sure you picked the file from the
          Your Ratings or Your Watchlist export, not a list you made yourself.
        </p>
      </>
    ),
  },
  {
    id: 'trakt',
    title: 'Import from Trakt',
    body: (
      <>
        <p>
          Trakt also sends its data as an export: a zip of JSON files. Moviest reads your{' '}
          <b>watch history</b>, <b>ratings</b> and <b>watchlist</b>.
        </p>
        <Steps steps={TRAKT_STEPS} />
      </>
    ),
  },
  {
    id: 'after',
    title: 'After the import',
    body: (
      <ul>
        <li>
          Moviest matches each row to a title in TMDB. Rows it cannot match are kept for you to
          review, so nothing is lost without notice.
        </li>
        <li>Importing the same file again does not make duplicates.</li>
        <li>
          You can stop an import partway. The titles already imported stay in your library, and you
          can run the file again to import the rest.
        </li>
        <li>Importing needs an internet connection to match titles.</li>
        <li>Everything you import stays on your device. Moviest has no account.</li>
      </ul>
    ),
  },
  {
    id: 'other',
    title: 'Other apps',
    body: (
      <p>
        Moviest imports from IMDb and Trakt only. If your history is in another app, check if that
        app can export to Trakt or to an IMDb-style list first. TV Time closed on 15 July 2026, so
        its own export is no longer available.
      </p>
    ),
  },
];

export default function ImportPage() {
  return (
    <>
      <JsonLd
        data={howTo(
          'Import your IMDb ratings and watchlist into Moviest',
          IMDB_STEPS,
          'IMDb CSV export',
        )}
      />
      <JsonLd
        data={howTo('Import your Trakt history into Moviest', TRAKT_STEPS, 'Trakt JSON export')}
      />
      <LegalDoc
        keyTitle="In one paragraph"
        title="Import your IMDb or Trakt history"
        lede="Move your ratings, watch history and watchlist to Moviest. It takes a few minutes, most of it waiting for the export email."
        lastUpdated={UPDATED}
        shortVersion={
          <>
            <p>
              Ask IMDb or Trakt for an export of your data. Download the file it emails you, then
              open Moviest, go to the You tab and choose <b>Import from IMDb or Trakt</b>. Pick the
              file, and Moviest brings in your titles.
            </p>
            <p>
              <a className={styles.cta} href={APP_STORE} target="_blank" rel="noopener noreferrer">
                Get Moviest on the App Store
              </a>
            </p>
          </>
        }
        sections={sections}
      />
    </>
  );
}
