/* PATH — offline-first travel awareness demo */

console.log('app.js executing ✅');
try {
  const el0 = document.getElementById('jsLoaded');
  if (el0) el0.textContent = 'JS loaded ✅';
} catch {}

const LS_KEYS = {

  auth: 'rs_auth',
  otp: 'rs_otp',
  lastCountry: 'rs_last_country',
  trips: 'rs_trips',
  quiz: 'rs_quiz_state',
  forum: 'rs_forum_posts',
  lost: 'rs_lost_items',
  rates: 'rs_currency_rates',
  alertsLast: 'rs_alerts_last',
  audioLanguage: 'rs_audio_language',
  audioVoice: 'rs_audio_voice',
  audioGender: 'rs_audio_gender',
  audioRate: 'rs_audio_rate',
  audioVolume: 'rs_audio_volume',
  creatorPhoto: 'rs_creator_photo',
  ideaPhoto: 'rs_idea_photo'
};

const LS_LANGUAGE = 'rs_language';

const AUDIO_LANGUAGE_BY_COUNTRY = {
  US: [
    { code: 'en-US', label: 'English (US)' }
  ],
  GB: [
    { code: 'en-GB', label: 'English (UK)' }
  ],
  NP: [
    { code: 'ne-NP', label: 'नेपाली' },
    { code: 'en-US', label: 'English' }
  ],
  IN: [
    { code: 'hi-IN', label: 'हिन्दी' },
    { code: 'en-US', label: 'English' }
  ],
  JP: [
    { code: 'ja-JP', label: '日本語' }
  ],
  CN: [
    { code: 'zh-CN', label: '简体中文' }
  ],
  KR: [
    { code: 'ko-KR', label: '한국어' }
  ],
  FR: [
    { code: 'fr-FR', label: 'Français' }
  ],
  DE: [
    { code: 'de-DE', label: 'Deutsch' }
  ],
  ES: [
    { code: 'es-ES', label: 'Español' }
  ],
  IT: [
    { code: 'it-IT', label: 'Italiano' }
  ],
  PT: [
    { code: 'pt-PT', label: 'Português' }
  ],
  BR: [
    { code: 'pt-BR', label: 'Português (Brasil)' }
  ],
  AE: [
    { code: 'ar-SA', label: 'العربية' },
    { code: 'en-US', label: 'English' }
  ],
  RU: [
    { code: 'ru-RU', label: 'Русский' }
  ],
  TH: [
    { code: 'th-TH', label: 'ไทย' }
  ],
  VN: [
    { code: 'vi-VN', label: 'Tiếng Việt' }
  ],
  ID: [
    { code: 'id-ID', label: 'Bahasa Indonesia' }
  ],
  MY: [
    { code: 'ms-MY', label: 'Bahasa Melayu' }
  ],
  LK: [
    { code: 'si-LK', label: 'සිංහල' },
    { code: 'ta-IN', label: 'தமிழ்' },
    { code: 'en-US', label: 'English' }
  ],
  CH: [
    { code: 'de-DE', label: 'Deutsch' },
    { code: 'fr-FR', label: 'Français' },
    { code: 'it-IT', label: 'Italiano' },
    { code: 'rm-CH', label: 'Rumantsch' }
  ],
  CA: [
    { code: 'en-CA', label: 'English' },
    { code: 'fr-CA', label: 'Français' }
  ],
  BE: [
    { code: 'nl-BE', label: 'Nederlands' },
    { code: 'fr-BE', label: 'Français' },
    { code: 'de-DE', label: 'Deutsch' }
  ],
  SG: [
    { code: 'en-SG', label: 'English' },
    { code: 'zh-CN', label: '中文' },
    { code: 'ms-MY', label: 'Bahasa Melayu' },
    { code: 'ta-IN', label: 'தமிழ்' }
  ]
};

function getAudioLanguagesForCountry(code) {
  return AUDIO_LANGUAGE_BY_COUNTRY[code] || [{ code: 'en-US', label: 'English' }];
}

function $(id) {
  if (!id) return null;
  return document.getElementById(id);
}
const DEFAULT_LANGUAGE = 'en';
const SUPPORTED_LANGUAGES = [
  { code: 'en', native: 'English', flag: '🇺🇸', rtl: false },
  { code: 'ne', native: 'नेपाली', flag: '🇳🇵', rtl: false },
  { code: 'hi', native: 'हिन्दी', flag: '🇮🇳', rtl: false },
  { code: 'zh', native: '简体中文', flag: '🇨🇳', rtl: false },
  { code: 'ja', native: '日本語', flag: '🇯🇵', rtl: false },
  { code: 'ko', native: '한국어', flag: '🇰🇷', rtl: false },
  { code: 'fr', native: 'Français', flag: '🇫🇷', rtl: false },
  { code: 'de', native: 'Deutsch', flag: '🇩🇪', rtl: false },
  { code: 'es', native: 'Español', flag: '🇪🇸', rtl: false },
  { code: 'it', native: 'Italiano', flag: '🇮🇹', rtl: false },
  { code: 'pt', native: 'Português', flag: '🇵🇹', rtl: false },
  { code: 'ru', native: 'Русский', flag: '🇷🇺', rtl: false },
  { code: 'ar', native: 'العربية', flag: '🇸🇦', rtl: true },
  { code: 'tr', native: 'Türkçe', flag: '🇹🇷', rtl: false },
  { code: 'th', native: 'ไทย', flag: '🇹🇭', rtl: false },
  { code: 'vi', native: 'Tiếng Việt', flag: '🇻🇳', rtl: false },
  { code: 'id', native: 'Bahasa Indonesia', flag: '🇮🇩', rtl: false },
  { code: 'ms', native: 'Bahasa Melayu', flag: '🇲🇾', rtl: false },
  { code: 'bn', native: 'বাংলা', flag: '🇧🇩', rtl: false },
  { code: 'si', native: 'සිංහල', flag: '🇱🇰', rtl: false },
  { code: 'ur', native: 'اُردُو', flag: '🇵🇰', rtl: true },
  { code: 'he', native: 'עברית', flag: '🇮🇱', rtl: true }
];

const LANG_BY_CODE = Object.fromEntries(SUPPORTED_LANGUAGES.map(l => [l.code, l]));

const i18n = {
  currentLang: DEFAULT_LANGUAGE,
  resources: {},

  async init() {
    const lang = await detectLanguage();
    await this.changeLanguage(lang);
  },

  async changeLanguage(language) {
    const lang = LANG_BY_CODE[language] ? language : DEFAULT_LANGUAGE;
    this.currentLang = lang;
    await this.loadResource(lang);
    this.setDirection(lang);
    this.translatePage();
    translateDynamicText();
    translateOptionDefaults($('countrySelect'));
    updateLanguageToggle();
    localStorage.setItem(LS_LANGUAGE, lang);
  },

  async loadResource(language) {
    if (this.resources[language]) return this.resources[language];
    try {
      const res = await fetch(`./locales/${language}/common.json`, { cache: 'no-store' });
      if (!res.ok) throw new Error('Translation load failed');
      const data = await res.json();
      this.resources[language] = data;
      return data;
    } catch (err) {
      if (language !== DEFAULT_LANGUAGE) {
        await this.loadResource(DEFAULT_LANGUAGE);
        this.resources[language] = this.resources[DEFAULT_LANGUAGE];
      }
      return this.resources[language];
    }
  },

  t(key, fallback, data) {
    const resource = this.resources[this.currentLang] || {};
    const value = getDeep(resource, key.split('.'));
    const result = value == null ? getDeep(this.resources[DEFAULT_LANGUAGE] || {}, key.split('.')) : value;
    const text = result == null ? fallback || '' : result;
    return interpolate(text, data);
  },

  translatePage() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (!key) return;
      el.textContent = this.t(key, el.textContent || '');
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (!key) return;
      el.placeholder = this.t(key, el.placeholder || '');
    });
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      if (!key) return;
      el.title = this.t(key, el.title || '');
    });
  },

  setDirection(language) {
    const lang = LANG_BY_CODE[language] || LANG_BY_CODE[DEFAULT_LANGUAGE];
    const isRtl = lang?.rtl;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.body.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = language || DEFAULT_LANGUAGE;
  }
};

function getDeep(object, path) {
  return path.reduce((node, key) => (node && key in node ? node[key] : null), object);
}

function inferVoiceGender(voice) {
  const name = String(voice.name || '').toLowerCase();
  if (/female|woman|girl|zira|samantha|nora|alloy|anna|victoria|aria|hazel|alva/.test(name)) return 'female';
  if (/male|man|boy|alex|david|mark|john|daniel|paul|tom|michael|dave/.test(name)) return 'male';
  return 'system';
}

function getLanguageFlag(code) {
  return AUDIO_LANGUAGE_FLAGS[code] || '';
}

