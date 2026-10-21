
// Pikachu in Green Hill: Thunder Edition. Pikachu art hack by @gakonst (xframes.nanocode.xyz/f/ss4h667cpe5q),
// Pikachu powers and power-ups added on top. Base: Sonic the Hedgehog (1991) for xframes: assembled bit-perfect (REV01) from the Sonic Retro disassembly
// (https://github.com/sonicretro/s1disasm) and run in Genesis Plus GX through xframes' Nostalgist build.
// The frame body only needs: <script type="module" src="https://cdn.jsdelivr.net/gh/<owner>/<repo>@<commit>/sonic.js"><\/script>
const SHA256 = "1b7f6635bd713f37f3c2f44f302b872c2e3c5f56e63637918dad4637146900fd";
const ROM = new URL("sonic1.bin", "https://cdn.jsdelivr.net/gh/figtracer/sonic-xframe@f9e6bf0/sonic.js").href;
const TITLE = new URL("title.png", "https://cdn.jsdelivr.net/gh/figtracer/sonic-xframe@f9e6bf0/sonic.js").href;
// Save state taken on the "Green Hill Zone Act 1" title card, so Play skips the intro and the attract-mode demo.
const STATE = new URL("act1.state", "https://cdn.jsdelivr.net/gh/figtracer/sonic-xframe@f9e6bf0/sonic.js").href;
const BUTTONS = { arrowup: "up", w: "up", arrowdown: "down", s: "down", arrowleft: "left", a: "left", arrowright: "right", d: "right", " ": "b", z: "b", j: "b", x: "a", k: "a", c: "thunder", v: "thunder", enter: "start" };
const SONIC_COLORS = [0x000, 0x000, 0x822, 0xA44, 0xC66, 0xE88, 0xEEE, 0xAAA, 0x888, 0x444, 0x8AE, 0x46A, 0x00E, 0x008, 0x004, 0x0EE];

const { SHEETS, hack, poster } = (() => {
const SHEETS = {
 walk: "https://xframes.nanocode.xyz/a/7930097f558e350fae6b0e3f50428534.webp",
 run: "https://xframes.nanocode.xyz/a/6af5550d0d60af4ae923bf14ad365511.webp",
 idle: "https://xframes.nanocode.xyz/a/facff89d4bca876460daf800f38f8d05.webp",
 skidpush: "https://xframes.nanocode.xyz/a/c00c12d79ba0e6afe5ca7ddab384b42c.webp",
 action: "https://xframes.nanocode.xyz/a/bf15448c8e329512a562336ec108dc86.webp",
 water: "https://xframes.nanocode.xyz/a/fb444c882506fb2fee81de05b24db6a2.webp",
 ball: "https://xframes.nanocode.xyz/a/c435a4e1fbd8388313a9e4be6d46ef8d.webp",
 icon: "https://xframes.nanocode.xyz/a/a6f98184c0010a5c4c68410e3b5fb060.webp",
};

const POSES = {
 walk0: ["walk", 1, 36, 354, 295], walk1: ["walk", 404, 36, 337, 295], walk2: ["walk", 791, 36, 333, 295], walk4: ["walk", 31, 374, 339, 298], walk6: ["walk", 805, 374, 341, 298], walk7: ["walk", 1208, 374, 335, 298],
 run0: ["run", 7, 54, 574, 287], run1: ["run", 674, 76, 602, 265], run2: ["run", 72, 448, 530, 273], run3: ["run", 724, 427, 538, 301],
 stand: ["idle", 23, 183, 302, 341], front: ["idle", 374, 218, 286, 306], tap: ["idle", 703, 173, 238, 351], up: ["idle", 966, 242, 248, 282], crouch: ["idle", 1243, 262, 317, 262],
 skid0: ["skidpush", 31, 32, 324, 285], skid1: ["skidpush", 412, 44, 286, 267],
 push0: ["skidpush", 31, 368, 305, 266], push1: ["skidpush", 361, 374, 305, 260], push2: ["skidpush", 672, 368, 253, 266], push3: ["skidpush", 950, 361, 292, 273],
 bal0: ["action", 10, 30, 332, 326], bal1: ["action", 356, 35, 326, 296], spring: ["action", 707, 15, 237, 553], hurt: ["action", 968, 59, 326, 257], shock: ["action", 1002, 346, 272, 326], cry: ["action", 1293, 405, 281, 267],
 float0: ["water", 747, 38, 345, 260], float1: ["water", 1166, 55, 378, 248], slide: ["water", 792, 390, 374, 239], leap: ["water", 1214, 361, 336, 267],
 ball: ["ball", 43, 255, 258, 258],
};

const SCALE = { walk: 0.115, run: 0.075, idle: 0.111, skidpush: 0.116, action: 0.117, water: 0.11, ball: 0.116 };

const upright = (pose, o = {}) => [pose, { a: ["face", "b"], t: [11, 20], ...o }];
const walk = ["walk0", "walk1", "walk2", "walk4", "walk6", "walk7"], run = ["run0", "run1", "run2", "run3"];
const FRAMES = [
 null,
 upright("stand"), ["front", { a: ["top", "b"], t: [0, 20] }], ["front", { a: ["top", "b"], t: [0, 20] }], ["tap", { a: ["top", "b"], t: [0, 20] }], upright("up"),
 ...[0, 45, 90, 135].flatMap(r => walk.map(p => upright(p, { r }))),
 ...[0, 45, 90, 135].flatMap(r => run.map(p => upright(p, { r }))),
 ...[0, 1, 2, 3, 4, 0, 0, 0, 0].map(k => ["ball", { a: ["c", "m"], t: [0, 0], r: -72 * k }]),
 upright("skid0"), upright("skid1"), upright("crouch", { t: [12, 20] }),
 ["bal0", { a: ["r", "b"], t: [10, 20] }], ["bal1", { a: ["r", "b"], t: [10, 20] }],
 ["float0", { a: ["c", "m"], t: [4, 0] }], ["float1", { a: ["c", "m"], t: [0, 0] }], ["float1", { a: ["c", "m"], t: [-8, 0] }], ["float0", { a: ["c", "m"], t: [4, 0] }],
 ["spring", { a: ["c", "m"], t: [-4, 0] }],
 ["spring", { a: ["c", "m"], t: [0, 0], r: 90 }], ["spring", { a: ["c", "m"], t: [0, 0], r: 90 }],
 ["leap", { a: ["c", "m"], t: [0, 0] }], ["leap", { a: ["c", "m"], t: [0, 0] }],
 ...["push0", "push1", "push2", "push3"].map(p => [p, { a: ["r", "b"], t: [12, 20] }]),
 upright("skid0"), ["cry", { a: ["c", "b"], t: [0, 19] }], ["shock", { a: ["c", "m"], t: [0, 0] }], ["cry", { a: ["c", "b"], t: [0, 19] }], ["shock", { a: ["c", "m"], t: [0, 0] }],
 ["front", { a: ["top", "b"], t: [0, 20] }], ...[0.8, 0.6, 0.4, 0.2].map(s => ["front", { a: ["c", "m"], t: [0, 0], s }]),
 ["float0", { a: ["c", "m"], t: [-4, 0] }], ["float1", { a: ["c", "m"], t: [8, 0] }],
 ["hurt", { a: ["c", "m"], t: [0, 0] }], ["cry", { a: ["c", "b"], t: [0, 19] }], ["slide", { a: ["c", "m"], t: [0, 0] }],
];

const PALETTE = [0x000, 0x000, 0x024, 0x046, 0x28C, 0x2CE, 0xEEE, 0xAAA, 0x888, 0x444, 0x8CE, 0x2AE, 0x00E, 0x008, 0x004, 0x0EE];
const CUSTOM = [2, 3, 4, 5, 10, 11];
const INKS = [1, 2, 3, 4, 5, 6, 10, 11, 12, 13, 15];
const WEIGHT = [0, 1.7, 1.7, 1.2, 1, 1, 1, 1, 1, 1, 1, 1, 1.3, 1.3, 1, 1];
const rgb = w => [w & 15, w >> 4 & 15, w >> 8 & 15].map(v => Math.round((v >> 1) * 255 / 7));
const COLORS = PALETTE.map(rgb);
const MAX_TILES = 23, R = 64;
const LAYOUT = { map: 0x21CF4, end: 0x2C730, dplcRef: 0x14324, artRef: 0x14350, lives: [0x1DDD4, 0x39908, 262], sign: [0x1E0E6, 0x3A9E8, 1147], monitorIcon: [0xAC56, 0x7D4 - 0x680], got: [0xD266, 0xCC5E, 9], ssr: [0xD328, 0xCE98, 9], dry: [0x2380, 0x28E0], lz: [0x2460, 0x2820], sbz3: [0x27A0, 0x2840] };
const SIGN_FACE = { tile: 0x20, inside: [4, 5, 44, 29], side: 8, background: 6 };
const TITLE_FONT = { A: 0, C: 8, E: 0x10, G: 0x18, H: 0x1C, I: 0x20, K: 0x22, L: 0x26, M: 0x2A, O: 0x32, P: 0x36, S: 0x3E, T: 0x42, U: 0x46 };
const HUD_FONT = {
 P: ["###", "#.#", "#.#", "###", "#..", "#.."], I: ["#", "#", "#", "#", "#", "#"], K: ["#.#", "#.#", "##.", "##.", "#.#", "#.#"], A: [".#.", "#.#", "#.#", "###", "#.#", "#.#"],
 C: [".##", "#..", "#..", "#..", "#..", ".##"], H: ["#.#", "#.#", "###", "#.#", "#.#", "#.#"], U: ["#.#", "#.#", "#.#", "#.#", "#.#", "###"],
};
const LIVES_ICON = [
 "1111111111111111",
 "1166666666666611",
 "1126666666666211",
 "2152666666662512",
 "6255266666625526",
 "6255522222255526",
 "6255555555555526",
 "2555165555165552",
 "2555115555115552",
 "2cc5555225555cc2",
 "2cc5552552555cc2",
 "6255555225555526",
 "6245555555555426",
 "6622455555542266",
 "6666222222226666",
 "1111111111111111",
];
const LIVES_TIMES = ["0000000000000000", "0000000000000000", "0000006100610000", "0000000616100000", "0000000061000000", "0000000616100000", "0000006100610000", "0000001000110000"];
const align = v => (v + 1) & ~1;

function cut(image, [, x0, y0, w, h]) {
 const ix = new Uint8Array(w * h), data = image.data, width = image.width;
 for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
 const i = ((y0 + y) * width + x0 + x) * 4, r = data[i], g = data[i + 1], b = data[i + 2];
 if (data[i + 3] < 128 || g - Math.max(r, b) > 70 || b > r + 40) continue;
 let best = 0, bd = Infinity;
 for (const k of INKS) { const c = COLORS[k], d = 2 * (r - c[0]) ** 2 + 4 * (g - c[1]) ** 2 + 3 * (b - c[2]) ** 2; if (d < bd) { bd = d; best = k; } }
 ix[y * w + x] = best;
 }
 const label = new Int32Array(w * h).fill(-1), sizes = [];
 for (let s = 0; s < w * h; s++) {
 if (!ix[s] || label[s] >= 0) continue;
 const stack = [s], id = sizes.length;
 label[s] = id;
 let n = 0;
 while (stack.length) {
 const p = stack.pop(), x = p % w, y = (p - x) / w;
 n++;
 for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
 const nx = x + dx, ny = y + dy, q = ny * w + nx;
 if (nx >= 0 && ny >= 0 && nx < w && ny < h && ix[q] && label[q] < 0) { label[q] = id; stack.push(q); }
 }
 }
 sizes.push(n);
 }
 const keep = Math.max(...sizes) * 0.1;
 let x0b = w, y0b = h, x1b = -1, y1b = -1;
 for (let s = 0; s < w * h; s++) {
 if (!ix[s]) continue;
 if (sizes[label[s]] < keep) { ix[s] = 0; continue; }
 const x = s % w, y = (s - x) / w;
 x0b = Math.min(x0b, x); x1b = Math.max(x1b, x); y0b = Math.min(y0b, y); y1b = Math.max(y1b, y);
 }
 const box = [x0b, y0b, x1b + 1, y1b + 1];
 const span = (from, to) => {
 let lo = w, hi = -1;
 for (let y = Math.floor(box[1] + (box[3] - box[1]) * from); y < box[1] + (box[3] - box[1]) * to; y++) for (let x = 0; x < w; x++) if (ix[y * w + x]) { lo = Math.min(lo, x); hi = Math.max(hi, x + 1); }
 return [lo, hi];
 };
 let mass = 0, sum = 0;
 for (let y = box[1]; y < box[1] + (box[3] - box[1]) * 0.45; y++) for (let x = 0; x < w; x++) if (ix[y * w + x]) { mass++; sum += x + 0.5; }
 return { w, h, ix, x: { c: (box[0] + box[2]) / 2, r: box[2], face: span(0.15, 0.5)[1], top: sum / mass }, y: { m: (box[1] + box[3]) / 2, b: box[3] } };
}

