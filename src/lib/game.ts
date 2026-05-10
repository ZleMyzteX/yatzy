import { VARIANTS } from './categories';
import type { Game, VariantId } from './types';

export function getCategories(game: Game) {
	return VARIANTS[game.variant].categories;
}

export function getUpperCategories(game: Game) {
	return getCategories(game).filter((c) => c.section === 'upper');
}

export function getLowerCategories(game: Game) {
	return getCategories(game).filter((c) => c.section === 'lower');
}

export function getUpperTotal(game: Game, player: string): number {
	return getUpperCategories(game).reduce((sum, c) => sum + (game.scores[player]?.[c.id] ?? 0), 0);
}

export function getBonus(game: Game, player: string): number {
	const v = VARIANTS[game.variant];
	return getUpperTotal(game, player) >= v.bonusThreshold ? v.bonusValue : 0;
}

export function getLowerTotal(game: Game, player: string): number {
	return getLowerCategories(game).reduce((sum, c) => sum + (game.scores[player]?.[c.id] ?? 0), 0);
}

export function getGrandTotal(game: Game, player: string): number {
	return getUpperTotal(game, player) + getBonus(game, player) + getLowerTotal(game, player);
}

export function isGameComplete(game: Game): boolean {
	const cats = getCategories(game);
	return game.players.every((p) => cats.every((c) => game.scores[p]?.[c.id] != null));
}

export function getWinner(game: Game): string {
	let best = -1;
	let winner = '';
	for (const p of game.players) {
		const t = getGrandTotal(game, p);
		if (t > best) {
			best = t;
			winner = p;
		}
	}
	return winner;
}

export function getFilledCount(game: Game, player: string): number {
	const cats = getCategories(game);
	return cats.filter((c) => game.scores[player]?.[c.id] != null).length;
}

/** Find the player with the fewest filled categories (starting after current). */
function findSuggestedPlayer(game: Game): number {
	const cats = getCategories(game);
	const total = cats.length;
	let bestIdx = game.suggestedPlayerIndex;
	let fewestFilled = total + 1;

	for (let i = 0; i < game.players.length; i++) {
		const idx = (game.suggestedPlayerIndex + 1 + i) % game.players.length;
		const filled = cats.filter((c) => game.scores[game.players[idx]]?.[c.id] != null).length;
		if (filled < fewestFilled) {
			fewestFilled = filled;
			bestIdx = idx;
		}
	}
	return bestIdx;
}

export function createGame(variant: VariantId, players: string[]): Game {
	const scores: Game['scores'] = {};
	for (const p of players) scores[p] = {};

	return {
		id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
		variant,
		players,
		scores,
		suggestedPlayerIndex: 0,
		status: 'in-progress',
		createdAt: new Date().toISOString(),
		completedAt: null
	};
}

export function setScore(game: Game, player: string, categoryId: string, value: number): void {
	if (!game.scores[player]) game.scores[player] = {};
	game.scores[player][categoryId] = value;
	game.suggestedPlayerIndex = findSuggestedPlayer(game);

	if (isGameComplete(game)) {
		game.status = 'completed';
		game.completedAt = new Date().toISOString();
	}
}

export function clearScore(game: Game, player: string, categoryId: string): void {
	if (game.scores[player]) {
		delete game.scores[player][categoryId];
	}
}