function populateAudioLanguageOptions(countryCode) {
  const select = $('audioLanguageSelect');
  if (!select) return;
  const options = getAudioLanguagesForCountry(countryCode);
  select.innerHTML = '';
  options.forEach(lang => {
    const option = document.createElement('option');
    option.value = lang.code;
    option.textContent = lang.label;
    if (lang.code === audioState.language) option.selected = true;
    select.appendChild(option);
  });
  if (!audioState.language && options.length) {
    audioState.language = options[0].code;
  }
}

function updateAudioVoiceOptions() {
  const select = $('audioVoiceSelect');
  if (!select) return;
  const voices = getAvailableVoices();
  const requested = String(audioState.language || 'en-US').toLowerCase();
  const exact = voices.filter(v => v.lang.toLowerCase() === requested);
  const fuzzy = voices.filter(v => v.lang.toLowerCase().startsWith(requested.split('-')[0]));
  const languageMatches = exact.length ? exact : fuzzy;
  const genderMatches = audioState.gender === 'system'
    ? languageMatches
    : languageMatches.filter(v => inferVoiceGender(v) === audioState.gender);
  const candidates = genderMatches.length ? genderMatches : languageMatches.length ? languageMatches : voices.filter(v => v.lang.toLowerCase().startsWith('en'));

  audioState.voiceUnavailable = !languageMatches.length;
  select.innerHTML = '';

  if (!candidates.length) {
    const option = document.createElement('option');
    option.value = '';
    option.textContent = 'No available voice';
    select.appendChild(option);
    audioState.voice = null;
    updateSelectedVoiceLabel();
    return;
  }

  candidates.forEach(v => {
    const option = document.createElement('option');
    option.value = v.name;
    option.textContent = `${v.name} (${v.lang})`;
    if (audioState.voice && audioState.voice.name === v.name) option.selected = true;
    select.appendChild(option);
  });

  const storedVoice = safeJsonParse(localStorage.getItem(LS_KEYS.audioVoice), null);
  let selected = storedVoice ? candidates.find(v => v.name === storedVoice.name) : null;
  if (!selected) {
    selected = candidates.find(v => audioState.voice && v.name === audioState.voice.name) || candidates[0];
  }
  audioState.voice = selected;
  select.value = selected.name;
  updateSelectedVoiceLabel();
}

function updateSelectedVoiceLabel() {
  const labelEl = $('audioVoiceCurrent');
  if (!labelEl) return;
  if (!audioState.supported) {
    labelEl.textContent = 'Voice: Unsupported browser audio';
    return;
  }
  if (audioState.voiceUnavailable) {
    const flag = getLanguageFlag(audioState.language);
    labelEl.textContent = `${flag} Voice unavailable for ${audioState.language}. Falling back to English.`;
    return;
  }
  if (!audioState.voice) {
    labelEl.textContent = 'Voice: none selected';
    return;
  }
  const flag = getLanguageFlag(audioState.voice.lang) || getLanguageFlag(audioState.language);
  const gender = inferVoiceGender(audioState.voice);
  labelEl.textContent = `Voice: ${flag} ${audioState.voice.name}${gender !== 'system' ? ` (${gender})` : ''}`;
}

function setAudioLanguageForCountry(countryCode) {
  const options = getAudioLanguagesForCountry(countryCode);
  if (!options.length) return;
  const stored = safeJsonParse(localStorage.getItem(LS_KEYS.audioLanguage), null);
  if (stored && options.some(o => o.code === stored.code)) {
    audioState.language = stored.code;
  } else if (!options.some(o => o.code === audioState.language)) {
    audioState.language = options[0].code;
  }
  populateAudioLanguageOptions(countryCode);
  if ($('audioLanguageSelect')) $('audioLanguageSelect').value = audioState.language;
  updateAudioVoiceOptions();
  if (audioState.utterance) {
    stopSpeech();
    speakCurrentSection();
  }
}

function updateAudioPreferencesFromStorage() {
  const savedLang = safeJsonParse(localStorage.getItem(LS_KEYS.audioLanguage), null);
  const savedVoice = safeJsonParse(localStorage.getItem(LS_KEYS.audioVoice), null);
  const savedGender = localStorage.getItem(LS_KEYS.audioGender);
  const savedRate = localStorage.getItem(LS_KEYS.audioRate);
  const savedVolume = localStorage.getItem(LS_KEYS.audioVolume);

  if (savedLang && savedLang.code) audioState.language = savedLang.code;
  if (savedVoice && savedVoice.name) audioState.voice = { name: savedVoice.name, lang: savedVoice.lang };
  audioState.gender = savedGender || 'system';
  audioState.rate = savedRate ? Number(savedRate) || 1 : 1;
  audioState.volume = savedVolume ? Number(savedVolume) || 1 : 1;
}

function interpolate(text, data) {
  if (!data || typeof text !== 'string') return text;
  return text.replace(/\{\{\s*(.*?)\s*\}\}/g, (_, token) => {
    return String(data[token] ?? '');
  });
}

async function detectLanguage() {
  const stored = localStorage.getItem(LS_LANGUAGE);
  if (stored && LANG_BY_CODE[stored]) return stored;
  const browser = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
  const exact = SUPPORTED_LANGUAGES.find(l => browser.startsWith(l.code));
  if (exact) return exact.code;
  const primary = browser.split('-')[0];
  if (LANG_BY_CODE[primary]) return primary;
  return DEFAULT_LANGUAGE;
}

function updateLanguageToggle() {
  const btn = $('languageToggleBtn');
  if (!btn) return;
  const current = LANG_BY_CODE[i18n.currentLang] || LANG_BY_CODE[DEFAULT_LANGUAGE];
  btn.textContent = `${current.flag} ${current.native}`;
}

function getLanguageDisplayName(language) {
  return LANG_BY_CODE[language] ? `${LANG_BY_CODE[language].flag} ${LANG_BY_CODE[language].native}` : language;
}

const COUNTRY_OFFICIAL_LANGUAGES = {
  NP: [{ code: 'ne', native: 'नेपाली', flag: '🇳🇵' }, { code: 'en', native: 'English', flag: '🇺🇸' }],
  JP: [{ code: 'ja', native: '日本語', flag: '🇯🇵' }, { code: 'en', native: 'English', flag: '🇺🇸' }],
  CN: [{ code: 'zh', native: '简体中文', flag: '🇨🇳' }, { code: 'en', native: 'English', flag: '🇺🇸' }],
  DE: [{ code: 'de', native: 'Deutsch', flag: '🇩🇪' }, { code: 'en', native: 'English', flag: '🇺🇸' }],
  FR: [{ code: 'fr', native: 'Français', flag: '🇫🇷' }, { code: 'en', native: 'English', flag: '🇺🇸' }],
  AE: [{ code: 'ar', native: 'العربية', flag: '🇸🇦' }, { code: 'en', native: 'English', flag: '🇺🇸' }],
  IN: [{ code: 'hi', native: 'हिन्दी', flag: '🇮🇳' }, { code: 'en', native: 'English', flag: '🇺🇸' }],
  CH: [{ code: 'de', native: 'Deutsch', flag: '🇩🇪' }, { code: 'fr', native: 'Français', flag: '🇫🇷' }, { code: 'it', native: 'Italiano', flag: '🇮🇹' }, { code: 'rm', native: 'Rumantsch', flag: '🇨🇭' }],
  BE: [{ code: 'nl', native: 'Nederlands', flag: '🇧🇪' }, { code: 'fr', native: 'Français', flag: '🇫🇷' }, { code: 'de', native: 'Deutsch', flag: '🇩🇪' }],
  CA: [{ code: 'en', native: 'English', flag: '🇺🇸' }, { code: 'fr', native: 'Français', flag: '🇫🇷' }],
  ZA: [{ code: 'en', native: 'English', flag: '🇺🇸' }, { code: 'af', native: 'Afrikaans', flag: '🇿🇦' }],
  SG: [{ code: 'zh', native: '简体中文', flag: '🇨🇳' }, { code: 'en', native: 'English', flag: '🇺🇸' }, { code: 'ms', native: 'Bahasa Melayu', flag: '🇲🇾' }, { code: 'ta', native: 'தமிழ்', flag: '🇮🇳' }],
  LK: [{ code: 'si', native: 'සිංහල', flag: '🇱🇰' }, { code: 'ta', native: 'தமிழ்', flag: '🇮🇳' }, { code: 'en', native: 'English', flag: '🇺🇸' }],
  PK: [{ code: 'ur', native: 'اُردُو', flag: '🇵🇰' }, { code: 'en', native: 'English', flag: '🇺🇸' }]
};

