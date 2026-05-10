import type { Category, Variant, VariantId } from './types';

const SCANDINAVIAN_CATEGORIES: Category[] = [
	// Upper section
	{ id: 'ones', label: 'Ones', section: 'upper', type: 'stepped', min: 0, max: 5, step: 1 },
	{ id: 'twos', label: 'Twos', section: 'upper', type: 'stepped', min: 0, max: 10, step: 2 },
	{ id: 'threes', label: 'Threes', section: 'upper', type: 'stepped', min: 0, max: 15, step: 3 },
	{ id: 'fours', label: 'Fours', section: 'upper', type: 'stepped', min: 0, max: 20, step: 4 },
	{ id: 'fives', label: 'Fives', section: 'upper', type: 'stepped', min: 0, max: 25, step: 5 },
	{ id: 'sixes', label: 'Sixes', section: 'upper', type: 'stepped', min: 0, max: 30, step: 6 },
	// Lower section
	{ id: 'one_pair', label: 'One Pair', section: 'lower', type: 'range', min: 0, max: 12 },
	{ id: 'two_pairs', label: 'Two Pairs', section: 'lower', type: 'range', min: 0, max: 22 },
	{ id: 'three_kind', label: 'Three of a Kind', section: 'lower', type: 'range', min: 0, max: 18 },
	{ id: 'four_kind', label: 'Four of a Kind', section: 'lower', type: 'range', min: 0, max: 24 },
	{ id: 'small_straight', label: 'Small Straight', section: 'lower', type: 'fixed', values: [0, 15] },
	{ id: 'large_straight', label: 'Large Straight', section: 'lower', type: 'fixed', values: [0, 20] },
	{ id: 'full_house', label: 'Full House', section: 'lower', type: 'range', min: 0, max: 28 },
	{ id: 'chance', label: 'Chance', section: 'lower', type: 'range', min: 5, max: 30 },
	{ id: 'yatzy', label: 'Yatzy', section: 'lower', type: 'fixed', values: [0, 50] }
];

const YAHTZEE_CATEGORIES: Category[] = [
	// Upper section
	{ id: 'ones', label: 'Aces', section: 'upper', type: 'stepped', min: 0, max: 5, step: 1 },
	{ id: 'twos', label: 'Twos', section: 'upper', type: 'stepped', min: 0, max: 10, step: 2 },
	{ id: 'threes', label: 'Threes', section: 'upper', type: 'stepped', min: 0, max: 15, step: 3 },
	{ id: 'fours', label: 'Fours', section: 'upper', type: 'stepped', min: 0, max: 20, step: 4 },
	{ id: 'fives', label: 'Fives', section: 'upper', type: 'stepped', min: 0, max: 25, step: 5 },
	{ id: 'sixes', label: 'Sixes', section: 'upper', type: 'stepped', min: 0, max: 30, step: 6 },
	// Lower section
	{ id: 'three_kind', label: 'Three of a Kind', section: 'lower', type: 'range', min: 0, max: 30 },
	{ id: 'four_kind', label: 'Four of a Kind', section: 'lower', type: 'range', min: 0, max: 30 },
	{ id: 'full_house', label: 'Full House', section: 'lower', type: 'fixed', values: [0, 25] },
	{ id: 'small_straight', label: 'Sm. Straight', section: 'lower', type: 'fixed', values: [0, 30] },
	{ id: 'large_straight', label: 'Lg. Straight', section: 'lower', type: 'fixed', values: [0, 40] },
	{ id: 'chance', label: 'Chance', section: 'lower', type: 'range', min: 5, max: 30 },
	{ id: 'yahtzee', label: 'Yahtzee', section: 'lower', type: 'fixed', values: [0, 50] }
];

export const VARIANTS: Record<VariantId, Variant> = {
	scandinavian: {
		label: 'Scandinavian Yatzy',
		categories: SCANDINAVIAN_CATEGORIES,
		bonusThreshold: 63,
		bonusValue: 50
	},
	yahtzee: {
		label: 'Yahtzee',
		categories: YAHTZEE_CATEGORIES,
		bonusThreshold: 63,
		bonusValue: 35
	}
};
