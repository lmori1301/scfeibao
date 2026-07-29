import fs from 'node:fs';
import path from 'node:path';

const outDir = path.resolve('output/images/feibao-launch');
fs.mkdirSync(outDir, { recursive: true });

const W = 1920;
const H = 1080;
const assetDir = '/Users/yusenn/Desktop/3';

const assets = {
  home: path.join(assetDir, '首页@1x.png'),
  news: path.join(assetDir, '动态要闻@1x.png'),
  cert: path.join(assetDir, '证书管理系统@1x.png'),
  internal: path.join(assetDir, '内部管理系统@1x.png'),
  vehicle: path.join(assetDir, '车辆管理系统@1x.png'),
};

function href(file) {
  const data = fs.readFileSync(file).toString('base64');
  return `data:image/png;base64,${data}`;
}

function esc(value) {
  return String(value).replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&apos;',
  })[ch]);
}

function screenshotCard({ id, title, subtitle, file, srcW, srcH, cropY, x, y, w, h, accent }) {
  const scale = w / srcW;
  const imgH = srcH * scale;
  const imgY = y - cropY * scale;

  return `
  <g filter="url(#cardShadow)">
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="#ffffff"/>
    <clipPath id="${id}">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18"/>
    </clipPath>
    <image href="${href(file)}" x="${x}" y="${imgY}" width="${w}" height="${imgH}" clip-path="url(#${id})" preserveAspectRatio="none"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="none" stroke="#d6e7ff" stroke-width="2"/>
    <rect x="${x}" y="${y}" width="${w}" height="58" rx="18" fill="url(#moduleHeader)"/>
    <rect x="${x}" y="${y + 40}" width="${w}" height="28" fill="url(#moduleHeader)"/>
    <circle cx="${x + 34}" cy="${y + 30}" r="11" fill="${accent}"/>
    <text x="${x + 58}" y="${y + 38}" fill="#ffffff" font-size="23" font-weight="800">${esc(title)}</text>
    <text x="${x + w - 24}" y="${y + 38}" fill="#d8ecff" font-size="15" text-anchor="end">${esc(subtitle)}</text>
  </g>`;
}

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f7fbff"/>
      <stop offset=".52" stop-color="#eef6ff"/>
      <stop offset="1" stop-color="#ffffff"/>
    </linearGradient>
    <linearGradient id="blueBand" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#075fc6"/>
      <stop offset=".55" stop-color="#087ce3"/>
      <stop offset="1" stop-color="#075fc6"/>
    </linearGradient>
    <linearGradient id="moduleHeader" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#0d6dcc"/>
      <stop offset=".72" stop-color="#1285e6"/>
      <stop offset="1" stop-color="#e8342a"/>
    </linearGradient>
    <linearGradient id="redAccent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#e8342a"/>
      <stop offset="1" stop-color="#ff6a3d"/>
    </linearGradient>
    <radialGradient id="glow" cx=".7" cy=".2" r=".72">
      <stop offset="0" stop-color="#dceeff" stop-opacity=".85"/>
      <stop offset=".6" stop-color="#ffffff" stop-opacity=".24"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <filter id="cardShadow" x="-15%" y="-15%" width="130%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#0a3574" flood-opacity=".18"/>
    </filter>
    <filter id="titleShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="5" stdDeviation="5" flood-color="#00346e" flood-opacity=".18"/>
    </filter>
    <pattern id="grid" width="54" height="54" patternUnits="userSpaceOnUse">
      <path d="M54 0H0V54" fill="none" stroke="#1d7bd6" stroke-opacity=".08"/>
    </pattern>
    <clipPath id="homeClip">
      <rect x="92" y="238" width="760" height="610" rx="22"/>
    </clipPath>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>

  <g opacity=".16" fill="#0d6dcc">
    <path d="M1110 72h34v154h-34zM1164 42h38v184h-38zM1226 96h30v130h-30zM1284 58h42v168h-42zM1354 112h34v114h-34z"/>
    <path d="M1008 226h512" stroke="#0d6dcc" stroke-width="4"/>
    <path d="M140 942C430 855 682 936 908 872s515-120 862 6" fill="none" stroke="#0d6dcc" stroke-width="3"/>
  </g>

  <rect x="0" y="930" width="${W}" height="150" fill="url(#blueBand)"/>
  <rect x="0" y="0" width="${W}" height="14" fill="url(#redAccent)"/>

  <g filter="url(#titleShadow)">
    <text x="92" y="98" fill="#d9281f" font-size="42" font-weight="900">四川飞豹救援</text>
    <text x="92" y="154" fill="#0a63bd" font-size="58" font-weight="900">官网上线倒计时</text>
    <text x="94" y="198" fill="#4e6b8c" font-size="24" font-weight="600">门户首页 · 动态要闻 · 证书查询 · 内部管理 · 车辆管理</text>
  </g>

  <g>
    <rect x="1434" y="54" width="352" height="142" rx="24" fill="#ffffff" stroke="#d5e7fb" stroke-width="2" filter="url(#cardShadow)"/>
    <text x="1470" y="102" fill="#506982" font-size="22" font-weight="700">上线日期</text>
    <text x="1468" y="166" fill="#e8342a" font-size="68" font-weight="900">7月24日</text>
    <rect x="1700" y="76" width="58" height="58" rx="18" fill="#0d73d5" opacity=".12"/>
    <path d="M1729 91v28m-14-14h28" stroke="#0d73d5" stroke-width="6" stroke-linecap="round"/>
  </g>

  <g filter="url(#cardShadow)">
    <rect x="92" y="238" width="760" height="610" rx="22" fill="#ffffff"/>
    <image href="${href(assets.home)}" x="92" y="164" width="760" height="1705.21" clip-path="url(#homeClip)" preserveAspectRatio="none"/>
    <rect x="92" y="238" width="760" height="610" rx="22" fill="none" stroke="#d6e7ff" stroke-width="2"/>
    <rect x="92" y="238" width="760" height="76" rx="22" fill="url(#moduleHeader)" opacity=".96"/>
    <rect x="92" y="292" width="760" height="28" fill="url(#moduleHeader)" opacity=".96"/>
    <text x="128" y="287" fill="#ffffff" font-size="31" font-weight="900">官网首页主视觉</text>
    <text x="812" y="286" fill="#d8ecff" font-size="18" text-anchor="end">Sichuan Feibao Rescue</text>
  </g>

  ${screenshotCard({
    id: 'newsClip',
    title: '动态要闻',
    subtitle: '信息发布',
    file: assets.news,
    srcW: 1920,
    srcH: 2205,
    cropY: 0,
    x: 908,
    y: 244,
    w: 420,
    h: 286,
    accent: '#e8342a',
  })}

  ${screenshotCard({
    id: 'certClip',
    title: '证书管理系统',
    subtitle: '在线查询',
    file: assets.cert,
    srcW: 1920,
    srcH: 1444,
    cropY: 315,
    x: 1364,
    y: 244,
    w: 420,
    h: 286,
    accent: '#ffd629',
  })}

  ${screenshotCard({
    id: 'internalClip',
    title: '内部管理系统',
    subtitle: '人员信息',
    file: assets.internal,
    srcW: 1920,
    srcH: 1444,
    cropY: 315,
    x: 908,
    y: 572,
    w: 420,
    h: 286,
    accent: '#0d73d5',
  })}

  ${screenshotCard({
    id: 'vehicleClip',
    title: '车辆管理系统',
    subtitle: '车辆信息',
    file: assets.vehicle,
    srcW: 1920,
    srcH: 1444,
    cropY: 315,
    x: 1364,
    y: 572,
    w: 420,
    h: 286,
    accent: '#e8342a',
  })}

  <g>
    <rect x="92" y="878" width="1692" height="42" rx="21" fill="#ffffff" opacity=".86"/>
    <text x="132" y="906" fill="#0a63bd" font-size="20" font-weight="800">多功能模块同步上线</text>
    <text x="372" y="906" fill="#526d89" font-size="18">概况信息 / 队伍建设 / 信息公开 / 动态要闻 / 政策法规 / 查询系统</text>
    <text x="1748" y="906" fill="#d9281f" font-size="18" font-weight="800" text-anchor="end">COMING SOON</text>
  </g>

  <text x="92" y="998" fill="#ffffff" font-size="26" font-weight="800">权威发布 · 便民查询 · 业务协同 · 数字化管理</text>
  <text x="92" y="1038" fill="#cae5ff" font-size="18">四川飞豹救援官网全新上线，打造统一、清晰、可信的线上服务窗口。</text>
  <text x="1784" y="1032" fill="#ffffff" font-size="24" font-weight="900" text-anchor="end">7月24日 敬请关注</text>
</svg>`;

const svgFile = path.join(outDir, 'sichuan-feibao-launch-countdown.svg');
fs.writeFileSync(svgFile, svg, 'utf8');
console.log(svgFile);