function renderLanguageSuggestions(country) {
  const target = $('countryLanguageSuggestions');
  if (!target || !country) return;
  const langs = COUNTRY_OFFICIAL_LANGUAGES[country.code] || [{ code: 'en', native: 'English', flag: '🇺🇸' }];
  const suggestionButtons = langs.map(lang => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'language-item';
    button.style.width = 'auto';
    button.style.display = 'inline-flex';
    button.style.margin = '2px';
    button.textContent = `${lang.flag} ${lang.native}`;
    button.addEventListener('click', async () => {
      await i18n.changeLanguage(lang.code);
    });
    return button;
  });
  target.innerHTML = `<div class="language-suggestions"><strong>${i18n.t('country.suggestedLanguages', 'Suggested languages:')}</strong></div>`;
  const wrapper = document.createElement('div');
  wrapper.style.display = 'flex';
  wrapper.style.flexWrap = 'wrap';
  wrapper.style.gap = '8px';
  suggestionButtons.forEach(btn => wrapper.appendChild(btn));
  target.appendChild(wrapper);
  target.classList.remove('hidden');
}

function initLanguageSelector() {
  const toggle = $('languageToggleBtn');
  const dropdown = $('languageDropdown');
  const search = $('languageSearch');
  const list = $('languageList');
  if (!toggle || !dropdown || !search || !list) return;

  const renderList = (filter = '') => {
    const term = filter.trim().toLowerCase();
    list.innerHTML = '';
    const items = SUPPORTED_LANGUAGES.filter(lang => {
      const text = `${lang.native} ${lang.code}`.toLowerCase();
      return !term || text.includes(term);
    });
    if (!items.length) {
      const empty = document.createElement('div');
      empty.className = 'language-item';
      empty.textContent = i18n.t('language.noResults', 'No languages found');
      empty.style.cursor = 'default';
      list.appendChild(empty);
      return;
    }
    items.forEach(lang => {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'language-item';
      item.dataset.code = lang.code;
      item.textContent = `${lang.flag} ${lang.native}`;
      item.addEventListener('click', async () => {
        await i18n.changeLanguage(lang.code);
        dropdown.classList.add('hidden');
      });
      list.appendChild(item);
    });
  };

  toggle.addEventListener('click', event => {
    event.stopPropagation();
    dropdown.classList.toggle('hidden');
    search.value = '';
    renderList('');
    if (!dropdown.classList.contains('hidden')) {
      search.focus();
    }
  });

  search.addEventListener('input', () => renderList(search.value));
  document.addEventListener('click', event => {
    if (!dropdown.contains(event.target) && event.target !== toggle) {
      dropdown.classList.add('hidden');
    }
  });
}

function translateDynamicText() {
  i18n.translatePage();
}

function translateOptionDefaults(sel) {
  if (!sel) return;
  const placeholder = i18n.t('country.choose', 'Choose a country…');
  if (sel.options && sel.options.length > 0) {
    sel.options[0].textContent = placeholder;
  } else {
    sel.add(new Option(placeholder, ''));
  }
}

function setCountryOptionText(sel, country) {
  if (!sel) return;
  translateOptionDefaults(sel);
}

function getLangNameByCode(code) {
  return LANG_BY_CODE[code] ? LANG_BY_CODE[code].native : code;
}

function setDocumentDirection() {
  const direction = LANG_BY_CODE[i18n.currentLang]?.rtl ? 'rtl' : 'ltr';
  document.documentElement.setAttribute('dir', direction);
  document.body.setAttribute('dir', direction);
}

function localizeButtonText(buttonId, key) {
  const btn = $(buttonId);
  if (btn) btn.textContent = i18n.t(key, btn.textContent || '');
}

function localizePlaceholderText(elementId, key) {
  const el = $(elementId);
  if (el) el.placeholder = i18n.t(key, el.placeholder || '');
}

function localizeTitleText(elementId, key) {
  const el = $(elementId);
  if (el) el.title = i18n.t(key, el.title || '');
}

function localizeTextContent(elementId, key, fallback) {
  const el = $(elementId);
  if (el) el.textContent = i18n.t(key, fallback != null ? fallback : el.textContent || '');
}

function safeJsonParse(s, fallback) {
  try {
    const parsed = JSON.parse(s);
    return parsed === null && fallback !== null ? fallback : parsed;
  } catch {
    return fallback;
  }
}

function setHidden(el, hidden) {
  if (!el) return;
  if (hidden) el.classList.add('hidden');
  else el.classList.remove('hidden');
}

function formatTs(ts) {
  if (!ts) return '—';
  const d = new Date(ts);
  return d.toLocaleString();
}

function isOnline() {
  return typeof navigator !== 'undefined' ? navigator.onLine : false;
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function loadCountries() {
  const res = await fetch('./data/countries.json', { cache: 'no-store' });
  return res.json();
}

function loadAuth() {
  return safeJsonParse(localStorage.getItem(LS_KEYS.auth), null);
}

function saveAuth(auth) {
  localStorage.setItem(LS_KEYS.auth, JSON.stringify(auth));
}

function clearAuth() {
  localStorage.removeItem(LS_KEYS.auth);
}

function loadTrips() {
  const value = safeJsonParse(localStorage.getItem(LS_KEYS.trips), []);
  return Array.isArray(value) ? value : [];
}
function saveTrips(trips) { localStorage.setItem(LS_KEYS.trips, JSON.stringify(trips)); }

function loadForumPosts() {
  const value = safeJsonParse(localStorage.getItem(LS_KEYS.forum), []);
  return Array.isArray(value) ? value : [];
}
function saveForumPosts(posts) { localStorage.setItem(LS_KEYS.forum, JSON.stringify(posts)); }

function loadLostItems() {
  const value = safeJsonParse(localStorage.getItem(LS_KEYS.lost), []);
  return Array.isArray(value) ? value : [];
}
function saveLostItems(items) { localStorage.setItem(LS_KEYS.lost, JSON.stringify(items)); }

function loadQuizState() {
  const defaultState = {
    index: 0,
    score: 0,
    finished: false,
    answers: []
  };
  const state = safeJsonParse(localStorage.getItem(LS_KEYS.quiz), defaultState);
  if (!state || typeof state !== 'object') return defaultState;
  return {
    index: Number.isFinite(state.index) ? state.index : 0,
    score: Number.isFinite(state.score) ? state.score : 0,
    finished: !!state.finished,
    answers: Array.isArray(state.answers) ? state.answers : []
  };
}
function saveQuizState(state) { localStorage.setItem(LS_KEYS.quiz, JSON.stringify(state)); }

function renderTrips() {
  const list = $('tripsList');
  if (!list) return;
  list.innerHTML = '';
  const trips = loadTrips();
  if (!trips.length) {
    list.innerHTML = '<div class="panel-summary">No saved trips yet ✈️</div>';
    return;
  }
  trips.slice().sort((a,b)=>b.createdAt - a.createdAt).forEach(t => {
    const el = document.createElement('div');
    el.style.padding = '16px';
    el.style.border = '1px solid #dbe8ff';
    el.style.borderRadius = '22px';
    el.style.background = '#f4f8ff';
    el.innerHTML = `
      <div style="display:flex; justify-content:space-between; gap:12px; flex-wrap:wrap;">
        <div>
          <div style="font-weight:900;">🧳 ${escapeHtml(t.name)}</div>
          <div class="panel-summary" style="margin-top:6px;">📅 ${escapeHtml(t.start)} → ${escapeHtml(t.end)}
          </div>
          <div class="panel-summary" style="margin-top:6px;">📝 ${escapeHtml(t.notes || '')}</div>
        </div>
        <div style="display:flex; gap:10px; align-items:flex-start;">
          <button class="tertiary-button" type="button" data-del-trip="${t.id}" style="padding:10px 14px; border-radius:16px;">Delete 🗑️</button>
        </div>
      </div>
    `;
    list.appendChild(el);
  });

  list.querySelectorAll('[data-del-trip]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-del-trip');
      const trips = loadTrips().filter(x => x.id !== id);
      saveTrips(trips);
      renderTrips();
    });
  });
}

function escapeHtml(str) {
  return String(str ?? '').replace(/[&<>'"]/g, c => ({
    '&':'&amp;', '<':'<', '>':'>', "'":'&#39;', '"':'"'
  }[c]));
}

