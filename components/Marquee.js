// The band scrolls by translating the track -50%, so the phrases are rendered
// twice to make the loop seamless.
function Phrases() {
  return (
    <span>
      <i>✦</i> let&apos;s build something <i>✦</i> <em>available</em> for work <i>✦</i> react native{' '}
      <i>✦</i> <em>open</em> to collabs <i>✦</i> full-stack javascript <i>✦</i> based in{' '}
      <em>croatia</em>
    </span>
  );
}

export function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="mq-track">
        <Phrases />
        <Phrases />
      </div>
    </div>
  );
}
