/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages serves plain files — no Node server, so export static HTML.
  output: 'export',
  // ltatarev.github.io is a user site served from the domain root, so no basePath.
  images: { unoptimized: true },
  // Emit /about/index.html instead of /about.html so Pages resolves clean URLs.
  trailingSlash: true,
};

export default nextConfig;
