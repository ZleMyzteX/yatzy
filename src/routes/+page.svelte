<script lang="ts">
	import { onMount } from 'svelte';
	import { initStore } from '$lib/store.svelte';
	import HomeScreen from '$lib/components/HomeScreen.svelte';
	import SetupScreen from '$lib/components/SetupScreen.svelte';
	import ScorecardScreen from '$lib/components/ScorecardScreen.svelte';
	import GameOverScreen from '$lib/components/GameOverScreen.svelte';

	type View = 'home' | 'setup' | 'scorecard' | 'gameover';

	let view = $state<View>('home');
	let activeGameId = $state<string>('');

	function navigate(newView: View, gameId?: string) {
		view = newView;
		if (gameId !== undefined) activeGameId = gameId;
	}

	onMount(() => {
		initStore();
	});
</script>

{#if view === 'home'}
	<HomeScreen onNavigate={navigate} />
{:else if view === 'setup'}
	<SetupScreen onNavigate={navigate} />
{:else if view === 'scorecard'}
	<ScorecardScreen gameId={activeGameId} onNavigate={navigate} />
{:else if view === 'gameover'}
	<GameOverScreen gameId={activeGameId} onNavigate={navigate} />
{/if}
