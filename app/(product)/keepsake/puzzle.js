// Jigsaw geometry, ported from the prototype that drew the board with createElementNS.
//
// One edge is a straight run, a knob, and another straight run. `s` is +1 for a knob
// pointing out of the piece, -1 for a socket, and 0 for a flat board edge. Offsets are
// in units of `tab`, so the same routine draws a 700-unit board and a 20px legend
// glyph — which is what keeps a piece on the board and a piece in the legend visibly
// the same object.
//
// Pure and deterministic, so the paths the server renders are byte-for-byte the ones
// the client would compute and React never has to reconcile the board.
function edge(out, ax, ay, ux, uy, len, s, tab) {
  const nx = -uy;
  const ny = ux;
  const P = (t, o) => {
    const x = ax + ux * len * t + nx * o * s * tab;
    const y = ay + uy * len * t + ny * o * s * tab;
    return `${x.toFixed(2)} ${y.toFixed(2)}`;
  };

  if (!s) {
    out.push(`L ${P(1, 0)}`);
    return;
  }
  out.push(`L ${P(0.34, 0)}`);
  out.push(`C ${P(0.4, 0)} ${P(0.34, -0.78)} ${P(0.42, -1)}`);
  out.push(`C ${P(0.3, -1.67)} ${P(0.7, -1.67)} ${P(0.58, -1)}`);
  out.push(`C ${P(0.66, -0.78)} ${P(0.6, 0)} ${P(0.66, 0)}`);
  out.push(`L ${P(1, 0)}`);
}

/** A piece box (x, y, w, h) with four edge signs {t, r, b, l}. */
export function piecePath(x, y, w, h, sg, tab) {
  const d = [`M ${x} ${y}`];
  edge(d, x, y, 1, 0, w, sg.t, tab);
  edge(d, x + w, y, 0, 1, h, sg.r, tab);
  edge(d, x + w, y + h, -1, 0, w, sg.b, tab);
  edge(d, x, y + h, 0, -1, h, sg.l, tab);
  d.push('Z');
  return d.join(' ');
}
