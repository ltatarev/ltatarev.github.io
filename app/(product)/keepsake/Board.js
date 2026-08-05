import { Glyph } from './Glyph';
import { piecePath } from './puzzle';
import styles from './landing.module.css';

// August 2026, as the board might actually look part-way through a month: a few
// patterned pieces, two photos, two sealed, and a scatter of quiet days. Five rows of
// seven is 35 cells for 31 days, so the tail past the 31st stays an empty socket —
// which is how a month that doesn't fill the grid looks in the app.
const COLS = 7;
const ROWS = 5;
const CW = 100;
const CH = 72;
const TAB = 6.5;
const DAYS = 31;

const W = COLS * CW;
const H = ROWS * CH;

// Deterministic knob directions, so the board looks cut rather than random — and so
// the server and the client agree on every path without a hydration pass.
const sign = (a, b, salt) => ((a * 13 + b * 29 + salt * 7) % 5 < 2 ? -1 : 1);

const Hs = [];
const Vs = [];
for (let r = 0; r < ROWS; r += 1) {
  Hs[r] = [];
  Vs[r] = [];
  for (let c = 0; c < COLS; c += 1) {
    Hs[r][c] = sign(r, c, 1);
    Vs[r][c] = sign(r, c, 4);
  }
}

// The signs for cell (r, c), shared by the socket and the piece that lands in it —
// one source, so a piece can never be cut to a shape its own hole doesn't have.
const signsFor = (r, c) => ({
  t: r === 0 ? 0 : -Vs[r - 1][c],
  r: c === COLS - 1 ? 0 : Hs[r][c],
  b: r === ROWS - 1 ? 0 : Vs[r][c],
  l: c === 0 ? 0 : -Hs[r][c - 1],
});

const MID = [2, 11, 17, 28, 30];
const SOFT = [3, 5, 8, 14, 20, 24, 26];
const STRIPE = [1, 13, 25];
const DOT = [7, 22];
const PHOTO = [12, 23];
const SEALED = [6, 19];

function dayLook(n) {
  if (SEALED.includes(n))
    return { fill: 'var(--aug-deep)', ink: 'var(--aug-mist)', kind: 'sealed' };
  if (MID.includes(n)) return { fill: 'var(--aug-mid)', ink: 'var(--aug-deep)', kind: 'solid' };
  if (SOFT.includes(n)) return { fill: 'var(--aug-soft)', ink: 'var(--aug-deep)', kind: 'solid' };
  if (STRIPE.includes(n))
    return { fill: 'url(#kj-stripe)', ink: 'var(--aug-deep)', kind: 'pattern' };
  if (DOT.includes(n)) return { fill: 'url(#kj-dots)', ink: 'var(--aug-deep)', kind: 'pattern' };
  if (PHOTO.includes(n)) return { fill: null, ink: 'var(--aug-deep)', kind: 'photo' };
  return { fill: 'var(--aug-pale)', ink: 'var(--aug-deep)', kind: 'quiet' };
}

/** A stand-in for a pinned photo: sky, sun, hill.
 *
 *  (x, y, w, h) is the piece's own box and everything is composed on it, but the sky
 *  and the foot of the hill are bled `bleed` past it on every side. The art is clipped
 *  to the piece, and a knob's bezier swings about one and a half tabs beyond the edge
 *  it grows from — paint only the box and the knob tips come out hollow, with the empty
 *  socket showing through them. Bleeding the backdrop rather than growing the box is
 *  what keeps the sun off the day's numeral. */
const PhotoArt = ({ x, y, w, h, bleed, seed, clip }) => {
  const x0 = x - bleed;
  const y0 = y - bleed;
  const x1 = x + w + bleed;
  const y1 = y + h + bleed;
  return (
    <g clipPath={clip}>
      <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} fill="var(--aug-accent)" />
      <circle
        cx={x + w * (seed ? 0.68 : 0.3)}
        cy={y + h * 0.32}
        r={Math.min(w, h) * 0.2}
        fill="var(--aug-pale)"
      />
      <path
        d={
          `M ${x0} ${y1}` +
          ` L ${x0} ${y + h * 0.72}` +
          ` Q ${x + w * 0.35} ${y + h * 0.42} ${x + w * 0.62} ${y + h * 0.74}` +
          ` Q ${x + w * 0.82} ${y + h * 0.9} ${x1} ${y + h * 0.66}` +
          ` L ${x1} ${y1} Z`
        }
        fill="var(--aug-deep)"
        opacity=".92"
      />
    </g>
  );
};

