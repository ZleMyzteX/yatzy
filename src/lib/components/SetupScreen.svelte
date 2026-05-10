<script lang="ts">
  import { startGame } from "$lib/store.svelte";
  import { VARIANTS } from "$lib/categories";
  import type { VariantId } from "$lib/types";

  type NavigateFn = (
    view: "home" | "setup" | "scorecard" | "gameover",
    gameId?: string,
  ) => void;
  let { onNavigate }: { onNavigate: NavigateFn } = $props();

  let variant = $state<VariantId>("scandinavian");
  let players = $state<string[]>(["", ""]);

  function addPlayer() {
    players = [...players, ""];
  }

  function removePlayer(index: number) {
    players = players.filter((_, i) => i !== index);
  }

  function handleStart() {
    const validPlayers = players
      .map((p) => p.trim())
      .filter((p) => p.length > 0);
    if (validPlayers.length === 0) {
      alert("Add at least one player");
      return;
    }
    if (new Set(validPlayers).size !== validPlayers.length) {
      alert("Player names must be unique");
      return;
    }
    const game = startGame(variant, validPlayers);
    onNavigate("scorecard", game.id);
  }
</script>

<div class="flex items-center gap-2 mb-6">
  <button
    class="text-blue-600 font-semibold text-sm"
    onclick={() => onNavigate("home")}>← Back</button
  >
  <h1 class="text-xl font-bold flex-1">New Game</h1>
</div>

<!-- Variant selector -->
<div class="mb-5">
  <span class="block font-semibold text-sm mb-2">Variant</span>
  <div class="flex gap-2">
    {#each Object.entries(VARIANTS) as [key, v]}
      <button
        class="flex-1 rounded-lg border-2 py-3 px-3 text-sm font-semibold transition-colors {variant ===
        key
          ? 'border-blue-600 bg-blue-50 text-blue-600'
          : 'border-gray-200 bg-white text-gray-700'}"
        onclick={() => (variant = key as VariantId)}
      >
        {v.label}
      </button>
    {/each}
  </div>
</div>

<!-- Players -->
<div class="mb-5">
  <span class="block font-semibold text-sm mb-2">Players</span>
  <div class="flex flex-col gap-2 mb-2">
    {#each players as _, i}
      <div class="flex gap-2 items-center">
        <input
          type="text"
          class="flex-1 border-2 border-gray-200 rounded-md px-3 py-2.5 text-base focus:border-blue-600 focus:outline-none"
          placeholder="Player {i + 1}"
          maxlength="20"
          bind:value={players[i]}
        />
        {#if players.length > 1}
          <button
            class="text-red-500 hover:text-red-700 bg-red-50 rounded px-2.5 py-2 text-sm font-semibold"
            onclick={() => removePlayer(i)}
          >
            ✕
          </button>
        {/if}
      </div>
    {/each}
  </div>
  <button
    class="text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md px-4 py-2 transition-colors"
    onclick={addPlayer}
  >
    + Add Player
  </button>
</div>

<button
  class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-3.5 text-lg transition-colors mt-4"
  onclick={handleStart}
>
  Start Game
</button>