function raster(sprite, scale, o) {
 const s = scale * (o.s ?? 1);
 const ax = sprite.x[o.a[0]], ay = sprite.y[o.a[1]], [tx, ty] = o.t;
 const th = (o.r ?? 0) * Math.PI / 180, cos = Math.cos(th), sin = Math.sin(th);
 const pix = new Uint8Array(4 * R * R), N = 4, votes = new Float32Array(16);
 for (let py = -R; py < R; py++) for (let px = -R; px < R; px++) {
 votes.fill(0);
 let clear = 0;
 for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
 const X = px + (i + 0.5) / N, Y = py + (j + 0.5) / N;
 const x = X * cos - Y * sin, y = X * sin + Y * cos;
 const u = Math.floor((x - tx) / s + ax), v = Math.floor((y - ty) / s + ay);
 const k = u >= 0 && v >= 0 && u < sprite.w && v < sprite.h ? sprite.ix[v * sprite.w + u] : 0;
 if (k) votes[k] += WEIGHT[k]; else clear++;
 }
 if (clear * 2 >= N * N) continue;
 let best = 0;
 for (let k = 1; k < 16; k++) if (votes[k] > votes[best]) best = k;
 pix[(py + R) * 2 * R + px + R] = best;
 }
 const W = 2 * R;
 for (let y = 0; y < W; y++) for (let x = 0; x < W; x++) {
 const i = y * W + x;
 if (!pix[i]) continue;
 const n = (x > 0 && pix[i - 1] ? 1 : 0) + (x < W - 1 && pix[i + 1] ? 1 : 0) + (y > 0 && pix[i - W] ? 1 : 0) + (y < W - 1 && pix[i + W] ? 1 : 0);
 if (!n) pix[i] = 0;
 }
 const edge = [];
 for (let y = 1; y < W - 1; y++) for (let x = 1; x < W - 1; x++) {
 const i = y * W + x;
 if (!pix[i] && (pix[i - 1] || pix[i + 1] || pix[i - W] || pix[i + W])) edge.push(i);
 }
 for (const i of edge) pix[i] = 2;
 return pix;
}

function cover(pix, ox, oy) {
 const W = 2 * R, G = W / 8 + 1, occ = new Uint8Array(G * G);
 let any = false;
 for (let y = 0; y < W; y++) for (let x = 0; x < W; x++) if (pix[y * W + x]) { occ[((y + oy) >> 3) * G + ((x + ox) >> 3)] = 1; any = true; }
 if (!any) return { pieces: [], tiles: 0 };
 const used = new Uint8Array(G * G), pieces = [];
 let left = occ.reduce((a, b) => a + b, 0), tiles = 0;
 while (left) {
 let best = null, score = -1;
 for (let j = 0; j < G; j++) for (let i = 0; i < G; i++) {
 if (!occ[j * G + i] || used[j * G + i]) continue;
 for (let h = 1; h <= 4 && j + h <= G; h++) for (let w = 1; w <= 4 && i + w <= G; w++) {
 let gain = 0, clash = false;
 for (let b = 0; b < h && !clash; b++) for (let a = 0; a < w; a++) { const q = (j + b) * G + i + a; if (used[q]) { clash = true; break; } gain += occ[q]; }
 if (clash) continue;
 const sc = gain / (w * h + 0.6) + gain * 1e-4;
 if (sc > score) { score = sc; best = [i, j, w, h]; }
 }
 }
 const [i, j, w, h] = best;
 for (let b = 0; b < h; b++) for (let a = 0; a < w; a++) { const q = (j + b) * G + i + a; used[q] = 1; left -= occ[q]; }
 pieces.push({ x: i * 8 - ox - R, y: j * 8 - oy - R, w, h });
 tiles += w * h;
 }
 return { pieces, tiles };
}

