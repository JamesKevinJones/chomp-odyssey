// Validates every maze in index.html: 28x31, all pellets reachable, every tile can
// get back to the start through one-way gates, no dead ends, ghost-house exit reachable.
// Run: node tools/check-maps.mjs   (exit code 1 on any problem)
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const src = html.slice(html.indexOf('const LEVELS = ') + 15, html.indexOf('];\n\nconst GHOSTS') + 1);
const LEVELS = Function(`return ${src}`)();

const W = 28, H = 31;
const ONE = { '^': [0, -1], v: [0, 1], '<': [-1, 0], '>': [1, 0] };
const DIRS = [[0, -1], [-1, 0], [0, 1], [1, 0]];
const wx = x => ((x % W) + W) % W;
let failed = false;

for (const [n, L] of LEVELS.entries()) {
  const m = L.map, errs = [];
  if (m.length !== H) errs.push(`rows=${m.length}`);
  m.forEach((r, i) => r.length !== W && errs.push(`row ${i} has ${r.length} cols`));
  const t = (x, y) => (y < 0 || y >= H ? '#' : m[y][wx(x)]);
  const solid = c => c === '#' || c === '-';
  const same = (a, d) => a[0] === d[0] && a[1] === d[1];
  const pass = (x, y, d) => {
    if (solid(t(x + d[0], y + d[1]))) return false;
    const a = ONE[t(x, y)], b = ONE[t(x + d[0], y + d[1])];
    return (!a || same(a, d)) && (!b || same(b, d));
  };
  const bfs = (sx, sy, reverse) => {
    const seen = new Set([`${sx},${sy}`]), q = [[sx, sy]];
    for (let h = 0; h < q.length; h++) {
      const [x, y] = q[h];
      for (const d of DIRS) {
        const [nx, ny] = reverse ? [wx(x - d[0]), y - d[1]] : [wx(x + d[0]), y + d[1]];
        const ok = reverse ? pass(nx, ny, d) : pass(x, y, d);
        if (ok && !seen.has(`${nx},${ny}`)) { seen.add(`${nx},${ny}`); q.push([nx, ny]); }
      }
    }
    return seen;
  };
  const sx = Math.floor(L.start[0]), sy = L.start[1];
  const fwd = bfs(sx, sy, false), back = bfs(sx, sy, true);
  const inHouse = (x, y) => L.doorY != null && y > L.doorY && y <= L.doorY + 3 && x >= 11 && x <= 16;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    if (solid(m[y][x]) || inHouse(x, y)) continue;
    const k = `${x},${y}`;
    if (!fwd.has(k)) { errs.push(`unreachable ${k}`); continue; }
    if (!back.has(k)) errs.push(`one-way trap ${k}`);
    // dead end: some legal way in whose only way out is to turn back
    const outs = DIRS.filter(d => pass(x, y, d));
    for (const d of DIRS) {
      if (pass(wx(x - d[0]), y - d[1], d) && outs.every(o => same(o, [-d[0], -d[1]]))) { errs.push(`dead end ${k}`); break; }
    }
  }
  if (L.doorY != null && !(fwd.has(`13,${L.doorY - 1}`) && fwd.has(`14,${L.doorY - 1}`))) errs.push('ghost-house exit unreachable');
  console.log(`L${n + 1} ${L.name}: ${errs.length ? 'FAIL ' + errs.slice(0, 20).join(' | ') : 'ok'}`);
  if (errs.length) failed = true;
}
process.exitCode = failed ? 1 : 0;
