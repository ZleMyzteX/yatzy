<script lang="ts">
  import { getGame } from "$lib/store.svelte";
  import { VARIANTS } from "$lib/categories";
  import {
    getUpperCategories,
    getLowerCategories,
    getUpperTotal,
    getBonus,
    getGrandTotal,
    getWinner,
  } from "$lib/game";
  import { t } from "$lib/i18n.svelte";

  type NavigateFn = (
    view: "home" | "setup" | "scorecard" | "gameover",
    gameId?: string,
  ) => void;
  let { gameId, onNavigate }: { gameId: string; onNavigate: NavigateFn } =
    $props();

  let game = $derived(getGame(gameId));
  let variant = $derived(game ? VARIANTS[game.variant] : null);
  let winner = $derived(game ? getWinner(game) : "");
  let winnerScore = $derived(game ? getGrandTotal(game, winner) : 0);
  let upperCats = $derived(game ? getUpperCategories(game) : []);
  let lowerCats = $derived(game ? getLowerCategories(game) : []);
</script>

{#if game && variant}
  <div class="flex items-center gap-2 mb-4">
    <button
      class="text-blue-600 font-semibold text-sm"
      onclick={() => onNavigate("home")}>{t("home")}</button
    >
    <h1 class="text-xl font-bold flex-1">{t("gameOver")}</h1>
  </div>

  <!-- Winner banner -->
  <div
    class="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-lg p-4 text-center text-lg mb-4 flex items-center justify-center gap-2"
  >
    <span class="text-2xl">🏆</span>
    <span>{t("winsWithPoints", { name: winner, score: winnerScore })}</span>
  </div>

  <!-- Final scorecard -->
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
              class="text-center font-bold text-sm py-2 px-2 min-w-16 {player ===
              winner
                ? 'text-amber-700'
                : ''}"
            >
              {player}
            </th>
          {/each}
        </tr>
      </thead>
      <tbody>
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
              <td
                class="text-center py-1.5 px-2 border-b border-gray-100 font-semibold
								{player === winner ? 'bg-yellow-50/50' : ''}
								{val === 0 ? 'text-red-500 italic' : ''}"
              >
                {val ?? ""}
              </td>
            {/each}
          </tr>
        {/each}
        <tr class="bg-gray-50/80">
          <td class="font-bold py-2 px-1.5 sticky left-0 bg-gray-50/80 z-[1]"
            >{t("upperTotal")}</td
          >
          {#each game.players as player}
            <td
              class="text-center font-bold py-2 px-2 {player === winner
                ? 'bg-yellow-50/50'
                : ''}"
            >
              {getUpperTotal(game, player)}
            </td>
          {/each}
        </tr>
        <tr class="bg-gray-50/80">
          <td class="font-bold py-2 px-1.5 sticky left-0 bg-gray-50/80 z-[1]"
            >{t("bonus")}
            <span class="font-normal text-xs text-gray-400"
              >{t("bonusHint", {
                threshold: variant.bonusThreshold,
                value: variant.bonusValue,
              })}</span
            ></td
          >
          {#each game.players as player}
            {@const bonus = getBonus(game, player)}
            <td
              class="text-center font-bold py-2 px-2 {bonus > 0
                ? 'text-emerald-600 font-extrabold'
                : ''} {player === winner ? 'bg-yellow-50/50' : ''}"
            >
              {bonus}
            </td>
          {/each}
        </tr>

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
              <td
                class="text-center py-1.5 px-2 border-b border-gray-100 font-semibold
								{player === winner ? 'bg-yellow-50/50' : ''}
								{val === 0 ? 'text-red-500 italic' : ''}"
              >
                {val ?? ""}
              </td>
            {/each}
          </tr>
        {/each}

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

  <div class="flex flex-col gap-2.5 mt-6">
    <button
      class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-3.5 text-lg transition-colors"
      onclick={() => onNavigate("setup")}
    >
      {t("newGame")}
    </button>
    <button
      class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg py-3 transition-colors"
      onclick={() => onNavigate("home")}
    >
      {t("home")}
    </button>
  </div>
{/if}