function renderForum() {
  const wrap = $('forumPosts');
  if (!wrap) return;
  wrap.innerHTML = '';
  const posts = loadForumPosts();
  if (!posts.length) {
    wrap.innerHTML = '<div class="panel-summary">No posts yet—be first! 🧡</div>';
    return;
  }
  posts.slice().sort((a,b)=>b.createdAt - a.createdAt).forEach(p => {
    const el = document.createElement('div');
    el.className = 'forum-post';
    el.innerHTML = `
      <div class="post-avatar">${escapeHtml(p.avatar || '🧑‍🚀')}</div>
      <div style="flex:1; min-width:0;">
        <div style="display:flex; justify-content:space-between; gap:12px; flex-wrap:wrap;">
          <div style="font-weight:900;">${escapeHtml(p.name)} <span style="color:#64748b; font-weight:700;">🗓️ ${formatTs(p.createdAt)}</span></div>
          <div class="panel-summary">Reactions: <strong>${p.reactions || 0}</strong> 💙</div>
        </div>
        <div class="panel-summary" style="margin-top:8px;">${escapeHtml(p.text)}</div>
        <div style="margin-top:10px; display:flex; gap:10px; flex-wrap:wrap;">
          <button class="tertiary-button" type="button" data-react="${p.id}" style="padding:10px 14px; border-radius:16px;">React 💙</button>
          <button class="tertiary-button" type="button" data-del-post="${p.id}" style="padding:10px 14px; border-radius:16px;">Delete 🗑️</button>
        </div>
      </div>
    `;
    wrap.appendChild(el);
  });

  wrap.querySelectorAll('[data-react]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-react');
      const posts = loadForumPosts();
      const p = posts.find(x => x.id === id);
      if (!p) return;
      p.reactions = (p.reactions || 0) + 1;
      saveForumPosts(posts);
      renderForum();
    });
  });

  wrap.querySelectorAll('[data-del-post]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-del-post');
      const posts = loadForumPosts().filter(x => x.id !== id);
      saveForumPosts(posts);
      renderForum();
    });
  });
}

function renderLost() {
  const list = $('lostList');
  if (!list) return;
  list.innerHTML = '';
  const items = loadLostItems();
  if (!items.length) {
    list.innerHTML = '<div class="panel-summary">No lost/found reports yet 🕵️</div>';
    return;
  }
  items.slice().sort((a,b)=>b.createdAt - a.createdAt).forEach(it => {
    const el = document.createElement('div');
    el.style.padding = '16px';
    el.style.border = '1px solid #dbe8ff';
    el.style.borderRadius = '22px';
    el.style.background = '#f4f8ff';
    el.innerHTML = `
      <div style="display:flex; justify-content:space-between; gap:12px; flex-wrap:wrap;">
        <div>
          <div style="font-weight:900;">🧳 ${escapeHtml(it.item)} <span style="color:#64748b; font-weight:800;">(${escapeHtml(it.status)} ${emojiForStatus(it.status)})</span></div>
          <div class="panel-summary" style="margin-top:6px;">📍 ${escapeHtml(it.location)} • 📅 ${escapeHtml(it.date)}</div>
          <div class="panel-summary" style="margin-top:6px;">📝 ${escapeHtml(it.notes || '')}</div>
        </div>
        <div style="display:flex; gap:10px; align-items:flex-start;">
          <button class="tertiary-button" type="button" data-del-lost="${it.id}" style="padding:10px 14px; border-radius:16px;">Delete 🗑️</button>
        </div>
      </div>
    `;
    list.appendChild(el);
  });
  list.querySelectorAll('[data-del-lost]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-del-lost');
      const items = loadLostItems().filter(x => x.id !== id);
      saveLostItems(items);
      renderLost();
    });
  });
}

function emojiForStatus(status) {
  if (status === 'reported') return '📩';
  if (status === 'followup') return '🔁';
  if (status === 'found') return '✅';
  return '📌';
}

async function renderCountry(country) {
  if (!country) return;

  $('countrySummary').textContent = i18n.t('country.loadedGuide', 'Loaded offline guide for {{name}} 🌍', { name: country.name });
  $('lawsEmpty').classList.add('hidden');
  $('lawsContent').classList.remove('hidden');

  $('lawsCountry').textContent = country.name;

  $('lawsTransport').textContent = country.laws.publicTransportRules || '';
  $('lawsHealth').textContent = `${country.laws.healthLaws || ''}`;
  $('lawsTerms').innerHTML = (country.laws.commonLegalTerminology || []).map(t => `<div><strong>${escapeHtml(t.term)}:</strong> ${escapeHtml(t.meaning)}</div>`).join('');
  $('lawsCulture').textContent = country.laws.culture || '';
  $('lawsPlug').textContent = country.laws.plugSocketsVoltage || '';
  $('lawsTipping').textContent = country.laws.tippingCustoms || '';
  $('lawsWater').textContent = country.laws.tapWaterSafety || '';

  // Vaccination requirements line
  $('lawsHealth').innerHTML = `
    <div>${escapeHtml(country.laws.healthLaws || '')}</div>
    <div style="margin-top:8px;"><strong>${escapeHtml(i18n.t('laws.vaccinationNotes', '💉 Vaccination entry notes:'))}</strong> ${escapeHtml(country.laws.vaccinationRequirements || '')}</div>
  `;

  // Embassy
  $('embassySummary').textContent = i18n.t('embassy.loadedFor', 'Embassy contacts & safety notes for {{name}} 🏛️', { name: country.name });
  $('embassyContent').classList.remove('hidden');
  $('embassyName').textContent = country.embassy.name;
  $('embassyPhone').textContent = country.embassy.phone;
  $('embassyAddress').textContent = country.embassy.address;
  const emergencyPolice = $('emergencyPolice');
  const emergencyFire = $('emergencyFire');
  const emergencyAmbulance = $('emergencyAmbulance');
  const emergencyTourist = $('emergencyTourist');
  const embassyNotes = $('embassyNotes');
  if (emergencyPolice) emergencyPolice.textContent = country.emergencyContacts?.police || '—';
  if (emergencyFire) emergencyFire.textContent = country.emergencyContacts?.fire || '—';
  if (emergencyAmbulance) emergencyAmbulance.textContent = country.emergencyContacts?.ambulance || '—';
  if (emergencyTourist) emergencyTourist.textContent = country.emergencyContacts?.touristPolice || '—';
  if (embassyNotes) embassyNotes.textContent = country.embassy?.notes || '';

  // Alerts
  const list = $('alertsList');
  list.innerHTML = '';
  (country.alerts || []).forEach(a => {
    const el = document.createElement('div');
    el.style.padding = '14px';
    el.style.borderRadius = '18px';
    el.style.border = '1px solid #dbe8ff';
    el.style.background = '#ffffff';
    el.innerHTML = `
      <div style="display:flex; justify-content:space-between; gap:12px; flex-wrap:wrap;">
        <div style="font-weight:900;">${escapeHtml(a.emoji || '🔔')} ${escapeHtml(a.title)}</div>
        <div class="panel-summary" style="margin:0; font-weight:800;">${escapeHtml(a.severity || 'info')} 🌡️</div>
      </div>
      <div class="panel-summary" style="margin-top:8px;">${escapeHtml(a.details || '')}</div>
    `;
    list.appendChild(el);
  });

  $('alertsChecked').textContent = formatTs(localStorage.getItem(LS_KEYS.alertsLast));

  // WiFi tips
  $('wifiTips').textContent = country.wifi || '';
  renderLanguageSuggestions(country);
  setAudioLanguageForCountry(country.code);
  await initCurrency(country.code);
}

async function initCurrency(countryCode) {
  // currency selectors
  const from = $('fromCurrency');
  const to = $('toCurrency');
  if (!from || !to) return;

  const currencies = [
    { code: 'USD', name: 'US Dollar 💵' },
    { code: 'GBP', name: 'British Pound 💷' },
    { code: 'EUR', name: 'Euro 💶' },
    { code: 'JPY', name: 'Japanese Yen 💴' },
    { code: 'INR', name: 'Indian Rupee ₹' },
    { code: 'AED', name: 'UAE Dirham د.إ' }
  ];

  from.innerHTML = '';
  to.innerHTML = '';
  currencies.forEach(c => {
    from.add(new Option(c.name, c.code));
    to.add(new Option(c.name, c.code));
  });

  // Heuristic defaults per country
  const defaults = { US: 'USD', GB: 'GBP', JP: 'JPY', IN: 'INR', AE: 'AED' };
  const base = defaults[countryCode] || 'USD';
  from.value = base;
  to.value = 'EUR';

  await refreshRatesIfNeeded();
}

async function refreshRatesIfNeeded() {
  const ts = safeJsonParse(localStorage.getItem(LS_KEYS.rates), null);
  // We'll refresh if online; otherwise use cached.

  if (!isOnline()) {
    const cached = safeJsonParse(localStorage.getItem(LS_KEYS.rates), null);
    applyRates(cached);
    return;
  }

  // Try an exchange rate API (public). If blocked, fallback to cache.
  // Using exchangerate.host (no key) as a best-effort.
  try {
    const url = 'https://api.exchangerate.host/latest?base=USD';
    const res = await fetch(url);
    const data = await res.json();
    if (!data || data.success === false || !data.rates) throw new Error('Bad rates response');

    const payload = {
      base: 'USD',
      rates: data.rates,
      fetchedAt: Date.now()
    };
    localStorage.setItem(LS_KEYS.rates, JSON.stringify(payload));
    applyRates(payload);
  } catch {
    const cached = safeJsonParse(localStorage.getItem(LS_KEYS.rates), null);
    applyRates(cached);
  }
}

