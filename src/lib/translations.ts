export const LANG_IDS = ['en', 'nb', 'sv', 'de', 'fr'] as const;
export type LangId = (typeof LANG_IDS)[number];

export type Translations = {
	// Home screen
	newGame: string;
	noGamesYet: string;
	gameHistory: string;
	clearAll: string;
	confirmClearAll: string;
	confirmDeleteGame: string;
	winner: string; // params: {name, score}
	inProgress: string;
	// Setup screen
	back: string;
	variant: string;
	players: string;
	playerPlaceholder: string; // params: {n}
	addPlayer: string;
	startGame: string;
	alertMinOnePlayer: string;
	alertUniqueNames: string;
	// Scorecard / Game over shared
	home: string;
	suggested: string; // params: {name}
	upperSection: string;
	lowerSection: string;
	upperTotal: string;
	bonus: string;
	bonusHint: string; // params: {threshold, value}
	grandTotal: string;
	category: string;
	// Game over
	gameOver: string;
	winsWithPoints: string; // params: {name, score}
	// Score input
	clearScore: string;
	// Language picker
	language: string;
};

const en: Translations = {
	newGame: 'New Game',
	noGamesYet: 'No games yet. Start a new one!',
	gameHistory: 'Game History',
	clearAll: 'Clear All',
	confirmClearAll: 'Delete all game history?',
	confirmDeleteGame: 'Delete this game?',
	winner: 'Winner: {name} ({score})',
	inProgress: 'In progress',
	back: '← Back',
	variant: 'Variant',
	players: 'Players',
	playerPlaceholder: 'Player {n}',
	addPlayer: '+ Add Player',
	startGame: 'Start Game',
	alertMinOnePlayer: 'Add at least one player',
	alertUniqueNames: 'Player names must be unique',
	home: 'Home',
	suggested: 'Suggested: {name}',
	upperSection: 'Upper Section',
	lowerSection: 'Lower Section',
	upperTotal: 'Upper Total',
	bonus: 'Bonus',
	bonusHint: '(≥{threshold} → +{value})',
	grandTotal: 'Grand Total',
	category: 'Category',
	gameOver: 'Game Over!',
	winsWithPoints: '{name} wins with {score} points!',
	clearScore: 'Clear Score',
	language: 'Language'
};

const nb: Translations = {
	newGame: 'Nytt spill',
	noGamesYet: 'Ingen spill ennå. Start et nytt!',
	gameHistory: 'Spillhistorikk',
	clearAll: 'Slett alt',
	confirmClearAll: 'Slette all spillhistorikk?',
	confirmDeleteGame: 'Slette dette spillet?',
	winner: 'Vinner: {name} ({score})',
	inProgress: 'Pågår',
	back: '← Tilbake',
	variant: 'Variant',
	players: 'Spillere',
	playerPlaceholder: 'Spiller {n}',
	addPlayer: '+ Legg til spiller',
	startGame: 'Start spill',
	alertMinOnePlayer: 'Legg til minst én spiller',
	alertUniqueNames: 'Spillernavn må være unike',
	home: 'Hjem',
	suggested: 'Foreslått: {name}',
	upperSection: 'Øvre seksjon',
	lowerSection: 'Nedre seksjon',
	upperTotal: 'Øvre total',
	bonus: 'Bonus',
	bonusHint: '(≥{threshold} → +{value})',
	grandTotal: 'Totalsum',
	category: 'Kategori',
	gameOver: 'Spillet er over!',
	winsWithPoints: '{name} vinner med {score} poeng!',
	clearScore: 'Slett poeng',
	language: 'Språk'
};

