<script lang="ts">
  import { getGames, deleteGame, clearAllGames } from "$lib/store.svelte";
  import { VARIANTS } from "$lib/categories";
  import { getWinner, getGrandTotal } from "$lib/game";
  import { t } from "$lib/i18n.svelte";
  import LanguagePicker from "./LanguagePicker.svelte";

  type NavigateFn = (
    view: "home" | "setup" | "scorecard" | "gameover",
    gameId?: string,
  ) => void;
  let { onNavigate }: { onNavigate: NavigateFn } = $props();

  let games = $derived(getGames());
</script>

<div class="flex items-center gap-2 mb-6">
  <h1 class="text-2xl font-bold flex-1">🎲 Salty Yatzy</h1>
  <LanguagePicker />
</div>

<button
  class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-3.5 text-lg transition-colors"
  onclick={() => onNavigate("setup")}
>
  {t("newGame")}
</button>

{#if games.length === 0}
  <p class="text-center text-gray-400 py-10">{t("noGamesYet")}</p>
{:else}
  <div class="flex items-center justify-between mt-8 mb-3">
    <h2 class="text-sm font-semibold text-gray-500">{t("gameHistory")}</h2>
    <button
      class="text-xs font-semibold text-red-500 hover:text-red-700 px-2 py-1"
      onclick={() => {
        if (confirm(t("confirmClearAll"))) clearAllGames();
      }}
    >
      {t("clearAll")}
    </button>
  </div>

  {#each games as game (game.id)}
    {@const variant = VARIANTS[game.variant]}
    {@const date = new Date(game.createdAt).toLocaleDateString()}
    {@const isCompleted = game.status === "completed"}
    <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
    <div
      class="w-full text-left bg-white border border-gray-200 rounded-lg p-3.5 mb-2.5 flex justify-between items-center shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onclick={() =>
        onNavigate(isCompleted ? "gameover" : "scorecard", game.id)}
      role="button"
      tabindex="0"
    >
      <div class="flex flex-col gap-0.5 min-w-0">
        <span class="font-semibold text-sm">{variant.label}</span>
        <span class="text-xs text-gray-500 truncate"
          >{game.players.join(", ")}</span
        >
        <span
          class="text-xs font-semibold"
          class:text-emerald-600={isCompleted}
          class:text-blue-600={!isCompleted}
        >
          {isCompleted
            ? t("winner", {
                name: getWinner(game),
                score: getGrandTotal(game, getWinner(game)),
              })
            : t("inProgress")}
        </span>
      </div>
      <div class="flex flex-col items-end gap-1.5 shrink-0 ml-3">
        <span class="text-xs text-gray-400">{date}</span>
        <button
          class="text-xs font-semibold text-red-500 hover:text-red-700 bg-red-50 rounded px-2 py-1"
          onclick={(e) => {
            e.stopPropagation();
            if (confirm(t("confirmDeleteGame"))) deleteGame(game.id);
          }}
        >
          ✕
        </button>
      </div>
    </div>
  {/each}
{/if}
