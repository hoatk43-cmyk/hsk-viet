/* =====================================================================
   src/FloralDecorations.jsx — MATCHA BLOOM GARDEN
   Hoa vẽ bằng SVG thuần (không thư viện, không ảnh ngoài):
   Tulip · Garden Rose (hồng Anh) · Ranunculus (mao lương) · Peony (mẫu đơn)
   Không có hoa cúc. Mọi hình trang trí đều aria-hidden và không nhận chuột.
   ===================================================================== */
import React, { useId, useMemo } from 'react';

export const PAL = {
  pink: { light: '#FDEEF2', mid: '#F6CAD6', deep: '#E6A3B6', line: '#BF7C91' },
  blush: { light: '#FFF6F8', mid: '#F9DEE6', deep: '#EDBDCB', line: '#C69AA8' },
  peach: { light: '#FFF1EB', mid: '#F9D3C6', deep: '#EEAE9B', line: '#C98875' },
  cream: { light: '#FFFDF7', mid: '#F8EEDC', deep: '#EAD7B7', line: '#C2A780' },
  butter: {
    light: '#FFFAE8',
    mid: '#FCEBC5',
    deep: '#F1D497',
    line: '#C59F5B',
  },
  white: { light: '#FFFFFF', mid: '#FBF6F0', deep: '#ECE1D5', line: '#BCAA97' },
};
const LF = {
  light: '#D7E8C5',
  mid: '#B8CDA8',
  deep: '#8DAF70',
  line: '#6A8B53',
};

/* ---------- Tiện ích hình học ---------- */
const useSid = (p) => `${p}${useId().replace(/[^a-zA-Z0-9]/g, '')}_`;
const r2 = (n) => Math.round(n * 100) / 100;
const pt = (r, a) => [r2(50 + r * Math.cos(a)), r2(50 + r * Math.sin(a))];
/* Cánh lưỡi liềm: cung ngoài bán kính r, mép trong cong vào tới r*(1-thick) ở giữa cánh */
function crescent(r, a, span, thick) {
  const [ax, ay] = pt(r, a),
    [bx, by] = pt(r, a + span);
  const [qx, qy] = pt(
    2 * r * (1 - thick) - r * Math.cos(span / 2),
    a + span / 2
  );
  return `M${ax} ${ay}A${r2(r)} ${r2(
    r
  )} 0 0 1 ${bx} ${by}Q${qx} ${qy} ${ax} ${ay}Z`;
}

/* Hồng Anh: 6 cánh bao ngoài mép lượn hình tim + 15 cánh xếp xoắn theo góc vàng */
const ROSE = (() => {
  const guard = [],
    petals = [];
  for (let k = 0; k < 6; k++) {
    const a = (k * Math.PI) / 3 + 0.3;
    const [lx, ly] = pt(28, a - 0.6),
      [rx, ry] = pt(28, a + 0.6),
      [ax, ay] = pt(52, a - 0.34),
      [bx, by] = pt(52, a + 0.34),
      [tx, ty] = pt(44.5, a);
    guard.push(
      `M50 50L${lx} ${ly}Q${ax} ${ay} ${tx} ${ty}Q${bx} ${by} ${rx} ${ry}Z`
    );
  }
  for (let i = 14; i >= 0; i--) {
    const t = i / 14;
    petals.push(
      crescent(5 + t * 37, i * 2.39996, 2.05 + t * 0.85, 0.56 - t * 0.14)
    );
  }
  return { guard, petals };
})();
/* Mao lương: 8 vòng cánh mỏng xếp đồng tâm, nhụy xanh ở giữa */
const RANUN = (() => {
  const out = [];
  [45, 40, 35, 30.5, 26, 21.8, 17.8, 14].forEach((r, k) => {
    const n = 8 + (k % 2),
      span = ((2 * Math.PI) / n) * 1.32;
    for (let j = 0; j < n; j++)
      out.push({
        d: crescent(r, k * 0.41 + (j * 2 * Math.PI) / n, span, 0.2),
        k,
      });
  });
  return out;
})();
/* Mẫu đơn: 7 cánh ngoài mép gợn sóng + 3 vòng cánh xếp nếp + nhụy vàng */
const PEONY = (() => {
  const outer = [],
    ruffle = [],
    stamens = [];
  for (let k = 0; k < 7; k++) {
    const a = (k * 2 * Math.PI) / 7 + 0.15;
    const [lx, ly] = pt(24, a - 0.62),
      [rx, ry] = pt(24, a + 0.62),
      [ax, ay] = pt(55, a - 0.42),
      [bx, by] = pt(55, a + 0.42);
    const [w1x, w1y] = pt(45.5, a - 0.17),
      [w2x, w2y] = pt(49, a),
      [w3x, w3y] = pt(45.5, a + 0.17);
    outer.push(
      `M50 50L${lx} ${ly}Q${ax} ${ay} ${w1x} ${w1y}Q${w2x} ${w2y} ${w3x} ${w3y}Q${bx} ${by} ${rx} ${ry}Z`
    );
  }
  [
    [35, 6, 0.1],
    [26.5, 5, 0.7],
    [18.5, 5, 1.3],
  ].forEach(([r, n, off]) => {
    for (let j = 0; j < n; j++)
      ruffle.push(
        crescent(
          r,
          off + (j * 2 * Math.PI) / n,
          ((2 * Math.PI) / n) * 1.25,
          0.48
        )
      );
  });
  for (let i = 0; i < 18; i++)
    stamens.push(pt(4.6 + (i % 4) * 1.5, i * 2.39996));
  return { outer, ruffle, stamens };
})();

