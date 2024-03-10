<script lang="ts">
    import Card from "$lib/cards/card.svelte";
    export let river : IPlayCard[];
</script>

<div class="flex flex-row justify-center items-center h-screen w-screen pb-[150px]">
    {#each river as card}
        <Card suite={card.suite} value={card.value} />
    {/each}
</div>