function tileBytes(pix, x0, y0) {
 const out = new Uint8Array(32), W = 2 * R;
 for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x += 2) {
 const at = (xx, yy) => { const X = xx + R, Y = yy + R; return X >= 0 && Y >= 0 && X < W && Y < W ? pix[Y * W + X] : 0; };
 out[y * 4 + (x >> 1)] = at(x0 + x, y0 + y) << 4 | at(x0 + x + 1, y0 + y);
 }
 return out;
}

function build(images, recipes, limit) {
 const sprites = {};
 for (const [name, rect] of Object.entries(POSES)) sprites[name] = cut(images[rect[0]], rect);
 for (let size = 1; ; size *= 0.97) {
 const built = assemble(sprites, recipes, size);
 if (align(align(LAYOUT.map + built.map.length) + built.dplc.length) + built.art.length <= limit) return built;
 }
}

function livesArt() {
 const px = new Uint8Array(12 * 64), label = Array.from({ length: 8 }, () => new Uint8Array(32));
 let x = 0;
 for (const ch of "PIKACHU") {
 const glyph = HUD_FONT[ch];
 for (let y = 0; y < 6; y++) for (let i = 0; i < glyph[y].length; i++) if (glyph[y][i] === "#") {
 label[y + 1][x + i] = 15;
 for (const [dx, dy] of [[1, 0], [0, 1], [1, 1]]) if (label[y + 1 + dy][x + i + dx] !== 15) label[y + 1 + dy][x + i + dx] = 1;
 }
 x += glyph[0].length + 2;
 }
 const put = (tile, read) => { for (let y = 0; y < 8; y++) for (let i = 0; i < 8; i++) px[tile * 64 + y * 8 + i] = read(i, y); };
 for (let t = 0; t < 4; t++) put(t, (i, y) => parseInt(LIVES_ICON[(t & 1) * 8 + y][(t >> 1) * 8 + i], 16));
 for (let c = 0; c < 4; c++) { put(4 + 2 * c, (i, y) => label[y][8 * c + i]); put(5 + 2 * c, (i, y) => c < 2 ? parseInt(LIVES_TIMES[y][8 * c + i], 16) : 0); }
 return px;
}

function nemesis(px) {
 const runs = [];
 for (let i = 0; i < px.length;) {
 let n = 1;
 while (n < 8 && i + n < px.length && px[i + n] === px[i]) n++;
 runs.push((n - 1) << 4 | px[i]);
 i += n;
 }
 const freq = new Map();
 for (const r of runs) freq.set(r, (freq.get(r) ?? 0) + 1);
 const ranked = [...freq.keys()].sort((a, b) => freq.get(b) - freq.get(a) || a - b);
 let best = null;
 for (let count = 1; count <= Math.min(ranked.length, 252); count++) {
 const symbols = ranked.slice(0, count), lengths = huffman(symbols.map(s => freq.get(s)));
 const nibbles = new Set(symbols.map(s => s & 15)).size;
 const bits = runs.reduce((sum, r) => sum + 13 * (symbols.includes(r) ? 0 : 1), 0) + symbols.reduce((sum, s, k) => sum + freq.get(s) * lengths[k], 0) + 8 * (nibbles + 2 * count + 1);
 if (!best || bits < best.bits) best = { bits, symbols, lengths };
 }
 const order = best.symbols.map((s, k) => [s, best.lengths[k]]).sort((a, b) => a[1] - b[1] || a[0] - b[0]), codes = new Map();
 let code = 0, previous = 0;
 for (const [s, len] of order) { code <<= len - previous; codes.set(s, [code++, len]); previous = len; }
 const out = [px.length >> 14, px.length >> 6 & 255];
 for (let nibble = 0; nibble < 16; nibble++) {
 const items = [...codes].filter(([r]) => (r & 15) === nibble);
 if (!items.length) continue;
 out.push(0x80 | nibble);
 for (const [r, [c, len]] of items) out.push((r & 0x70) | len, c);
 }
 out.push(0xFF);
 let acc = 0, bits = 0;
 const put = (value, width) => { acc = acc << width | value; bits += width; while (bits >= 8) { bits -= 8; out.push(acc >> bits & 255); } acc &= (1 << bits) - 1; };
 for (const r of runs) codes.has(r) ? put(...codes.get(r)) : put(0x3F << 7 | r, 13);
 if (bits) put(0, 8 - bits);
 return Uint8Array.from(out);
}

function huffman(weights) {
 if (weights.length === 1) return [1];
 let nodes = weights.map((w, k) => ({ w, leaves: [k] }));
 const lengths = weights.map(() => 0);
 while (nodes.length > 1) {
 nodes.sort((a, b) => a.w - b.w);
 const [a, b] = nodes.splice(0, 2);
 for (const k of [...a.leaves, ...b.leaves]) lengths[k]++;
 nodes.push({ w: a.w + b.w, leaves: [...a.leaves, ...b.leaves] });
 }
 const kraft = () => lengths.reduce((sum, len) => sum + 2 ** -len, 0), order = weights.map((_, k) => k).sort((a, b) => weights[a] - weights[b]);
 for (let k = 0; k < lengths.length; k++) lengths[k] = Math.min(8, Math.max(1, lengths[k]));
 while (kraft() > 63 / 64) { const k = order.find(i => lengths[i] < 8); if (k === undefined) break; lengths[k]++; }
 for (const k of [...order].reverse()) while (lengths[k] > 1 && kraft() - 2 ** -lengths[k] + 2 ** -(lengths[k] - 1) <= 63 / 64) lengths[k]--;
 return lengths;
}

function unnemesis(src, at) {
 let p = at + 2, nibble = 0;
 const header = src[at] << 8 | src[at + 1], table = new Map();
 for (let b = src[p++]; b !== 0xFF; b = src[p++]) {
 if (b & 0x80) { nibble = b & 15; b = src[p++]; }
 table.set((b & 15) << 8 | src[p++], ((b >> 4) & 7) + 1 << 4 | nibble);
 }
 let bit = 0;
 const read = n => { let v = 0; for (let i = 0; i < n; i++, bit++) v = v << 1 | (src[p + (bit >> 3)] >> (7 - (bit & 7))) & 1; return v; };
 const px = new Uint8Array((header & 0x7FFF) * 64);
 for (let n = 0; n < px.length;) {
 let run;
 if (read(6) === 0x3F) { const v = read(7); run = (v >> 4) + 1 << 4 | v & 15; }
 else { bit -= 6; let code = 0, len = 0; do { code = code << 1 | read(1); len++; } while (!table.has(len << 8 | code)); run = table.get(len << 8 | code); }
 for (let k = 0; k < run >> 4 && n < px.length; k++) px[n++] = run & 15;
 }
 if (header & 0x8000) for (let i = 8; i < px.length; i++) px[i] ^= px[i - 8];
 return px;
}

function nemesisXor(px) {
 const rows = px.slice();
 for (let i = px.length - 1; i >= 8; i--) rows[i] ^= px[i - 8];
 const plain = nemesis(px), xored = nemesis(rows);
 xored[0] |= 0x80;
 return xored.length < plain.length ? xored : plain;
}

