const SITE = 'https://ltatarev.github.io';

export const dynamic = 'force-static';

export default function sitemap() {
  return [
    { url: `${SITE}/`, priority: 1 },
    { url: `${SITE}/lumee/`, priority: 0.5 },
    { url: `${SITE}/lumee/privacy-policy/`, priority: 0.3 },
    { url: `${SITE}/lumee/terms-of-service/`, priority: 0.3 },
  ];
}
