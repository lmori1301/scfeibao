import fs from 'node:fs';
import path from 'node:path';

const outDir = path.resolve('output/images/gov-countdown');
fs.mkdirSync(outDir, { recursive: true });

const W = 1536;
const H = 1024;

const modules = ['政务服务', '政策发布', '信息公开', '互动咨询', '数据看板', '办事指南'];

const variants = [
  {
    slug: '01-main-portal',
    title: '政务官网上线倒计时',
    subtitle: '全新门户 · 智慧服务 · 高效协同',
    accent: '#2de2ff',
    theme: '#0b67ff',
    layout: 'portal',
  },
  {
    slug: '02-smart-city',
    title: '7月24日 即将上线',
    subtitle: '城市服务入口全面升级',
    accent: '#72f7ff',
    theme: '#135cff',
    layout: 'city',
  },
  {
    slug: '03-data-hub',
    title: '政务服务 数字启航',
    subtitle: '官网上线倒计时 · 7月24日',
    accent: '#4dffcd',
    theme: '#0d8bff',
    layout: 'dashboard',
  },
  {
    slug: '04-service-matrix',
    title: '智慧政务 一站直达',
    subtitle: '7月24日 官网全新上线',
    accent: '#9ce8ff',
    theme: '#2554ff',
    layout: 'matrix',
  },
  {
    slug: '05-launch-wall',
    title: '官网上线倒计时',
    subtitle: '7月24日 开启数字政务新体验',
    accent: '#35d4ff',
    theme: '#006dff',
    layout: 'wall',
  },
  {
    slug: '06-future-portal',
    title: '政务官网 未来已来',
    subtitle: '7月24日 全新上线',
    accent: '#68fff0',
    theme: '#174cff',
    layout: 'future',
  },
];

function esc(value) {
  return String(value).replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&apos;',
  })[ch]);
}

function card(x, y, w, h, title, body, accent = '#2de2ff') {
  return `
    <g filter="url(#softGlow)">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="rgba(4,26,74,.72)" stroke="${accent}" stroke-opacity=".42"/>
      <rect x="${x + 18}" y="${y + 18}" width="42" height="42" rx="12" fill="${accent}" opacity=".18"/>
      <path d="M${x + 30} ${y + 39}h18M${x + 39} ${y + 30}v18" stroke="${accent}" stroke-width="4" stroke-linecap="round"/>
      <text x="${x + 76}" y="${y + 36}" fill="#f3fbff" font-size="24" font-weight="700">${esc(title)}</text>
      <text x="${x + 76}" y="${y + 68}" fill="#a8d8ff" font-size="16">${esc(body)}</text>
    </g>`;
}

function moduleChips(accent) {
  return modules.map((name, i) => {
    const x = 88 + (i % 3) * 226;
    const y = 784 + Math.floor(i / 3) * 82;
    return card(x, y, 188, 58, name, '功能模块', accent);
  }).join('');
}

function screen(x, y, w, h, accent) {
  const bars = [0.78, 0.48, 0.64, 0.36, 0.58].map((v, i) =>
    `<rect x="${x + 38}" y="${y + 86 + i * 34}" width="${Math.round((w - 100) * v)}" height="12" rx="6" fill="${accent}" opacity="${0.8 - i * 0.08}"/>`
  ).join('');
  return `
    <g filter="url(#screenShadow)">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="26" fill="rgba(3,18,52,.88)" stroke="${accent}" stroke-opacity=".56"/>
      <rect x="${x + 26}" y="${y + 28}" width="${w - 52}" height="38" rx="12" fill="rgba(45,226,255,.12)"/>
      <circle cx="${x + 48}" cy="${y + 47}" r="6" fill="#35d4ff"/>
      <circle cx="${x + 70}" cy="${y + 47}" r="6" fill="#4dffcd"/>
      <circle cx="${x + 92}" cy="${y + 47}" r="6" fill="#9ce8ff"/>
      ${bars}
      <polyline points="${x + 52},${y + h - 74} ${x + 130},${y + h - 124} ${x + 222},${y + h - 96} ${x + 318},${y + h - 160} ${x + 420},${y + h - 118} ${x + w - 64},${y + h - 190}" fill="none" stroke="${accent}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    </g>`;
}

function orbitCards(accent) {
  const positions = [
    [900, 196], [1172, 292], [1040, 530], [1246, 638], [842, 694], [736, 388],
  ];
  return modules.map((name, i) => card(positions[i][0], positions[i][1], 220, 78, name, '在线入口', accent)).join('');
}

