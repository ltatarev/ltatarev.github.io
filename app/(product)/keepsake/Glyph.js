import { piecePath } from './puzzle';
import styles from './landing.module.css';

// The standalone pieces: three in the board's legend, and two big enough to carry a
// feature on their own. All five are the same 100-unit box with a knob on top and
// bottom and a socket left and right, so they read as pieces off the same board.
const BOX = 100;
const PAD = 16;
const TAB = 9;
const SIDE = BOX - PAD * 2;
const D = piecePath(PAD, PAD, SIDE, SIDE, { t: 1, r: -1, b: 1, l: -1 }, TAB);

// The wax seal, at whatever size and wherever the glyph wants it.
const Wax = ({ cx, cy, r }) => (
  <>
    <circle cx={cx} cy={cy} r={r} fill="var(--seal)" />
    <circle cx={cx} cy={cy} r={r * 0.375} fill="var(--seal-inner)" />
  </>
);

export function Glyph({ kind, size, className }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox={`0 0 ${BOX} ${BOX}`}
      aria-hidden="true"
    >
      {kind === 'placed' && <path d={D} fill="var(--aug-deep)" />}

      {kind === 'quiet' && (
        <path d={D} fill="var(--aug-pale)" stroke="var(--aug-mid)" strokeWidth="2" />
      )}

      {kind === 'sealed' && (
        <>
          <path d={D} fill="var(--aug-pale)" stroke="var(--wax-rim)" strokeWidth="2" />
          <Wax cx={52} cy={52} r={15} />
        </>
      )}

      {kind === 'loose' && (
        <>
          <path d={D} fill="var(--aug-pale)" stroke="var(--aug-mid)" strokeWidth="1.6" />
          <text className={styles.num} x={PAD + 10} y={PAD + 24} fill="var(--aug-deep)">
            4
          </text>
        </>
      )}

      {/* Sat a few degrees off square, the way a piece pressed shut with a thumb ends
          up. The numeral and the wax rotate with it rather than under it. */}
      {kind === 'bigseal' && (
        <>
          <path
            d={D}
            fill="var(--aug-deep)"
            stroke="var(--wax-rim-2)"
            strokeWidth="1.4"
            transform="rotate(-4 50 50)"
          />
          <g transform="rotate(-4 50 50)">
            <text
              className={styles.num}
              x={PAD + 10}
              y={PAD + 25}
              fill="var(--aug-mist)"
              fontWeight="500"
            >
              6
            </text>
            <Wax cx={62} cy={60} r={17} />
          </g>
        </>
      )}
    </svg>
  );
}
