<script lang="ts">
  import type { Category } from "$lib/types";
  import { recordScore, removeScore } from "$lib/store.svelte";
  import { t } from "$lib/i18n.svelte";

  let {
    gameId,
    player,
    category,
    currentValue,
    onClose,
  }: {
    gameId: string;
    player: string;
    category: Category;
    currentValue: number | undefined;
    onClose: () => void;
  } = $props();

  let rangeInput = $state(currentValue != null ? String(currentValue) : "");
  let rangeError = $state(false);
  // Note: rangeInput intentionally captures initial currentValue — the modal is ephemeral.

  function select(value: number) {
    recordScore(gameId, player, category.id, value);
    onClose();
  }

  function confirmRange() {
    const val = parseInt(rangeInput, 10);
    if (category.type !== "range") return;
    if (isNaN(val) || val < category.min || val > category.max) {
      rangeError = true;
      return;
    }
    select(val);
  }

  function handleClear() {
    removeScore(gameId, player, category.id);
    onClose();
  }

  function handleOverlayClick(e: MouseEvent) {
    if (e.target === e.currentTarget) onClose();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Escape") onClose();
  }

  /** Generate stepped values: [0, step, 2*step, ..., max] */
  function steppedValues(min: number, max: number, step: number): number[] {
    const values: number[] = [];
    for (let v = min; v <= max; v += step) values.push(v);
    return values;
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
<div
  class="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center animate-fade-in"
  onclick={handleOverlayClick}
>
  <div
    class="bg-white rounded-t-2xl sm:rounded-xl p-5 w-full max-w-md max-h-[70dvh] overflow-y-auto shadow-2xl animate-slide-up sm:animate-none"
  >
    <!-- Header -->
    <div
      class="flex justify-between items-center pb-3 mb-4 border-b border-gray-200"
    >
      <span class="font-bold text-lg">{player}</span>
      <span class="text-gray-500 text-sm">{category.label}</span>
    </div>

    <!-- Value buttons -->
    <div class="flex flex-wrap gap-2 justify-center">
      {#if category.type === "stepped"}
        {#each steppedValues(category.min, category.max, category.step) as v}
          <button
            class="min-w-14 min-h-12 rounded-lg border-2 text-lg font-bold transition-colors
							{currentValue === v ? 'border-blue-600 bg-blue-50 text-blue-600' : ''}
							{v === 0
              ? 'text-red-500 border-red-200 hover:border-red-400'
              : 'border-gray-200 hover:border-gray-400'}"
            onclick={() => select(v)}
          >
            {v}
          </button>
        {/each}
      {:else if category.type === "fixed"}
        {#each category.values as v}
          <button
            class="flex-1 min-h-14 rounded-lg border-2 text-xl font-bold transition-colors
							{currentValue === v ? 'border-blue-600 bg-blue-50 text-blue-600' : ''}
							{v === 0
              ? 'text-red-500 border-red-200 hover:border-red-400'
              : 'border-gray-200 hover:border-gray-400'}"
            onclick={() => select(v)}
          >
            {v}
          </button>
        {/each}
      {:else if category.type === "range"}
        <div class="flex gap-2 w-full">
          <input
            type="number"
            class="flex-1 text-center text-xl font-bold border-2 rounded-lg px-3 py-3 focus:border-blue-600 focus:outline-none
							{rangeError ? 'border-red-500' : 'border-gray-200'}"
            min={category.min}
            max={category.max}
            inputmode="numeric"
            placeholder="{category.min}–{category.max}"
            bind:value={rangeInput}
            oninput={() => (rangeError = false)}
            onkeydown={(e) => e.key === "Enter" && confirmRange()}
          />
          <button
            class="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-5 py-3 transition-colors"
            onclick={confirmRange}
          >
            OK
          </button>
        </div>
        {#if category.min === 0}
          <button
            class="min-w-14 min-h-12 rounded-lg border-2 text-lg font-bold text-red-500 border-red-200 hover:border-red-400 transition-colors
							{currentValue === 0 ? 'border-red-500 bg-red-50' : ''}"
            onclick={() => select(0)}
          >
            0
          </button>
        {/if}
      {/if}
    </div>

    <!-- Clear button -->
    {#if currentValue != null}
      <button
        class="w-full mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg py-2.5 transition-colors"
        onclick={handleClear}
      >
        {t("clearScore")}
      </button>
    {/if}
  </div>
</div>

<style>
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes slide-up {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
  .animate-fade-in {
    animation: fade-in 0.15s ease-out;
  }
  .animate-slide-up {
    animation: slide-up 0.2s ease-out;
  }
</style>