function base(v) {
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#04112f"/>
      <stop offset=".42" stop-color="#073b89"/>
      <stop offset="1" stop-color="#061a48"/>
    </linearGradient>
    <radialGradient id="radial" cx=".68" cy=".36" r=".62">
      <stop offset="0" stop-color="${v.theme}" stop-opacity=".66"/>
      <stop offset=".5" stop-color="#0a2d75" stop-opacity=".28"/>
      <stop offset="1" stop-color="#020817" stop-opacity="0"/>
    </radialGradient>
    <filter id="softGlow" x="-40%" y="-40%" width="180%" height="180%">
      <feDropShadow dx="0" dy="0" stdDeviation="10" flood-color="${v.accent}" flood-opacity=".28"/>
    </filter>
    <filter id="screenShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="28" stdDeviation="34" flood-color="#000b26" flood-opacity=".55"/>
      <feDropShadow dx="0" dy="0" stdDeviation="8" flood-color="${v.accent}" flood-opacity=".18"/>
    </filter>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="#6ccaff" stroke-opacity=".09" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#radial)"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <g opacity=".2">
    ${Array.from({ length: 58 }, (_, i) => {
      const x = (i * 137) % W;
      const y = (i * 83) % H;
      return `<circle cx="${x}" cy="${y}" r="${2 + (i % 4)}" fill="${v.accent}"/>`;
    }).join('')}
  </g>
  <g opacity=".32" stroke="${v.accent}" stroke-width="2">
    <path d="M80 190C360 58 570 230 790 132S1240 72 1450 190" fill="none"/>
    <path d="M70 730C300 620 566 770 778 690S1190 580 1480 724" fill="none"/>
  </g>`;
}

function headline(v, x = 86, y = 130) {
  return `
  <text x="${x}" y="${y}" fill="#ffffff" font-size="70" font-weight="800">${esc(v.title)}</text>
  <text x="${x}" y="${y + 62}" fill="#bdeeff" font-size="30" font-weight="500">${esc(v.subtitle)}</text>
  <g>
    <rect x="${x}" y="${y + 100}" width="306" height="92" rx="20" fill="rgba(45,226,255,.12)" stroke="${v.accent}" stroke-opacity=".55"/>
    <text x="${x + 26}" y="${y + 158}" fill="${v.accent}" font-size="54" font-weight="900">7月24日</text>
  </g>`;
}

function render(v) {
  let body = '';
  if (v.layout === 'portal') {
    body = `${headline(v)}${screen(760, 210, 620, 420, v.accent)}${orbitCards(v.accent)}${moduleChips(v.accent)}`;
  } else if (v.layout === 'city') {
    body = `${headline(v)}
      <g opacity=".46" stroke="${v.accent}" fill="none">
        <path d="M760 760V420h86v340M882 760V330h116v430M1040 760V470h92v290M1170 760V285h148v475M1360 760V390h78v370" stroke-width="4"/>
        <path d="M720 760H1460" stroke-width="5"/>
      </g>
      ${screen(836, 178, 506, 314, v.accent)}
      ${orbitCards(v.accent)}
      ${moduleChips(v.accent)}`;
  } else if (v.layout === 'dashboard') {
    body = `${headline(v, 86, 118)}
      ${screen(646, 184, 744, 510, v.accent)}
      ${card(94, 368, 232, 92, '数据看板', '运行态势实时感知', v.accent)}
      ${card(362, 430, 232, 92, '协同办公', '流程在线闭环处理', v.accent)}
      ${card(178, 558, 232, 92, '统一入口', '办事服务一站触达', v.accent)}
      ${moduleChips(v.accent)}`;
  } else if (v.layout === 'matrix') {
    body = `${headline(v)}
      <g transform="translate(688 220)">
        ${modules.map((name, i) => {
          const x = (i % 3) * 248;
          const y = Math.floor(i / 3) * 180;
          return card(x, y, 214, 126, name, ['在线办理', '权威发布', '透明公开', '民意直达', '态势监测', '清晰指引'][i], v.accent);
        }).join('')}
      </g>
      <circle cx="1128" cy="704" r="112" fill="none" stroke="${v.accent}" stroke-width="3" opacity=".38"/>
      <circle cx="1128" cy="704" r="68" fill="rgba(45,226,255,.08)" stroke="${v.accent}" stroke-width="2" opacity=".68"/>
      ${moduleChips(v.accent)}`;
  } else if (v.layout === 'wall') {
    body = `${headline(v, 86, 124)}
      <g transform="translate(640 158)">
        ${Array.from({ length: 9 }, (_, i) => {
          const x = (i % 3) * 242;
          const y = Math.floor(i / 3) * 158;
          return `<rect x="${x}" y="${y}" width="210" height="126" rx="18" fill="rgba(4,26,74,.72)" stroke="${v.accent}" stroke-opacity=".38"/>
            <rect x="${x + 26}" y="${y + 28}" width="${96 + (i % 3) * 24}" height="10" rx="5" fill="${v.accent}" opacity=".8"/>
            <rect x="${x + 26}" y="${y + 54}" width="${132 - (i % 2) * 24}" height="10" rx="5" fill="#a8d8ff" opacity=".45"/>
            <rect x="${x + 26}" y="${y + 82}" width="${70 + (i % 4) * 20}" height="22" rx="11" fill="${v.accent}" opacity=".18"/>`;
        }).join('')}
      </g>
      ${moduleChips(v.accent)}`;
  } else {
    body = `${headline(v)}
      <g transform="translate(768 178)">
        <ellipse cx="316" cy="276" rx="330" ry="210" fill="rgba(45,226,255,.08)" stroke="${v.accent}" stroke-width="3" opacity=".68"/>
        <ellipse cx="316" cy="276" rx="228" ry="144" fill="none" stroke="${v.accent}" stroke-width="2" opacity=".44"/>
        ${screen(68, 96, 500, 324, v.accent)}
      </g>
      ${orbitCards(v.accent)}
      ${moduleChips(v.accent)}`;
  }

  return `${base(v)}
  ${body}
  <text x="86" y="966" fill="#7ebfff" font-size="18" opacity=".8">数字政务 · 便民服务 · 统一门户 · 安全可信</text>
  <text x="1330" y="966" fill="#7ebfff" font-size="18" text-anchor="end" opacity=".8">COMING SOON</text>
</svg>`;
}

for (const variant of variants) {
  const file = path.join(outDir, `${variant.slug}.svg`);
  fs.writeFileSync(file, render(variant), 'utf8');
  console.log(file);
}
