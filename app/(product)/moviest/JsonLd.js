// Structured data for search engines and AI assistants. Rendered in the static HTML,
// so a crawler that does not run JavaScript still reads it. The `<` escape stops a
// string in the data from closing the script tag early.
export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