/* ---------- Dải màu loang kiểu màu nước ---------- */
function Defs({ id, c }) {
  return (
    <>
      <linearGradient id={`${id}a`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={c.light} />
        <stop offset="1" stopColor={c.mid} />
      </linearGradient>
      <linearGradient id={`${id}b`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor={c.mid} />
        <stop offset="1" stopColor={c.deep} />
      </linearGradient>
      <radialGradient
        id={`${id}r`}
        gradientUnits="userSpaceOnUse"
        cx="50"
        cy="50"
        r="48"
      >
        <stop offset="0" stopColor={c.deep} />
        <stop offset="0.55" stopColor={c.mid} />
        <stop offset="1" stopColor={c.light} />
      </radialGradient>
      <radialGradient
        id={`${id}g`}
        gradientUnits="userSpaceOnUse"
        cx="50"
        cy="50"
        r="9"
      >
        <stop offset="0" stopColor={LF.light} />
        <stop offset="1" stopColor={LF.mid} />
      </radialGradient>
    </>
  );
}
const LeafDefs = ({ id }) => (
  <linearGradient id={`${id}lf`} x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stopColor={LF.light} />
    <stop offset="1" stopColor={LF.deep} />
  </linearGradient>
);
const Svg = ({ vb, w, h, className = '', style, children }) => (
  <svg
    viewBox={vb}
    width={w}
    height={h}
    className={className}
    style={style}
    aria-hidden="true"
    focusable="false"
  >
    {children}
  </svg>
);

/* ---------- Các bộ phận ---------- */
function LeafG({ id, x, y, rot, L = 22, w = 7 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <path
        d={`M0 0C${r2(L * 0.25)} ${-w} ${r2(L * 0.7)} ${-w} ${L} 0C${r2(
          L * 0.7
        )} ${r2(w * 0.8)} ${r2(L * 0.25)} ${r2(w * 0.8)} 0 0Z`}
        fill={`url(#${id}lf)`}
        stroke={LF.line}
        strokeOpacity="0.45"
        strokeWidth="0.6"
      />
      <path
        d={`M1 0Q${r2(L * 0.5)} ${r2(-w * 0.12)} ${r2(L - 2)} 0`}
        fill="none"
        stroke="#fff"
        strokeOpacity="0.55"
        strokeWidth="0.6"
      />
    </g>
  );
}
function TulipHeadG({ id, c }) {
  return (
    <g
      stroke={c.line}
      strokeOpacity="0.5"
      strokeWidth="0.8"
      strokeLinejoin="round"
    >
      <path d="M38 32C40 22 43 14 45 8C48 14 50 21 50 30Z" fill={c.deep} />
      <path d="M62 32C60 22 57 14 55 8C52 14 50 21 50 30Z" fill={c.deep} />
      <path
        d="M47 65C35 64 26 54 26 40C26 29 30 19 37 13C40 22 43 32 44 44C45 54 46 60 47 65Z"
        fill={`url(#${id}b)`}
      />
      <path
        d="M53 65C65 64 74 54 74 40C74 29 70 19 63 13C60 22 57 32 56 44C55 54 54 60 53 65Z"
        fill={`url(#${id}b)`}
      />
      <path
        d="M50 66C40 65 35 54 36 40C37 28 43 18 50 12C57 18 63 28 64 40C65 54 60 65 50 66Z"
        fill={`url(#${id}a)`}
      />
      <path
        d="M50 18C48.6 32 48.6 48 50 61M41 28C38.5 39 39 50 42.5 58"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.55"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </g>
  );
}
function TulipStemG({ id, leaves = true }) {
  return (
    <g>
      <path
        d="M50 64C50 92 48 122 51 166"
        stroke={LF.deep}
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
      />
      {leaves && (
        <g stroke={LF.line} strokeOpacity="0.45" strokeWidth="0.7">
          <path
            d="M50 160C33 140 25 112 31 84C41 104 47 128 50 150Z"
            fill={`url(#${id}lf)`}
          />
          <path
            d="M52 166C68 146 76 120 70 94C62 114 56 136 52 156Z"
            fill={`url(#${id}lf)`}
          />
          <path
            d="M34 96C40 114 45 132 49 150M68 104C63 122 57 140 53 158"
            fill="none"
            stroke="#fff"
            strokeOpacity="0.45"
          />
        </g>
      )}
    </g>
  );
}
function RoseHeadG({ id, c }) {
  return (
    <g strokeLinejoin="round">
      {ROSE.guard.map((d, i) => (
        <path
          key={`g${i}`}
          d={d}
          fill={`url(#${id}a)`}
          stroke={c.line}
          strokeOpacity="0.45"
          strokeWidth="0.8"
        />
      ))}
      {ROSE.petals.map((d, i) => (
        <path
          key={`p${i}`}
          d={d}
          fill={`url(#${id}r)`}
          stroke={c.line}
          strokeOpacity="0.5"
          strokeWidth="0.7"
        />
      ))}
      <circle
        cx="50"
        cy="50"
        r="2.4"
        fill={c.deep}
        stroke={c.line}
        strokeOpacity="0.6"
        strokeWidth="0.6"
      />
    </g>
  );
}
function RanunculusHeadG({ id, c }) {
  return (
    <g strokeLinejoin="round">
      <circle
        cx="50"
        cy="50"
        r="46"
        fill={c.light}
        stroke={c.line}
        strokeOpacity="0.35"
        strokeWidth="0.8"
      />
      {RANUN.map((p, i) => (
        <path
          key={i}
          d={p.d}
          fill={`url(#${id}r)`}
          stroke={c.line}
          strokeOpacity={r2(0.28 + p.k * 0.04)}
          strokeWidth="0.6"
        />
      ))}
      <circle
        cx="50"
        cy="50"
        r="9.5"
        fill={`url(#${id}g)`}
        stroke={LF.line}
        strokeOpacity="0.5"
        strokeWidth="0.6"
      />
      <path
        d="M45 50.5a5 5 0 0 1 10 0M47.2 50.5a2.8 2.8 0 0 1 5.6 0"
        fill="none"
        stroke={LF.line}
        strokeOpacity="0.55"
        strokeWidth="0.6"
      />
      <circle cx="50" cy="51.5" r="1.3" fill={LF.line} opacity="0.6" />
    </g>
  );
}
function PeonyHeadG({ id, c }) {
  return (
    <g strokeLinejoin="round">
      {PEONY.outer.map((d, i) => (
        <path
          key={`o${i}`}
          d={d}
          fill={`url(#${id}a)`}
          stroke={c.line}
          strokeOpacity="0.45"
          strokeWidth="0.8"
        />
      ))}
      {PEONY.ruffle.map((d, i) => (
        <path
          key={`r${i}`}
          d={d}
          fill={`url(#${id}r)`}
          stroke={c.line}
          strokeOpacity="0.4"
          strokeWidth="0.7"
        />
      ))}
      <circle cx="50" cy="50" r="10" fill="#FBEFC9" opacity="0.9" />
      {PEONY.stamens.map(([x, y], i) => (
        <circle key={`s${i}`} cx={x} cy={y} r="1.35" fill="#E2B85E" />
      ))}
      <circle
        cx="50"
        cy="50"
        r="3.2"
        fill={LF.light}
        stroke={LF.line}
        strokeOpacity="0.5"
        strokeWidth="0.5"
      />
    </g>
  );
}
function Bow({ x, y }) {
  const c = PAL.pink;
  return (
    <g
      transform={`translate(${x} ${y})`}
      fill={c.mid}
      stroke={c.line}
      strokeOpacity="0.6"
      strokeWidth="0.8"
      strokeLinejoin="round"
    >
      <path d="M0 -1C-10 -11 -21 -8 -18 1C-15 9 -5 5 0 -1Z" />
      <path d="M0 -1C10 -11 21 -8 18 1C15 9 5 5 0 -1Z" />
      <path d="M-1 0C-4 8 -8 15 -12 21L-6 19L-3 24C-1 16 0 8 1 1Z" />
      <path d="M1 0C4 8 8 15 12 21L6 19L3 24C1 16 0 8 -1 1Z" />
      <circle r="3.2" fill={c.deep} />
    </g>
  );
}

/* ---------- Hoa đơn ---------- */
export function Tulip({
  palette = 'pink',
  height = 140,
  stem = true,
  className = '',
  style,
}) {
  const id = useSid('tu'),
    c = PAL[palette] || PAL.pink;
  return (
    <Svg
      vb={stem ? '0 0 100 170' : '22 4 56 66'}
      w={r2(height * (stem ? 100 / 170 : 56 / 66))}
      h={height}
      className={className}
      style={style}
    >
      <defs>
        <Defs id={id} c={c} />
        <LeafDefs id={id} />
      </defs>
      {stem && <TulipStemG id={id} />}
      <TulipHeadG id={id} c={c} />
    </Svg>
  );
}
export function GardenRose({
  palette = 'pink',
  size = 90,
  leaves = true,
  className = '',
  style,
}) {
  const id = useSid('ro'),
    c = PAL[palette] || PAL.pink;
  return (
    <Svg
      vb="-4 -4 108 108"
      w={size}
      h={size}
      className={className}
      style={style}
    >
      <defs>
        <Defs id={id} c={c} />
        <LeafDefs id={id} />
      </defs>
      {leaves && (
        <>
          <LeafG id={id} x={32} y={70} rot={140} L={34} w={10} />
          <LeafG id={id} x={70} y={72} rot={40} L={32} w={9} />
          <LeafG id={id} x={72} y={28} rot={-35} L={26} w={8} />
        </>
      )}
      <RoseHeadG id={id} c={c} />
    </Svg>
  );
}
export function Ranunculus({
  palette = 'peach',
  size = 80,
  leaves = true,
  className = '',
  style,
}) {
  const id = useSid('ra'),
    c = PAL[palette] || PAL.peach;
  return (
    <Svg
      vb="-4 -4 108 108"
      w={size}
      h={size}
      className={className}
      style={style}
    >
      <defs>
        <Defs id={id} c={c} />
        <LeafDefs id={id} />
      </defs>
      {leaves && (
        <>
          <LeafG id={id} x={30} y={72} rot={150} L={32} w={9} />
          <LeafG id={id} x={72} y={74} rot={35} L={30} w={9} />
        </>
      )}
      <RanunculusHeadG id={id} c={c} />
    </Svg>
  );
}
export function Peony({
  palette = 'blush',
  size = 90,
  leaves = true,
  className = '',
  style,
}) {
  const id = useSid('pe'),
    c = PAL[palette] || PAL.blush;
  return (
    <Svg
      vb="-4 -4 108 108"
      w={size}
      h={size}
      className={className}
      style={style}
    >
      <defs>
        <Defs id={id} c={c} />
        <LeafDefs id={id} />
      </defs>
      {leaves && (
        <>
          <LeafG id={id} x={30} y={74} rot={145} L={32} w={10} />
          <LeafG id={id} x={74} y={70} rot={30} L={30} w={9} />
          <LeafG id={id} x={28} y={30} rot={-140} L={24} w={8} />
        </>
      )}
      <PeonyHeadG id={id} c={c} />
    </Svg>
  );
}
export function MiniBloom({
  kind = 'rose',
  palette,
  size = 28,
  className = '',
  style,
}) {
  const id = useSid('mb');
  const c =
    PAL[
      palette ||
        { ranunculus: 'peach', tulip: 'pink', peony: 'blush' }[kind] ||
        'pink'
    ] || PAL.pink;
  return (
    <Svg
      vb={kind === 'tulip' ? '22 4 56 66' : '0 0 100 100'}
      w={size}
      h={size}
      className={className}
      style={style}
    >
      <defs>
        <Defs id={id} c={c} />
      </defs>
      {kind === 'tulip' ? (
        <TulipHeadG id={id} c={c} />
      ) : kind === 'ranunculus' ? (
        <RanunculusHeadG id={id} c={c} />
      ) : kind === 'peony' ? (
        <PeonyHeadG id={id} c={c} />
      ) : (
        <RoseHeadG id={id} c={c} />
      )}
    </Svg>
  );
}

/* ---------- Bó hoa, cụm hoa, nhành lá ---------- */
export function LeafSprig({
  width = 180,
  flip = false,
  bud = true,
  className = '',
  style,
}) {
  const id = useSid('ls');
  const leaves = [
    [34, 22, -150],
    [56, 16, -40],
    [82, 22, 150],
    [106, 15, -35],
    [132, 21, 145],
    [156, 14, -30],
    [178, 19, 140],
  ];
  return (
    <Svg
      vb="0 0 220 40"
      w={width}
      h={r2((width * 40) / 220)}
      className={className}
      style={{ ...(flip ? { transform: 'scaleX(-1)' } : null), ...style }}
    >
      <defs>
        <LeafDefs id={id} />
        {bud && <Defs id={`${id}b`} c={PAL.pink} />}
      </defs>
      <path
        d="M6 24C50 12 96 30 140 18S200 12 214 16"
        fill="none"
        stroke={LF.deep}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {leaves.map(([x, y, r], i) => (
        <LeafG key={i} id={id} x={x} y={y} rot={r} L={16} w={5.5} />
      ))}
      {bud && (
        <g transform="translate(212 15) rotate(-20) scale(0.32) translate(-50 -40)">
          <TulipHeadG id={`${id}b`} c={PAL.pink} />
        </g>
      )}
    </Svg>
  );
}
export function TulipBouquet({
  height = 220,
  palettes = ['peach', 'cream', 'pink', 'butter', 'blush'],
  className = '',
  style,
}) {
  const id = useSid('tb');
  const T = [
    { a: -26, s: 0.86 },
    { a: 25, s: 0.84 },
    { a: -11, s: 0.97 },
    { a: 12, s: 0.94 },
    { a: 0, s: 1.05 },
  ];
  return (
    <Svg
      vb="0 0 200 232"
      w={r2((height * 200) / 232)}
      h={height}
      className={className}
      style={style}
    >
      <defs>
        <LeafDefs id={id} />
        {palettes.map((p, i) => (
          <Defs key={i} id={`${id}${i}`} c={PAL[p] || PAL.pink} />
        ))}
      </defs>
      <path
        d="M96 206L91 230M100 206L100 231M104 206L109 230"
        stroke={LF.deep}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {T.map((t, i) => (
        <g
          key={i}
          transform={`translate(100 206) rotate(${t.a}) scale(${t.s}) translate(-51 -166)`}
        >
          <TulipStemG id={id} leaves={i < 2 || i === 4} />
          <TulipHeadG
            id={`${id}${i % palettes.length}`}
            c={PAL[palettes[i % palettes.length]] || PAL.pink}
          />
        </g>
      ))}
      <Bow x={100} y={206} />
    </Svg>
  );
}
export function RoseCluster({
  size = 170,
  flip = false,
  palettes = ['pink', 'cream'],
  className = '',
  style,
}) {
  const id = useSid('rc');
  const leaves = [
    [34, 90, 160, 30, 9],
    [90, 98, 30, 28, 8],
    [126, 42, -32, 26, 8],
    [32, 50, -158, 24, 7],
    [80, 100, 80, 20, 6],
  ];
  return (
    <Svg
      vb="0 0 170 125"
      w={size}
      h={r2((size * 125) / 170)}
      className={className}
      style={{ ...(flip ? { transform: 'scaleX(-1)' } : null), ...style }}
    >
      <defs>
        <LeafDefs id={id} />
        {palettes.map((p, i) => (
          <Defs key={i} id={`${id}${i}`} c={PAL[p] || PAL.pink} />
        ))}
      </defs>
      {leaves.map(([x, y, r, L, w], i) => (
        <LeafG key={i} id={id} x={x} y={y} rot={r} L={L} w={w} />
      ))}
      <g transform="translate(110 50) scale(0.6) translate(-50 -50)">
        <RoseHeadG id={`${id}1`} c={PAL[palettes[1]] || PAL.cream} />
      </g>
      <g transform="translate(62 66) scale(0.94) translate(-50 -50)">
        <RoseHeadG id={`${id}0`} c={PAL[palettes[0]] || PAL.pink} />
      </g>
    </Svg>
  );
}
export function RanunculusCluster({
  size = 170,
  palettes = ['peach', 'cream', 'butter'],
  className = '',
  style,
}) {
  const id = useSid('rn');
  const heads = [
    [112, 54, 0.62, 1],
    [92, 100, 0.46, 2],
    [60, 64, 0.9, 0],
  ];
  const leaves = [
    [30, 92, 160, 28, 8],
    [128, 98, 28, 26, 8],
    [140, 38, -35, 22, 7],
    [40, 30, -148, 22, 7],
  ];
  return (
    <Svg
      vb="0 0 170 130"
      w={size}
      h={r2((size * 130) / 170)}
      className={className}
      style={style}
    >
      <defs>
        <LeafDefs id={id} />
        {palettes.map((p, i) => (
          <Defs key={i} id={`${id}${i}`} c={PAL[p] || PAL.peach} />
        ))}
      </defs>
      {leaves.map(([x, y, r, L, w], i) => (
        <LeafG key={i} id={id} x={x} y={y} rot={r} L={L} w={w} />
      ))}
      {heads.map(([x, y, s, k]) => (
        <g
          key={k}
          transform={`translate(${x} ${y}) scale(${s}) translate(-50 -50)`}
        >
          <RanunculusHeadG id={`${id}${k}`} c={PAL[palettes[k]] || PAL.peach} />
        </g>
      ))}
    </Svg>
  );
}

/* ---------- Bố cục trang trí dùng sẵn ---------- */
export function FloralCorner({
  kind = 'rose',
  pos = 'tr',
  size = 64,
  palette,
  style,
}) {
  const s = {
    [pos[0] === 't' ? 'top' : 'bottom']: -10,
    [pos[1] === 'r' ? 'right' : 'left']: -8,
    ...style,
  };
  return (
    <div className="mb-corner" style={s} aria-hidden="true">
      {kind === 'tulip' ? (
        <Tulip palette={palette || 'pink'} height={Math.round(size * 1.35)} />
      ) : kind === 'ranunculus' ? (
        <Ranunculus palette={palette || 'peach'} size={size} />
      ) : kind === 'peony' ? (
        <Peony palette={palette || 'blush'} size={size} />
      ) : kind === 'bouquet' ? (
        <TulipBouquet height={Math.round(size * 1.6)} />
      ) : (
        <GardenRose palette={palette || 'pink'} size={size} />
      )}
    </div>
  );
}
export function WelcomeGarden() {
  return (
    <div className="mb-garden" aria-hidden="true">
      <div className="mb-g-tl">
        <TulipBouquet
          height={230}
          palettes={['pink', 'blush', 'cream', 'peach', 'pink']}
        />
      </div>
      <div className="mb-g-tr">
        <RanunculusCluster size={200} palettes={['peach', 'cream', 'blush']} />
      </div>
      <div className="mb-g-bl">
        <RoseCluster size={190} palettes={['pink', 'cream']} />
      </div>
      <div className="mb-g-br">
        <RoseCluster size={160} flip palettes={['blush', 'peach']} />
      </div>
      <div className="mb-g-ml">
        <LeafSprig width={170} />
      </div>
      <div className="mb-g-mr">
        <LeafSprig width={150} flip />
      </div>
    </div>
  );
}
export function GardenBackdrop() {
  return (
    <div className="mb-backdrop" aria-hidden="true">
      <div className="mb-bd-tr">
        <RanunculusCluster size={190} palettes={['peach', 'cream', 'blush']} />
      </div>
      <div className="mb-bd-br">
        <TulipBouquet height={240} />
      </div>
    </div>
  );
}
const PETAL_COLORS = [
  '#F6CAD6',
  '#F9D3C6',
  '#FCEBC5',
  '#F8EEDC',
  '#E6A3B6',
  '#CFE0BD',
];
export function PetalFall({ count = 18 }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.35,
        size: 10 + Math.random() * 10,
        dx: `${Math.round(Math.random() * 120 - 60)}px`,
        rot: `${Math.round(Math.random() * 540 - 270)}deg`,
        c: PETAL_COLORS[i % PETAL_COLORS.length],
        leaf: i % 6 === 5,
      })),
    [count]
  );
  return (
    <div className="mb-petals" aria-hidden="true">
      {items.map((p, i) => (
        <span
          key={i}
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            '--dx': p.dx,
            '--rot': p.rot,
          }}
        >
          <svg width={p.size} height={p.size} viewBox="0 0 20 20">
            {p.leaf ? (
              <path d="M2 18C4 8 10 3 18 2C17 10 12 16 2 18Z" fill={p.c} />
            ) : (
              <path
                d="M10 1C15 4 18 9 15 15C13 18 7 18 5 15C2 9 5 4 10 1Z"
                fill={p.c}
              />
            )}
          </svg>
        </span>
      ))}
    </div>
  );
}
