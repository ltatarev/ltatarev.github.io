import { UPDATED_ISO } from './(product)/moviest/facts';

const SITE = 'https://ltatarev.github.io';

// The date the Moviest facts last changed. The legal pages keep their own dates.
const MOVIEST_UPDATED = new Date(UPDATED_ISO);

export const dynamic = 'force-static';

export default function sitemap() {
  return [
    { url: `${SITE}/`, priority: 1 },
    { url: `${SITE}/paper/`, priority: 0.6 },
    { url: `${SITE}/lumee/`, priority: 0.5 },
    { url: `${SITE}/lumee/privacy-policy/`, priority: 0.3 },
    { url: `${SITE}/lumee/terms-of-service/`, priority: 0.3 },
    { url: `${SITE}/photo-cleanup/`, priority: 0.5 },
    { url: `${SITE}/photo-cleanup/privacy-policy/`, priority: 0.3 },
    { url: `${SITE}/photo-cleanup/terms-of-service/`, priority: 0.3 },
    { url: `${SITE}/keepsake/`, priority: 0.5 },
    { url: `${SITE}/keepsake/privacy-policy/`, priority: 0.3 },
    { url: `${SITE}/keepsake/terms-of-service/`, priority: 0.3 },
    { url: `${SITE}/moviest/`, priority: 0.5, lastModified: MOVIEST_UPDATED },
    { url: `${SITE}/moviest/features/`, priority: 0.5, lastModified: MOVIEST_UPDATED },
    { url: `${SITE}/moviest/import/`, priority: 0.4, lastModified: MOVIEST_UPDATED },
    { url: `${SITE}/moviest/compare/`, priority: 0.4, lastModified: MOVIEST_UPDATED },
    { url: `${SITE}/moviest/facts/`, priority: 0.4, lastModified: MOVIEST_UPDATED },
    { url: `${SITE}/moviest/privacy-policy/`, priority: 0.3 },
    { url: `${SITE}/moviest/terms-of-service/`, priority: 0.3 },
  ];
}
