<script lang="ts">
    import Card from "$lib/cards/Card.svelte";
    export let hand : IPlayCard[];
</script>

<div class="flex flex-row justify-center items-center h-screen w-screen">
    {#each hand as card}
        <Card suite={card.suite} value={card.value} />
    {/each}
</div>
