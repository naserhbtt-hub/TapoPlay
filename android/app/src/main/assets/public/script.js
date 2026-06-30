'use strict';

const JSON_FEED = 'https://feeds.gamepix.com/v2/json?sid=0P81O&pagination=96&page=1';
const PROXIES = [
    u => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
    u => `https://corsproxy.io/?${encodeURIComponent(u)}`,
    u => `https://proxy.cors.sh/${u}`
];
const PLAY_URL = 'https://play.google.com/store/apps/details?id=com.gameport.app';
const PAGE_SIZE = 12;
const SCROLL_THRESHOLD = 500;

class GamePort {

    constructor() {
        this.allGames     = [];
        this.favorites    = this.read('gp_fav')   ?? [];
        this.filter       = 'all';
        this.query        = '';
        this.vol          = this.read('gp_vol')   ?? 50;
        this.muted        = this.read('gp_muted') ?? false;
        this.audioCtx     = null;
        this.isFullscreen = false;
        this._topbarTimer = null;
        this._gameW       = 0;
        this._gameH       = 0;

        /* Infinite scroll state */
        this.limit        = PAGE_SIZE;
        this._scrollBusy  = false;

        this.applyTheme(this.read('gp_theme') ?? 'dark');
        this.initVolumeUI();
        this.bindAll();
        this.initScrollListener();
        this.fetchGames();
    }

    /* ── Storage ── */
    read(k) {
        try { const v = localStorage.getItem(k); return v !== null ? JSON.parse(v) : null; }
        catch { return null; }
    }
    write(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }

    /* ── Theme ── */
    applyTheme(t) {
        document.body.setAttribute('data-theme', t);
        this.write('gp_theme', t);
        const el = document.getElementById('darkModeToggle');
        if (el) el.checked = (t === 'dark');
    }
    toggleTheme(on) { this.playClick(); this.applyTheme(on ? 'dark' : 'light'); }

    /* ── Volume (100→0 with live sound) ── */
    initVolumeUI() {
        const s = document.getElementById('volumeSlider');
        const l = document.getElementById('volumeLabel');
        if (s) s.value = this.vol;
        if (l) l.textContent = `${this.vol}%`;
        this.syncMute();
    }

    syncMute() {
        const b = document.getElementById('muteBtn');
        if (!b) return;
        const silent = this.muted || this.vol === 0;
        b.classList.toggle('muted', silent);
        /* Update SVG: show/hide the sound waves */
        const icon = document.getElementById('muteIcon');
        if (icon) {
            const paths = icon.querySelectorAll('path');
            paths.forEach(p => p.style.display = silent ? 'none' : '');
        }
    }

    setVol(v) {
        this.vol = +v; this.muted = this.vol === 0;
        const l = document.getElementById('volumeLabel');
        if (l) l.textContent = `${this.vol}%`;
        this.write('gp_vol', this.vol); this.write('gp_muted', this.muted);
        this.syncMute();
        this.playClick(); /* plays sound so user hears volume level */
    }

    toggleMute() {
        this.muted = !this.muted;
        this.write('gp_muted', this.muted);
        this.syncMute(); this.playClick();
    }

