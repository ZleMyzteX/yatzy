<script lang="ts">
  import { getLang, setLang } from "$lib/i18n.svelte";
  import { LANG_IDS, LANG_LABELS, type LangId } from "$lib/translations";
</script>

<select
  class="text-sm border border-gray-200 rounded-md px-2 py-1 bg-white text-gray-700 focus:outline-none focus:border-blue-500 cursor-pointer"
  value={getLang()}
  onchange={(e) =>
    setLang((e.currentTarget as HTMLSelectElement).value as LangId)}
>
  {#each LANG_IDS as id}
    <option value={id}>{LANG_LABELS[id]}</option>
  {/each}
</select>