function signArt(rom) {
 const px = unnemesis(rom, LAYOUT.sign[1]), at = (tile, x, y) => (tile + (x >> 3) * 4 + (y >> 3)) * 64 + (y & 7) * 8 + (x & 7);
 const face = (x, y) => at(SIGN_FACE.tile + (x >= 24 ? 12 : 0), x % 24, y), [x0, y0, x1, y1] = SIGN_FACE.inside;
 for (let y = 0; y < 32; y++) for (let x = 0; x < 48; x++) px[face(x, y)] = x >= x0 && x < x1 && y >= y0 && y < y1 ? SIGN_FACE.background : px[at(0, x < 24 ? x : 47 - x, y >= y0 && y < y1 - 1 ? SIGN_FACE.side : y)];
 for (let y = 0; y < 28; y++) for (let x = 0; x < 32; x++) { const c = parseInt(LIVES_ICON[1 + (y >> 1)][x >> 1], 16); if (c !== 6) px[face(8 + x, 1 + y)] = c; }
 return px;
}

function caption(text, x, advance, space) {
 const out = [0];
 for (const ch of text) {
 if (ch === " ") { x += space; continue; }
 const narrow = ch === "I", tile = TITLE_FONT[ch];
 out.push(0xF8, narrow ? 1 : 5, tile >> 8, tile & 255, x & 255);
 out[0]++;
 x += narrow ? 8 : advance;
 }
 return out;
}

function relocate(rom, [table, , count], changes) {
 const frames = Array.from({ length: count }, (_, k) => {
 if (changes[k]) return changes[k];
 const at = table + ((rom[table + 2 * k] << 8 | rom[table + 2 * k + 1]) << 16 >> 16);
 return Array.from(rom.subarray(at, at + 1 + 5 * rom[at]));
 });
 const out = [];
 let offset = 2 * count;
 for (const frame of frames) { out.push(offset >> 8, offset & 255); offset += frame.length; }
 return Uint8Array.from(out.concat(...frames));
}

function assemble(sprites, recipes, size) {
 const frames = recipes.map((recipe, id) => {
 if (!recipe) return { id, pieces: [], tiles: [] };
 const [pose, o] = recipe, sprite = sprites[pose];
 let scale = SCALE[POSES[pose][0]] * size;
 for (let attempt = 0; ; attempt++) {
 const pix = raster(sprite, scale, o);
 let best = null;
 for (let oy = 0; oy < 8; oy++) for (let ox = 0; ox < 8; ox++) { const c = cover(pix, ox, oy); if (!best || c.tiles < best.tiles || (c.tiles === best.tiles && c.pieces.length < best.pieces.length)) best = c; }
 if (best.tiles <= MAX_TILES) {
 const tiles = [];
 for (const p of best.pieces) for (let a = 0; a < p.w; a++) for (let b = 0; b < p.h; b++) tiles.push(tileBytes(pix, p.x + a * 8, p.y + b * 8));
 return { id, pose, scale, attempt, pieces: best.pieces, tiles };
 }
 scale *= 0.96;
 }
 });
 const art = [], seen = new Map();
 for (const f of frames) {
 f.slots = f.tiles.map(t => {
 const key = t.join(",");
 if (!seen.has(key)) { seen.set(key, art.length); art.push(t); }
 return seen.get(key);
 });
 }
 const map = [], dplc = [], mapOffsets = [], dplcOffsets = [], n = frames.length;
 for (const f of frames) {
 mapOffsets.push(2 * n + map.length);
 map.push(f.pieces.length);
 let slot = 0;
 for (const p of f.pieces) {
 const word = slot;
 map.push(p.y & 255, (p.w - 1) << 2 | (p.h - 1), word >> 8, word & 255, p.x & 255);
 slot += p.w * p.h;
 }
 dplcOffsets.push(2 * n + dplc.length);
 const runs = [];
 for (const slot of f.slots) {
 const last = runs[runs.length - 1];
 if (last && last[0] < 16 && last[1] + last[0] === slot) last[0]++; else runs.push([1, slot]);
 }
 dplc.push(runs.length);
 for (const [count, start] of runs) { const e = (count - 1) << 12 | start; dplc.push(e >> 8, e & 255); }
 }
 const table = (offsets, body) => { const out = new Uint8Array(2 * n + body.length); offsets.forEach((v, k) => { out[2 * k] = v >> 8; out[2 * k + 1] = v & 255; }); out.set(body, 2 * n); return out; };
 const artBytes = new Uint8Array(art.length * 32);
 art.forEach((t, k) => artBytes.set(t, k * 32));
 return { frames, size, art: artBytes, map: table(mapOffsets, map), dplc: table(dplcOffsets, dplc) };
}

const RING = { x: 151.5, y: 102.75, from: 15, to: 165, stars: [25, 51, 77, 103, 129, 155], star: [101, 70, 7, 7] };
const RING_BANDS = [[41.5, [0, 0, 0]], [42.5, [0, 0, 99]], [44.5, [99, 101, 239]], [45.5, [66, 69, 239]], [47, [173, 170, 239]], [59.8, [239, 239, 0]], [60.6, [239, 170, 0]], [61.6, [0, 0, 206]], [64.5, [99, 101, 239]], [65.5, [140, 138, 239]], [66.5, [173, 170, 239]]];
const SKY = [33, 0, 173], BANNER = [206, 0, 0];
const LOGO_FONT = {
 P: ["###.", "#..#", "#..#", "###.", "#...", "#...", "#..."], I: ["##", "##", "##", "##", "##", "##", "##"], K: ["#..#", "#..#", "#.#.", "##..", "#.#.", "#..#", "#..#"],
 A: [".##.", "#..#", "#..#", "####", "#..#", "#..#", "#..#"], C: [".###", "#...", "#...", "#...", "#...", "#...", ".###"], H: ["#..#", "#..#", "#..#", "####", "#..#", "#..#", "#..#"], U: ["#..#", "#..#", "#..#", "#..#", "#..#", "#..#", ".##."],
};
const SMALL_FONT = {
 I: ["###", ".#.", ".#.", ".#.", "###"], N: ["#..#", "##.#", "#.##", "#..#", "#..#"], G: [".###", "#...", "#.##", "#..#", ".###"], R: ["###.", "#..#", "###.", "#.#.", "#..#"],
 E: ["####", "#...", "###.", "#...", "####"], H: ["#..#", "#..#", "####", "#..#", "#..#"], L: ["#...", "#...", "#...", "#...", "####"],
};
const CHROME = [[173, 206, 239], [173, 206, 239], [173, 206, 239], [206, 239, 239], [206, 239, 239], [206, 239, 239], [239, 239, 239], [239, 239, 239], [239, 239, 239], [239, 239, 239], [239, 239, 239], [239, 239, 239], [239, 239, 239], [99, 32, 0], [173, 101, 0], [173, 101, 0], [239, 170, 0], [239, 170, 0], [239, 170, 0], [239, 170, 0], [239, 206, 0], [239, 206, 0], [239, 206, 0], [239, 239, 0], [239, 239, 0], [239, 239, 0], [239, 239, 0], [239, 239, 0]];

function lettering(text, font, cell, gap, space) {
 const glyphs = [...text].map(ch => ch === " " ? null : font[ch]), rows = font[text.trim()[0]].length;
 const width = glyphs.reduce((sum, g) => sum + (g ? g[0].length * cell + gap : space), -gap);
 const mask = Array.from({ length: rows * cell }, () => new Uint8Array(width));
 let x = 0;
 for (const g of glyphs) {
 if (!g) { x += space; continue; }
 for (let r = 0; r < rows; r++) for (let c = 0; c < g[r].length; c++) if (g[r][c] === "#") for (let dy = 0; dy < cell; dy++) for (let dx = 0; dx < cell; dx++) mask[r * cell + dy][x + c * cell + dx] = 1;
 x += g[0].length * cell + gap;
 }
 return mask;
}

