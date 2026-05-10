<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<title>Salty Yatzy</title>
</svelte:head>

<div class="mx-auto max-w-xl min-h-dvh bg-gray-50 px-4 py-4 pb-20">
	{@render children()}
</div>