    /* ── Wood-peck sound ── */
    playClick() {
        if (this.muted || this.vol === 0) return;
        try {
            if (!this.audioCtx)
                this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const c = this.audioCtx, t = c.currentTime, v = (this.vol / 100) * 0.3;
            const len = Math.floor(c.sampleRate * 0.055);
            const buf = c.createBuffer(1, len, c.sampleRate);
            const d = buf.getChannelData(0);
            for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
            const ns = c.createBufferSource(); ns.buffer = buf;
            const bp = c.createBiquadFilter();
            bp.type = 'bandpass'; bp.frequency.value = 1800; bp.Q.value = 0.6;
            const ng = c.createGain();
            ng.gain.setValueAtTime(v * 0.55, t);
            ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);
            ns.connect(bp); bp.connect(ng); ng.connect(c.destination);
            ns.start(t); ns.stop(t + 0.06);
            const o1 = c.createOscillator(); o1.type = 'triangle';
            o1.frequency.setValueAtTime(260, t);
            o1.frequency.exponentialRampToValueAtTime(120, t + 0.07);
            const o2 = c.createOscillator(); o2.type = 'sine';
            o2.frequency.setValueAtTime(160, t);
            o2.frequency.exponentialRampToValueAtTime(80, t + 0.07);
            const lp = c.createBiquadFilter(); lp.type = 'lowpass';
            lp.frequency.setValueAtTime(900, t);
            lp.frequency.exponentialRampToValueAtTime(220, t + 0.07);
            lp.Q.value = 1.2;
            const wg = c.createGain();
            wg.gain.setValueAtTime(0, t);
            wg.gain.linearRampToValueAtTime(v, t + 0.001);
            wg.gain.exponentialRampToValueAtTime(v * 0.25, t + 0.025);
            wg.gain.exponentialRampToValueAtTime(0.0001, t + 0.1);
            o1.connect(lp); o2.connect(lp);
            lp.connect(wg); wg.connect(c.destination);
            o1.start(t); o2.start(t); o1.stop(t + 0.1); o2.stop(t + 0.1);
        } catch {}
    }

    /* ══════════════════════════════════════════════════════════
       INFINITE SCROLL — loads 12 games at a time
       ══════════════════════════════════════════════════════════ */
    initScrollListener() {
        const main = document.getElementById('mainContent');
        if (!main) return;

        main.addEventListener('scroll', () => {
            if (this._scrollBusy) return;

            const { scrollTop, scrollHeight, clientHeight } = main;
            const remaining = scrollHeight - scrollTop - clientHeight;

            if (remaining < SCROLL_THRESHOLD) {
                const fullList = this.getList();

                /* Only load more if there are more games to show */
                if (this.limit < fullList.length) {
                    this._scrollBusy = true;
                    this.limit += PAGE_SIZE;

                    /* Show loader spinner */
                    const loader = document.getElementById('scrollLoader');
                    if (loader) loader.style.display = 'flex';

                    /* Small delay for smooth UX */
                    setTimeout(() => {
                        this.renderGames();
                        this._scrollBusy = false;
                        if (loader) {
                            /* Hide loader if all games shown */
                            loader.style.display =
                                this.limit >= fullList.length ? 'none' : 'flex';
                        }
                    }, 300);
                }
            }
        }, { passive: true });
    }

    /* ── Orientation ── */
    getOrientation(w, h) {
        if (w > 0 && h > 0) {
            const r = w / h;
            if (r > 1.2)  return 'landscape';
            if (r < 0.85) return 'portrait';
        }
        return 'natural';
    }

    /* ── Fullscreen ── */
    async toggleFullscreen() {
        this.playClick();
        const ov = document.getElementById('gameOverlay');
        if (!ov) return;
        const isFs = !!(document.fullscreenElement ||
            document.webkitFullscreenElement || document.mozFullScreenElement);
        try {
            if (!isFs) {
                if (ov.requestFullscreen) await ov.requestFullscreen();
                else if (ov.webkitRequestFullscreen) await ov.webkitRequestFullscreen();
                else if (ov.mozRequestFullScreen) await ov.mozRequestFullScreen();
                const orient = this.getOrientation(this._gameW, this._gameH);
                try {
                    if (orient === 'landscape') await screen.orientation.lock('landscape');
                    else if (orient === 'portrait') await screen.orientation.lock('portrait');
                } catch {}
            } else {
                if (document.exitFullscreen) await document.exitFullscreen();
                else if (document.webkitExitFullscreen) await document.webkitExitFullscreen();
                else if (document.mozCancelFullScreen) await document.mozCancelFullScreen();
                try { screen.orientation.unlock(); } catch {}
            }
        } catch {}
    }

    handleFullscreenChange() {
        const isFs = !!(document.fullscreenElement ||
            document.webkitFullscreenElement || document.mozFullScreenElement);
        this.isFullscreen = isFs;
        const ov = document.getElementById('gameOverlay');
        const fb = document.getElementById('fullscreenBtn');
        if (ov) ov.classList.toggle('topbar-hidden', isFs);
        if (fb) fb.classList.toggle('active-fs', isFs);
        if (!isFs) { try { screen.orientation.unlock(); } catch {} }
    }

    handleStageTap() {
        if (!this.isFullscreen) return;
        const ov = document.getElementById('gameOverlay');
        if (!ov) return;
        ov.classList.remove('topbar-hidden');
        clearTimeout(this._topbarTimer);
        this._topbarTimer = setTimeout(() => {
            if (this.isFullscreen) ov.classList.add('topbar-hidden');
        }, 3000);
    }

    /* ── Open / Close game ── */
    openGame(url, title, w, h) {
        this.playClick();
        const ov = document.getElementById('gameOverlay');
        const fr = document.getElementById('gameIframe');
        const ti = document.getElementById('gameTitle');
        const fb = document.getElementById('fullscreenBtn');
        if (!ov || !fr) return;
        this._gameW = parseInt(w, 10) || 0;
        this._gameH = parseInt(h, 10) || 0;
        if (ti) ti.textContent = title || 'Game';
        if (fb) fb.classList.remove('active-fs');
        ov.classList.remove('topbar-hidden');
        this.isFullscreen = false;
        fr.src = url;
        ov.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeGame() {
        this.playClick();
        const isFs = !!(document.fullscreenElement ||
            document.webkitFullscreenElement || document.mozFullScreenElement);
        if (isFs) {
            try {
                if (document.exitFullscreen) document.exitFullscreen();
                else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
                else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
            } catch {}
        }
        try { screen.orientation.unlock(); } catch {}
        clearTimeout(this._topbarTimer);
        const ov = document.getElementById('gameOverlay');
        const fr = document.getElementById('gameIframe');
        if (fr) fr.src = '';
        if (ov) ov.classList.remove('active', 'topbar-hidden');
        document.body.style.overflow = '';
        this.isFullscreen = false;
        this._gameW = 0; this._gameH = 0;
    }

    /* ── Fetch ── */
    async fetchGames() {
        this.showState('loading');
        for (const mk of PROXIES) {
            try {
                const r = await fetch(mk(JSON_FEED), { signal: AbortSignal.timeout(8000) });
                if (!r.ok) continue;
                const data = await r.json();
                const g = this.parseJSON(data);
                if (g.length > 0) {
                    this.allGames = g;
                    this.limit = PAGE_SIZE;  /* reset on fresh load */
                    console.log(`✅ ${g.length} games`);
                    this.renderGames(); return;
                }
            } catch (e) { console.warn('Proxy:', e.message); }
        }
        try {
            const r = await fetch(JSON_FEED, { signal: AbortSignal.timeout(8000) });
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            const data = await r.json();
            const g = this.parseJSON(data);
            if (g.length > 0) {
                this.allGames = g;
                this.limit = PAGE_SIZE;
                this.renderGames(); return;
            }
        } catch (e) { console.error('Direct:', e.message); }
        this.showState('error');
    }

    parseJSON(data) {
        let raw = [];
        if (Array.isArray(data)) raw = data;
        else if (Array.isArray(data.games)) raw = data.games;
        else if (Array.isArray(data.data)) raw = data.data;
        else if (Array.isArray(data.items)) raw = data.items;
        else { for (const k of Object.keys(data)) {
            if (Array.isArray(data[k]) && data[k].length > 0) { raw = data[k]; break; }
        }}
        return raw.map((g, i) => ({
            title: g.title || g.name || `Game ${i + 1}`,
            url:   g.url || g.gameUrl || g.link || '',
            thumb: g.thumbnailUrl || g.thumbnail || g.image ||
                   g.imageUrl || g.cover || g.thumb || '',
            w: parseInt(g.width || g.w || '0', 10),
            h: parseInt(g.height || g.h || '0', 10)
        })).filter(g => g.url && g.title);
    }

    /* ── Get filtered + searched list ── */
    getList() {
        let list = this.allGames;
        if (this.filter === 'fav')
            list = list.filter(g => this.favorites.includes(g.url));
        if (this.query) {
            const q = this.query.toLowerCase();
            list = list.filter(g => g.title.toLowerCase().includes(q));
        }
        return list;
    }

    showState(s) {
        const m = { loading: 'loadingState', grid: 'games-container',
            emptyFav: 'emptyFavorites', noRes: 'noResults', error: 'errorState' };
        Object.values(m).forEach(id => {
            const el = document.getElementById(id); if (el) el.style.display = 'none';
        });
        const loader = document.getElementById('scrollLoader');
        if (loader) loader.style.display = 'none';
        const t = document.getElementById(m[s]);
        if (!t) return;
        t.style.display = s === 'grid' ? 'grid' : 'flex';
    }

    /* ══════════════════════════════════════════════════════════
       RENDER GAMES — uses this.limit for infinite scroll
       Shows only first `this.limit` games from getList()
       ══════════════════════════════════════════════════════════ */
    renderGames() {
        const grid = document.getElementById('games-container');
        const loader = document.getElementById('scrollLoader');
        if (!grid) return;

        const fullList = this.getList();

        if (fullList.length === 0) {
            grid.innerHTML = '';
            if (loader) loader.style.display = 'none';
            this.showState(this.filter === 'fav' ? 'emptyFav' : 'noRes');
            return;
        }

        /* Only show up to this.limit games */
        const visibleList = fullList.slice(0, this.limit);

        this.showState('grid');
        const f = document.createDocumentFragment();
        visibleList.forEach(g => f.appendChild(this.buildCard(g)));
        grid.innerHTML = '';
        grid.appendChild(f);

        /* Show/hide scroll loader */
        if (loader) {
            loader.style.display = this.limit < fullList.length ? 'flex' : 'none';
        }

        console.log(`[GamePort] Showing ${visibleList.length}/${fullList.length} games`);
    }

    buildCard(g) {
        const isFav = this.favorites.includes(g.url);
        const ph = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'` +
            ` width='320' height='240'%3E%3Crect width='320' height='240'` +
            ` fill='%232a2a2a'/%3E%3Ctext x='50%25' y='50%25'` +
            ` dominant-baseline='middle' text-anchor='middle'` +
            ` font-family='Arial' font-size='13' fill='%23666'` +
            `%3ENo Image%3C/text%3E%3C/svg%3E`;

        const card = document.createElement('div');
        card.className = 'game-card';
        card.dataset.url   = this.ea(g.url);
        card.dataset.title = this.ea(g.title);
        card.dataset.w     = g.w || 0;
        card.dataset.h     = g.h || 0;

        card.innerHTML = `
            <img class="card-thumb" src="${this.ea(g.thumb)}"
                 alt="${this.ea(g.title)}" loading="lazy" decoding="async"
                 onerror="this.onerror=null;this.src='${ph}'">
            <div class="card-overlay"></div>
            <div class="card-play-icon"></div>
            <button class="fav-btn ${isFav ? 'on' : ''}"
                    data-url="${this.ea(g.url)}" aria-pressed="${isFav}">
                ${isFav
                    ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="#fff" stroke="none">
                         <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12
                         5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06
                         1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0
                         0 0-7.78z"/></svg>`
                    : `<svg width="16" height="16" viewBox="0 0 24 24"
                         fill="none" stroke="#fff" stroke-width="2">
                         <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12
                         5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06
                         1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0
                         0 0-7.78z"/></svg>`
                }
            </button>
            <div class="card-title-bar">
                <p class="card-title" title="${this.ea(g.title)}">${this.eh(g.title)}</p>
            </div>`;
        return card;
    }

    /* ── Favorites ── */
    toggleFav(url) {
        this.playClick();
        const i = this.favorites.indexOf(url);
        if (i > -1) this.favorites.splice(i, 1);
        else this.favorites.push(url);
        this.write('gp_fav', this.favorites);
        this.renderGames();
    }
    clearFavs() {
        if (!this.favorites.length) { alert('No favorites.'); return; }
        if (confirm('Clear all favorites?')) {
            this.playClick(); this.favorites = [];
            this.write('gp_fav', this.favorites);
            this.renderGames();
        }
    }

    /* ── Modals ── */
    openModal(id) {
        this.playClick();
        const el = document.getElementById(id);
        if (el) { el.classList.add('active'); document.body.style.overflow = 'hidden'; }
    }
    closeModal(id) {
        this.playClick();
        const el = document.getElementById(id);
        if (el) { el.classList.remove('active'); document.body.style.overflow = ''; }
    }

    /* ── XSS ── */
    ea(s) { return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;')
        .replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/'/g,'&#39;'); }
    eh(s) { return String(s).replace(/&/g,'&amp;')
        .replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

    /* ── Bind all ── */
    bindAll() {
        const si = document.getElementById('searchInput');
        const sc = document.getElementById('searchClear');
        si?.addEventListener('input', e => {
            this.query = e.target.value.trim();
            if (sc) sc.classList.toggle('visible', this.query.length > 0);
            this.limit = PAGE_SIZE;  /* reset scroll on new search */
            this.renderGames();
        });
        sc?.addEventListener('click', () => {
            this.playClick(); if (si) { si.value = ''; si.focus(); }
            this.query = ''; sc.classList.remove('visible');
            this.limit = PAGE_SIZE;
            this.renderGames();
        });

        document.getElementById('allGamesBtn')?.addEventListener('click', () => {
            this.playClick();
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            document.getElementById('allGamesBtn')?.classList.add('active');
            this.filter = 'all'; this.limit = PAGE_SIZE; this.renderGames();
        });
        document.getElementById('favoritesBtn')?.addEventListener('click', () => {
            this.playClick();
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            document.getElementById('favoritesBtn')?.classList.add('active');
            this.filter = 'fav'; this.limit = PAGE_SIZE; this.renderGames();
        });

        document.getElementById('darkModeToggle')
            ?.addEventListener('change', e => this.toggleTheme(e.target.checked));
        document.getElementById('volumeSlider')
            ?.addEventListener('input', e => this.setVol(e.target.value));
        document.getElementById('muteBtn')
            ?.addEventListener('click', () => this.toggleMute());

        document.getElementById('games-container')?.addEventListener('click', e => {
            const fav = e.target.closest('.fav-btn');
            if (fav) { e.stopPropagation(); this.toggleFav(fav.dataset.url); return; }
            const card = e.target.closest('.game-card');
            if (card) {
                e.stopPropagation();
                this.openGame(card.dataset.url, card.dataset.title, card.dataset.w, card.dataset.h);
            }
        });

        document.getElementById('backBtn')?.addEventListener('click', () => this.closeGame());
        document.getElementById('fullscreenBtn')?.addEventListener('click', () => this.toggleFullscreen());

        ['fullscreenchange','webkitfullscreenchange','mozfullscreenchange'].forEach(ev => {
            document.addEventListener(ev, () => this.handleFullscreenChange());
        });

        document.getElementById('gameOverlay')?.addEventListener('click', e => {
            if (e.target === document.getElementById('gameOverlay'))
                this.handleStageTap();
        });

        document.getElementById('retryBtn')?.addEventListener('click', () => {
            this.playClick(); this.fetchGames();
        });

        /* Rate → Google Play */
        document.getElementById('openRating')?.addEventListener('click', () => {
            this.playClick(); window.open(PLAY_URL, '_blank');
        });

        const P = [
            ['settingsBtn','closeSettings','settingsOverlay'],
            ['openPrivacy','closePrivacy','privacyOverlay'],
            ['openTerms','closeTerms','termsOverlay'],
            ['openContact','closeContact','contactOverlay']
        ];
        P.forEach(([o, c, ov]) => {
            document.getElementById(o)?.addEventListener('click', () => this.openModal(ov));
            document.getElementById(c)?.addEventListener('click', () => this.closeModal(ov));
        });

        document.getElementById('clearFavorites')?.addEventListener('click', () => this.clearFavs());

        document.querySelectorAll('.modal-overlay').forEach(ov => {
            ov.addEventListener('click', e => {
                if (e.target === ov) this.closeModal(ov.id);
            });
        });

        document.addEventListener('keydown', e => {
            if (e.key !== 'Escape') return;
            const go = document.getElementById('gameOverlay');
            if (go?.classList.contains('active')) { this.closeGame(); return; }
            const am = document.querySelector('.modal-overlay.active');
            if (am) this.closeModal(am.id);
        });

        document.addEventListener('touchmove', e => {
            const safe = e.target.closest('.sheet-body,.main-content,.filter-bar');
            if (!safe && window.scrollY === 0) e.preventDefault();
        }, { passive: false });

        document.getElementById('gameOverlay')?.addEventListener('touchstart', e => {
            if (e.touches.length > 1) e.preventDefault();
        }, { passive: false });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.gameport = new GamePort();
    console.log('🎮 GamePort PWA ready');
});
// =================================================================
// GAMEPORT APP LOGIC (SPLASH, RATING, NOTIFICATIONS)
// =================================================================

// فحص بيئة العمل (هل المستخدم يفتح من التطبيق أم المتصفح)
const isAppEnvironment = window.hasOwnProperty('Capacitor') || navigator.userAgent.includes('wv');
const splashElement = document.getElementById('gameport-splash');

// 1. منطق الشاشة السوداء المتحركة
if (!isAppEnvironment) {
  if (splashElement) splashElement.remove(); // حذفها فوراً في المتصفح العادي
} else {
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (splashElement) {
        splashElement.classList.add('fade-out');
        setTimeout(() => splashElement.remove(), 600);
      }
    }, 2500); // تختفي بعد ثانيتين ونصف داخل التطبيق
  });
}

// 2. منطق نافذة طلب التقييم (تظهر بعد 15 دقيقة)
if (isAppEnvironment) {
  const hasRatedPermanently = localStorage.getItem('gameport_rated');
  if (!hasRatedPermanently) {
    setTimeout(() => {
      const ratingModal = document.getElementById('rating-modal');
      if (ratingModal) ratingModal.style.display = 'flex';
    }, 900000); // 900,000 مللي ثانية تساوي بالضبط 15 دقيقة
  }
}

function closeRating() {
  const ratingModal = document.getElementById('rating-modal');
  if (ratingModal) ratingModal.style.display = 'none';
}

function redirectStore() {
  localStorage.setItem('gameport_rated', 'true'); // لن تظهر مجدداً أبداً
  const ratingModal = document.getElementById('rating-modal');
  if (ratingModal) ratingModal.style.display = 'none';
  window.open('https://play.google.com/store/apps/details?id=com.GamePort.play', '_blank');
}

// 3. منطق استقبال وتهيئة الإشعارات (Push Notifications)
if (window.hasOwnProperty('Capacitor')) {
  const { PushNotifications } = window.Capacitor.Plugins;

  if (PushNotifications) {
    // طلب صلاحية الإشعارات
    PushNotifications.checkPermissions().then((permStatus) => {
      if (permStatus.receive === 'prompt') {
        PushNotifications.requestPermissions().then((result) => {
          if (result.receive === 'granted') {
            PushNotifications.register();
          }
        });
      } else if (permStatus.receive === 'granted') {
        PushNotifications.register();
      }
    });

    // الحصول على رمز الجهاز المميز لإرسال الإشعارات له
    PushNotifications.addListener('registration', (token) => {
      console.log('Push Token: ' + token.value);
    });

    PushNotifications.addListener('registrationError', (err) => {
      console.error('Push Error: ', err.error);
    });

    PushNotifications.addListener('pushNotificationReceived', (notification) => {
      console.log('Notification Received: ', notification);
    });
  }
}

