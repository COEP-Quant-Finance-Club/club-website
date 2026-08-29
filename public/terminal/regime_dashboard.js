/**
 * Quant Club - Institutional Sector Index Terminal & 3-State Macro Regimes JS
 * Candle Locking (ENTER to Lock, ESC to Unlock / Click to Lock)
 * 1-Day & 2-Day Stock Return Sync with Actual Trading Bar Sequence Lookup
 */

document.addEventListener('DOMContentLoaded', () => {
  const data = window.REGIME_ANALYSIS_DATA || { sector_summaries: [], sector_details: {} };

  // Parse sector from URL query parameter or hash for deep linking and SEO
  function getSectorFromUrl() {
    try {
      const params = new URLSearchParams(window.location.search);
      const qSector = params.get('sector');
      if (qSector) {
        const upper = qSector.toUpperCase();
        if (data.sector_details && data.sector_details[upper]) return upper;
      }
      const hash = window.location.hash.replace('#', '').trim().toUpperCase();
      if (hash && data.sector_details && data.sector_details[hash]) {
        return hash;
      }
    } catch (e) {}
    return 'ELECTRONICS_EMS';
  }

  let activeSector = getSectorFromUrl();
  let activeK = 9;
  let activeRegimeFilter = 'ALL';

  // Hover & Candle Lock State
  let isCandleLocked = false;
  let activeHoverDate = null;
  let activeHoverPrevDate = null;
  let activeHoverPrev2Date = null;

  let modalSearchTerm = '';

  let chart = null;
  let candlestickSeries = null;
  let volumeSeries = null;
  let sma20Series = null;
  let sma50Series = null;
  let ema200Series = null;

  let showSma20 = true;
  let showSma50 = true;
  let showEma200 = true;
  let isLogScale = false;

  // Theme & Overlay State
  let isDarkMode = true;
  let showRegimeOverlay = true;

  const computedStateCache = {};

  // DOM Elements
  const sectorListContainer = document.getElementById('sector-list-container');
  const sectorSearchInput = document.getElementById('sector-search');
  const sectorCountBadge = document.getElementById('sector-count-badge');
  const activeSectorTitle = document.getElementById('active-sector-name');
  const metricCurrentVal = document.getElementById('metric-current-val');
  const metricReturnVal = document.getElementById('metric-return-val');
  const metricStateVal = document.getElementById('metric-state-val');
  const chartContainer = document.getElementById('tv-chart-container');
  const canvas = document.getElementById('hmmBackgroundCanvas');
  const ctx = canvas.getContext('2d');

  const kRangeSlider = document.getElementById('kRangeSlider');
  const kSliderVal = document.getElementById('kSliderVal');

  const rfBtnAll = document.getElementById('rfBtnAll');
  const rfBtnBull = document.getElementById('rfBtnBull');
  const rfBtnNeutral = document.getElementById('rfBtnNeutral');
  const rfBtnBear = document.getElementById('rfBtnBear');
  const btnToggleRegimeOverlay = document.getElementById('btnToggleRegimeOverlay');

  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const clubLogo = document.getElementById('club-logo');

  const candleLockBadge = document.getElementById('candleLockBadge');

  // Mobile Sidebar Drawer Elements & Controls
  const terminalSidebar = document.getElementById('terminalSidebar');
  const btnToggleMobileSidebar = document.getElementById('btnToggleMobileSidebar');
  const btnCloseMobileSidebar = document.getElementById('btnCloseMobileSidebar');
  const sidebarBackdrop = document.getElementById('sidebarBackdrop');

  function openMobileSidebar() {
    if (terminalSidebar) terminalSidebar.classList.add('mobile-open');
    if (sidebarBackdrop) sidebarBackdrop.classList.add('active');
    document.body.classList.add('sidebar-modal-open');
  }

  function closeMobileSidebar() {
    if (terminalSidebar) terminalSidebar.classList.remove('mobile-open');
    if (sidebarBackdrop) sidebarBackdrop.classList.remove('active');
    document.body.classList.remove('sidebar-modal-open');
  }

  if (btnToggleMobileSidebar) {
    btnToggleMobileSidebar.addEventListener('click', () => {
      if (terminalSidebar && terminalSidebar.classList.contains('mobile-open')) {
        closeMobileSidebar();
      } else {
        openMobileSidebar();
      }
    });
  }

  if (btnCloseMobileSidebar) {
    btnCloseMobileSidebar.addEventListener('click', closeMobileSidebar);
  }

  if (sidebarBackdrop) {
    sidebarBackdrop.addEventListener('click', closeMobileSidebar);
  }

  // Modal Elements
  const constituentsModalOverlay = document.getElementById('constituentsModalOverlay');
  const btnOpenConstituentsModal = document.getElementById('btnOpenConstituentsModal');
  const btnCloseConstituentsModal = document.getElementById('btnCloseConstituentsModal');
  const modalSectorTitle = document.getElementById('modalSectorTitle');
  const modalDateInfo = document.getElementById('modalDateInfo');
  const modalLockStatus = document.getElementById('modalLockStatus');
  const modalStockSearch = document.getElementById('modalStockSearch');
  const modalStockCountBadge = document.getElementById('modalStockCountBadge');
  const modalStocksTbody = document.getElementById('modalStocksTbody');

  // Modal Controls
  btnOpenConstituentsModal.addEventListener('click', openConstituentsModal);
  btnCloseConstituentsModal.addEventListener('click', closeConstituentsModal);

  constituentsModalOverlay.addEventListener('click', (e) => {
    if (e.target === constituentsModalOverlay) closeConstituentsModal();
  });

  modalStockSearch.addEventListener('input', (e) => {
    modalSearchTerm = e.target.value.trim().toLowerCase();
    renderConstituentsTable();
  });

  function openConstituentsModal() {
    modalSectorTitle.innerText = `${activeSector} STOCKS`;
    constituentsModalOverlay.classList.add('active');
    renderConstituentsTable();
  }

  function closeConstituentsModal() {
    constituentsModalOverlay.classList.remove('active');
  }

  // Update Lock Status Badges
  function updateLockStatusUI() {
    if (isCandleLocked && activeHoverDate) {
      const txt = `🔒 LOCKED: ${activeHoverDate} (Press ESC to Unlock)`;
      candleLockBadge.innerText = txt;
      candleLockBadge.classList.add('locked');
      modalLockStatus.innerText = txt;
      modalLockStatus.classList.add('locked');
    } else {
      const txt = `🔓 Hover Mode (Press ENTER / Click to Lock | ESC to Unlock)`;
      candleLockBadge.innerText = txt;
      candleLockBadge.classList.remove('locked');
      modalLockStatus.innerText = txt;
      modalLockStatus.classList.remove('locked');
    }
  }

  // KEYBOARD LOCK HANDLERS (ENTER to Lock, ESC to Unlock)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      if (activeHoverDate) {
        isCandleLocked = true;
        updateLockStatusUI();
        if (constituentsModalOverlay.classList.contains('active')) {
          renderConstituentsTable();
        }
      }
    } else if (e.key === 'Escape') {
      isCandleLocked = false;
      updateLockStatusUI();
      if (constituentsModalOverlay.classList.contains('active')) {
        renderConstituentsTable();
      }
    }
  });

  // Dynamic Fast Rolling Median Filtering (Window k = 1 to 50)
  function computeSmoothedRegimes(sectorName, kWindow) {
    const cacheKey = `${sectorName}_${kWindow}`;
    if (computedStateCache[cacheKey]) {
      return computedStateCache[cacheKey];
    }

    const secDetail = data.sector_details[sectorName];
    if (!secDetail || !secDetail.bars || secDetail.bars.length === 0) return [];

    const bars = secDetail.bars;
    const rawMacro = bars.map(b => b.m !== undefined ? b.m : 1);
    const n = rawMacro.length;
    const smoothed = new Array(n);

    if (kWindow <= 1) {
      for (let i = 0; i < n; i++) smoothed[i] = rawMacro[i];
    } else {
      const half = Math.floor(kWindow / 2);
      for (let i = 0; i < n; i++) {
        const start = Math.max(0, i - half);
        const end = Math.min(n - 1, i + half);
        const windowVals = [];
        for (let j = start; j <= end; j++) {
          windowVals.push(rawMacro[j]);
        }
        windowVals.sort((a, b) => a - b);
        const mid = Math.floor(windowVals.length / 2);
        smoothed[i] = windowVals[mid];
      }
    }

    computedStateCache[cacheKey] = smoothed;
    return smoothed;
  }

  function getSectorCurrentState(sectorName, kWindow) {
    const smoothed = computeSmoothedRegimes(sectorName, kWindow);
    return smoothed.length > 0 ? smoothed[smoothed.length - 1] : 1;
  }

  // Robust Stock Trading Bar Sequence Extraction (Prevents Duplicate Date Fallbacks)
  function getStock3DayPrices(pDict, targetDate) {
    if (!pDict || Object.keys(pDict).length === 0 || !targetDate) {
      return { priceT: undefined, priceT1: undefined, priceT2: undefined };
    }

    const validDates = Object.keys(pDict).filter(d => d <= targetDate).sort();
    const n = validDates.length;

    if (n === 0) {
      return { priceT: undefined, priceT1: undefined, priceT2: undefined };
    }

    const dateT = validDates[n - 1];
    // If the latest trade date is more than 5 calendar days before targetDate (accounting for weekends/holidays),
    // the stock was not active or trading on this date
    const diffDays = Math.abs(new Date(targetDate) - new Date(dateT)) / (1000 * 60 * 60 * 24);
    if (diffDays > 5) {
      return { priceT: undefined, priceT1: undefined, priceT2: undefined };
    }

    const dateT1 = n >= 2 ? validDates[n - 2] : null;
    const dateT2 = n >= 3 ? validDates[n - 3] : null;

    return {
      priceT: pDict[dateT],
      priceT1: dateT1 ? pDict[dateT1] : undefined,
      priceT2: dateT2 ? pDict[dateT2] : undefined
    };
  }

  // Sensitivity Slider Event Listener (k = 1 to 50)
  kRangeSlider.addEventListener('input', (e) => {
    activeK = parseInt(e.target.value);
    kSliderVal.innerText = activeK;
    renderSectorList(sectorSearchInput.value.trim().toLowerCase());
    renderChart();
  });

  // 3 REGIME FILTER BUTTONS EVENT LISTENERS
  const rfBtns = document.querySelectorAll('.rf-btn:not(.regime-toggle-btn)');
  rfBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      rfBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      activeRegimeFilter = e.target.getAttribute('data-regime');
      renderSectorList(sectorSearchInput.value.trim().toLowerCase());
    });
  });

  // REGIME OVERLAY ON/OFF TOGGLE (Locked to 65% Deep Opacity for Light Theme)
  if (btnToggleRegimeOverlay) {
    btnToggleRegimeOverlay.addEventListener('click', () => {
      showRegimeOverlay = !showRegimeOverlay;
      if (showRegimeOverlay) {
        btnToggleRegimeOverlay.innerText = '⚡ Regimes: ON';
        btnToggleRegimeOverlay.classList.add('active');
        btnToggleRegimeOverlay.classList.remove('inactive');
      } else {
        btnToggleRegimeOverlay.innerText = '⚡ Regimes: OFF';
        btnToggleRegimeOverlay.classList.remove('active');
        btnToggleRegimeOverlay.classList.add('inactive');
      }
      requestAnimationFrame(drawHMMBackgroundOverlay);
    });
  }

  // THEME SWITCHER (DARK / LIGHT MODE)
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      isDarkMode = !isDarkMode;
      if (isDarkMode) {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        if (clubLogo) clubLogo.src = 'Dark Theme Logo.png';
        themeToggleBtn.innerText = '☀️ Light Mode';
      } else {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        if (clubLogo) clubLogo.src = 'Light Theme Logo.png';
        themeToggleBtn.innerText = '🌙 Dark Mode';
      }
      applyThemeToChart();
    });
  }

  function applyThemeToChart() {
    if (!chart) return;
    if (isDarkMode) {
      chart.applyOptions({
        layout: { background: { color: 'transparent' }, textColor: '#94a3b8' },
        grid: {
          vertLines: { color: 'rgba(36, 49, 76, 0.4)' },
          horzLines: { color: 'rgba(36, 49, 76, 0.4)' }
        },
        rightPriceScale: { borderColor: '#24314c' },
        timeScale: { borderColor: '#24314c' }
      });
      if (candlestickSeries) {
        candlestickSeries.applyOptions({
          upColor: '#22c55e',
          downColor: '#ef4444',
          borderUpColor: '#22c55e',
          borderDownColor: '#ef4444',
          wickUpColor: '#22c55e',
          wickDownColor: '#ef4444',
        });
      }
    } else {
      chart.applyOptions({
        layout: { background: { color: 'transparent' }, textColor: '#334155' },
        grid: {
          vertLines: { color: '#e2e8f0' },
          horzLines: { color: '#e2e8f0' }
        },
        rightPriceScale: { borderColor: '#cbd5e1' },
        timeScale: { borderColor: '#cbd5e1' }
      });
      if (candlestickSeries) {
        candlestickSeries.applyOptions({
          upColor: '#16a34a',
          downColor: '#dc2626',
          borderUpColor: '#092b00',
          borderDownColor: '#450a0a',
          wickUpColor: '#092b00',
          wickDownColor: '#450a0a',
        });
      }
    }
    requestAnimationFrame(drawHMMBackgroundOverlay);
  }

  // Indicator Toggle buttons
  document.getElementById('btn-toggle-sma20').addEventListener('click', (e) => {
    showSma20 = !showSma20;
    e.target.classList.toggle('active', showSma20);
    renderChart();
  });

  document.getElementById('btn-toggle-sma50').addEventListener('click', (e) => {
    showSma50 = !showSma50;
    e.target.classList.toggle('active', showSma50);
    renderChart();
  });

  document.getElementById('btn-toggle-ema200').addEventListener('click', (e) => {
    showEma200 = !showEma200;
    e.target.classList.toggle('active', showEma200);
    renderChart();
  });

  // Scale Toolbar Controls
  document.getElementById('btn-zoom-in').addEventListener('click', () => {
    if (chart) {
      const ts = chart.timeScale();
      const logicalRange = ts.getVisibleLogicalRange();
      if (logicalRange) {
        const span = logicalRange.to - logicalRange.from;
        ts.setVisibleLogicalRange({ from: logicalRange.from + span * 0.15, to: logicalRange.to - span * 0.15 });
      }
    }
  });

  document.getElementById('btn-zoom-out').addEventListener('click', () => {
    if (chart) {
      const ts = chart.timeScale();
      const logicalRange = ts.getVisibleLogicalRange();
      if (logicalRange) {
        const span = logicalRange.to - logicalRange.from;
        ts.setVisibleLogicalRange({ from: logicalRange.from - span * 0.2, to: logicalRange.to + span * 0.2 });
      }
    }
  });

  document.getElementById('btn-scale-auto').addEventListener('click', () => {
    if (chart) {
      chart.priceScale('right').applyOptions({ autoScale: true });
    }
  });

  document.getElementById('btn-scale-log').addEventListener('click', (e) => {
    if (chart) {
      isLogScale = !isLogScale;
      e.target.classList.toggle('active', isLogScale);
      chart.priceScale('right').applyOptions({
        mode: isLogScale ? LightweightCharts.PriceScaleMode.Logarithmic : LightweightCharts.PriceScaleMode.Normal
      });
    }
  });

  document.getElementById('btn-fit-content').addEventListener('click', () => {
    if (chart) {
      chart.timeScale().fitContent();
      chart.priceScale('right').applyOptions({ autoScale: true });
    }
  });

  // Search Filter
  sectorSearchInput.addEventListener('input', (e) => {
    renderSectorList(e.target.value.trim().toLowerCase());
  });

  // Render Sidebar Sector List
  function renderSectorList(filterText = '') {
    sectorListContainer.innerHTML = '';
    const summaryList = data.sector_summaries || [];

    let bullCount = 0;
    let neutralCount = 0;
    let bearCount = 0;

    summaryList.forEach(item => {
      const state = getSectorCurrentState(item.sector, activeK);
      if (state === 2) bullCount++;
      else if (state === 1) neutralCount++;
      else if (state === 0) bearCount++;
    });

    rfBtnAll.innerText = `ALL (${summaryList.length})`;
    rfBtnBull.innerText = `🟢 Bullish (${bullCount})`;
    rfBtnNeutral.innerText = `🟡 Neutral (${neutralCount})`;
    rfBtnBear.innerText = `🔴 Bearish (${bearCount})`;

    const filtered = summaryList.filter(item => {
      const nameMatch = item.sector.toLowerCase().includes(filterText);
      if (!nameMatch) return false;

      const currentState = getSectorCurrentState(item.sector, activeK);
      if (activeRegimeFilter === 'ALL') return true;
      return currentState.toString() === activeRegimeFilter;
    });

    if (activeRegimeFilter === 'ALL') {
      sectorCountBadge.innerText = `${filtered.length} Baskets`;
    } else if (activeRegimeFilter === '2') {
      sectorCountBadge.innerText = `${filtered.length} Bullish Baskets`;
    } else if (activeRegimeFilter === '1') {
      sectorCountBadge.innerText = `${filtered.length} Neutral Baskets`;
    } else if (activeRegimeFilter === '0') {
      sectorCountBadge.innerText = `${filtered.length} Bearish Baskets`;
    }

    if (filtered.length > 0 && !filtered.some(i => i.sector === activeSector)) {
      activeSector = filtered[0].sector;
    }

    filtered.forEach(item => {
      const secName = item.sector;
      const currentVal = item.current_val;
      const retPct = item.total_return_pct || `${((currentVal - 100.0) / 100.0 * 100.0) >= 0 ? '+' : ''}${((currentVal - 100.0) / 100.0 * 100.0).toFixed(2)}%`;
      const isPos = !retPct.includes('-');

      const itemEl = document.createElement('div');
      itemEl.className = `sector-item ${secName === activeSector ? 'active' : ''}`;
      itemEl.innerHTML = `
        <div>
          <div class="sec-name">${secName}</div>
          <div class="sec-stocks-count">${item.stock_count || ''} Stocks (Dbl-Click)</div>
        </div>
        <div class="sec-return-badge ${isPos ? 'positive' : 'negative'}">
          ${retPct}
        </div>
      `;

      itemEl.addEventListener('click', () => {
        document.querySelectorAll('.sector-item').forEach(el => el.classList.remove('active'));
        itemEl.classList.add('active');
        activeSector = secName;
        updateHeaderMetrics(item);
        renderChart();
        if (window.innerWidth <= 1023) {
          closeMobileSidebar();
        }
      });

      itemEl.addEventListener('dblclick', () => {
        activeSector = secName;
        updateHeaderMetrics(item);
        renderChart();
        openConstituentsModal();
      });

      sectorListContainer.appendChild(itemEl);
    });

    if (summaryList.length > 0) {
      const activeItem = summaryList.find(i => i.sector === activeSector) || summaryList[0];
      updateHeaderMetrics(activeItem);
    }
  }

  function updateHeaderMetrics(item) {
    if (!item) return;
    const secName = item.sector;
    const currentVal = item.current_val;
    const retPct = item.total_return_pct || `${((currentVal - 100.0) / 100.0 * 100.0) >= 0 ? '+' : ''}${((currentVal - 100.0) / 100.0 * 100.0).toFixed(2)}%`;
    const curState = getSectorCurrentState(secName, activeK);
    const stateNames = { 0: "🔴 Bearish (State 0)", 1: "🟡 Neutral (State 1)", 2: "🟢 Bullish (State 2)" };

    activeSectorTitle.innerText = secName;
    metricCurrentVal.innerText = currentVal.toLocaleString('en-IN', { minimumFractionDigits: 2 });
    metricReturnVal.innerText = retPct;
    metricReturnVal.className = `metric-val ${!retPct.includes('-') ? 'positive' : 'negative'}`;
    metricStateVal.innerText = stateNames[curState] || "🟢 Bullish (State 2)";

    // Dynamic Title & URL Sync for State-of-the-Art Search Engine Optimization
    const formattedName = secName.replace(/_/g, ' ');
    document.title = `${formattedName} Index — COEP Quant Market Terminal & Macro Regimes`;
    try {
      const url = new URL(window.location);
      url.searchParams.set('sector', secName);
      window.history.replaceState({ sector: secName }, '', url);
    } catch (e) {}
  }

  // Render Modal Sector Constituent Stocks with 1-Day & 2-Day Return Sync
  function renderConstituentsTable() {
    const secDetail = data.sector_details[activeSector];
    if (!secDetail) return;

    const constituents = secDetail.constituents || [];
    const bars = secDetail.bars || [];

    let curDate = activeHoverDate;
    let prevDate = activeHoverPrevDate;
    let prev2Date = activeHoverPrev2Date;

    if (!curDate && bars.length > 0) {
      curDate = bars[bars.length - 1].t;
      prevDate = bars.length > 1 ? bars[bars.length - 2].t : null;
      prev2Date = bars.length > 2 ? bars[bars.length - 3].t : null;
    }

    modalSectorTitle.innerText = `${activeSector} STOCKS`;
    const lockTxt = isCandleLocked ? '🔒 LOCKED' : '🔓 HOVER';
    modalDateInfo.innerText = `[${lockTxt}] Selected Candle Date: ${curDate || 'N/A'} (T) | T-1: ${prevDate || 'N/A'} | T-2: ${prev2Date || 'N/A'}`;

    const filteredStocks = constituents.filter(stk => {
      const sym = (stk.symbol || '').toLowerCase();
      const name = (stk.name || '').toLowerCase();
      if (!(sym.includes(modalSearchTerm) || name.includes(modalSearchTerm))) return false;

      // Filter out stocks that weren't listed yet on the selected date
      // A stock's earliest price date is its effective listing/IPO date
      if (curDate) {
        const pDict = stk.prices || {};
        const priceDates = Object.keys(pDict);
        if (priceDates.length === 0) return false;
        const earliestDate = priceDates.sort()[0];
        if (curDate < earliestDate) return false; // Stock didn't exist yet
      }
      return true;
    });

    const processedRows = [];
    filteredStocks.forEach(stk => {
      const pDict = stk.prices || {};
      const pricesInfo = getStock3DayPrices(pDict, curDate);
      
      const priceT = pricesInfo.priceT;
      const priceT1 = pricesInfo.priceT1;
      const priceT2 = pricesInfo.priceT2;

      // Skip stocks that were not yet listed or not trading on this candle date
      if (priceT === undefined) return;

      let chg1D = null;
      if (priceT !== undefined && priceT1 !== undefined && priceT1 > 0) {
        chg1D = ((priceT - priceT1) / priceT1) * 100.0;
      }

      let chg2D = null;
      if (priceT !== undefined && priceT2 !== undefined && priceT2 > 0) {
        chg2D = ((priceT - priceT2) / priceT2) * 100.0;
      }

      processedRows.push({
        symbol: stk.symbol,
        name: stk.name,
        priceT: priceT,
        priceT1: priceT1 !== undefined ? priceT1 : priceT,
        priceT2: priceT2 !== undefined ? priceT2 : (priceT1 !== undefined ? priceT1 : priceT),
        chg1D: chg1D,
        chg2D: chg2D
      });
    });

    modalStockCountBadge.innerText = `${processedRows.length} Stocks`;
    modalStocksTbody.innerHTML = '';

    processedRows.sort((a, b) => {
      if (a.chg1D === null) return 1;
      if (b.chg1D === null) return -1;
      return b.chg1D - a.chg1D;
    });

    processedRows.forEach(r => {
      const tr = document.createElement('tr');

      let pill1D = '<span class="return-pill zero">N/A</span>';
      if (r.chg1D !== null) {
        const valStr = `${r.chg1D >= 0 ? '+' : ''}${r.chg1D.toFixed(2)}%`;
        const cls = r.chg1D > 0 ? 'pos' : (r.chg1D < 0 ? 'neg' : 'zero');
        pill1D = `<span class="return-pill ${cls}">${valStr}</span>`;
      }

      let pill2D = '<span class="return-pill zero">N/A</span>';
      if (r.chg2D !== null) {
        const valStr = `${r.chg2D >= 0 ? '+' : ''}${r.chg2D.toFixed(2)}%`;
        const cls = r.chg2D > 0 ? 'pos' : (r.chg2D < 0 ? 'neg' : 'zero');
        pill2D = `<span class="return-pill ${cls}">${valStr}</span>`;
      }

      tr.innerHTML = `
        <td class="sym-badge">${r.symbol}</td>
        <td>${r.name}</td>
        <td class="text-right">${typeof r.priceT2 === 'number' ? '₹' + r.priceT2.toLocaleString('en-IN') : 'N/A'}</td>
        <td class="text-right">${typeof r.priceT1 === 'number' ? '₹' + r.priceT1.toLocaleString('en-IN') : 'N/A'}</td>
        <td class="text-right">${typeof r.priceT === 'number' ? '₹' + r.priceT.toLocaleString('en-IN') : 'N/A'}</td>
        <td class="text-right">${pill1D}</td>
        <td class="text-right">${pill2D}</td>
      `;

      modalStocksTbody.appendChild(tr);
    });
  }

  // Init Chart with Crosshair & Click Locking Handlers
  function initChart() {
    if (chart) chart.remove();

    chart = LightweightCharts.createChart(chartContainer, {
      layout: {
        background: { color: 'transparent' },
        textColor: '#94a3b8',
        fontSize: 12,
        fontFamily: 'Inter, sans-serif'
      },
      grid: {
        vertLines: { color: 'rgba(36, 49, 76, 0.4)', style: LightweightCharts.LineStyle.Dotted },
        horzLines: { color: 'rgba(36, 49, 76, 0.4)', style: LightweightCharts.LineStyle.Dotted },
      },
      crosshair: {
        mode: LightweightCharts.CrosshairMode.Normal,
        vertLine: {
          color: '#38bdf8',
          width: 1,
          style: LightweightCharts.LineStyle.Dashed,
          labelBackgroundColor: '#1e293b'
        },
        horzLine: {
          color: '#38bdf8',
          width: 1,
          style: LightweightCharts.LineStyle.Dashed,
          labelBackgroundColor: '#1e293b'
        }
      },
      rightPriceScale: {
        visible: true,
        borderVisible: true,
        borderColor: '#24314c',
        autoScale: true,
        mode: LightweightCharts.PriceScaleMode.Normal,
        scaleMargins: { top: 0.1, bottom: 0.25 },
        entireTextOnly: true
      },
      timeScale: {
        visible: true,
        borderVisible: true,
        borderColor: '#24314c',
        timeVisible: true,
        secondsVisible: false,
        ticksVisible: true,
        rightOffset: 12,
        barSpacing: 6,
        minBarSpacing: 0.5
      },
      handleScroll: {
        mouseWheel: true,
        pressedMouseMove: true,
        horzTouchDrag: true,
        vertTouchDrag: true
      },
      handleScale: {
        axisPressedMouseMove: { time: true, price: true },
        mouseWheel: true,
        pinch: true
      }
    });

    candlestickSeries = chart.addCandlestickSeries({
      upColor: '#22c55e',
      downColor: '#ef4444',
      borderUpColor: '#22c55e',
      borderDownColor: '#ef4444',
      wickUpColor: '#22c55e',
      wickDownColor: '#ef4444',
    });

    volumeSeries = chart.addHistogramSeries({
      color: '#38bdf8',
      priceFormat: { type: 'volume' },
      priceScaleId: '',
      scaleMargins: { top: 0.82, bottom: 0 },
    });

    sma20Series = chart.addLineSeries({ color: '#f59e0b', lineWidth: 1.5, title: 'SMA 20' });
    sma50Series = chart.addLineSeries({ color: '#38bdf8', lineWidth: 1.5, title: 'SMA 50' });
    ema200Series = chart.addLineSeries({ color: '#ec4899', lineWidth: 1.5, title: 'EMA 200' });

    // CROSSHAIR MOVE HANDLER (Updates dates if NOT locked)
    chart.subscribeCrosshairMove((param) => {
      if (isCandleLocked) return;

      if (param.time) {
        const secDetail = data.sector_details[activeSector];
        if (secDetail && secDetail.bars) {
          const bars = secDetail.bars;
          const idx = bars.findIndex(b => b.t === param.time);
          if (idx !== -1) {
            activeHoverDate = bars[idx].t;
            activeHoverPrevDate = idx > 0 ? bars[idx - 1].t : null;
            activeHoverPrev2Date = idx > 1 ? bars[idx - 2].t : null;

            if (constituentsModalOverlay.classList.contains('active')) {
              renderConstituentsTable();
            }
          }
        }
      }
    });

    // CHART CLICK HANDLER (Toggle Lock)
    chart.subscribeClick((param) => {
      if (param.time) {
        const secDetail = data.sector_details[activeSector];
        if (secDetail && secDetail.bars) {
          const bars = secDetail.bars;
          const idx = bars.findIndex(b => b.t === param.time);
          if (idx !== -1) {
            activeHoverDate = bars[idx].t;
            activeHoverPrevDate = idx > 0 ? bars[idx - 1].t : null;
            activeHoverPrev2Date = idx > 1 ? bars[idx - 2].t : null;
            isCandleLocked = !isCandleLocked;
            updateLockStatusUI();

            if (constituentsModalOverlay.classList.contains('active')) {
              renderConstituentsTable();
            }
          }
        }
      }
    });

    chart.timeScale().subscribeVisibleTimeRangeChange(() => {
      requestAnimationFrame(drawHMMBackgroundOverlay);
    });

    window.addEventListener('resize', () => {
      resizeCanvas();
      requestAnimationFrame(drawHMMBackgroundOverlay);
    });

    resizeCanvas();
  }

  function resizeCanvas() {
    const wrapper = document.getElementById('chart-wrapper');
    if (wrapper) {
      const w = wrapper.clientWidth;
      const h = wrapper.clientHeight;
      if (w > 0 && h > 0) {
        if (chart) chart.resize(w, h);
        canvas.width = w;
        canvas.height = h;
      }
    }
  }

  // Draw 3-State HMM Vertical Background Shading Boxes
  function drawHMMBackgroundOverlay() {
    if (!chart || !canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!showRegimeOverlay) return;

    const secDetail = data.sector_details[activeSector];
    if (!secDetail || !secDetail.bars || secDetail.bars.length === 0) return;

    const bars = secDetail.bars;
    const smoothedStates = computeSmoothedRegimes(activeSector, activeK);
    const timeScale = chart.timeScale();
    
    const stateColors = isDarkMode ? {
      0: "rgba(255, 23, 68, 0.28)",
      1: "rgba(255, 235, 59, 0.18)",
      2: "rgba(0, 230, 118, 0.28)"
    } : {
      0: "rgba(244, 63, 94, 0.44)",  // Distinct Coral Rose (65% Deep Opacity)
      1: "rgba(245, 158, 11, 0.38)", // Distinct Honey Gold (65% Deep Opacity)
      2: "rgba(20, 184, 166, 0.44)"  // Distinct Mint Cyan (65% Deep Opacity - No Candle Blending!)
    };

    // Render contiguous regime blocks with exact midpoint bar boundaries so color transitions occur between candles (never splitting candles in half)
    let segStart = 0;
    for (let i = 0; i < bars.length; i++) {
      const isLast = (i === bars.length - 1);
      const currState = smoothedStates[i] !== undefined ? smoothedStates[i] : 1;
      const nextState = !isLast ? (smoothedStates[i + 1] !== undefined ? smoothedStates[i + 1] : 1) : null;

      if (isLast || currState !== nextState) {
        const startBar = bars[segStart];
        const endBar = bars[i];
        const prevBar = segStart > 0 ? bars[segStart - 1] : null;
        const nextBar = !isLast ? bars[i + 1] : null;

        const xCenterStart = timeScale.timeToCoordinate(startBar.t);
        const xCenterEnd = timeScale.timeToCoordinate(endBar.t);

        if (xCenterStart !== null && xCenterEnd !== null) {
          // Midpoint for left boundary x1
          let x1;
          if (prevBar) {
            const xPrev = timeScale.timeToCoordinate(prevBar.t);
            x1 = xPrev !== null ? xCenterStart - (xCenterStart - xPrev) / 2 : xCenterStart - 10;
          } else {
            x1 = xCenterStart - 20;
          }

          // Midpoint for right boundary x2
          let x2;
          if (nextBar) {
            const xNext = timeScale.timeToCoordinate(nextBar.t);
            x2 = xNext !== null ? xCenterEnd + (xNext - xCenterEnd) / 2 : xCenterEnd + 10;
          } else {
            x2 = xCenterEnd + 40;
          }

          if (x2 > x1 && x2 >= -20 && x1 <= canvas.width + 20) {
            const drawX1 = Math.max(-20, x1);
            const drawX2 = Math.min(canvas.width + 20, x2);
            const drawWidth = Math.max(1, drawX2 - drawX1);

            const color = stateColors[currState] !== undefined ? stateColors[currState] : stateColors[1];
            ctx.fillStyle = color;
            ctx.fillRect(drawX1, 0, drawWidth, canvas.height);
          }
        }

        segStart = i + 1;
      }
    }
  }

  function calculateSMA(dataArray, period) {
    const sma = [];
    for (let i = 0; i < dataArray.length; i++) {
      if (i < period - 1) continue;
      let sum = 0;
      for (let j = 0; j < period; j++) sum += dataArray[i - j].close;
      sma.push({ time: dataArray[i].time, value: sum / period });
    }
    return sma;
  }

  function calculateEMA(dataArray, period) {
    const ema = [];
    const k = 2 / (period + 1);
    let prevEma = null;

    for (let i = 0; i < dataArray.length; i++) {
      const close = dataArray[i].close;
      if (i < period - 1) {
        continue;
      } else if (i === period - 1) {
        let sum = 0;
        for (let j = 0; j < period; j++) sum += dataArray[j].close;
        prevEma = sum / period;
        ema.push({ time: dataArray[i].time, value: prevEma });
      } else {
        prevEma = close * k + prevEma * (1 - k);
        ema.push({ time: dataArray[i].time, value: prevEma });
      }
    }
    return ema;
  }

  function renderChart() {
    const secDetail = data.sector_details[activeSector];
    if (!secDetail || !secDetail.bars || secDetail.bars.length === 0) return;

    const bars = secDetail.bars;

    const formattedBars = bars.map(b => ({
      time: b.t,
      open: b.o,
      high: b.h,
      low: b.l,
      close: b.c
    }));

    const volumeData = bars.map(b => ({
      time: b.t,
      value: b.v,
      color: b.c >= b.o ? 'rgba(34, 197, 94, 0.4)' : 'rgba(239, 68, 68, 0.4)'
    }));

    candlestickSeries.setData(formattedBars);
    volumeSeries.setData(volumeData);

    if (showSma20) {
      sma20Series.setData(calculateSMA(formattedBars, 20));
    } else {
      sma20Series.setData([]);
    }

    if (showSma50) {
      sma50Series.setData(calculateSMA(formattedBars, 50));
    } else {
      sma50Series.setData([]);
    }

    if (showEma200) {
      ema200Series.setData(calculateEMA(formattedBars, 200));
    } else {
      ema200Series.setData([]);
    }

    chart.timeScale().fitContent();
    chart.priceScale('right').applyOptions({ autoScale: true });

    setTimeout(drawHMMBackgroundOverlay, 50);
  }

  // Init Application
  initChart();
  renderSectorList();
  renderChart();
});