// Every cell and every piece, worked out once at module scope. The board is static
// markup — the scroll pass in Landing.js only ever toggles two classes on it.
const CELLS = Array.from({ length: COLS * ROWS }, (_, k) => {
  const r = Math.floor(k / COLS);
  const c = k % COLS;
  return { k, d: piecePath(c * CW, r * CH, CW, CH, signsFor(r, c), TAB) };
});

const PIECES = Array.from({ length: DAYS }, (_, i) => {
  const n = i + 1;
  const r = Math.floor(i / COLS);
  const c = i % COLS;
  const x = c * CW;
  const y = r * CH;
  return { n, x, y, d: piecePath(x, y, CW, CH, signsFor(r, c), TAB), look: dayLook(n) };
});

export function Board({ rootRef }) {
  return (
    <div className={styles.board} ref={rootRef}>
      <svg
        className={styles.boardSvg}
        viewBox={`${-TAB} ${-TAB} ${W + TAB * 2} ${H + TAB * 2}`}
        role="img"
        aria-label="A puzzle board for August 2026 that fills in as the page scrolls."
      >
        <defs>
          <pattern
            id="kj-stripe"
            width="11"
            height="11"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <rect width="11" height="11" fill="var(--aug-pale)" />
            <rect width="5.5" height="11" fill="var(--aug-soft)" />
          </pattern>

          <pattern id="kj-dots" width="13" height="13" patternUnits="userSpaceOnUse">
            <rect width="13" height="13" fill="var(--aug-pale)" />
            <circle cx="6.5" cy="6.5" r="2.6" fill="var(--aug-soft)" />
          </pattern>

          {/* Rounded board edge, the way the app clips it. */}
          <clipPath id="kj-board-clip">
            <rect x="0" y="0" width={W} height={H} rx="16" ry="16" />
          </clipPath>

          {PIECES.filter((p) => p.look.kind === 'photo').map((p) => (
            <clipPath key={p.n} id={`kj-ph-${p.n}`}>
              <path d={p.d} />
            </clipPath>
          ))}
        </defs>

        <g clipPath="url(#kj-board-clip)">
          {/* The empty board first, every cell of it, so a piece always lands in a
              hole that was already there rather than appearing out of nothing. */}
          {CELLS.map((cell) => (
            <path key={cell.k} className={styles.sk} data-socket={cell.k} d={cell.d} />
          ))}

          {PIECES.map(({ n, x, y, d, look }) => (
            <g key={n} className={styles.pc} data-piece={n}>
              {look.kind === 'photo' ? (
                <>
                  <PhotoArt
                    x={x}
                    y={y}
                    w={CW}
                    h={CH}
                    bleed={TAB * 2}
                    seed={n % 2}
                    clip={`url(#kj-ph-${n})`}
                  />
                  <path
                    d={d}
                    fill="none"
                    stroke="var(--aug-deep)"
                    strokeWidth="1.2"
                    strokeOpacity=".55"
                  />
                  {/* A numeral over a photo needs its own ground to sit on. */}
                  <rect
                    x={x + 7}
                    y={y + 8}
                    width="27"
                    height="20"
                    rx="9"
                    fill="var(--aug-pale)"
                    opacity=".92"
                  />
                </>
              ) : (
                <path
                  d={d}
                  fill={look.fill}
                  stroke="var(--aug-deep)"
                  strokeWidth="1.2"
                  strokeOpacity=".55"
                />
              )}

              <text
                className={styles.num}
                x={x + 11}
                y={y + 23}
                fill={look.ink}
                fontWeight={look.kind === 'sealed' ? 500 : 400}
              >
                {n}
              </text>

              {look.kind === 'sealed' && (
                <>
                  <circle cx={x + CW - 24} cy={y + CH - 22} r="9" fill="var(--seal)" />
                  <circle cx={x + CW - 24} cy={y + CH - 22} r="3.4" fill="var(--seal-inner)" />
                </>
              )}
            </g>
          ))}
        </g>
      </svg>

      {/* Deliberately not a live region. It reads as one — a number that changes on
          its own — but it changes on every few pixels of scroll, so announcing it
          would talk over the page for the length of the hero. The board's own
          aria-label already says what is happening. */}
      <p className={styles.count} data-count>
        August 2026 · 0 of {DAYS} placed
      </p>

      <p className={styles.legend}>
        <b>
          <Glyph kind="placed" size={20} /> placed
        </b>
        <i>·</i>
        <b>
          <Glyph kind="sealed" size={20} /> sealed
        </b>
        <i>·</i>
        <b>
          <Glyph kind="quiet" size={20} /> quiet day
        </b>
      </p>
    </div>
  );
}

export const PIECE_COUNT = DAYS;