function poster(title, icon) {
 const W = 320, H = 224, data = new Uint8ClampedArray(W * H * 4), step = title.width / W;
 for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) data.set(title.data.subarray(((y * step) * title.width + x * step) * 4, ((y * step) * title.width + x * step) * 4 + 4), (y * W + x) * 4);
 const set = (x, y, c) => { if (x >= 0 && y >= 0 && x < W && y < H) data.set([c[0], c[1], c[2], 255], (y * W + x) * 4); };
 const [sx, sy, sw, sh] = RING.star, star = [];
 for (let y = 0; y < sh; y++) for (let x = 0; x < sw; x++) { const i = ((sy + y) * W + sx + x) * 4; star.push(data[i + 2] > data[i] + 40 ? [data[i], data[i + 1], data[i + 2]] : null); }
 for (let y = 20; y < 107; y++) for (let x = 96; x < 208; x++) {
 const dx = x + 0.5 - RING.x, dy = RING.y - y - 0.5, d = Math.hypot(dx, dy), angle = Math.atan2(dy, dx) * 180 / Math.PI;
 const band = RING_BANDS.find(([r]) => d < r);
 if (band && (d < 41.5 || (angle > RING.from && angle < RING.to))) set(x, y, band[1]);
 else if (!band && y >= 24 && x >= 100 && x < 206) set(x, y, SKY);
 }
 for (const a of RING.stars) {
 const t = a * Math.PI / 180, x0 = Math.round(RING.x + 53.5 * Math.cos(t) - sw / 2), y0 = Math.round(RING.y - 53.5 * Math.sin(t) - sh / 2);
 star.forEach((c, k) => c && set(x0 + k % sw, y0 + Math.floor(k / sw), c));
 }
 const head = cut(icon, ["icon", 0, 0, 226, 256]), scale = 92 / (2 * (head.y.b - head.y.m)), pix = raster(head, scale, { a: ["c", "m"], t: [0, 0] }), top = 112 - 46;
 for (let y = -R; y < R; y++) for (let x = -R; x < R; x++) { const c = pix[(y + R) * 2 * R + x + R]; if (c && top + y < 107) set(152 + x, top + y, COLORS[c]); }
 for (let y = 107; y < 148; y++) for (let x = 81; x < 221; x++) set(x, y, BANNER);
 const draw = (mask, x0, y0, fill, outline, shadow) => {
 const h = mask.length, w = mask[0].length, at = (x, y) => y >= 0 && y < h && x >= 0 && x < w && mask[y][x];
 for (let y = -2; y < h + 2; y++) for (let x = -2; x < w + 2; x++) {
 if (at(x, y)) { set(x0 + x, y0 + y, fill(y)); continue; }
 if ([-1, 0, 1].some(a => [-1, 0, 1].some(b => at(x + a, y + b)))) set(x0 + x, y0 + y, outline);
 else if (shadow && at(x - 2, y - 2)) set(x0 + x, y0 + y, shadow);
 }
 };
 const logo = lettering("PIKACHU", LOGO_FONT, 4, 4, 0);
 draw(logo, Math.round(151 - logo[0].length / 2), 108, y => CHROME[y], [0, 0, 0], [99, 0, 0]);
 const sub = lettering("IN GREEN HILL", SMALL_FONT, 1, 1, 3);
 draw(sub, Math.round(151 - sub[0].length / 2), 140, () => [239, 239, 239], [0, 0, 0], null);
 return { width: W, height: H, data };
}

const tint = (w, dr, dg, db) => { const c = (v, d) => Math.max(0, Math.min(14, v + d)); return c(w >> 8 & 15, db) << 8 | c(w >> 4 & 15, dg) << 4 | c(w & 15, dr); };

function palettes(rom) {
 const read = a => Array.from({ length: 16 }, (_, k) => rom[a + 2 * k] << 8 | rom[a + 2 * k + 1]);
 const dry = read(LAYOUT.dry[0]), lz = read(LAYOUT.lz[0]), sbz3 = read(LAYOUT.sbz3[0]);
 for (const k of CUSTOM) { dry[k] = PALETTE[k]; lz[k] = tint(PALETTE[k], -4, 0, -2); sbz3[k] = tint(PALETTE[k], -2, 0, 4); }
 return { dry, lz, sbz3 };
}

function hack(rom, images, recipes = FRAMES) {
 const slots = [[LAYOUT.lives, nemesisXor(livesArt())], [LAYOUT.sign, nemesisXor(signArt(rom))]];
 const extras = [
 [LAYOUT.got[1], relocate(rom, LAYOUT.got, { 0: caption("PIKACHU HAS", -88, 16, 16) })],
 [LAYOUT.ssr[1], relocate(rom, LAYOUT.ssr, { 8: caption("PIKACHU GOT THEM ALL", -126, 15, 6) })],
 ...slots.filter(([[, , size], bytes]) => bytes.length > size).map(([[ref], bytes]) => [ref, bytes]),
 ];
 const limit = LAYOUT.end - extras.reduce((sum, [, bytes]) => sum + align(bytes.length), 0);
 const built = build(images, recipes, limit);
 const dplcAt = align(LAYOUT.map + built.map.length), artAt = align(dplcAt + built.dplc.length);
 const out = rom.slice();
 out.set(built.map, LAYOUT.map); out.set(built.dplc, dplcAt); out.set(built.art, artAt);
 const view = new DataView(out.buffer), end = out.length;
 view.setUint32(LAYOUT.dplcRef, dplcAt);
 view.setUint32(LAYOUT.artRef, artAt);
 for (const [[, at, size], bytes] of slots) if (bytes.length <= size) out.set(bytes, at);
 let at = limit;
 for (const [ref, bytes] of extras) { out.set(bytes, at); view.setUint32(ref, at); at = align(at + bytes.length); }
 view.setUint16(LAYOUT.monitorIcon[0], LAYOUT.monitorIcon[1]);
 const lives = view.getUint32(LAYOUT.lives[0]);
 const pal = palettes(rom);
 for (const kind of ["dry", "lz", "sbz3"]) for (const at of LAYOUT[kind]) pal[kind].forEach((w, k) => view.setUint16(at + 2 * k, w));
 let sum = 0;
 for (let a = 0x200; a < end; a += 2) sum = (sum + view.getUint16(a)) & 0xFFFF;
 view.setUint16(0x18E, sum);
 return { rom: out, palette: pal.dry, lives, built };
}
return { SHEETS, hack, poster };
})();

document.head.append(Object.assign(document.createElement("style"), { textContent: `
 xf-app > .xf-main { padding: 0; position: relative; overflow: hidden; background: #000; }
 xf-app > .xf-main > canvas { position: absolute; inset: 0; width: 100% !important; height: 100% !important; display: block; outline: 0; object-fit: contain; image-rendering: pixelated; background: #000; }
 #cover { position: absolute; inset: 0; display: flex; padding: 16px; overflow: auto; background: #123b20; color: #fff; text-align: center; }
 #cover[hidden] { display: none; }
 #cover > div { margin: auto; width: 100%; display: flex; flex-direction: column; align-items: center; gap: 10px; }
 #cover > div > * { flex-shrink: 0; }
 #art { display: block; width: min(300px, 100%, calc((100vh - 240px) * 320 / 224)); min-width: 140px; aspect-ratio: 320 / 224; border-radius: var(--xf-radius); image-rendering: pixelated; background: #2100ad; }
 @media (max-height: 420px) { #credit { display: none; } }
 #status { margin: 0; min-height: 1.5em; }
 #progress { width: min(320px, 80%); height: 4px; background: rgba(255, 255, 255, .15); }
 #progress div { width: 0; height: 100%; background: #ffd400; transition: width .1s linear; }
 #play { min-width: 140px; }
 .note { margin: 0; max-width: 400px; color: rgba(255, 255, 255, .7); font-size: 12px; line-height: 1.5; }
 .note a { color: #ffd400; }
 #pad { position: absolute; inset: 0; pointer-events: none; touch-action: none; user-select: none; -webkit-user-select: none; }
 #pad[hidden] { display: none; }
 #stick, #pad button { position: absolute; pointer-events: auto; border: 2px solid rgba(255, 255, 255, .35); background: rgba(0, 0, 0, .25); color: rgba(255, 255, 255, .85); touch-action: none; }
 #stick { left: 16px; bottom: 16px; width: 132px; height: 132px; border-radius: 50%; }
 #stick i { position: absolute; left: 50%; top: 50%; width: 52px; height: 52px; margin: -26px; border-radius: 50%; background: rgba(255, 255, 255, .35); }
 #jump { right: 18px; bottom: 30px; width: 92px; height: 92px; min-height: 0; padding: 0; border-radius: 50%; font-weight: 600; }
 #start { right: 18px; top: 14px; min-height: 0; padding: 6px 12px; font-size: 12px; }
 #pad .on { background: rgba(255, 212, 0, .45); }
 #thunder { right: 122px; bottom: 22px; width: 64px; height: 64px; min-height: 0; padding: 0; border-radius: 50%; font-size: 26px; }
 #powers { color: rgba(255, 230, 120, .85); }
 @media (max-height: 460px) { #powers { display: none; } }
 #bolts { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; background: transparent !important; }
 #hud { position: absolute; left: 0; right: 0; top: 8px; display: flex; justify-content: center; gap: 10px; pointer-events: none; font: 700 13px/1 var(--xf-mono, monospace); }
 #hud[hidden] { display: none; }
 #charges { padding: 4px 8px; border-radius: 999px; background: rgba(0, 0, 0, .55); color: #ffd400; }
 #callout { padding: 4px 8px; border-radius: 999px; background: #ffd400; color: #111; opacity: 0; transition: opacity .25s; }
 #callout.show { opacity: 1; }
` }));

