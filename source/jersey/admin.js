(function () {
  'use strict';

  const app = window.LedgerApp;
  const WORK_KEY = 'football-ledger-work-v2';

  const FIELD_GROUPS = {
    live: [
      { key: 'home', label: '主队', type: 'text', placeholder: '如：上海海港', col: 6, required: true },
      { key: 'away', label: '客队', type: 'text', placeholder: '如：山东泰山', col: 6, required: true },
      { key: 'homeLogo', label: '主队 LOGO 路径', type: 'text', placeholder: '如 assets/live/logos/hh.svg', col: 6, required: false },
      { key: 'awayLogo', label: '客队 LOGO 路径', type: 'text', placeholder: '如 assets/live/logos/sd.svg', col: 6, required: false },
      { key: 'venue', label: '球场', type: 'text', placeholder: '如：浦东足球场', col: 6, required: false },
      { key: 'result', label: '比分', type: 'text', placeholder: '如 2 : 1', col: 6, required: false },
      { key: 'price', label: '票价（元）', type: 'number', col: 6, required: true },
      { key: 'date', label: '日期', type: 'date', col: 6, required: true },
      { key: 'note', label: '备注', type: 'textarea', placeholder: '座位、氛围、战报……都可以写在这里', col: 12, required: false },
    ],
    jersey: [
      { key: 'team', label: '球队', type: 'text', placeholder: '如：切尔西', col: 6, required: true },
      { key: 'teamKind', label: '球队类型', type: 'select', options: ['俱乐部', '国家队'], col: 6, required: false },
      { key: 'teamLogo', label: '球队 LOGO 路径', type: 'text', placeholder: '如 assets/jersey/logos/rm.svg', col: 6, required: false },
      { key: 'season', label: '赛季', type: 'text', placeholder: '如：2025/26', col: 6, required: false },
      { key: 'jerseyType', label: '款式', type: 'select', options: ['主场', '客场', '二客', '训练', '复古', '落场'], col: 6, required: false },
      { key: 'version', label: '版本', type: 'select', options: ['球迷版', '球员版'], col: 6, required: false },
      { key: 'hasPrinting', label: '是否印号', type: 'select', options: ['是', '否'], col: 6, required: false },
      { key: 'competition', label: '印号联赛 / 杯赛', type: 'text', placeholder: '如：英超 / 欧冠 / 世界杯', col: 6, required: false },
      { key: 'number', label: '印号号码', type: 'number', col: 6, required: false },
      { key: 'player', label: '印号球员名', type: 'text', placeholder: '如：帕尔默', col: 6, required: false },
      { key: 'price', label: '价格（元）', type: 'number', col: 6, required: true },
      { key: 'date', label: '入手日期', type: 'date', col: 6, required: false },
      { key: 'note', label: '备注', type: 'textarea', placeholder: '渠道、码数、短袖/长袖等', col: 12, required: false },
    ],
  };

  let editingId = null;
  let currentType = 'live';
  let pendingPhoto = '';

  function sampleData() {
    return {
      meta: {
        version: 1,
        siteTitle: '球哥的足球账本',
        subtitle: '为热爱买单，每一笔都值得记录',
        updatedAt: '2026-08-20',
      },
      records: [
        { id: 's-live-1', type: 'live', date: '2023-07-21', home: '上海海港', away: '沧州雄狮', venue: '', result: '3 : 0', price: 180, note: '', photo: '', homeLogo: 'assets/live/logos/2025/shanghai-port-v2021.svg', awayLogo: 'assets/live/logos/2023/cangzhou-mighty-lions-v2021.svg' },
        { id: 's-live-2', type: 'live', date: '2025-02-23', home: '上海海港', away: '深圳', venue: '', result: '3 : 1', price: 140, note: '', photo: 'assets/live/2025-02-23_port_vs_shenzhen.jpg', homeLogo: 'assets/live/logos/2025/shanghai-port-v2021.svg', awayLogo: 'assets/live/logos/2025/shenzhen-peng-city-v2024.svg' },
        { id: 's-live-3', type: 'live', date: '2025-03-01', home: '上海申花', away: '北京国安', venue: '', result: '2 : 2', price: 320, note: '', photo: 'assets/live/2025-03-01_shenhua_vs_guoan.jpg', homeLogo: 'assets/live/logos/2025/shanghai-shenhua-v2022.svg', awayLogo: 'assets/live/logos/2025/beijing-guoan-v2022.svg' },
        { id: 's-live-4', type: 'live', date: '2025-04-12', home: '上海申花', away: '浙江队', venue: '', result: '3 : 2', price: 260, note: '', photo: 'assets/live/2025-04-12_shenhua_vs_zhejiang.jpg', homeLogo: 'assets/live/logos/2025/shanghai-shenhua-v2022.svg', awayLogo: 'assets/live/logos/2025/zhejiang-professional-v2022.svg' },
        { id: 's-live-5', type: 'live', date: '2025-04-20', home: '上海海港', away: '成都蓉城', venue: '', result: '1 : 3', price: 140, note: '', photo: 'assets/live/2025-04-20_port_vs_rongcheng.jpg', homeLogo: 'assets/live/logos/2025/shanghai-port-v2021.svg', awayLogo: 'assets/live/logos/2025/chengdu-rongcheng-v2021.svg' },
        { id: 's-live-6', type: 'live', date: '2025-05-01', home: '浙江队', away: '长春亚泰', venue: '', result: '4 : 2', price: 180, note: '', photo: 'assets/live/2025-05-01_zhejiang_vs_yatai.jpg', homeLogo: 'assets/live/logos/2025/zhejiang-professional-v2022.svg', awayLogo: 'assets/live/logos/2025/changchun-yatai-v2007.svg' },
        { id: 's-live-7', type: 'live', date: '2025-05-17', home: '上海海港', away: '山东泰山', venue: '', result: '1 : 1', price: 230, note: '', photo: '', homeLogo: 'assets/live/logos/2025/shanghai-port-v2021.svg', awayLogo: 'assets/live/logos/2025/shandong-taishan-v2022.svg' },
        { id: 's-live-8', type: 'live', date: '2025-06-22', home: '上海海港', away: '上海申花', venue: '', result: '2 : 3', price: 230, note: '足协杯', photo: 'assets/live/2025-06-22_port_vs_shenhua.jpg', homeLogo: 'assets/live/logos/2025/shanghai-port-v2021.svg', awayLogo: 'assets/live/logos/2025/shanghai-shenhua-v2022.svg' },
        { id: 's-live-9', type: 'live', date: '2025-08-09', home: '上海申花', away: '上海海港', venue: '', result: '1 : 2', price: 320, note: '', photo: 'assets/live/2025-08-09_shenhua_vs_port.jpg', homeLogo: 'assets/live/logos/2025/shanghai-shenhua-v2022.svg', awayLogo: 'assets/live/logos/2025/shanghai-port-v2021.svg' },
        { id: 's-live-10', type: 'live', date: '2025-08-10', home: '浙江队', away: '北京国安', venue: '', result: '3 : 4', price: 220, note: '', photo: 'assets/live/2025-08-10_zhejiang_vs_guoan.jpg', homeLogo: 'assets/live/logos/2025/zhejiang-professional-v2022.svg', awayLogo: 'assets/live/logos/2025/beijing-guoan-v2022.svg' },
        { id: 's-live-11', type: 'live', date: '2025-08-16', home: '浙江队', away: '上海申花', venue: '', result: '0 : 0', price: 180, note: '', photo: 'assets/live/2025-08-16_zhejiang_vs_shenhua.jpg', homeLogo: 'assets/live/logos/2025/zhejiang-professional-v2022.svg', awayLogo: 'assets/live/logos/2025/shanghai-shenhua-v2022.svg' },
        { id: 's-live-12', type: 'live', date: '2025-09-12', home: '上海申花', away: '山东泰山', venue: '', result: '3 : 3', price: 260, note: '', photo: 'assets/live/2025-09-12_shenhua_vs_taishan.jpg', homeLogo: 'assets/live/logos/2025/shanghai-shenhua-v2022.svg', awayLogo: 'assets/live/logos/2025/shandong-taishan-v2022.svg' },
        { id: 's-live-13', type: 'live', date: '2025-09-21', home: '上海申花', away: '成都蓉城', venue: '', result: '1 : 1', price: 260, note: '', photo: 'assets/live/2025-09-21_shenhua_vs_rongcheng.jpg', homeLogo: 'assets/live/logos/2025/shanghai-shenhua-v2022.svg', awayLogo: 'assets/live/logos/2025/chengdu-rongcheng-v2021.svg' },
        { id: 's-live-14', type: 'live', date: '2025-10-31', home: '上海海港', away: '浙江队', venue: '', result: '3 : 0', price: 140, note: '', photo: 'assets/live/2025-10-31_port_vs_zhejiang.jpg', homeLogo: 'assets/live/logos/2025/shanghai-port-v2021.svg', awayLogo: 'assets/live/logos/2025/zhejiang-professional-v2022.svg' },
        { id: 's-live-15', type: 'live', date: '2026-03-14', home: '浙江队', away: '上海申花', venue: '', result: '1 : 1', price: 220, note: '', photo: 'assets/live/2026-03-14_zhejiang_vs_shenhua.jpg', homeLogo: 'assets/live/logos/2026/zhejiang-professional-v2022.svg', awayLogo: 'assets/live/logos/2026/shanghai-shenhua-v2022.svg' },
        { id: 's-live-16', type: 'live', date: '2026-04-11', home: '上海申花', away: '上海海港', venue: '', result: '1 : 0', price: 320, note: '', photo: 'assets/live/2026-04-11_shenhua_vs_port.jpg', homeLogo: 'assets/live/logos/2026/shanghai-shenhua-v2022.svg', awayLogo: 'assets/live/logos/2026/shanghai-port-v2021.svg' },
        { id: 's-live-17', type: 'live', date: '2026-04-25', home: '上海海港', away: '武汉三镇', venue: '', result: '4 : 0', price: 140, note: '', photo: 'assets/live/2026-04-25_port_vs_wuhan.jpg', homeLogo: 'assets/live/logos/2026/shanghai-port-v2021.svg', awayLogo: 'assets/live/logos/2026/wuhan-three-towns-v2019.svg' },
        { id: 's-live-18', type: 'live', date: '2026-05-09', home: '上海申花', away: '重庆', venue: '', result: '2 : 2', price: 150, note: '', photo: 'assets/live/2026-05-09_shenhua_vs_chongqing.jpg', homeLogo: 'assets/live/logos/2026/shanghai-shenhua-v2022.svg', awayLogo: 'assets/live/logos/2026/chongqing-tonglianglong-v2023.svg' },
        { id: 's-live-19', type: 'live', date: '2026-05-15', home: '上海海港', away: '浙江队', venue: '', result: '2 : 2', price: 80, note: '', photo: 'assets/live/2026-05-15_port_vs_zhejiang.jpg', homeLogo: 'assets/live/logos/2026/shanghai-port-v2021.svg', awayLogo: 'assets/live/logos/2026/zhejiang-professional-v2022.svg' },
        { id: 's-live-20', type: 'live', date: '2026-07-05', home: '上海申花', away: '浙江队', venue: '', result: '3 : 2', price: 150, note: '', photo: 'assets/live/2026-07-05_shenhua_vs_zhejiang.jpg', homeLogo: 'assets/live/logos/2026/shanghai-shenhua-v2022.svg', awayLogo: 'assets/live/logos/2026/zhejiang-professional-v2022.svg' },
        { id: 's-live-21', type: 'live', date: '2026-07-25', home: '上海海港', away: '上海申花', venue: '', result: '2 : 0', price: 330, note: '', photo: 'assets/live/2026-07-25_port_vs_shenhua.jpg', homeLogo: 'assets/live/logos/2026/shanghai-port-v2021.svg', awayLogo: 'assets/live/logos/2026/shanghai-shenhua-v2022.svg' },
        { id: 's-live-22', type: 'live', date: '2026-08-15', home: '上海申花', away: '河南', venue: '', result: '4 : 1', price: 200, note: '', photo: 'assets/live/2026-08-15_shenhua_vs_henan.jpg', homeLogo: 'assets/live/logos/2026/shanghai-shenhua-v2022.svg', awayLogo: 'assets/live/logos/2026/henan-fc-v2023.svg' },
        { id: 's-jersey-1', type: 'jersey', date: '2025-02-16', team: '切尔西', teamKind: '俱乐部', season: '2024/25', jerseyType: '主场', version: '球迷版', hasPrinting: '是', competition: '', number: '', player: '', price: 699, note: '短袖+印号', teamLogo: 'assets/jersey/logos/chelsea-fc-v2006.svg', photo: 'assets/jersey/chelsea_2024-25_home.jpg' },
        { id: 's-jersey-2', type: 'jersey', date: '2025-06-22', team: '阿森纳', teamKind: '俱乐部', season: '2025/26', jerseyType: '主场', version: '球迷版', hasPrinting: '是', competition: '', number: '', player: '', price: 849, note: '短袖+印号', teamLogo: 'assets/jersey/logos/arsenal-fc-v2002.svg', photo: '' },
        { id: 's-jersey-3', type: 'jersey', date: '2025-10-24', team: '切尔西', teamKind: '俱乐部', season: '2025/26', jerseyType: '主场', version: '球员版', hasPrinting: '否', competition: '', number: '', player: '', price: 759, note: '短袖', teamLogo: 'assets/jersey/logos/chelsea-fc-v2006.svg', photo: 'assets/jersey/chelsea_2025-26_home.jpg' },
        { id: 's-jersey-4', type: 'jersey', date: '2026-01-11', team: '德国队', teamKind: '国家队', season: '2026', jerseyType: '主场', version: '球迷版', hasPrinting: '是', competition: '', number: '', player: '', price: 849, note: '短袖+印号', teamLogo: 'assets/jersey/logos/germany-national-team-v2021.svg', photo: 'assets/jersey/germany_2026_home.jpg' },
        { id: 's-jersey-5', type: 'jersey', date: '2026-02-07', team: '浙江队', teamKind: '俱乐部', season: '2025/26', jerseyType: '主场', version: '球迷版', hasPrinting: '否', competition: '', number: '', player: '', price: 529, note: '短袖', teamLogo: 'assets/live/logos/2025/zhejiang-professional-v2022.svg', photo: 'assets/jersey/zhejiang_2026_home.jpg' },
        { id: 's-jersey-6', type: 'jersey', date: '2026-05-15', team: '意大利', teamKind: '国家队', season: '2026', jerseyType: '客场', version: '球迷版', hasPrinting: '否', competition: '', number: '', player: '', price: 271.4, note: '短袖', photo: 'assets/jersey/italy_2026_away.jpg' },
        { id: 's-jersey-7', type: 'jersey', date: '2026-06-16', team: '阿根廷', teamKind: '国家队', season: '2026', jerseyType: '客场', version: '球员版', hasPrinting: '否', competition: '', number: '', player: '', price: 999, note: '短袖', teamLogo: 'assets/jersey/logos/argentina-national-team-v2024.svg', photo: 'assets/jersey/argentina_2026_away.jpg' },
      ],
    };
  }

  function markDirty() {
    try {
      localStorage.setItem(WORK_KEY, JSON.stringify({ data: app.getData() }));
    } catch (err) {
      console.warn('工作副本保存失败', err);
    }
    const banner = document.getElementById('unsavedBanner');
    if (banner) banner.classList.add('show');
  }

  function markClean() {
    try {
      localStorage.removeItem(WORK_KEY);
    } catch (err) {
      console.warn('工作副本清理失败', err);
    }
    const banner = document.getElementById('unsavedBanner');
    if (banner) banner.classList.remove('show');
  }

  function loadWorkingCopy() {
    try {
      const raw = localStorage.getItem(WORK_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed && parsed.data && Array.isArray(parsed.data.records)) {
        window.LEDGER_DATA = parsed.data;
        const banner = document.getElementById('unsavedBanner');
        if (banner) banner.classList.add('show');
      }
    } catch (err) {
      console.warn('工作副本读取失败', err);
    }
  }

  function escapeHtml(value) {
    return app.escapeHtml(value);
  }

  function buildFieldHtml(field, value) {
    const required = field.required ? 'required' : '';
    const label = `<label for="f-${field.key}">${escapeHtml(field.label)}</label>`;
    if (field.type === 'select') {
      const options = field.options.map((option) => {
        const selected = String(option) === String(value) ? 'selected' : '';
        return `<option value="${escapeHtml(option)}" ${selected}>${escapeHtml(option)}</option>`;
      }).join('');
      return `<div class="field col-${field.col}">
        ${label}
        <select id="f-${field.key}" name="${field.key}" ${required}>
          <option value="">请选择</option>
          ${options}
        </select>
      </div>`;
    }
    if (field.type === 'textarea') {
      return `<div class="field col-${field.col}">
        ${label}
        <textarea id="f-${field.key}" name="${field.key}" placeholder="${escapeHtml(field.placeholder || '')}" ${required}>${escapeHtml(value)}</textarea>
      </div>`;
    }
    const inputType = (field.type === 'number' || field.type === 'date') ? field.type : 'text';
    return `<div class="field col-${field.col}">
      ${label}
      <input type="${inputType}" id="f-${field.key}" name="${field.key}" value="${escapeHtml(value)}" placeholder="${escapeHtml(field.placeholder || '')}" ${required}>
    </div>`;
  }

  function updatePhotoPreview() {
    const preview = document.getElementById('photoPreview');
    const removeBtn = document.getElementById('removePhotoBtn');
    const pathValue = document.getElementById('photoPath').value.trim();
    const shown = pendingPhoto || pathValue;
    if (shown) {
      preview.src = shown;
      preview.classList.remove('hidden');
      removeBtn.classList.remove('hidden');
    } else {
      preview.removeAttribute('src');
      preview.classList.add('hidden');
      removeBtn.classList.add('hidden');
    }
  }

  function openModal(type, id) {
    currentType = type;
    editingId = id || null;
    const meta = app.CATEGORIES[type];
    const record = id ? app.getData().records.find((item) => item.id === id) : null;
    document.getElementById('modalTitle').textContent = (record ? '编辑' : '添加') + ' / ' + meta.label;
    document.getElementById('modalOverlay').style.setProperty('--accent', meta.color);
    const fieldsHtml = FIELD_GROUPS[type].map((field) => {
      const value = record && record[field.key] != null
        ? record[field.key]
        : (field.key === 'hasPrinting' ? '否' : (field.key === 'teamKind' ? '俱乐部' : ''));
      return buildFieldHtml(field, value);
    }).join('');
    document.getElementById('formFields').innerHTML = fieldsHtml;
    const photo = record ? (record.photo || '') : '';
    const photoPathInput = document.getElementById('photoPath');
    if (photo && photo.indexOf('data:') !== 0) {
      photoPathInput.value = photo;
    } else {
      photoPathInput.value = '';
    }
    pendingPhoto = photo && photo.indexOf('data:') === 0 ? photo : '';
    updatePhotoPreview();
    document.getElementById('modalOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    document.getElementById('modalOverlay').classList.remove('open');
    document.body.style.overflow = '';
    editingId = null;
    pendingPhoto = '';
    document.getElementById('photoFile').value = '';
  }

  function bindListActions(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.addEventListener('click', (event) => {
      const button = event.target.closest('[data-action]');
      if (!button) return;
      const id = button.getAttribute('data-id');
      const records = app.getData().records;
      const record = records.find((item) => item.id === id);
      if (!record) return;
      if (button.getAttribute('data-action') === 'edit') {
        openModal(record.type, id);
      } else if (button.getAttribute('data-action') === 'delete') {
        if (confirm('确定删除这笔记录吗？删除后无法恢复。')) {
          app.getData().records = records.filter((item) => item.id !== id);
          markDirty();
          app.renderAll();
        }
      }
    });
  }

  function downloadText(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType || 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function buildDataJs() {
    const data = app.getData();
    data.meta.updatedAt = new Date().toISOString().slice(0, 10);
    return 'window.LEDGER_DATA = ' + JSON.stringify(data, null, 2) + ';\n';
  }

  async function saveDataFile() {
    const content = buildDataJs();
    let saved = false;
    if (window.showSaveFilePicker) {
      try {
        const handle = await window.showSaveFilePicker({
          suggestedName: 'data.js',
          types: [{ description: 'JavaScript 数据文件', accept: { 'text/javascript': ['.js'] } }],
        });
        const writable = await handle.createWritable();
        await writable.write(content);
        await writable.close();
        saved = true;
      } catch (err) {
        if (err && err.name === 'AbortError') return;
        console.warn('另存为失败，改用下载方式。', err);
      }
    }
    if (!saved) {
      downloadText(content, 'data.js', 'text/javascript');
    }
    markClean();
    app.renderAll();
    alert(saved
      ? '已保存到 data.js，上传网站时记得把新的 data.js 一起传上去。'
      : '已生成 data.js 下载文件，请用下载的文件覆盖 jersey 文件夹里的 data.js。');
  }

  function normalizeImported(parsed) {
    if (Array.isArray(parsed)) {
      return { meta: { version: 1 }, records: parsed };
    }
    if (parsed && Array.isArray(parsed.records)) {
      return { meta: Object.assign({}, parsed.meta), records: parsed.records };
    }
    if (parsed && parsed.data && Array.isArray(parsed.data.records)) {
      return { meta: Object.assign({}, parsed.data.meta), records: parsed.data.records };
    }
    return null;
  }

  function init() {
    if (!app) return;
    loadWorkingCopy();

    document.querySelectorAll('.add-btn').forEach((button) => {
      button.addEventListener('click', () => {
        openModal(button.getAttribute('data-type'));
      });
    });

    const fab = document.getElementById('addFab');
    const fabMenu = document.getElementById('fabMenu');
    if (fab && fabMenu) {
      fab.addEventListener('click', () => {
        fabMenu.classList.toggle('hidden');
      });
      fabMenu.querySelectorAll('.fab-option').forEach((option) => {
        option.addEventListener('click', () => {
          fabMenu.classList.add('hidden');
          openModal(option.getAttribute('data-type'));
        });
      });
      document.addEventListener('click', (event) => {
        if (!fabMenu.classList.contains('hidden')
          && !fab.contains(event.target)
          && !fabMenu.contains(event.target)) {
          fabMenu.classList.add('hidden');
        }
      });
    }

    document.getElementById('recordForm').addEventListener('submit', (event) => {
      event.preventDefault();
      const form = event.target;
      const payload = { type: currentType };
      let valid = true;
      FIELD_GROUPS[currentType].forEach((field) => {
        const input = form.elements[field.key];
        if (!input) return;
        let value = input.value.trim();
        if (field.required && !value) {
          valid = false;
          input.focus();
        }
        if (field.type === 'number') {
          value = value === '' ? 0 : Number(value);
        }
        payload[field.key] = value;
      });
      if (!valid) {
        alert('还有必填项没填哦，请检查一下。');
        return;
      }
      const pathValue = document.getElementById('photoPath').value.trim();
      payload.photo = pathValue || pendingPhoto || '';
      payload.price = Number(payload.price) || 0;
      const records = app.getData().records;
      if (editingId) {
        const index = records.findIndex((item) => item.id === editingId);
        if (index !== -1) {
          records[index] = Object.assign({}, records[index], payload);
        }
      } else {
        payload.id = 'r-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
        payload.createdAt = new Date().toISOString();
        records.push(payload);
      }
      markDirty();
      closeModal();
      app.renderAll();
    });

    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('modalCancel').addEventListener('click', closeModal);
    const modalOverlay = document.getElementById('modalOverlay');
    modalOverlay.addEventListener('click', (event) => {
      if (event.target === modalOverlay) closeModal();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && modalOverlay.classList.contains('open')) closeModal();
    });

    document.getElementById('photoPath').addEventListener('input', updatePhotoPreview);
    document.getElementById('photoFile').addEventListener('change', (event) => {
      const file = event.target.files && event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        pendingPhoto = loadEvent.target.result;
        document.getElementById('photoPath').value = '';
        updatePhotoPreview();
      };
      reader.readAsDataURL(file);
    });
    document.getElementById('removePhotoBtn').addEventListener('click', () => {
      pendingPhoto = '';
      document.getElementById('photoPath').value = '';
      document.getElementById('photoFile').value = '';
      updatePhotoPreview();
    });

    bindListActions('liveList');
    bindListActions('jerseyList');

    document.getElementById('saveDataBtn').addEventListener('click', saveDataFile);

    document.getElementById('exportJsonBtn').addEventListener('click', () => {
      const data = {
        version: 1,
        exportedAt: new Date().toISOString(),
        data: app.getData(),
      };
      downloadText(
        JSON.stringify(data, null, 2),
        'football-ledger-' + new Date().toISOString().slice(0, 10) + '.json',
        'application/json'
      );
    });

    document.getElementById('importJsonBtn').addEventListener('click', () => {
      document.getElementById('importFile').click();
    });

    document.getElementById('importFile').addEventListener('change', (event) => {
      const file = event.target.files && event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        try {
          const parsed = JSON.parse(loadEvent.target.result);
          const imported = normalizeImported(parsed);
          if (!imported) {
            throw new Error('格式不正确');
          }
          if (confirm('导入会覆盖当前所有记录，确定继续吗？')) {
            window.LEDGER_DATA = imported;
            markDirty();
            app.renderAll();
            alert('导入成功，共 ' + imported.records.length + ' 笔记录。记得保存到 data.js。');
          }
        } catch (err) {
          alert('导入失败：文件格式不正确。');
        }
      };
      reader.readAsText(file);
      event.target.value = '';
    });

    document.getElementById('resetSampleBtn').addEventListener('click', () => {
      if (confirm('恢复示例数据会覆盖当前所有记录，确定继续吗？')) {
        window.LEDGER_DATA = sampleData();
        markDirty();
        app.renderAll();
        alert('已恢复示例数据。记得保存到 data.js。');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
