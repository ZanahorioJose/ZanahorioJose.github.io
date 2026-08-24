(function () {
  'use strict';

  const ADMIN = window.LEDGER_ADMIN === true;

  const CATEGORIES = {
    live: { label: '现场看球', icon: 'ticket', color: '#ef4444', desc: '每一次奔赴球场的证明，票根、照片和回忆都在这里。' },
    jersey: { label: '球衣', icon: 'shirt', color: '#22c55e', desc: '衣柜里的主队精神，一件一件慢慢收藏。' },
  };

  const ICON_PATHS = {
    ticket: '<path d="M3 9V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2"/><path d="M3 15v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2"/><path d="M15 5v14"/>',
    shirt: '<path d="M20.4 3.5 16 2a4 4 0 0 1-8 0L3.6 3.5a2 2 0 0 0-1.3 2.2l.6 3.5a1 1 0 0 0 1 .8H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.1a1 1 0 0 0 1-.8l.6-3.5a2 2 0 0 0-1.3-2.2Z"/>',
    camera: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2Z"/><circle cx="12" cy="13" r="4"/>',
    pencil: '<path d="M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>',
    trash: '<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
    calendar: '<rect x="3" y="4" width="18" height="17"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    trophy: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.7V17c0 .6-.5 1-1 1.2C7.9 18.8 7 20.2 7 22"/><path d="M14 14.7V17c0 .6.5 1 1 1.2 1.1.6 2 2 2 3.8"/><path d="M18 2H6v7a6 6 0 0 0 12 0Z"/>',
    flag: '<path d="M4 22V4"/><path d="M4 4h16l-3 4 3 4H4"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    save: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z"/><path d="M17 21v-8H7v8"/><path d="M7 3v5h8"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
    upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5"/><path d="M12 3v12"/>',
    rotate: '<path d="M3 12a9 9 0 1 0 9-9 9.7 9.7 0 0 0-6.7 2.7L3 8"/><path d="M3 3v5h5"/>',
    arrowUp: '<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>',
  };

  const TEAM_PALETTES = [
    { bg: '#ef4444', fg: '#000000' },
    { bg: '#22c55e', fg: '#000000' },
    { bg: '#fde047', fg: '#000000' },
    { bg: '#a3e635', fg: '#000000' },
    { bg: '#38bdf8', fg: '#000000' },
    { bg: '#000000', fg: '#ffffff' },
  ];

  function getData() {
    if (!window.LEDGER_DATA) {
      window.LEDGER_DATA = { meta: {}, records: [] };
    }
    return window.LEDGER_DATA;
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function fmtPrice(value) {
    const num = Number(value);
    return (isNaN(num) ? 0 : num).toLocaleString('zh-CN');
  }

  function iconSvg(name, size) {
    const side = size || 20;
    return `<svg width="${side}" height="${side}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square" stroke-linejoin="miter" aria-hidden="true">${ICON_PATHS[name] || ''}</svg>`;
  }

  function hashString(text) {
    let hash = 0;
    const source = String(text);
    for (let i = 0; i < source.length; i += 1) {
      hash = ((hash << 5) - hash) + source.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }

  function teamBadge(name, logo, small) {
    const palette = TEAM_PALETTES[hashString(name) % TEAM_PALETTES.length];
    const sizeClass = small ? ' team-badge sm' : '';
    if (logo) {
      return `<span class="team-badge${sizeClass} has-logo" style="background:${palette.bg}"><img src="${escapeHtml(logo)}" alt="${escapeHtml(name || '球队')}" loading="lazy"></span>`;
    }
    const ch = (String(name || '?').trim().slice(0, 1)) || '?';
    return `<span class="team-badge${sizeClass}" style="background:${palette.bg};color:${palette.fg}">${escapeHtml(ch)}</span>`;
  }

  function photoHtml(record, ratioClass) {
    const photo = record.photo || '';
    if (photo) {
      return `<div class="photo ${ratioClass} has-photo">
        <img src="${escapeHtml(photo)}" alt="照片" loading="lazy">
      </div>`;
    }
    return `<div class="photo ${ratioClass}">
      <div class="photo-slot">
        <span class="ph-icon">${iconSvg('camera', 36)}</span>
        <span class="ph-text">图片位</span>
      </div>
    </div>`;
  }

  function actionButtons(record) {
    if (!ADMIN) return '';
    return `<span class="actions">
      <button type="button" class="icon-btn" data-action="edit" data-id="${escapeHtml(record.id)}" title="编辑">${iconSvg('pencil', 18)}</button>
      <button type="button" class="icon-btn" data-action="delete" data-id="${escapeHtml(record.id)}" title="删除">${iconSvg('trash', 18)}</button>
    </span>`;
  }

  function emptyHtml(type) {
    const meta = CATEGORIES[type];
    return `<div class="empty">
      <span class="empty-icon">${iconSvg(meta.icon, 44)}</span>
      <p>还没有${meta.label}记录${ADMIN ? '，点击添加记录开始记账吧' : '，敬请期待'}</p>
    </div>`;
  }

  function sortByDateDesc(list) {
    return list.slice().sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  }

  function sortByDateAsc(list) {
    return list.slice().sort((a, b) => (a.date || '').localeCompare(b.date || ''));
  }

  function renderStats() {
    const grid = document.getElementById('statsGrid');
    if (!grid) return;
    const records = getData().records || [];
    const byType = {
      live: { count: 0, total: 0 },
      jersey: { count: 0, total: 0 },
    };
    let grandTotal = 0;
    records.forEach((record) => {
      const bucket = byType[record.type];
      if (!bucket) return;
      const price = Number(record.price) || 0;
      bucket.count += 1;
      bucket.total += price;
      grandTotal += price;
    });
    grid.innerHTML = `
      <div class="stat-card total">
        <span class="stat-label">${iconSvg('trophy', 18)} 总支出</span>
        <span class="stat-value">RMB ${fmtPrice(grandTotal)}</span>
        <span class="stat-sub">共 ${records.length} 笔记录</span>
      </div>
      ${Object.keys(byType).map((type) => `
        <div class="stat-card">
          <span class="stat-label">${iconSvg(CATEGORIES[type].icon, 18)} ${CATEGORIES[type].label}</span>
          <span class="stat-value">RMB ${fmtPrice(byType[type].total)}</span>
          <span class="stat-sub">${byType[type].count} 笔</span>
        </div>
      `).join('')}
    `;
    Object.keys(byType).forEach((type) => {
      const countEl = document.getElementById('count-' + type);
      const totalEl = document.getElementById('total-' + type);
      if (countEl) countEl.textContent = byType[type].count + ' 笔';
      if (totalEl) totalEl.textContent = 'RMB ' + fmtPrice(byType[type].total);
    });
  }

  let liveFilter = 'all';

  function liveSeasons() {
    const records = getData().records || [];
    return Array.from(new Set(
      records
        .filter((record) => record.type === 'live')
        .map((record) => (record.date || '').slice(0, 4))
        .filter(Boolean)
    )).sort();
  }

  function liveFiltersHtml() {
    const records = getData().records || [];
    const liveRecords = records.filter((record) => record.type === 'live');
    const counts = {};
    liveRecords.forEach((record) => {
      const season = (record.date || '').slice(0, 4);
      counts[season] = (counts[season] || 0) + 1;
    });
    const buttons = [
      `<button type="button" class="filter-btn ${liveFilter === 'all' ? 'active' : ''}" data-season="all">全部 ${liveRecords.length}</button>`
    ];
    liveSeasons().forEach((season) => {
      buttons.push(`<button type="button" class="filter-btn ${liveFilter === season ? 'active' : ''}" data-season="${season}">${season} · ${counts[season] || 0}</button>`);
    });
    return `<div class="live-filters">${buttons.join('')}</div>`;
  }

  function matchCardHtml(record, index) {
    const tiltClass = index % 2 ? 'tilt-l shadow-yellow' : 'tilt-r shadow-red';
    return `
      <article class="match-card card reveal ${tiltClass}">
        ${photoHtml(record, 'ratio-4-3')}
        <div class="match-info">
          <div class="match-top">
            <span class="chip">${iconSvg('calendar', 13)} ${escapeHtml(record.date || '未填日期')}</span>
            ${record.note ? `<span class="badge note-badge">${escapeHtml(record.note)}</span>` : ''}
          </div>
          <div class="match-teams">
            <div class="match-team-line">
              ${teamBadge(record.home, record.homeLogo, true)}
              <span class="team-txt">${escapeHtml(record.home || '？')}</span>
              <span class="match-score">${escapeHtml(record.result || 'VS')}</span>
            </div>
            <div class="match-team-line">
              ${teamBadge(record.away, record.awayLogo, true)}
              <span class="team-txt">${escapeHtml(record.away || '？')}</span>
            </div>
          </div>
          ${record.venue ? `<div class="match-meta">${iconSvg('pin', 12)} ${escapeHtml(record.venue)}</div>` : ''}
          <div class="match-foot">
            <span class="price-chip">RMB ${fmtPrice(record.price)}</span>
            ${actionButtons(record)}
          </div>
        </div>
      </article>
    `;
  }

  function renderLive() {
    const records = getData().records || [];
    let list = records.filter((record) => record.type === 'live');
    if (liveFilter !== 'all') {
      list = list.filter((record) => (record.date || '').slice(0, 4) === liveFilter);
    }
    list = sortByDateAsc(list);
    const el = document.getElementById('liveList');
    if (!el) return;
    if (!list.length) {
      el.innerHTML = emptyHtml('live');
      return;
    }
    el.innerHTML = liveFiltersHtml() + `<div class="match-grid">${list.map(matchCardHtml).join('')}</div>`;
  }

  function jerseyVersionHtml(record) {
    return record.version ? `<span class="badge version-badge">${escapeHtml(record.version)}</span>` : '';
  }

  function hasJerseyPrinting(record) {
    if (record.hasPrinting === '是') return true;
    if (record.hasPrinting === '否') return false;
    return Boolean(record.number || record.player);
  }

  function jerseyPrintingHtml(record) {
    if (!hasJerseyPrinting(record)) return '';
    const number = record.number != null && record.number !== '' ? record.number : '';
    const player = record.player || '';
    const competition = record.competition || '';
    if (!number && !player && !competition) {
      return `<div class="printing-line"><span class="badge print-badge">印号</span><span class="print-text">待补充</span></div>`;
    }
    return `
      <div class="printing-line">
        ${competition ? `<span class="badge comp-badge">${escapeHtml(competition)}</span>` : ''}
        ${number ? `<span class="print-number">${escapeHtml(number)}</span>` : ''}
        ${player ? `<span class="print-player">${escapeHtml(player)}</span>` : ''}
      </div>
    `;
  }

  function jerseyCardHtml(record, index) {
    const tiltClass = index % 2 ? 'tilt-r shadow-coral' : 'tilt-l shadow-yellow';
    return `
      <article class="jersey-card card reveal ${tiltClass}">
        ${photoHtml(record, 'ratio-3-4')}
        <div class="jersey-info">
          <span class="jersey-ghost-number">${escapeHtml(record.number != null && record.number !== '' ? record.number : '')}</span>
          <div class="jersey-head">
            <span class="jersey-title">
              ${record.teamLogo ? `<span class="jersey-logo"><img src="${escapeHtml(record.teamLogo)}" alt="${escapeHtml(record.team || '球队')}" loading="lazy"></span>` : ''}
              <span class="jersey-team">${escapeHtml(record.team || '未知球队')}</span>
            </span>
            <span class="badge jersey-badge">${escapeHtml(record.jerseyType || '球衣')}</span>
          </div>
          <div class="jersey-subline">
            <span class="jersey-season">${escapeHtml(record.season || '')}</span>
            ${jerseyVersionHtml(record)}
          </div>
          ${jerseyPrintingHtml(record)}
          <div class="jersey-foot">
            <span class="price-chip">RMB ${fmtPrice(record.price)}</span>
            <span class="date-text">${escapeHtml(record.date || '')}</span>
            ${actionButtons(record)}
          </div>
        </div>
      </article>
    `;
  }

  function jerseyGroupHtml(groupTitle, iconName, groupClass, records, startIndex) {
    if (!records.length) return '';
    return `
      <div class="sub-head ${groupClass} reveal">
        <span class="sub-head-icon">${iconSvg(iconName, 22)}</span>
        <span class="sub-head-title">${groupTitle}</span>
        <span class="chip">${records.length} 件</span>
      </div>
      <div class="jersey-grid">${records.map((record, index) => jerseyCardHtml(record, startIndex + index)).join('')}</div>
    `;
  }

  function renderJersey() {
    const records = getData().records || [];
    const list = sortByDateDesc(records.filter((record) => record.type === 'jersey'));
    const el = document.getElementById('jerseyList');
    if (!el) return;
    if (!list.length) {
      el.innerHTML = emptyHtml('jersey');
      return;
    }
    const clubs = list.filter((record) => record.teamKind !== '国家队');
    const nationals = list.filter((record) => record.teamKind === '国家队');
    const parts = [];
    if (clubs.length) parts.push(jerseyGroupHtml('俱乐部球衣', 'shirt', 'club', clubs, 0));
    if (nationals.length) parts.push(jerseyGroupHtml('国家队球衣', 'flag', 'national', nationals, clubs.length));
    el.innerHTML = parts.join('');
  }

  let revealObserver = null;

  function observeReveals() {
    const items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('visible'));
      return;
    }
    if (revealObserver) revealObserver.disconnect();
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    items.forEach((item, index) => {
      item.style.transitionDelay = (Math.min(index % 4, 3) * 55) + 'ms';
      revealObserver.observe(item);
    });
  }

  function setupNav() {
    const sections = ['live', 'jersey'];
    const links = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));
    if (!('IntersectionObserver' in window) || !links.length) return;
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) spy.observe(section);
    });
  }

  function renderAll() {
    const data = getData();
    const meta = data.meta || {};
    const records = data.records || [];
    const titleEl = document.getElementById('heroTitle');
    if (titleEl) titleEl.textContent = meta.siteTitle || '球哥的足球账本';
    const subEl = document.getElementById('heroSub');
    if (subEl) subEl.textContent = meta.subtitle || '为热爱买单，每一笔都值得记录';
    renderStats();
    renderLive();
    renderJersey();
    const updatedEl = document.getElementById('metaUpdated');
    if (updatedEl) updatedEl.textContent = meta.updatedAt || '-';
    const countEl = document.getElementById('metaCount');
    if (countEl) countEl.textContent = records.length + ' 笔';
    const versionEl = document.getElementById('metaVersion');
    if (versionEl) versionEl.textContent = 'DATA V' + (meta.version || 1);
    setupNav();
    observeReveals();
  }

  const toTop = document.getElementById('toTop');
  if (toTop) {
    toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    window.addEventListener('scroll', () => {
      toTop.classList.toggle('show', window.scrollY > 600);
    }, { passive: true });
  }

  const liveListEl = document.getElementById('liveList');
  if (liveListEl) {
    liveListEl.addEventListener('click', (event) => {
      const button = event.target.closest('[data-season]');
      if (!button) return;
      liveFilter = button.getAttribute('data-season');
      renderLive();
      observeReveals();
    });
  }

  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', renderAll);
    } else {
      renderAll();
    }
  }

  window.LedgerApp = {
    getData: getData,
    renderAll: renderAll,
    CATEGORIES: CATEGORIES,
    escapeHtml: escapeHtml,
    fmtPrice: fmtPrice,
  };

  init();
})();
