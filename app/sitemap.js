const SITE = 'https://ltatarev.github.io';

export const dynamic = 'force-static';

export default function sitemap() {
  return [
    { url: `${SITE}/`, priority: 1 },
    { url: `${SITE}/lumee/`, priority: 0.5 },
    { url: `${SITE}/lumee/privacy-policy/`, priority: 0.3 },
    { url: `${SITE}/lumee/terms-of-service/`, priority: 0.3 },
    { url: `${SITE}/photo-cleanup/`, priority: 0.5 },
    { url: `${SITE}/photo-cleanup/privacy-policy/`, priority: 0.3 },
    { url: `${SITE}/photo-cleanup/terms-of-service/`, priority: 0.3 },
    { url: `${SITE}/keepsake/`, priority: 0.5 },
    { url: `${SITE}/keepsake/privacy-policy/`, priority: 0.3 },
    { url: `${SITE}/keepsake/terms-of-service/`, priority: 0.3 },
    { url: `${SITE}/moviest/`, priority: 0.5 },
    { url: `${SITE}/moviest/privacy-policy/`, priority: 0.3 },
    { url: `${SITE}/moviest/terms-of-service/`, priority: 0.3 },
  ];
}
