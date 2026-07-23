export const dynamic = 'force-static';

export default function manifest() {
  return {
    name: 'Lucija Tatarević',
    short_name: 'ltatarev',
    description: 'personal landing page',
    start_url: '/',
    display: 'standalone',
    background_color: '#f3eee2',
    theme_color: '#ca718d',
    icons: [{ src: '/icon.png', sizes: '512x512', type: 'image/png' }],
  };
}
