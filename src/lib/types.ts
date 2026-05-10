// ---- Category constraint types ----

export type SteppedCategory = {
	id: string;
	label: string;
	section: 'upper' | 'lower';
	type: 'stepped';
	min: number;
	max: number;
	step: number;
};

export type FixedCategory = {
	id: string;
	label: string;
	section: 'upper' | 'lower';
	type: 'fixed';
	values: number[];
};

export type RangeCategory = {
	id: string;
	label: string;
	section: 'upper' | 'lower';
	type: 'range';
	min: number;
	max: number;
};

export type Category = SteppedCategory | FixedCategory | RangeCategory;

// ---- Variant ----

export type VariantId = 'scandinavian' | 'yahtzee';

export type Variant = {
	label: string;
	categories: Category[];
	bonusThreshold: number;
	bonusValue: number;
};

// ---- Game ----

export type Scores = Record<string, Record<string, number | undefined>>;

export type Game = {
	id: string;
	variant: VariantId;
	players: string[];
	scores: Scores;
	suggestedPlayerIndex: number;
	status: 'in-progress' | 'completed';
	createdAt: string;
	completedAt: string | null;
};
