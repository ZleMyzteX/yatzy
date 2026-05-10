import type { Game } from './types';

const STORAGE_KEY = 'salty-yatzy-games';

export function loadGames(): Game[] {
	if (typeof localStorage === 'undefined') return [];
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
}

export function saveGames(games: Game[]): void {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(games));
}
