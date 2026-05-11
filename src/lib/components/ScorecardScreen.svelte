<script lang="ts">
  import { getGame } from "$lib/store.svelte";
  import { VARIANTS } from "$lib/categories";
  import {
    getUpperCategories,
    getLowerCategories,
    getUpperTotal,
    getBonus,
    getGrandTotal,
  } from "$lib/game";
  import type { Category } from "$lib/types";
  import ScoreInput from "./ScoreInput.svelte";
  import { t } from "$lib/i18n.svelte";

  type NavigateFn = (
    view: "home" | "setup" | "scorecard" | "gameover",
    gameId?: string,
  ) => void;
  let { gameId, onNavigate }: { gameId: string; onNavigate: NavigateFn } =
    $props();

  let editTarget = $state<{ player: string; category: Category } | null>(null);

  let game = $derived(getGame(gameId));
  let variant = $derived(game ? VARIANTS[game.variant] : null);
  let upperCats = $derived(game ? getUpperCategories(game) : []);
  let lowerCats = $derived(game ? getLowerCategories(game) : []);
  let suggestedPlayer = $derived(
    game ? game.players[game.suggestedPlayerIndex] : "",
  );

  function openInput(player: string, category: Category) {
    editTarget = { player, category };
  }

  function closeInput() {
    editTarget = null;
  }

  $effect(() => {
    if (game?.status === "completed") {
      onNavigate("gameover", gameId);
    }
  });
</script>

{#if game && variant}
  <!-- Header -->
  <div class="flex items-center gap-2 mb-4">
    <button
      class="text-blue-600 font-semibold text-sm"
      onclick={() => onNavigate("home")}>{t("home")}</button
    >
    <h1 class="text-lg font-bold flex-1">{variant.label}</h1>
  </div>

  <!-- Suggested player -->
  <div
    class="bg-purple-50 border border-purple-200 rounded-md px-3 py-2 mb-3 text-sm text-center"
  >
    {t("suggested", { name: suggestedPlayer })}
  </div>

  <!-- Scorecard table -->
  <div class="overflow-x-auto -mx-4 px-4">
    <table class="w-full border-collapse text-sm min-w-[300px]">
      <thead>
        <tr>
          <th
            class="text-left text-xs text-gray-500 font-semibold py-2 px-1.5 sticky left-0 bg-gray-50 z-10"
            >{t("category")}</th
          >
          {#each game.players as player}
            <th
              class="text-center font-bold text-sm py-2 px-2 min-w-16
								{player === suggestedPlayer ? 'text-blue-600 border-b-2 border-blue-600' : ''}"
            >
              {player}
            </th>
          {/each}
        </tr>
      </thead>
      <tbody>
        <!-- Upper section label -->
        <tr>
          <td
            colspan={game.players.length + 1}
            class="text-xs font-bold text-gray-400 uppercase tracking-wide pt-3 pb-1 px-1.5"
          >
            {t("upperSection")}
          </td>
        </tr>

        {#each upperCats as cat}
          <tr>
            <td
              class="text-left font-medium py-1.5 px-1.5 sticky left-0 bg-white z-[1] whitespace-nowrap"
              >{cat.label}</td
            >
            {#each game.players as player}
              {@const val = game.scores[player]?.[cat.id]}
              {@const filled = val != null}
              <td
                class="text-center py-1.5 px-2 border-b border-gray-100 {player ===
                suggestedPlayer
                  ? 'bg-purple-50/50'
                  : ''}"
              >
                <button
                  class="w-full rounded py-1 font-semibold transition-colors
										{filled
                    ? val === 0
                      ? 'text-red-500 italic bg-red-50/50'
                      : 'text-gray-900'
                    : 'text-gray-300 hover:bg-gray-100'}"
                  onclick={() => openInput(player, cat)}
                >
                  {filled ? val : "·"}
                </button>
              </td>
            {/each}
          </tr>
        {/each}

        <!-- Upper subtotal -->
        <tr class="bg-gray-50/80">
          <td class="font-bold py-2 px-1.5 sticky left-0 bg-gray-50/80 z-[1]"
            >{t("upperTotal")}</td
          >
          {#each game.players as player}
            <td
              class="text-center font-bold py-2 px-2 {player === suggestedPlayer
                ? 'bg-purple-50/50'
                : ''}"
            >
              {getUpperTotal(game, player)}
            </td>
          {/each}
        </tr>

        <!-- Bonus -->
        <tr class="bg-gray-50/80">
          <td class="font-bold py-2 px-1.5 sticky left-0 bg-gray-50/80 z-[1]">
            {t("bonus")}
            <span class="font-normal text-xs text-gray-400"
              >{t("bonusHint", {
                threshold: variant.bonusThreshold,
                value: variant.bonusValue,
              })}</span
            >
          </td>
          {#each game.players as player}
            {@const bonus = getBonus(game, player)}
            <td
              class="text-center font-bold py-2 px-2
								{bonus > 0 ? 'text-emerald-600 font-extrabold' : ''}
								{player === suggestedPlayer ? 'bg-purple-50/50' : ''}"
            >
              {bonus}
            </td>
          {/each}
        </tr>

        <!-- Lower section label -->
        <tr>
          <td
            colspan={game.players.length + 1}
            class="text-xs font-bold text-gray-400 uppercase tracking-wide pt-3 pb-1 px-1.5"
          >
            {t("lowerSection")}
          </td>
        </tr>

        {#each lowerCats as cat}
          <tr>
            <td
              class="text-left font-medium py-1.5 px-1.5 sticky left-0 bg-white z-[1] whitespace-nowrap"
              >{cat.label}</td
            >
            {#each game.players as player}
              {@const val = game.scores[player]?.[cat.id]}
              {@const filled = val != null}
              <td
                class="text-center py-1.5 px-2 border-b border-gray-100 {player ===
                suggestedPlayer
                  ? 'bg-purple-50/50'
                  : ''}"
              >
                <button
                  class="w-full rounded py-1 font-semibold transition-colors
										{filled
                    ? val === 0
                      ? 'text-red-500 italic bg-red-50/50'
                      : 'text-gray-900'
                    : 'text-gray-300 hover:bg-gray-100'}"
                  onclick={() => openInput(player, cat)}
                >
                  {filled ? val : "·"}
                </button>
              </td>
            {/each}
          </tr>
        {/each}

        <!-- Grand total -->
        <tr class="bg-blue-50">
          <td
            class="font-bold text-base py-2.5 px-1.5 sticky left-0 bg-blue-50 z-[1]"
            >{t("grandTotal")}</td
          >
          {#each game.players as player}
            <td
              class="text-center font-bold text-base text-blue-600 py-2.5 px-2"
            >
              {getGrandTotal(game, player)}
            </td>
          {/each}
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Score input modal -->
  {#if editTarget}
    <ScoreInput
      {gameId}
      player={editTarget.player}
      category={editTarget.category}
      currentValue={game.scores[editTarget.player]?.[editTarget.category.id]}
      onClose={closeInput}
    />
  {/if}
{/if}
