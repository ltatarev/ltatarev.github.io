const COLORS = [
  'FF595E',
  'FFCA3A',
  '8AC926',
  '1982C4',
  '6A4C93',
  'F72585',
  '7209B7',
  '4361EE',
  '4CC9F0',
  'FFBE0B',
  'FB5607',
  'FF006E',
  '3A86FF',
];

const OPACITY = '50';

function getRandomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

export function generateRandomBackgroundColor(opacity = OPACITY) {
  return {
    background: `#${getRandomColor()}${opacity}`,
  };
}
