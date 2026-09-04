// Moviest on the App Store. One place for the id, so the landing page's buttons and
// the Smart App Banner in the document head can't point at different listings.
export const APP_ID = '6797281738';

// App Analytics campaign attribution. Apple credits a web referral only when the
// link carries the provider id (`pt`), which is personal to the developer account:
// App Store Connect → App Analytics → Acquisition → Campaigns → "Create Campaign".
// Until that id is filled in, the links stay clean rather than carrying a `ct` that
// Apple discards.
const PROVIDER_ID = '';
const CAMPAIGN = PROVIDER_ID ? `pt=${PROVIDER_ID}&ct=website&mt=8` : '';

export const APP_STORE = `https://apps.apple.com/app/id${APP_ID}${CAMPAIGN ? `?${CAMPAIGN}` : ''}`;

// The Smart App Banner iOS Safari draws above the page. `affiliate-data` is where the
// banner carries the same campaign token the link above does.
export const SMART_BANNER = `app-id=${APP_ID}${CAMPAIGN ? `, affiliate-data=${CAMPAIGN}` : ''}`;
