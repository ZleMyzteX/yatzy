import { createGame, setScore, clearScore } from './game';
import { loadGames, saveGames } from './storage';
import type { Game, VariantId } from './types';

let games = $state<Game[]>([]);

export function initStore() {
	games = loadGames();
}

function persist() {
	saveGames(games);
}

export function getGames(): Game[] {
	return games;
}

export function getGame(id: string): Game | undefined {
	return games.find((g) => g.id === id);
}

export function startGame(variant: VariantId, players: string[]): Game {
	const game = createGame(variant, players);
	games.unshift(game);
	persist();
	return game;
}

export function recordScore(gameId: string, player: string, categoryId: string, value: number) {
	const game = getGame(gameId);
	if (!game) return;
	setScore(game, player, categoryId, value);
	persist();
}

export function removeScore(gameId: string, player: string, categoryId: string) {
	const game = getGame(gameId);
	if (!game) return;
	clearScore(game, player, categoryId);
	persist();
}

export function deleteGame(id: string) {
	games = games.filter((g) => g.id !== id);
	persist();
}

export function clearAllGames() {
	games = [];
	persist();
}
