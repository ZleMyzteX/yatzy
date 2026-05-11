import { TRANSLATIONS, LANG_IDS, type LangId, type Translations } from './translations';

const STORAGE_KEY = 'salty-yatzy-lang';

function detectLang(): LangId {
	const stored = localStorage.getItem(STORAGE_KEY) as LangId | null;
	if (stored && (LANG_IDS as readonly string[]).includes(stored)) return stored;
	const browser = navigator.language.split('-')[0];
	if ((LANG_IDS as readonly string[]).includes(browser)) return browser as LangId;
	return 'en';
}

let lang = $state<LangId>('en');
let initialized = false;

export function initI18n() {
	if (initialized) return;
	initialized = true;
	lang = detectLang();
}

export function getLang(): LangId {
	return lang;
}

export function setLang(newLang: LangId) {
	lang = newLang;
	localStorage.setItem(STORAGE_KEY, newLang);
}

export function t(key: keyof Translations, params?: Record<string, string | number>): string {
	const dict = TRANSLATIONS[lang] ?? TRANSLATIONS['en'];
	const str = dict[key] ?? TRANSLATIONS['en'][key] ?? key;
	if (!params) return str;
	return str.replace(/\{(\w+)\}/g, (_, k) => String(params[k] ?? `{${k}}`));
}
