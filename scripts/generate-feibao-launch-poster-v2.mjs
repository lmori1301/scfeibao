import fs from 'node:fs';
import path from 'node:path';

const outDir = path.resolve('output/images/feibao-launch');
fs.mkdirSync(outDir, { recursive: true });

const W = 1920;
const H = 1080;
const assetDir = '/Users/yusenn/Desktop/3';

const assets = {
  home: 'assets/home.png',
  news: 'assets/news.png',
  cert: 'assets/cert.png',
  internal: 'assets/internal.png',
  vehicle: 'assets/vehicle.png',
};

function href(file) {
  return file;
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

function moduleCard({ id, title, subtitle, file, srcH, cropY, x, y, w, h, accent }) {
  const scale = w / 1920;
  const imageH = srcH * scale;
  const imageY = y - cropY * scale;
  return `
    <g filter="url(#floatShadow)">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="20" fill="#ffffff"/>
      <clipPath id="${id}">
        <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="20"/>
      </clipPath>
      <image href="${href(file)}" x="${x}" y="${imageY}" width="${w}" height="${imageH}" clip-path="url(#${id})" preserveAspectRatio="none"/>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="20" fill="none" stroke="rgba(255,255,255,.78)" stroke-width="2"/>
      <rect x="${x}" y="${y}" width="${w}" height="58" rx="20" fill="rgba(0,91,186,.92)"/>
      <rect x="${x}" y="${y + 38}" width="${w}" height="30" fill="rgba(0,91,186,.92)"/>
      <circle cx="${x + 32}" cy="${y + 30}" r="11" fill="${accent}"/>
      <text x="${x + 55}" y="${y + 38}" fill="#ffffff" font-size="22" font-weight="800">${esc(title)}</text>
      <text x="${x + w - 22}" y="${y + 38}" fill="#cfe7ff" font-size="15" text-anchor="end">${esc(subtitle)}</text>
    </g>`;
}

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bgOverlay" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#061b44" stop-opacity=".96"/>
      <stop offset=".42" stop-color="#075db9" stop-opacity=".82"/>
      <stop offset="1" stop-color="#d8221b" stop-opacity=".74"/>
    </linearGradient>
    <linearGradient id="deepBlue" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#0052b0"/>
      <stop offset=".55" stop-color="#087de4"/>
      <stop offset="1" stop-color="#063b8d"/>
    </linearGradient>
    <linearGradient id="redLine" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#e62d26"/>
      <stop offset="1" stop-color="#ff6a36"/>
    </linearGradient>
    <radialGradient id="light" cx=".68" cy=".26" r=".62">
      <stop offset="0" stop-color="#ffffff" stop-opacity=".5"/>
      <stop offset=".46" stop-color="#2ca7ff" stop-opacity=".16"/>
      <stop offset="1" stop-color="#001d4b" stop-opacity="0"/>
    </radialGradient>
    <filter id="floatShadow" x="-20%" y="-20%" width="140%" height="150%">
      <feDropShadow dx="0" dy="26" stdDeviation="26" flood-color="#00183e" flood-opacity=".38"/>
      <feDropShadow dx="0" dy="0" stdDeviation="10" flood-color="#ffffff" flood-opacity=".12"/>
    </filter>
    <filter id="textShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="5" flood-color="#00173d" flood-opacity=".38"/>
    </filter>
    <clipPath id="heroBgClip">
      <rect x="0" y="0" width="${W}" height="${H}"/>
    </clipPath>
    <clipPath id="homeMockClip">
      <rect x="118" y="404" width="980" height="472" rx="22"/>
    </clipPath>
    <pattern id="scanGrid" width="46" height="46" patternUnits="userSpaceOnUse">
      <path d="M46 0H0V46" fill="none" stroke="#ffffff" stroke-opacity=".07"/>
    </pattern>
  </defs>

  <image href="${href(assets.home)}" x="0" y="-320" width="1920" height="4310" clip-path="url(#heroBgClip)" preserveAspectRatio="none"/>
  <rect width="${W}" height="${H}" fill="url(#bgOverlay)"/>
  <rect width="${W}" height="${H}" fill="url(#light)"/>
  <rect width="${W}" height="${H}" fill="url(#scanGrid)"/>
  <rect x="0" y="0" width="${W}" height="18" fill="url(#redLine)"/>

  <g opacity=".28" fill="#ffffff">
    <path d="M1230 70h38v190h-38zM1294 38h44v222h-44zM1366 98h36v162h-36zM1430 58h50v202h-50zM1512 124h42v136h-42z"/>
    <path d="M1160 262h480" stroke="#ffffff" stroke-width="4"/>
  </g>

  <g filter="url(#textShadow)">
    <text x="116" y="110" fill="#ffffff" font-size="34" font-weight="800">四川飞豹救援</text>
    <text x="116" y="184" fill="#ffffff" font-size="72" font-weight="900">官网上线倒计时</text>
    <rect x="118" y="216" width="590" height="44" rx="22" fill="rgba(255,255,255,.16)" stroke="rgba(255,255,255,.3)"/>
    <text x="146" y="246" fill="#eaf6ff" font-size="22" font-weight="700">门户首页 / 动态要闻 / 查询系统 / 内部管理 / 车辆管理</text>
  </g>

  <g filter="url(#floatShadow)">
    <rect x="1360" y="72" width="410" height="184" rx="30" fill="#ffffff"/>
    <text x="1402" y="126" fill="#4a627c" font-size="24" font-weight="800">上线日期</text>
    <text x="1398" y="206" fill="#e5322b" font-size="82" font-weight="900">7月24日</text>
    <rect x="1668" y="104" width="68" height="68" rx="20" fill="#eaf4ff"/>
    <path d="M1702 121v34m-17-17h34" stroke="#0874d8" stroke-width="8" stroke-linecap="round"/>
  </g>

  <g filter="url(#floatShadow)">
    <rect x="92" y="342" width="1054" height="592" rx="30" fill="rgba(255,255,255,.96)"/>
    <rect x="118" y="372" width="980" height="42" rx="16" fill="#f2f7fd"/>
    <circle cx="146" cy="393" r="7" fill="#e5322b"/>
    <circle cx="170" cy="393" r="7" fill="#f6c344"/>
    <circle cx="194" cy="393" r="7" fill="#2fb66d"/>
    <text x="232" y="401" fill="#0b63bd" font-size="18" font-weight="800">scfeibao.com</text>
    <image href="${href(assets.home)}" x="118" y="298" width="980" height="2199.7" clip-path="url(#homeMockClip)" preserveAspectRatio="none"/>
    <rect x="118" y="404" width="980" height="472" rx="22" fill="none" stroke="#d8e9fb" stroke-width="2"/>
    <rect x="118" y="404" width="980" height="66" rx="22" fill="rgba(0,91,186,.92)"/>
    <rect x="118" y="448" width="980" height="32" fill="rgba(0,91,186,.92)"/>
    <text x="154" y="447" fill="#ffffff" font-size="29" font-weight="900">官网首页主视觉</text>
    <text x="1060" y="447" fill="#d7ecff" font-size="18" text-anchor="end">Sichuan Feibao Rescue</text>
  </g>

  ${moduleCard({
    id: 'v2News',
    title: '动态要闻',
    subtitle: '权威发布',
    file: assets.news,
    srcH: 2205,
    cropY: 260,
    x: 1212,
    y: 328,
    w: 292,
    h: 220,
    accent: '#ff3b30',
  })}
  ${moduleCard({
    id: 'v2Cert',
    title: '证书管理',
    subtitle: '在线查询',
    file: assets.cert,
    srcH: 1444,
    cropY: 330,
    x: 1540,
    y: 328,
    w: 292,
    h: 220,
    accent: '#ffd12e',
  })}
  ${moduleCard({
    id: 'v2Internal',
    title: '内部管理',
    subtitle: '人员信息',
    file: assets.internal,
    srcH: 1444,
    cropY: 330,
    x: 1212,
    y: 594,
    w: 292,
    h: 220,
    accent: '#47b5ff',
  })}
  ${moduleCard({
    id: 'v2Vehicle',
    title: '车辆管理',
    subtitle: '车辆信息',
    file: assets.vehicle,
    srcH: 1444,
    cropY: 330,
    x: 1540,
    y: 594,
    w: 292,
    h: 220,
    accent: '#ff3b30',
  })}

  <g>
    <rect x="0" y="930" width="${W}" height="150" fill="url(#deepBlue)"/>
    <rect x="92" y="888" width="1740" height="74" rx="28" fill="rgba(255,255,255,.94)" filter="url(#floatShadow)"/>
    <text x="136" y="934" fill="#085eb9" font-size="27" font-weight="900">多功能模块同步上线</text>
    <text x="458" y="934" fill="#4d6884" font-size="22" font-weight="600">官网门户、动态发布、证书查询、内部管理、车辆管理一体化呈现</text>
    <text x="1784" y="934" fill="#e5322b" font-size="22" font-weight="900" text-anchor="end">COMING SOON</text>
  </g>

  <text x="92" y="1016" fill="#ffffff" font-size="31" font-weight="900">权威发布 · 便民查询 · 业务协同 · 数字化管理</text>
  <text x="92" y="1052" fill="#c9e6ff" font-size="20">打造统一、清晰、可信的四川飞豹救援线上服务窗口</text>
  <text x="1784" y="1040" fill="#ffffff" font-size="30" font-weight="900" text-anchor="end">7月24日 敬请关注</text>
</svg>`;

const svgFile = path.join(outDir, 'sichuan-feibao-launch-countdown-v2.svg');
fs.writeFileSync(svgFile, svg, 'utf8');
console.log(svgFile);
