/* ============================================================
   dm. — script.js
   Языки (EN/RU) + бургер + прелоадер + категории магазина
   ============================================================ */

const I18N = {
  en: {
    title_home:       'dm. — music portfolio',
    nav_home:         'Home',
    nav_dm:           'Damersimba Music',
    nav_onyx:         'Colonia Onyx',
    nav_eyes:         'Open Eyes In The Game',
    nav_neyti:        'Neyti',
    nav_unreleased:   'Unreleased',
    nav_shop:         'Shop',
    nav_socials:      'Socials',

    hero_eyebrow:     'independent music collective',
    hero_sub:         'Four projects · one stage. Underground sound from Tula region.',
    scroll:           'scroll',
    home_projects:    'Projects',

    dm_short:         'Songs, plans, vocals soon.',
    onyx_short:       'Metalcore from Bogoroditsk.',
    eyes_short:       'Nerdcore album about games.',
    neyti_short:      'Clips about streamer DadeGuy.',

    dm_desc:          "Just songs about music (soon I'll be doing vocals, I'm still thinking about it)",

    onyx_desc:        'Musical band from Bogoroditsk, Tula region. Genres: metalcore, alternative rock and rock. The band was influenced by the British group Onyx Colony (also known as Land Of Hell or Colony).',
    onyx_releases:    'Releases',
    onyx_release1:    'Album "The Eliner"',
    onyx_release2:    'Track "Performance"',
    onyx_release3:    'Demo "a musician nobody needs"',

    eyes_desc:        'This is a Nerdcore album about games.',
    eyes_listen:      '▶ Listen to Album Playlist',
    track_dev:        '— in development',

    neyti_desc:       'Channel with clips about streamer DadeGuy.',

    unreleased_title: 'Unreleased',
    unreleased_album: 'Album: CesoR',
    unreleased_song:  'Song: CesoR',

    shop_lead:        'Choose a category — everything will appear here soon.',
    shop_merch:       'Merch',
    shop_merch_sub:   'Clothes & accessories',
    shop_cds:         'CD & Cassettes',
    shop_cds_sub:     'Physical releases',
    shop_soon:        'Coming soon',
    shop_soon_sub:    'Everything will be here soon',

    socials_desc:     'All links in one place — open whatever you like.'
  },

  ru: {
    title_home:       'dm. — музыкальное портфолио',
    nav_home:         'Главная',
    nav_dm:           'Damersimba Music',
    nav_onyx:         'Colonia Onyx',
    nav_eyes:         'Open Eyes In The Game',
    nav_neyti:        'Neyti',
    nav_unreleased:   'Невыпущенные',
    nav_shop:         'Магазин',
    nav_socials:      'Соцсети',

    hero_eyebrow:     'независимый музык. коллектив',
    hero_sub:         'Четыре проекта · одна сцена. Андерграунд из Тульской области.',
    scroll:           'вниз',
    home_projects:    'Проекты',

    dm_short:         'Песни, планы, вокалы скоро.',
    onyx_short:       'Металкор из Богородицка.',
    eyes_short:       'Нердкор-альбом про игры.',
    neyti_short:      'Нарезки по стримеру DadeGuy.',

    dm_desc:          'Просто песни по музыке (скоро буду делать вокалы, я просто ещё думаю об этом)',

    onyx_desc:        'Музыкальная группа из Богородицка, Тульская область. Жанры: металкор, альтернативный рок и рок. На создание коллектива повлияла британская группа Onyx Colony (также известная как Land Of Hell или Colony).',
    onyx_releases:    'Релизы',
    onyx_release1:    'Альбом «The Eliner»',
    onyx_release2:    'Трек «Performance»',
    onyx_release3:    'Демо-запись «a musician nobody needs»',

    eyes_desc:        'Это Нердкор альбом по играм.',
    eyes_listen:      '▶ Слушать Плейлист Альбома',
    track_dev:        '— в разработке',

    neyti_desc:       'Канал с нарезками по стримеру DadeGuy.',

    unreleased_title: 'Невыпущенные',
    unreleased_album: 'Альбом: CesoR',
    unreleased_song:  'Песня: CesoR',

    shop_lead:        'Выбери категорию — скоро всё здесь появится.',
    shop_merch:       'Мерч',
    shop_merch_sub:   'Одежда и аксессуары',
    shop_cds:         'CD и Аудиокассеты',
    shop_cds_sub:     'Физические релизы',
    shop_soon:        'Скоро всё будет',
    shop_soon_sub:    'Совсем скоро здесь появятся товары',

    socials_desc:     'Все ссылки в одном месте — открой, что ближе.'
  }
};

const DEFAULT_LANG = 'en';
const STORAGE_KEY = 'dm-lang';

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- ПРЕЛОАДЕР ---------- */
  const preloader = document.getElementById('preloader');
  if (preloader) {
    const hide = () => {
      preloader.classList.add('hidden');
      setTimeout(() => { preloader.style.display = 'none'; }, 700);
    };
    if (document.readyState === 'complete') {
      setTimeout(hide, 900);
    } else {
      window.addEventListener('load', () => setTimeout(hide, 900));
      setTimeout(hide, 3500); // fallback
    }
  }

  /* ---------- ЭЛЕМЕНТЫ ---------- */
  const burgerBtn = document.getElementById('burgerBtn');
  const menu      = document.getElementById('mainMenu');
  const langBtns  = document.querySelectorAll('.lang-btn');
  const pageId    = document.body.dataset.page || 'home';

  /* ---------- БУРГЕР ---------- */
  function closeMenu() {
    if (!menu) return;
    menu.classList.remove('open');
    if (burgerBtn) {
      burgerBtn.classList.remove('open');
      burgerBtn.setAttribute('aria-expanded', 'false');
    }
  }

  if (burgerBtn && menu) {
    burgerBtn.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      burgerBtn.classList.toggle('open', isOpen);
      burgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.addEventListener('click', (e) => {
      if (!menu.classList.contains('open')) return;
      if (menu.contains(e.target) || burgerBtn.contains(e.target)) return;
      closeMenu();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) closeMenu();
    });
  }

  /* ---------- ЯЗЫК ---------- */
  function getSavedLang() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'en' || saved === 'ru') return saved;
    } catch (e) {}
    return DEFAULT_LANG;
  }

  function applyLang(lang) {
    const dict = I18N[lang] || I18N[DEFAULT_LANG];
    document.documentElement.lang = lang;

    if (pageId === 'home' && dict.title_home) {
      document.title = dict.title_home;
    }

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) el.textContent = dict[key];
    });

    langBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  langBtns.forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.dataset.lang));
  });

  applyLang(getSavedLang());

  /* ---------- МАГАЗИН ---------- */
  const shopCats    = document.querySelectorAll('.shop-cat');
  const shopMessage = document.getElementById('shopMessage');

  if (shopCats.length && shopMessage) {
    shopCats.forEach(cat => {
      cat.addEventListener('click', () => {
        const isActive = cat.classList.contains('active');
        shopCats.forEach(c => c.classList.remove('active'));

        if (isActive) {
          shopMessage.classList.remove('visible');
        } else {
          cat.classList.add('active');
          shopMessage.classList.add('visible');
        }
      });
    });
  }
});