const app = document.createElement("xf-app");
app.innerHTML = `
 <canvas id="screen" tabindex="-1"></canvas>
 <div id="cover">
 <div>
 <canvas id="art" width="320" height="224" role="img" aria-label="Pikachu in Green Hill title screen"></canvas>
 <p id="status">Pikachu races through Green Hill Zone</p>
 <div id="progress" hidden><div></div></div>
 <button id="play" type="button" disabled>Loading…</button>
 <p class="note" id="keys">Arrows move, Space/Z/X jump, C fires Thunderbolt, Enter pauses.</p>
 <p class="note" id="touch" hidden>Left thumb moves, Jump jumps, ⚡ fires Thunderbolt, Start pauses.</p>
 <p class="note" id="powers">Jump again in the air for Quick Attack. Hold down and tap jump to charge a Pika Dash, then let go. Every 10 rings adds a ⚡ charge and 25 rings a Volt Shield. At 50 rings Pikachu evolves into Raichu until the rings run out.</p>
 <p class="note" id="credit">Sonic the Hedgehog (REV01) from the <a href="https://github.com/sonicretro/s1disasm" target="_blank" rel="noopener">Sonic Retro disassembly</a> in Genesis Plus GX, with every Sonic sprite, name and face redrawn as Pikachu.</p>
 </div>
 </div>
 <div id="pad" hidden><div id="stick"><i></i></div><button id="start" type="button" data-button="start">Start</button><button id="thunder" type="button" data-button="thunder">⚡</button><button id="jump" type="button" data-button="b">Jump</button></div>
 <canvas id="bolts"></canvas>
 <div id="hud" hidden><b id="charges"></b><span id="callout"></span></div>`;
document.body.append(app);

const $ = id => document.getElementById(id);
const canvas = $("screen"), cover = $("cover"), status = $("status"), progress = $("progress"), play = $("play"), pad = $("pad");
const touch = matchMedia("(pointer: coarse)").matches;
const say = text => (status.textContent = text);
$("touch").hidden = !touch;
$("keys").hidden = touch;

const picture = url => new Promise((resolve, reject) => {
 const image = new Image();
 image.crossOrigin = "anonymous";
 image.onload = () => {
 const sheet = Object.assign(document.createElement("canvas"), { width: image.naturalWidth, height: image.naturalHeight }).getContext("2d", { willReadFrequently: true });
 sheet.drawImage(image, 0, 0);
 resolve(sheet.getImageData(0, 0, image.naturalWidth, image.naturalHeight));
 };
 image.onerror = () => reject(new Error("Pikachu's sprites did not load"));
 image.src = url;
});
const icon = picture(SHEETS.icon);
Promise.all([picture(TITLE), icon]).then(([title, face]) => { const art = poster(title, face); $("art").getContext("2d").putImageData(new ImageData(art.data, art.width, art.height), 0, 0); }, () => {});

