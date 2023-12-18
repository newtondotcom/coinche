<script lang="ts">
    export let hand : IPlayCard[];
    import {orderCards} from "$lib/utils/deck";

    let ordreAtout: boolean;
    let ordreValeur: boolean;

    const handleToggleValeur = () => {
        ordreValeur = !ordreValeur
        hand = orderCards(hand, ordreValeur, ordreAtout)
    }
    const handleToggleAtout = () => {
        ordreAtout = !ordreAtout
        hand = orderCards(hand, ordreValeur, ordreAtout)
    }
</script>

<div id="main" class="flex flex-row justify-center align-middle items-center">
    <div>Trier par : </div>
    <button 
    class="flex flex-row bg-teal-400 mx-3 px-2 py-3 rounded-lg"
    on:click={handleToggleValeur}
    >
        Valeur
        {#if ordreValeur}   
        <svg class="ml-2" viewBox="0 0 24 24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.5 5L18.5 3V10M16.5 10H20.5M20.5 18L18 21M7 3V21M7 3L11 7M7 3L3 7M21 16.5C21 17.8807 19.8807 19 18.5 19C17.1193 19 16 17.8807 16 16.5C16 15.1193 17.1193 14 18.5 14C19.8807 14 21 15.1193 21 16.5Z" stroke="#1a1a1a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        {:else}
        <svg class="ml-2" viewBox="0 0 24 24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.5 16L18.5 14V21M16.5 21H20.5M20.5 7L18 10M7 21V3M7 3L3 7M7 3L11 7M21 5.5C21 6.88071 19.8807 8 18.5 8C17.1193 8 16 6.88071 16 5.5C16 4.11929 17.1193 3 18.5 3C19.8807 3 21 4.11929 21 5.5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        {/if}
    </button>
    <button 
    class="flex flex-row bg-teal-400 mx-3 px-2 py-3 rounded-lg"
    on:click={handleToggleAtout}
    >
        Tri
        {#if ordreAtout}
        <svg class="ml-2" viewBox="0 0 20 20" height="24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="0" fill="none" width="20" height="20"></rect> <g> <path d="M10 2c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm-.615 12.66h-1.34l-3.24-4.54 1.34-1.25 2.57 2.4 5.14-5.93 1.34.94-5.81 8.38z"></path> </g> </g></svg>
        {:else}
        <svg  class="ml-2"fill="#000000" height="24" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M213.333 960c0-167.36 56-321.707 149.44-446.4L1406.4 1557.227c-124.693 93.44-279.04 149.44-446.4 149.44-411.627 0-746.667-335.04-746.667-746.667m1493.334 0c0 167.36-56 321.707-149.44 446.4L513.6 362.773c124.693-93.44 279.04-149.44 446.4-149.44 411.627 0 746.667 335.04 746.667 746.667M960 0C429.76 0 0 429.76 0 960s429.76 960 960 960 960-429.76 960-960S1490.24 0 960 0" fill-rule="evenodd"></path> </g></svg>
        {/if}
    </button>
</div>

<style>
#main {
    position: absolute;
    top: 75%; 
    left: 50%;
    transform: translate(-50%, -50%); 
}

</style>