function applyRates(payload) {
  if (!payload || !payload.rates) {
    $('ratesTs').textContent = i18n.t('currency.noCachedRates', 'No cached rates yet (offline) ⚠️');
    return;
  }
  $('ratesTs').textContent = formatTs(payload.fetchedAt);
  // Keep it in-memory
  window.__rs_rates = payload;
}

function convertCurrency(amount, from, to) {
  const payload = window.__rs_rates;
  if (!payload || !payload.rates) return null;

  // payload base is USD.
  const rates = payload.rates;
  if (from === payload.base) {
    // USD -> to
    const rateTo = rates[to];
    if (!rateTo) return null;
    return amount * rateTo;
  }

  if (to === payload.base) {
    const rateFrom = rates[from];
    if (!rateFrom) return null;
    return amount / rateFrom;
  }

  // from -> USD -> to
  const rateFrom = rates[from];
  const rateTo = rates[to];
  if (!rateFrom || !rateTo) return null;
  const usd = amount / rateFrom;
  return usd * rateTo;
}

function initCurrencyUI() {
  $('convertBtn').addEventListener('click', () => {
    const amount = Number($('amount').value || 0);
    const from = $('fromCurrency').value;
    const to = $('toCurrency').value;
    const out = convertCurrency(amount, from, to);
    if (out == null || Number.isNaN(out)) {
      $('conversionResult').textContent = i18n.t('currency.unableConvert', 'Unable to convert — rates missing ⚠️');
      return;
    }
    $('conversionResult').textContent = i18n.t('currency.convertedResult', 'Converted: {{value}} {{to}} ✅', { value: out.toFixed(2), to });
  });
}

const QUIZ = [
  {
    q: 'What should you do first if you feel unsafe during travel? 🆘',
    options: [
      { text: 'Call local emergency services and reach out to your embassy/consulate 🚨', points: 2 },
      { text: 'Ignore it until your trip ends 🙃', points: 0 },
      { text: 'Only post about it online 📣', points: 0 }
    ]
  },
  {
    q: 'What is the safest way to handle local laws and “customs” at borders? 📜',
    options: [
      { text: 'Check official guidance and declare restricted/prohibited items 🧾', points: 2 },
      { text: 'Guess based on internet jokes 🤡', points: 0 },
      { text: 'Bring whatever and hope for the best 🎲', points: 0 }
    ]
  },
  {
    q: 'Which is best for offline readiness? 🌍',
    options: [
      { text: 'Save trip details and keep embassy contacts offline 💾', points: 2 },
      { text: 'Rely only on roaming data 📱', points: 0 },
      { text: 'Never save anything 📵', points: 0 }
    ]
  }
];

function renderQuiz() {
  const state = loadQuizState();
  const q = $('quizQuestion');
  const opts = $('quizOptions');
  const res = $('quizResult');
  if (!q || !opts || !res) return;

  if (state.finished) {
    q.textContent = i18n.t('quiz.complete', 'Quiz complete ✅');
    opts.innerHTML = '';
    res.textContent = i18n.t('quiz.scoreResult', 'Your score: {{score}} / {{max}} 🎉', {
      score: state.score,
      max: QUIZ.reduce((a, b) => a + Math.max(...b.options.map(o => o.points)), 0)
    });
    return;
  }

  const item = QUIZ[state.index];
  q.textContent = i18n.t('quiz.questionLabel', 'Question {{num}}: {{question}}', {
    num: state.index + 1,
    question: item.q
  });
  opts.innerHTML = '';
  item.options.forEach(o => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'quiz-option';
    b.textContent = o.text;
    b.addEventListener('click', () => {
      state.score += o.points;
      state.answers.push({ q: item.q, chosen: o.text, points: o.points });
      state.index += 1;
      if (state.index >= QUIZ.length) {
        state.finished = true;
      }
      saveQuizState(state);
      renderQuiz();
    });
    opts.appendChild(b);
  });

  res.textContent = '';
}

function initQuizUI() {
  $('quizNextBtn').addEventListener('click', () => {
    // Next is driven by answer selection; keep it simple.
  });
  $('quizRestartBtn').addEventListener('click', () => {
    localStorage.removeItem(LS_KEYS.quiz);
    renderQuiz();
  });
}

function initTripUI() {
  $('saveTripBtn').addEventListener('click', () => {
    const name = $('tripName').value.trim();
    const start = $('tripStart').value;
    const end = $('tripEnd').value;
    const notes = $('tripNotes').value.trim();

    if (!name) {
      $('tripSaveResult').textContent = i18n.t('trip.addName', 'Add a trip name 💡');
      return;
    }

    const trips = loadTrips() || [];
    trips.push({
      id: String(Date.now()) + '-' + randInt(1000, 9999),
      name,
      start,
      end,
      notes,
      createdAt: Date.now()
    });
    saveTrips(trips);
    $('tripSaveResult').textContent = i18n.t('trip.saved', 'Trip saved 💾');
    renderTrips();
  });
}

function initForumUI() {
  $('forumPostBtn').addEventListener('click', () => {
    const name = $('forumName').value.trim() || 'Anonymous 🧑‍🚀';
    const text = $('forumPost').value.trim();
    if (!text) return;

    const posts = loadForumPosts() || [];
    const avatar = Array.from(name)[0] || '🧑‍🚀';

    posts.push({
      id: String(Date.now()) + '-' + randInt(1000, 9999),
      name,
      avatar,
      text,
      reactions: 0,
      createdAt: Date.now()
    });
    saveForumPosts(posts);
    $('forumPost').value = '';
    renderForum();
  });
}

function initLostUI() {
  $('lostSaveBtn').addEventListener('click', () => {
    const item = $('lostItem').value.trim();
    if (!item) return;
    const location = $('lostLocation').value.trim();
    const date = $('lostDate').value;
    const status = $('lostStatus').value;

    const notes = '';

    const items = loadLostItems() || [];
    items.push({
      id: String(Date.now()) + '-' + randInt(1000, 9999),
      item,
      location,
      date,
      status,
      notes,
      createdAt: Date.now()
    });
    saveLostItems(items);
    renderLost();
  });
}

function initSOS() {
  const btn = $('sosBtn');
  const status = $('sosStatus');
  let holding = false;
  let timer = null;

  const release = () => {
    holding = false;
    if (timer) clearTimeout(timer);
    timer = null;
    if (status) status.textContent = '';
  };

  const startHold = () => {
    holding = true;
    if (status) status.textContent = i18n.t('sos.keepHolding', 'Keep holding… 1–2 seconds 🧯');
    timer = setTimeout(() => {
      if (!holding) return;
      const msg = i18n.t('sos.triggered', 'SOS triggered at {{time}} 🆘 (local demo log)', { time: formatTs(Date.now()) });
      status.textContent = msg;
      // Also log into localStorage
      const key = 'rs_sos_log';
      const logs = safeJsonParse(localStorage.getItem(key), []);
      logs.push({ at: Date.now(), msg });
      localStorage.setItem(key, JSON.stringify(logs));
      // In a real app, this would contact emergency services / embassy.
    }, 1200);
  };

  btn.addEventListener('pointerdown', startHold);
  btn.addEventListener('pointerup', release);
  btn.addEventListener('pointercancel', release);
  btn.addEventListener('pointerleave', release);
}

