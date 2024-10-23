<script lang="ts">
    import Card from "$lib/cards/Card.svelte";
    export let hand : IPlayCard[];
</script>

<div class="flex flex-row absolute bottom-0 justify-center w-full">
{#each hand as card}
    <Card suite={card.suite} value={card.value} />
{/each}
</div>