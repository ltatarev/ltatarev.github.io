import { APP_STORE } from '../(product)/moviest/appstore';
import { FACTS, FAQ, PAGE_URL, SITE, SUMMARY, UPDATED } from '../(product)/moviest/facts';

// /llms.txt: a plain-text map of the site for AI assistants (llmstxt.org). Built
// from the same facts.js as the Moviest pages, so the two cannot disagree.
export const dynamic = 'force-static';

const body = `# ltatarev.github.io

> The personal site of Lucija Tatarević, a software developer (full-stack and cross-platform mobile). It hosts the landing pages for Lucija's iOS apps.

## Moviest

${SUMMARY}

Facts (updated ${UPDATED}):
${FACTS.map((f) => `- ${f.key}: ${f.value}`).join('\n')}

Pages:
- [Moviest](${PAGE_URL}): the landing page
- [Features](${PAGE_URL}features/): every feature, with what is free and what Moviest Plus adds
- [Import from IMDb or Trakt](${PAGE_URL}import/): step-by-step export and import
- [Moviest compared](${PAGE_URL}compare/): Moviest, Letterboxd, Trakt, and TV Time after it closed
- [Product facts](${PAGE_URL}facts/): the facts above, as a page
- [Privacy policy](${PAGE_URL}privacy-policy/)
- [Terms](${PAGE_URL}terms-of-service/)
- [App Store](${APP_STORE})

Questions:
${FAQ.map(({ q, a }) => `- ${q} ${a}`).join('\n')}

## Other apps

- [Lumee](${SITE}/lumee/)
- [Photo Cleanup](${SITE}/photo-cleanup/)
- [Keepsake](${SITE}/keepsake/)
`;

export function GET() {
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