function initLogin() {
  const overlay = $('loginOverlay');
  const splash = $('splash');
  const authStatus = $('authStatus');

  const phone = $('phone');
  const otp = $('otp');
  const otpHint = $('otpHint');

  const step1 = $('loginStep1');
  const step2 = $('loginStep2');

  const sendOtpBtn = $('sendOtpBtn');
  const verifyBtn = $('verifyOtpBtn');
  const backBtn = $('backToPhoneBtn');
  const err = $('loginError');
  const sample = $('useSampleBtn');

  function showApp() {
    setHidden(splash, true);
    setHidden(overlay, true);
    setHidden($('app'), false);

    const auth = loadAuth();
    if (auth && auth.phone) authStatus.textContent = i18n.t('app.signedInWithPhone', 'Signed in ✅ ({{phone}})', { phone: auth.phone });
    else authStatus.textContent = i18n.t('app.signedIn', 'Signed in ✅');
  }

  function showError(msg) {
    if (!err) return;
    err.textContent = msg;
  }

  // Auto splash hide
  setTimeout(() => setHidden(splash, true), 1600);

  const existing = loadAuth();
  if (existing) {
    // Ensure splash hides then show app
    setTimeout(showApp, 200);
  } else {
    setHidden(overlay, false);
    setHidden($('app'), true);
  }

  const generateOtp = () => String(randInt(100000, 999999));

  sendOtpBtn.addEventListener('click', () => {
    showError('');
    const p = phone.value.trim();
    if (!p || p.length < 7) {
      showError(i18n.t('login.invalidPhone', 'Enter a valid phone number ☎️'));
      return;
    }
    // Demo: local OTP
    const code = generateOtp();
    localStorage.setItem(LS_KEYS.otp, JSON.stringify({ phone: p, code, at: Date.now() }));
    otpHint.textContent = i18n.t('login.otpHintDemo', 'Demo OTP for {{phone}}: {{code}} 🔢', { phone: p, code });
    step1.classList.add('hidden');
    step2.classList.remove('hidden');
    otp.value = '';
  });

  sample.addEventListener('click', () => {
    phone.value = '+14155552671';
    sendOtpBtn.click();
  });

  backBtn.addEventListener('click', () => {
    step2.classList.add('hidden');
    step1.classList.remove('hidden');
    showError('');
  });

  verifyBtn.addEventListener('click', () => {
    showError('');
    const p = phone.value.trim();
    const entered = (otp.value || '').trim();
    const stored = safeJsonParse(localStorage.getItem(LS_KEYS.otp), null);
    if (!stored) {
      showError(i18n.t('login.sendAgain', 'Send OTP again 🔁'));
      return;
    }
    // Basic expiry (demo)
    if (Date.now() - stored.at > 5 * 60 * 1000) {
      showError(i18n.t('login.otpExpired', 'OTP expired ⏳ Send again.'));
      return;
    }
    if (stored.phone !== p || entered !== stored.code) {
      showError(i18n.t('login.wrongOtp', 'Wrong OTP 😅 Please try again.'));
      return;
    }

    saveAuth({ phone: p, at: Date.now() });
    showApp();
  });

  const skipBtn = $('skipLogin');
  if (skipBtn) {
    skipBtn.addEventListener('click', () => {
      showError('');
      setHidden(overlay, true);
      setHidden($('app'), false);
      authStatus.textContent = i18n.t('app.guestAccess', 'Guest access 🛩️');
    });
  }

  $('logoutBtn').addEventListener('click', () => {
    clearAuth();
    location.reload();
  });
}

function initCountrySelect(countries) {
  const sel = $('countrySelect');
  if (!sel) return;
  translateOptionDefaults(sel);
  countries.forEach(c => sel.add(new Option(c.name, c.code)));

  const last = localStorage.getItem(LS_KEYS.lastCountry);
  if (last) sel.value = last;

  const onChange = async () => {
    const code = sel.value;
    if (!code) return;
    localStorage.setItem(LS_KEYS.lastCountry, code);
    const country = countries.find(x => x.code === code);
    window.__rs_country = country;
    await renderCountry(country);
  };
  sel.addEventListener('change', onChange);

  // Initial render if last exists
  if (sel.value) onChange();
}

function initAlertsRefresh(countries) {
  // Offline-friendly: use bundled alerts; “real-time” is simulated via last-checked + online polling.
  function markChecked() {
    localStorage.setItem(LS_KEYS.alertsLast, String(Date.now()));
    $('alertsChecked').textContent = formatTs(Date.now());
  }

  const refreshBtn = null; // not in UI

  // If online, we can attempt to update last-checked (no data changes in offline demo).
  window.addEventListener('online', () => {
    markChecked();
  });

  // Initial check mark for current country
  setTimeout(() => {
    markChecked();
  }, 800);
}

function initTools(countries) {
  // Customs dictionary
  $('customsSearchBtn').addEventListener('click', () => {
    const country = window.__rs_country;
    const term = ($('customsSearch').value || '').trim().toLowerCase();
    const out = $('customsResult');
    if (!out) return;
    if (!country) {
      out.textContent = i18n.t('country.selectFirst', 'Select a destination first 🌎');
      return;
    }
    const dict = country.customsDictionary || [];
    if (!term) {
      out.textContent = i18n.t('customs.enterSearch', 'Type a term like “visa”, “warrant”, “duty” 🔎');
      return;
    }
    const matches = dict.filter(x => x.term.toLowerCase().includes(term) || x.meaning.toLowerCase().includes(term));
    if (!matches.length) {
      out.textContent = i18n.t('customs.noMatches', 'No matches in offline dictionary for this country. Try another term 🧾');
      return;
    }
    out.innerHTML = matches.map(m => `<div style="margin-top:10px;"><strong>📌 ${escapeHtml(m.term)}:</strong> ${escapeHtml(m.meaning)}</div>`).join('');
  });

  // Wi-Fi tips
  $('wifiLoadBtn').addEventListener('click', () => {
    const country = window.__rs_country;
    if (!country) {
      $('wifiTips').textContent = i18n.t('wifi.chooseDestination', 'Choose a destination first 🌍');
      return;
    }
    $('wifiTips').textContent = country.wifi || i18n.t('wifi.noTips', 'No tips available offline.');
  });

  // Flight tracking demo
  $('trackFlightBtn').addEventListener('click', async () => {
    const result = $('flightResult');
    const f = ($('flightNumber').value || '').trim();
    if (!result) return;
    if (!f) {
      result.textContent = i18n.t('flight.enterNumber', 'Enter a flight number ✈️');
      return;
    }
    if (!window.__rs_country) {
      result.textContent = i18n.t('country.selectFirst', 'Select a destination first 🌎');
      return;
    }

    if (!isOnline()) {
      result.textContent = i18n.t('flight.offlineStatus', 'Offline demo: tracking for {{flight}}. Status: Departed → En route → Arrived (simulated) 🗺️', { flight: f });
      return;
    }

    // Best-effort: no guarantee of API without keys. Provide fallback.
    try {
      const url = `https://api.aviationstack.com/v1/flights?access_key=demo&flight_number=${encodeURIComponent(f)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (!data || !data.data || !data.data.length) throw new Error('No data');
      const first = data.data[0];
      result.textContent = `Live (best-effort): ${f} • ${first.departure && first.departure.iata ? first.departure.iata : ''} → ${first.arrival && first.arrival.iata ? first.arrival.iata : ''}`;
    } catch {
      result.textContent = i18n.t('flight.unavailable', 'Live unavailable for {{flight}}. Offline demo timeline shown instead 📴', { flight: f });
    }
  });

  // Weather demo
  $('weatherBtn').addEventListener('click', async () => {
    const result = $('weatherResult');
    const city = ($('weatherCity').value || '').trim();
    if (!result) return;
    if (!city) {
      result.textContent = i18n.t('weather.enterCity', 'Enter a city name ☁️');
      return;
    }
    if (!isOnline()) {
      result.textContent = i18n.t('weather.offlineDemo', 'Offline demo: check local weather online for {{city}} 🌦️', { city });
      return;
    }
    try {
      const url = `https://wttr.in/${encodeURIComponent(city)}?format=j1`;
      const res = await fetch(url);
      const data = await res.json();
      const current = (data.current_condition && data.current_condition[0]) || null;
      if (!current) throw new Error('No current');
      const tempC = current.temp_C;
      result.textContent = `Live (best-effort): ${city} is about ${tempC}°C now ✅`;
    } catch {
      result.textContent = i18n.t('weather.failed', 'Couldn’t fetch live weather. Offline reminder for {{city}} 🌦️', { city });
    }
  });
}

const audioState = {
  supported: typeof window !== 'undefined' && 'speechSynthesis' in window,
  sections: [],
  currentIndex: 0,
  repeating: false,
  utterance: null,
  voice: null,
  language: 'en-US',
  gender: 'system',
  voiceUnavailable: false,
  rate: 1,
  volume: 1,
  muted: false,
  isPaused: false,
  mode: 'section'
};

const AUDIO_LANGUAGE_FLAGS = {
  'en-US': '🇺🇸',
  'en-GB': '🇬🇧',
  'ne-NP': '🇳🇵',
  'hi-IN': '🇮🇳',
  'ja-JP': '🇯🇵',
  'zh-CN': '🇨🇳',
  'ko-KR': '🇰🇷',
  'fr-FR': '🇫🇷',
  'de-DE': '🇩🇪',
  'es-ES': '🇪🇸',
  'it-IT': '🇮🇹',
  'pt-PT': '🇵🇹',
  'pt-BR': '🇧🇷',
  'ar-SA': '🇸🇦',
  'ru-RU': '🇷🇺',
  'th-TH': '🇹🇭',
  'vi-VN': '🇻🇳',
  'id-ID': '🇮🇩',
  'ms-MY': '🇲🇾',
  'si-LK': '🇱🇰',
  'ta-IN': '🇮🇳'
};

function getAvailableVoices() {
  return window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
}

function chooseVoice(voices) {
  const lang = i18n.currentLang;
  const exact = voices.find(v => v.lang.toLowerCase().startsWith(lang.toLowerCase()));
  if (exact) return exact;
  return voices.find(v => v.default) || voices[0] || null;
}