const sv: Translations = {
	newGame: 'Nytt spel',
	noGamesYet: 'Inga spel än. Starta ett nytt!',
	gameHistory: 'Spelhistorik',
	clearAll: 'Rensa allt',
	confirmClearAll: 'Radera all spelhistorik?',
	confirmDeleteGame: 'Radera detta spel?',
	winner: 'Vinnare: {name} ({score})',
	inProgress: 'Pågår',
	back: '← Tillbaka',
	variant: 'Variant',
	players: 'Spelare',
	playerPlaceholder: 'Spelare {n}',
	addPlayer: '+ Lägg till spelare',
	startGame: 'Starta spel',
	alertMinOnePlayer: 'Lägg till minst en spelare',
	alertUniqueNames: 'Spelarnamn måste vara unika',
	home: 'Hem',
	suggested: 'Föreslagen: {name}',
	upperSection: 'Övre sektion',
	lowerSection: 'Nedre sektion',
	upperTotal: 'Övre totalt',
	bonus: 'Bonus',
	bonusHint: '(≥{threshold} → +{value})',
	grandTotal: 'Totalt',
	category: 'Kategori',
	gameOver: 'Spelet är slut!',
	winsWithPoints: '{name} vinner med {score} poäng!',
	clearScore: 'Rensa poäng',
	language: 'Språk'
};

const de: Translations = {
	newGame: 'Neues Spiel',
	noGamesYet: 'Noch keine Spiele. Starte ein neues!',
	gameHistory: 'Spielverlauf',
	clearAll: 'Alles löschen',
	confirmClearAll: 'Gesamten Spielverlauf löschen?',
	confirmDeleteGame: 'Dieses Spiel löschen?',
	winner: 'Gewinner: {name} ({score})',
	inProgress: 'Läuft',
	back: '← Zurück',
	variant: 'Variante',
	players: 'Spieler',
	playerPlaceholder: 'Spieler {n}',
	addPlayer: '+ Spieler hinzufügen',
	startGame: 'Spiel starten',
	alertMinOnePlayer: 'Mindestens einen Spieler hinzufügen',
	alertUniqueNames: 'Spielernamen müssen eindeutig sein',
	home: 'Start',
	suggested: 'Vorgeschlagen: {name}',
	upperSection: 'Oberer Abschnitt',
	lowerSection: 'Unterer Abschnitt',
	upperTotal: 'Obere Summe',
	bonus: 'Bonus',
	bonusHint: '(≥{threshold} → +{value})',
	grandTotal: 'Gesamtsumme',
	category: 'Kategorie',
	gameOver: 'Spiel vorbei!',
	winsWithPoints: '{name} gewinnt mit {score} Punkten!',
	clearScore: 'Punkte löschen',
	language: 'Sprache'
};

const fr: Translations = {
	newGame: 'Nouvelle partie',
	noGamesYet: 'Pas encore de parties. Commencez-en une !',
	gameHistory: 'Historique',
	clearAll: 'Tout effacer',
	confirmClearAll: "Effacer tout l'historique ?",
	confirmDeleteGame: 'Supprimer cette partie ?',
	winner: 'Gagnant : {name} ({score})',
	inProgress: 'En cours',
	back: '← Retour',
	variant: 'Variante',
	players: 'Joueurs',
	playerPlaceholder: 'Joueur {n}',
	addPlayer: '+ Ajouter un joueur',
	startGame: 'Démarrer',
	alertMinOnePlayer: 'Ajoutez au moins un joueur',
	alertUniqueNames: 'Les noms de joueurs doivent être uniques',
	home: 'Accueil',
	suggested: 'Suggéré : {name}',
	upperSection: 'Section supérieure',
	lowerSection: 'Section inférieure',
	upperTotal: 'Total supérieur',
	bonus: 'Bonus',
	bonusHint: '(≥{threshold} → +{value})',
	grandTotal: 'Total général',
	category: 'Catégorie',
	gameOver: 'Partie terminée !',
	winsWithPoints: '{name} gagne avec {score} points !',
	clearScore: 'Effacer le score',
	language: 'Langue'
};

export const TRANSLATIONS: Record<LangId, Translations> = { en, nb, sv, de, fr };

export const LANG_LABELS: Record<LangId, string> = {
	en: '🇬🇧 English',
	nb: '🇳🇴 Norsk',
	sv: '🇸🇪 Svenska',
	de: '🇩🇪 Deutsch',
	fr: '🇫🇷 Français'
};
