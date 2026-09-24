/**
 * Tags every symbol in a pdftocairo SVG export with the order the reveal
 * animation shows it in. Staff lines and barlines are the frame
 * (`class="score-frame"`); everything else gets `--i`, its column's index,
 * counted left to right through the top system and then the bottom one.
 *
 * ponytail: tuned to pdftocairo output (flat <path>/<use>, translate-only
 * transforms). A different exporter needs a real SVG parser here.
 */

const SYMBOL = /<(path|use)\b[^>]*?\/>/g;
/** Symbols closer than this (in viewBox units) share a column: a chord, its stems, accidentals. */
const COLUMN_GAP = 7;

interface Symbol {
  tag: string;
  x: number;
  y: number;
  frame: boolean;
}

function attr(tag: string, name: string) {
  return new RegExp(`\\s${name}="([^"]*)"`).exec(tag)?.[1];
}

function measure(tag: string): Symbol {
  if (tag.startsWith('<use')) {
    return { tag, x: Number(attr(tag, 'x')), y: Number(attr(tag, 'y')), frame: false };
  }
  const [, , , , dx = 0, dy = 0] =
    (attr(tag, 'transform') ?? '').match(/-?[\d.]+/g)?.map(Number) ?? [];
  const [x1, y1, x2, y2] = (attr(tag, 'd') ?? '').match(/-?[\d.]+/g)!.map(Number);
  const straight = /^M [\d. ]+L [\d. ]+$/.test(attr(tag, 'd')!.trim());
  const staffLine = straight && Math.abs(y2 - y1) < 0.01 && Math.abs(x2 - x1) > 100;
  const barline = straight && Math.abs(x2 - x1) < 0.01 && Math.abs(y2 - y1) > 50;
  return { tag, x: x1 + dx, y: y1 + dy, frame: staffLine || barline };
}

export function scoreReveal(svg: string) {
  const [width, height] = /viewBox="0 0 ([\d.]+) ([\d.]+)"/.exec(svg)!.slice(1).map(Number);
  const head = svg
    .slice(0, svg.indexOf('</defs>'))
    .replace(/^<\?xml[^>]*>\s*/, '')
    .replace(/ width="[^"]*" height="[^"]*"/, '');
  const body = svg.slice(svg.indexOf('</defs>'));
  const symbols = [...body.matchAll(SYMBOL)].map(([tag]) => measure(tag));

  const order = symbols
    .filter((s) => !s.frame)
    .sort((a, b) => Number(a.y > height / 2) - Number(b.y > height / 2) || a.x - b.x);

  const column = new Map<Symbol, number>();
  let index = -1;
  let start = -Infinity;
  let system = false;
  for (const s of order) {
    const lower = s.y > height / 2;
    if (s.x - start > COLUMN_GAP || lower !== system) {
      index += 1;
      start = s.x;
      system = lower;
    }
    column.set(s, index);
  }

  let n = 0;
  const tagged = body.replace(SYMBOL, (tag, name) => {
    const s = symbols[n++];
    const mark = s.frame ? 'class="score-frame"' : `style="--i: ${column.get(s)}"`;
    return tag.replace(`<${name}`, `<${name} ${mark}`);
  });
  return { svg: head + tagged, width, height, columns: index + 1 };
}