function updateAudioSectionName() {
  const title = $('audioSectionName');
  if (!title) return;
  const section = audioState.sections[audioState.currentIndex];
  title.textContent = section ? `${section.title}` : i18n.t('audio.ready', 'Ready to read');
}

function updateAudioProgressBar() {
  const progress = $('audioProgress');
  const bar = $('audioProgress');
  const wrapper = progress?.parentElement;
  const total = audioState.sections.length;
  const value = total ? Math.round((audioState.currentIndex / total) * 100) : 0;
  if (wrapper) wrapper.setAttribute('aria-valuenow', String(value));
  if (progress) progress.style.width = `${value}%`;
  $('audioElapsed').textContent = `${audioState.currentIndex + 1}/${total}`;
  $('audioRemaining').textContent = total ? `${total - audioState.currentIndex - 1} left` : '0 left';
}

function getSectionText(value) {
  return value ? ` ${value.replace(/\s+/g, ' ').trim()}` : '';
}

function buildAudioSections() {
  const sections = [];
  const country = window.__rs_country;
  const push = (title, text) => {
    if (!text || !String(text).trim()) return;
    sections.push({ title, text: String(text).replace(/\s+/g, ' ').trim() });
  };

  push(i18n.t('audio.section.intro', 'Travel safety overview'), i18n.t('hero.subtitle', 'Pick your destination and get offline guides, laws, embassy contacts, and alerts instantly. ⚡'));

  if (country) {
    push(i18n.t('audio.section.destination', 'Selected destination'), country.name);
    push(i18n.t('audio.section.laws', 'Local laws summary'), `${$('lawsTransport').textContent || ''} ${$('lawsHealth').textContent || ''} ${$('lawsTerms').textContent || ''}`);
    push(i18n.t('audio.section.embassy', 'Embassy contacts'), `${$('embassyName').textContent || ''}. ${$('embassyPhone').textContent || ''}. ${$('embassyAddress').textContent || ''}. ${$('embassyNotes').textContent || ''}`);
    push(i18n.t('audio.section.emergencyContacts', 'Emergency contact numbers'), `Police ${$('emergencyPolice').textContent || ''}. Fire ${$('emergencyFire').textContent || ''}. Ambulance ${$('emergencyAmbulance').textContent || ''}. Tourist police ${$('emergencyTourist').textContent || ''}.`);
    const alerts = Array.from(document.querySelectorAll('#alertsList > div')).map(el => el.textContent).join(' ');
    push(i18n.t('audio.section.alerts', 'Important alerts'), alerts);
    push(i18n.t('audio.section.tips', 'Travel tips'), $('wifiTips')?.textContent || '');
  } else {
    push(i18n.t('audio.section.empty', 'No country selected'), i18n.t('country.selectPrompt', 'Select a country to load its offline law guide.'));
  }

  return sections;
}

function stopSpeech() {
  if (!audioState.supported) return;
  window.speechSynthesis.cancel();
  audioState.utterance = null;
  audioState.isPaused = false;
  audioState.currentIndex = 0;
  updateAudioSectionName();
  updateAudioProgressBar();
}

function pauseSpeech() {
  if (!audioState.supported) return;
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.pause();
    audioState.isPaused = true;
    setAudioStatus(i18n.t('audio.paused', 'Paused')); 
  }
}

function resumeSpeech() {
  if (!audioState.supported) return;
  if (window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
    audioState.isPaused = false;
    setAudioStatus(i18n.t('audio.playing', 'Playing')); 
  }
}

function setAudioStatus(value) {
  const status = $('audioSectionName');
  if (status) status.textContent = value;
}

function speakCurrentSection() {
  if (!audioState.supported) {
    setAudioStatus('Speech synthesis unavailable');
    return;
  }

  const sections = buildAudioSections();
  if (!sections.length) {
    setAudioStatus(i18n.t('audio.nothing', 'Nothing to read yet. Select a destination or open a section.'));
    return;
  }

  audioState.sections = sections;
  audioState.mode = $('audioModeSelect')?.value || 'section';
  audioState.currentIndex = Math.min(audioState.currentIndex, sections.length - 1);

  const item = sections[audioState.currentIndex];
  if (!item) return;

  stopSpeech();
  const utterance = new SpeechSynthesisUtterance(`${item.title}. ${item.text}`);
  utterance.lang = audioState.voiceUnavailable ? 'en-US' : audioState.language || 'en-US';
  utterance.rate = audioState.rate;
  utterance.volume = audioState.muted ? 0 : audioState.volume;
  utterance.voice = audioState.voice || chooseVoice(getAvailableVoices()) || null;

  utterance.onend = () => {
    audioState.utterance = null;
    audioState.isPaused = false;
    if (audioState.repeating) {
      speakCurrentSection();
      return;
    }
    if (audioState.currentIndex < audioState.sections.length - 1) {
      audioState.currentIndex += 1;
      speakCurrentSection();
      return;
    }
    setAudioStatus(i18n.t('audio.finished', 'Audio finished.'));
  };

  audioState.utterance = utterance;
  window.speechSynthesis.speak(utterance);
  updateAudioSectionName();
  updateAudioProgressBar();
  setAudioStatus(`${i18n.t('audio.playing', 'Playing')}: ${item.title}`);
}

function nextAudioSection() {
  if (!audioState.sections.length) return;
  audioState.currentIndex = Math.min(audioState.currentIndex + 1, audioState.sections.length - 1);
  speakCurrentSection();
}

function prevAudioSection() {
  if (!audioState.sections.length) return;
  audioState.currentIndex = Math.max(audioState.currentIndex - 1, 0);
  speakCurrentSection();
}

function toggleRepeatAudio() {
  audioState.repeating = !audioState.repeating;
  const btn = $('audioRepeatBtn');
  if (btn) btn.textContent = audioState.repeating ? '🔁 On' : '🔁';
}

function initAudioUI() {
  const player = $('audioPlayer');
  if (!player) return;
  if (!audioState.supported) {
    setAudioStatus(i18n.t('audio.unavailable', 'Audio unavailable in this browser.'));
  }

  const audioLanguageSelect = $('audioLanguageSelect');
  const audioGenderSelect = $('audioGenderSelect');
  const voiceSelect = $('audioVoiceSelect');
  const modeSelect = $('audioModeSelect');
  const speedSelect = $('audioSpeedSelect');
  const volumeRange = $('audioVolumeRange');
  const muteBtn = $('audioMuteBtn');
  const playBtn = $('audioPlayBtn');
  const pauseBtn = $('audioPauseBtn');
  const stopBtn = $('audioStopBtn');
  const prevBtn = $('audioPrevBtn');
  const nextBtn = $('audioNextBtn');
  const repeatBtn = $('audioRepeatBtn');
  const closeBtn = $('audioCloseBtn');
  const searchBtn = $('audioSearchBtn');

  const loadVoices = () => {
    const voices = getAvailableVoices();
    if (!voiceSelect) return;
    voiceSelect.innerHTML = '';
    voices.forEach(v => {
      const opt = document.createElement('option');
      opt.value = v.name;
      opt.textContent = `${v.name} (${v.lang})`;
      opt.selected = audioState.voice && audioState.voice.name === v.name;
      voiceSelect.appendChild(opt);
    });
    const selected = chooseVoice(voices);
    audioState.voice = selected;
    if (selected && voiceSelect) {
      voiceSelect.value = selected.name;
    }
    updateSelectedVoiceLabel();
  };

  loadVoices();
  window.speechSynthesis?.addEventListener('voiceschanged', loadVoices);

  updateAudioPreferencesFromStorage();

  populateAudioLanguageOptions(window.__rs_country?.code);
  if (audioGenderSelect) {
    audioGenderSelect.value = audioState.gender;
  }

  if (audioLanguageSelect) {
    audioLanguageSelect.addEventListener('change', () => {
      audioState.language = audioLanguageSelect.value;
      localStorage.setItem(LS_KEYS.audioLanguage, JSON.stringify({ code: audioState.language }));
      updateAudioVoiceOptions();
      updateSelectedVoiceLabel();
      if (audioState.utterance) {
        stopSpeech();
        speakCurrentSection();
      }
    });
  }

  if (audioGenderSelect) {
    audioGenderSelect.addEventListener('change', () => {
      audioState.gender = audioGenderSelect.value;
      localStorage.setItem(LS_KEYS.audioGender, audioState.gender);
      updateAudioVoiceOptions();
      if (audioState.utterance) {
        stopSpeech();
        speakCurrentSection();
      }
    });
  }

  if (voiceSelect) voiceSelect.addEventListener('change', () => {
    const voices = getAvailableVoices();
    audioState.voice = voices.find(v => v.name === voiceSelect.value) || chooseVoice(voices);
    localStorage.setItem(LS_KEYS.audioVoice, JSON.stringify({ name: audioState.voice?.name, lang: audioState.voice?.lang }));
    updateSelectedVoiceLabel();
  });

  if (playBtn) playBtn.addEventListener('click', () => {
    if (audioState.isPaused) {
      resumeSpeech();
      return;
    }
    speakCurrentSection();
  });
  if (pauseBtn) pauseBtn.addEventListener('click', pauseSpeech);
  if (stopBtn) stopBtn.addEventListener('click', () => {
    stopSpeech();
    setAudioStatus(i18n.t('audio.stopped', 'Stopped'));
  });
  if (prevBtn) prevBtn.addEventListener('click', prevAudioSection);
  if (nextBtn) nextBtn.addEventListener('click', nextAudioSection);
  if (repeatBtn) repeatBtn.addEventListener('click', toggleRepeatAudio);
  if (closeBtn) closeBtn.addEventListener('click', () => setHidden(player, true));
  if (modeSelect) modeSelect.addEventListener('change', () => {
    audioState.mode = modeSelect.value;
    audioState.currentIndex = 0;
    updateAudioSectionName();
    updateAudioProgressBar();
  });
  if (speedSelect) {
    speedSelect.value = String(audioState.rate);
    speedSelect.addEventListener('change', () => {
      audioState.rate = Number(speedSelect.value) || 1;
      localStorage.setItem(LS_KEYS.audioRate, String(audioState.rate));
    });
  }
  if (volumeRange) {
    volumeRange.value = String(audioState.volume);
    volumeRange.addEventListener('input', () => {
      audioState.volume = Number(volumeRange.value) || 1;
      localStorage.setItem(LS_KEYS.audioVolume, String(audioState.volume));
    });
  }
  if (muteBtn) muteBtn.addEventListener('click', () => {
    audioState.muted = !audioState.muted;
    muteBtn.textContent = audioState.muted ? '🔇' : '🔊';
  });
  if (searchBtn) searchBtn.addEventListener('click', () => {
    const query = ($('audioSearchInput').value || '').trim().toLowerCase();
    const sections = buildAudioSections();
    if (!query) {
      audioState.sections = sections;
      audioState.currentIndex = 0;
      return;
    }
    const matches = sections.filter(s => `${s.title} ${s.text}`.toLowerCase().includes(query));
    if (!matches.length) {
      setAudioStatus(i18n.t('audio.noSearchResults', 'No matching audio sections found.'));
      return;
    }
    audioState.sections = matches;
    audioState.currentIndex = 0;
    setAudioStatus(i18n.t('audio.searchReady', 'Search ready — press play.'));
    updateAudioSectionName();
    updateAudioProgressBar();
  });

  setHidden(player, false);
  updateAudioProgressBar();
}