if (!new URLSearchParams(location.search).has("xframes-card")) {
 const hex = buffer => Array.from(new Uint8Array(buffer), byte => byte.toString(16).padStart(2, "0")).join("");
 const download = fetch(ROM).then(async response => {
 if (!response.ok) throw new Error("the game answered " + response.status);
 const total = Number(response.headers.get("content-length")) || 524288;
 const chunks = [];
 let received = 0;
 progress.hidden = false;
 for (const reader = response.body.getReader(); ;) {
 const { done, value } = await reader.read();
 if (done) break;
 chunks.push(value);
 received += value.length;
 progress.firstElementChild.style.width = Math.min(100, 100 * received / total) + "%";
 }
 const bytes = new Uint8Array(await new Blob(chunks).arrayBuffer());
 if (hex(await crypto.subtle.digest("SHA-256", bytes)) !== SHA256) throw new Error("the ROM data is damaged");
 return bytes;
 });
 const sheets = Promise.all(Object.entries(SHEETS).map(async ([name, url]) => [name, await (name === "icon" ? icon : picture(url))])).then(Object.fromEntries);
 const rom = Promise.all([download, sheets]).then(async ([bytes, images]) => {
 say("Drawing Pikachu's sprites…");
 await new Promise(resolve => setTimeout(resolve, 30));
 return hack(bytes, images);
 });
 const state = fetch(STATE).then(response => response.ok ? response.blob() : null, () => null);
 const emulator = import(xframe.context.origin + "/gba/nostalgist.js");

 let game = null;
 const retry = () => { play.textContent = "Try again"; play.disabled = false; play.onclick = () => location.reload(); };
 rom.then(() => { progress.hidden = true; say("Pikachu races through Green Hill Zone"); play.textContent = "Go Pikachu Go"; play.disabled = false; play.focus(); }, error => { progress.hidden = true; say("Could not load the game: " + error.message); retry(); });

 const held = new Set();
 let ramBase = null;
 const ram = () => game.getEmscriptenModule().HEAPU8;
 const frame = () => new Promise(resolve => requestAnimationFrame(resolve));
 const vblanks = base => ram().subarray(base + 0xFE0C, base + 0xFE10).join();
 const sonicColors = at => SONIC_COLORS.every((w, k) => ram()[at + 2 * k] === (w & 255) && ram()[at + 2 * k + 1] === w >> 8);
 const findRam = async () => {
 for (let tries = 0; tries < 60; tries++, await frame()) {
 const heap = ram();
 for (let m = 0; m + 32 <= heap.length; m += 2) {
 if (heap[m + 4] !== 0x22 || heap[m + 5] !== 0x08 || !sonicColors(m)) continue;
 for (const line of [0xFB00, 0xFB80]) {
 const base = m - line;
 if (base < 0 || (heap[base + 0xF601] & 0x7F) !== 0x0C) continue;
 const before = vblanks(base);
 for (let k = 0; k < 3; k++) await frame();
 if (vblanks(base) !== before) return base;
 }
 }
 }
 return null;
 };
 const refresh = async (patched, restore) => {
 if (ramBase !== null) for (let k = 0; k < 120 && !sonicColors(ramBase + 0xFB80); k++) await frame();
 const base = ramBase ??= await findRam();
 if (base === null) return;
 const read = address => ram()[base + address] | ram()[base + address + 1] << 8;
 const write = (address, value) => { ram()[base + address] = value & 255; ram()[base + address + 1] = value >> 8 & 255; };
 for (const address of [0xFB00, 0xFB80]) patched.palette.forEach((w, k) => write(address + 2 * k, w));
 ram()[base + 0xF767] = 0xFF;
 for (let slot = 0xF680; slot < 0xF6E0; slot += 6) {
 if (read(slot) || read(slot + 2)) continue;
 write(slot, patched.lives >>> 16); write(slot + 2, patched.lives & 0xFFFF); write(slot + 4, 0xFA80);
 const settle = () => read(0xF680) || read(0xF682) || read(0xF6F8) ? requestAnimationFrame(settle) : (ram()[base + 0xFE1D] = 1);
 requestAnimationFrame(settle);
 break;
 }
 const watch = () => [0x00, 0x04].includes(ram()[base + 0xF601] & 0x7F) ? restore() : setTimeout(watch, 500);
 setTimeout(watch, 500);
 };

 // Pikachu powers: everything below reads and writes the 68000's work RAM (gk's ramBase) between frames.
 // Addresses and object fields come from the s1disasm REV01 listing (v_* = $FFxxxx; object slots are $40 bytes).
 const powers = (() => {
 const PLAYER = 0xD000, JUMPS = new Set(["a", "b", "y"]);
 const state = { charges: 3, dashUsed: false, charging: false, charge: 0, swallowed: new Set(), rings: 0, raichu: false, evolving: false, saved: null, drain: 0, storm: 0 };
 // Raichu recolour of gk's Pikachu palette slots (Mega Drive 0BGR words): orange body, cream highlights, brown tips.
 const RAICHU = { 2: 0x022, 3: 0x024, 4: 0x04A, 5: 0x08E, 10: 0x4AE, 11: 0x06C };
 const rb = a => ram()[ramBase + (a ^ 1)];
 const wb = (a, v) => { ram()[ramBase + (a ^ 1)] = v & 255; };
 const rw = a => ram()[ramBase + a] | ram()[ramBase + a + 1] << 8;
 const ww = (a, v) => { ram()[ramBase + a] = v & 255; ram()[ramBase + a + 1] = v >> 8 & 255; };
 const sw = a => rw(a) << 16 >> 16;
 const sfx = id => wb(0xF00B, id);
 // In a level (v_gamemode $0C), not paused, not in debug mode, and Pikachu under player control (routine 2).
 const playing = () => game && ramBase !== null && (rb(0xF600) & 0x7F) === 0x0C && !rb(0xF63A) && !rb(0xFE08) && rb(PLAYER + 0x24) === 2;
 const thunderMode = () => state.raichu;
 const charges = $("charges"), callout = $("callout");
 let calloutTimer;
 const show = text => { callout.textContent = text; callout.classList.add("show"); clearTimeout(calloutTimer); calloutTimer = setTimeout(() => callout.classList.remove("show"), 1400); };
 const paint = () => { charges.textContent = thunderMode() ? "⚡ ∞" : "⚡ " + state.charges; };
 const forward = (button, down) => {
 if (!game || held.has(button) === down) return;
 down ? held.add(button) : held.delete(button);
 down ? game.pressDown(button) : game.pressUp(button);
 };

 // Thunderbolt: every badnik on screen turns into an explosion (with its animal and points, like a hit), bosses lose one hit.
 // Lightning drawn over the game: jagged, flickering bolts from Pikachu to each target, in game pixels (320×224).
 const bolts = $("bolts"), pen = bolts.getContext("2d");
 const onScreen = a => [rw(a + 8) - rw(0xF700), rw(a + 0xC) - rw(0xF704)];
 const strike = (from, targets) => {
 const box = canvas.getBoundingClientRect(), dpr = devicePixelRatio || 1;
 bolts.width = box.width * dpr; bolts.height = box.height * dpr;
 const w = Math.min(box.width, box.height * 4 / 3), h = w * 3 / 4; // the emulator letterboxes the picture at 4:3
 const map = ([x, y]) => [((box.width - w) / 2 + x / 320 * w) * dpr, ((box.height - h) / 2 + y / 224 * h) * dpr];
 const zap = (a, b, width) => {
 const [x0, y0] = map(a), [x1, y1] = map(b), steps = 9, jitter = 9 * dpr;
 pen.beginPath(); pen.moveTo(x0, y0);
 for (let k = 1; k < steps; k++) pen.lineTo(x0 + (x1 - x0) * k / steps + (Math.random() - .5) * jitter * 2, y0 + (y1 - y0) * k / steps + (Math.random() - .5) * jitter * 2);
 pen.lineTo(x1, y1); pen.lineWidth = width * dpr; pen.stroke();
 };
 let flashes = 0;
 const draw = () => {
 pen.clearRect(0, 0, bolts.width, bolts.height);
 if (flashes++ >= 6) return;
 if (flashes % 2) {
 pen.lineCap = pen.lineJoin = "round"; pen.shadowColor = "#ffe600"; pen.shadowBlur = 18 * dpr;
 for (const target of targets) { pen.strokeStyle = "rgba(255, 230, 0, .9)"; zap(from, target, 5); pen.strokeStyle = "#fffbe0"; zap(from, target, 2); }
 }
 setTimeout(draw, 45);
 };
 draw();
 };

 const thunderbolt = (storm = false) => {
 if (!playing()) return;
 if (!thunderMode() && state.charges <= 0) { show("No ⚡ left: grab 10 rings"); return; }
 const [px, py] = onScreen(PLAYER), from = [px, py - 8], targets = [];
 let badniks = 0;
 for (let a = 0xD800; a < 0xF000; a += 0x40) {
 const col = rb(a + 0x20);
 if (!rb(a) || !(rb(a + 1) & 0x80) || !col || col & 0xC0) continue; // empty, off screen, or not an enemy (col_badnik)
 targets.push(onScreen(a));
 const hits = rb(a + 0x21);
 if (hits) { wb(a + 0x20, 0); wb(a + 0x21, hits - 1); if (hits === 1) wb(a + 0x22, rb(a + 0x22) | 0x80); continue; } // React_BossHit
 wb(a + 0x22, rb(a + 0x22) | 0x80); ww(a + 0x3E, 0); wb(a, 0x27); wb(a + 0x24, 0); badniks++; // React_BadnikHit -> ExplosionItem
 }
 if (storm && !targets.length) return;
 if (targets.length && !thunderMode()) state.charges--; // a miss is free
 const ahead = rb(PLAYER + 0x22) & 1 ? -110 : 110;
 strike(from, targets.length ? targets : [[px + ahead, py - 20], [px + ahead * .8, py + 14]]);
 if (badniks) {
 const score = Math.min(999999, ((rw(0xFE26) << 16 | rw(0xFE28)) >>> 0) + 10 * badniks);
 ww(0xFE26, score >>> 16); ww(0xFE28, score & 0xFFFF); wb(0xFE1F, 1);
 }
 sfx(0xB1); // sfx_Electric
 if (storm) return paint();
 canvas.animate([{ filter: "brightness(2.2) sepia(1) saturate(5) hue-rotate(5deg)" }, { filter: "none" }], { duration: 300 });
 show(targets.length ? "THUNDERBOLT ×" + targets.length : "THUNDERBOLT! (missed, no charge used)");
 paint();
 };

 // Returns true when the jump press was used by a power and must not reach the game.
 const jump = () => {
 if (!playing()) return false;
 const status = rb(PLAYER + 0x22), anim = rb(PLAYER + 0x1C);
 if (state.charging || (!(status & 2) && anim === 8 && held.has("down"))) { // ducking on the ground: charge Pika Dash
 state.charging = true;
 state.charge = Math.min(0x600, state.charge + 0x200);
 sfx(0xBE); // sfx_Roll
 return true;
 }
 if (status & 2 && anim === 2 && !state.dashUsed) { // airborne in a ball: Quick Attack air dash, once per jump
 state.dashUsed = true;
 const dir = status & 1 ? -1 : 1;
 ww(PLAYER + 0x10, dir * Math.max(0xA00, Math.abs(sw(PLAYER + 0x10))));
 ww(PLAYER + 0x12, Math.min(sw(PLAYER + 0x12), -0x100));
 sfx(0xBC); // sfx_Teleport whoosh
 show("QUICK ATTACK");
 }
 return false;
 };

 // Letting go of down after charging: set ground speed and keep down held two more frames so Sonic_Roll starts the roll.
 const launch = () => {
 state.charging = false;
 if (playing() && !(rb(PLAYER + 0x22) & 2)) {
 ww(PLAYER + 0x14, (rb(PLAYER + 0x22) & 1 ? -1 : 1) * (0x800 + state.charge));
 show("PIKA DASH");
 }
 state.charge = 0;
 setTimeout(() => forward("down", false), 50);
 };

 const route = (button, down) => {
 if (button === "thunder") { if (down) thunderbolt(); return; }
 if (JUMPS.has(button)) {
 if (down && jump()) { state.swallowed.add(button); return; }
 if (!down && state.swallowed.delete(button)) return;
 }
 if (button === "down" && !down && state.charging) return launch();
 forward(button, down);
 };

 let lastFrame = null;
 const tick = () => {
 requestAnimationFrame(tick);
 if (!game || ramBase === null) return;
 const frame = rw(0xFE04), frames = lastFrame === null ? 0 : (frame - lastFrame) & 0xFFFF; // v_framecount: real game frames, whatever the display rate
 lastFrame = frame;
 if (!playing()) {
 // Dying or leaving the level reloads the palette from ROM, so Raichu just ends there.
 if (state.raichu && ((rb(0xF600) & 0x7F) !== 0x0C || rb(PLAYER + 0x24) >= 6)) { state.raichu = false; paint(); }
 return;
 }
 const status = rb(PLAYER + 0x22);
 if (!(status & 2)) state.dashUsed = false;
 if (state.charging && (status & 2 || rb(PLAYER + 0x1C) !== 8)) { state.charging = false; state.charge = 0; }
 if (state.raichu && frames) { raichuTick(Math.min(frames, 10)); if (!state.raichu) return; }
 const rings = rw(0xFE20), before = state.rings;
 state.rings = rings;
 if (rings <= before) return paint();
 const crossed = step => Math.floor(rings / step) > Math.floor(before / step);
 const tens = Math.floor(rings / 10) - Math.floor(before / 10);
 if (tens > 0) state.charges = Math.min(9, state.charges + tens);
 if (crossed(25) && !rb(0xFE2C)) { // Volt Shield: same as the shield monitor
 wb(0xFE2C, 1); wb(0xD180, 0x38); sfx(0xAF);
 show("VOLT SHIELD");
 }
 if (crossed(50) && !state.raichu && !state.evolving) evolve();
 paint();
 };

 const recolour = colours => { for (const [k, w] of Object.entries(colours)) { ww(0xFB00 + 2 * k, w); ww(0xFB80 + 2 * k, w); } };
 // Evolution: freeze the game, call a lightning storm down onto Pikachu with a white-out, then resume as Raichu.
 const evolve = () => {
 state.evolving = true;
 const [px, py] = onScreen(PLAYER), body = [px, py - 8];
 game.pause();
 show("PIKACHU IS EVOLVING…");
 let wave = 0;
 const storm = () => {
 if (wave++ < 7) {
 strike(body, []); // clear
 const sky = Array.from({ length: 3 + wave }, () => [px + (Math.random() - .5) * 260, -10]);
 for (const from of sky) strike(from, [body]);
 canvas.animate([{ filter: `brightness(${1.4 + wave * .25}) saturate(${1 + wave * .4})` }, { filter: "none" }], { duration: 160 });
 return setTimeout(storm, 170);
 }
 state.saved = Object.fromEntries(Object.keys(RAICHU).map(k => [k, rw(0xFB00 + 2 * k)]));
 recolour(RAICHU);
 canvas.animate([{ filter: "brightness(8)" }, { filter: "brightness(8)", offset: .3 }, { filter: "none" }], { duration: 700 });
 game.resume();
 state.raichu = true; state.evolving = false; state.drain = 0; state.storm = 0;
 if (!rb(0xF7AA)) wb(0xF00A, 0x87); // bgm_Invincible, unless a boss fight locked the screen
 sfx(0xB1);
 show("RAICHU!");
 paint();
 };
 storm();
 };
 // Back to Pikachu: ending invincibility and shoes through their own timers lets the game restore music and speed itself.
 const devolve = () => {
 state.raichu = false;
 recolour(state.saved ?? {});
 ww(PLAYER + 0x32, 1); ww(PLAYER + 0x34, 1);
 canvas.animate([{ filter: "brightness(3)" }, { filter: "none" }], { duration: 400 });
 show("BACK TO PIKACHU");
 paint();
 };
 // While Raichu: invincible with speed shoes, a Thunderbolt storm every second, and one ring drained per second.
 const raichuTick = frames => {
 wb(0xFE2D, 1); ww(PLAYER + 0x32, 120);
 wb(0xFE2E, 1); ww(PLAYER + 0x34, 120); ww(0xF760, 0xC00); ww(0xF762, 0x18); ww(0xF764, 0x80);
 recolour(RAICHU);
 if ((state.storm += frames) >= 60) { state.storm = 0; thunderbolt(true); }
 if ((state.drain += frames) >= 60) {
 state.drain = 0;
 const rings = Math.max(0, rw(0xFE20) - 1);
 ww(0xFE20, rings); wb(0xFE1D, 1); state.rings = rings;
 if (!rings) devolve();
 }
 };
 return { route, tick };
 })();

 play.onclick = async () => {
 play.disabled = true;
 say("Starting…");
 try {
 const { Nostalgist } = await emulator;
 const patched = await rom;
 game = await Nostalgist.launch({
 core: "genesis_plus_gx",
 rom: new File([patched.rom], "sonic1.bin"),
 element: canvas,
 size: { width: 320, height: 224 },
 respondToGlobalEvents: false,
 retroarchConfig: { video_font_enable: false, menu_enable_widgets: false, savestate_thumbnail_enable: false, video_smooth: false, audio_latency: 96 },
 });
 game.resize({ width: 640, height: 480 });
 const saved = await state;
 const restore = () => game.loadState(saved).then(() => refresh(patched, restore), () => {});
 if (saved) await restore();
 cover.hidden = true;
 pad.hidden = !touch;
 $("hud").hidden = false;
 requestAnimationFrame(powers.tick);
 canvas.focus();
 } catch (error) {
 say("Could not start the game: " + (error?.message ?? error));
 retry();
 }
 };

 // Keyboard (and anything else that feeds xframe.input) goes straight to the emulator.
 xframe.input.on((key, down) => {
 const button = BUTTONS[key.toLowerCase()];
 if (button) powers.route(button, down);
 });
 addEventListener("keydown", event => { if (game && BUTTONS[event.key.toLowerCase()] && !event.ctrlKey && !event.metaKey) event.preventDefault(); });

 // Own touch controls: xframes' <xf-gamepad> installs a fake Gamepad that crashes Nostalgist's startup.
 const hold = (button, down) => powers.route(button, down);
 for (const node of pad.querySelectorAll("button")) {
 const press = down => event => { event.preventDefault(); node.classList.toggle("on", down); hold(node.dataset.button, down); };
 node.addEventListener("pointerdown", press(true));
 for (const type of ["pointerup", "pointercancel", "pointerleave"]) node.addEventListener(type, press(false));
 }
 const stick = $("stick"), knob = stick.firstElementChild;
 const steer = event => {
 const box = stick.getBoundingClientRect(), r = box.width / 2;
 const dx = event ? (event.clientX - box.left - r) / r : 0, dy = event ? (event.clientY - box.top - r) / r : 0;
 const scale = Math.min(1, 1 / (Math.hypot(dx, dy) || 1));
 knob.style.transform = "translate(" + dx * scale * 40 + "px, " + dy * scale * 40 + "px)";
 hold("left", dx < -0.35); hold("right", dx > 0.35); hold("up", dy < -0.5); hold("down", dy > 0.5);
 };
 stick.addEventListener("pointerdown", event => { event.preventDefault(); stick.setPointerCapture(event.pointerId); steer(event); });
 stick.addEventListener("pointermove", event => { if (stick.hasPointerCapture(event.pointerId)) steer(event); });
 for (const type of ["pointerup", "pointercancel"]) stick.addEventListener(type, () => steer(null));
 document.addEventListener("visibilitychange", () => { if (game) document.hidden ? game.pause() : game.resume(); });
}