async function main() {
  await i18n.init();
  initLanguageSelector();
  initLogin();
  initAudioOpenButton();

  const countriesData = await loadCountries();
  const countries = countriesData.countries || [];

  initCountrySelect(countries);
  initAlertsRefresh(countries);
  initAudioUI();
  initCreatorSection();

  // Currency
  initCurrencyUI();

  // SOS
  initSOS();

  // Trips / quiz / forum / lost
  initTripUI();
  renderTrips();
  initQuizUI();
  renderQuiz();
  initForumUI();
  renderForum();
  initLostUI();
  renderLost();

  initTools(countries);

  // Conversion rate UI: load defaults after country selection change
  const sel = $('countrySelect');
  if (sel) {
    sel.addEventListener('change', async () => {
      await refreshRatesIfNeeded();
      // just keep current selectors; conversion uses cached rates
    });
  }
}

function initAudioOpenButton() {
  const openBtn = $('audioOpenBtn');
  const player = $('audioPlayer');
  if (!openBtn || !player) return;
  openBtn.addEventListener('click', () => {
    setHidden(player, false);
    setAudioStatus(i18n.t('audio.ready', 'Ready to read'));
    updateAudioProgressBar();
  });
}

function initCreatorSection() {
  const teamCards = ['creator', 'idea'];
  const socialLinks = {
    creator: {
      email: 'mailto:manishy0129@gmail.com',
      github: 'https://github.com/manishy0129',
      linkedin: 'https://www.linkedin.com/in/manish-yadav0129/'
    },
    idea: {
      email: 'mailto:sonuyadav2030s@gmail.com',
      instagram: 'https://www.instagram.com/ritik_m00/',
      linkedin: ''
    }
  };

  const storageKey = (id) => id === 'creator' ? LS_KEYS.creatorPhoto : LS_KEYS.ideaPhoto;

  const DEFAULT_PHOTOS = {
    creator: 'assets/images/creator-placeholder.png',
    idea: 'assets/images/idea-placeholder.png'
  };

  const CUSTOM_PHOTOS = {
    creator: 'assets/images/manish.jpg',
    idea: 'assets/images/ritik.jpg'
  };

  const loadSavedImage = (id) => {
    const data = localStorage.getItem(storageKey(id));
    return data ? data : null;
  };

  const testImageExists = (url) => new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });

  const updateCardState = (id, dataUrl) => {
    const avatar = $(`${id}Avatar`);
    const image = avatar?.querySelector('.team-avatar__image');
    const removeButton = document.querySelector(`.team-remove-button[data-team-id="${id}"]`);
    const uploadButton = document.querySelector(`.team-upload-button[data-team-id="${id}"]`);
    const textLabel = avatar?.closest('.team-card__media')?.querySelector('.team-avatar__text');

    if (!avatar || !image) return;

    const source = dataUrl || DEFAULT_PHOTOS[id];
    const isDefault = source === DEFAULT_PHOTOS[id];

    image.src = source;
    image.classList.remove('hidden');
    image.classList.add('visible');

    if (removeButton) {
      removeButton.classList.toggle('hidden', isDefault);
    }

    if (uploadButton) {
      uploadButton.textContent = isDefault ? 'Upload Photo' : 'Replace Photo';
    }

    if (textLabel) {
      textLabel.textContent = isDefault ? (id === 'creator' ? 'Upload Creator Photo' : 'Upload Idea Creator Photo') : 'Photo uploaded';
    }
  };

  const saveImage = (id, dataUrl) => {
    if (dataUrl) {
      localStorage.setItem(storageKey(id), dataUrl);
    } else {
      localStorage.removeItem(storageKey(id));
    }
  };

  const handleFile = (id, file) => {
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      saveImage(id, dataUrl);
      updateCardState(id, dataUrl);
    };
    reader.readAsDataURL(file);
  };

  teamCards.forEach(id => {
    const avatar = $(`${id}Avatar`);
    const fileInput = $(`${id}PhotoInput`);
    const uploadButton = document.querySelector(`.team-upload-button[data-team-id="${id}"]`);
    const removeButton = document.querySelector(`.team-remove-button[data-team-id="${id}"]`);
    const savedImage = loadSavedImage(id);

    const initialSource = savedImage || DEFAULT_PHOTOS[id];
    updateCardState(id, initialSource);

    if (!savedImage) {
      testImageExists(CUSTOM_PHOTOS[id]).then((exists) => {
        if (exists && !loadSavedImage(id)) {
          updateCardState(id, CUSTOM_PHOTOS[id]);
        }
      });
    }

    if (avatar) {
      avatar.addEventListener('click', () => fileInput?.click());
      avatar.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          fileInput?.click();
        }
      });
    }

    if (fileInput) {
      fileInput.addEventListener('change', () => {
        const file = fileInput.files && fileInput.files[0];
        handleFile(id, file);
      });
    }

    if (avatar) {
      avatar.addEventListener('dragover', (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
      });
      avatar.addEventListener('drop', (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files && event.dataTransfer.files[0];
        handleFile(id, file);
      });
    }

    if (uploadButton) {
      uploadButton.addEventListener('click', () => fileInput?.click());
    }

    if (removeButton) {
      removeButton.addEventListener('click', () => {
        saveImage(id, null);
        updateCardState(id, null);
      });
    }

    const links = socialLinks[id] || {};
    document.querySelectorAll(`.team-card[data-team-id="${id}"] .team-link`).forEach(link => {
      const platform = link.dataset.platform;
      const url = links[platform] || '';
      if (!url) {
        link.hidden = true;
      } else {
        link.href = url;
        link.hidden = false;
        if (url.startsWith('mailto:')) {
          link.removeAttribute('target');
          link.removeAttribute('rel');
        } else {
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
        }
      }
    });
  });
}

// Avoid errors if element ids differ
function rsMarkJsLoaded() {
  try {
    const el = document.getElementById('jsLoaded');
    if (el) el.textContent = 'JS loaded ✅';
  } catch {}
}

window.addEventListener('load', () => rsMarkJsLoaded());

try {
  rsMarkJsLoaded();
} catch {}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main);
} else {
  main();
}


