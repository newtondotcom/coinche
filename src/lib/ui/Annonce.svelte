<script lang="ts">
import Modal from "$lib/ui/Modal.svelte";
let open = true;
let toogle = () => {
    open = !open;
};
let loading = false;
let annonces = [80,90,100,110,120,130,140,150]
let suites = ['♠️','♥️','♦️','♣️']
</script>

<Modal
  title="Annonce moi ca comme un roi 👋"
  open={open}
  on:close={toogle}
>
  <svelte:fragment slot="body">
    <div class="flex flex-row align-middle justify-center">
        <div class="flex grid grid-cols-4 gap-4">
                {#each annonces as annonce}
                    <div
                    class="w-full rounded-md border-gray-400 pe-10 px-5 py-2.5 shadow-sm sm:text-sm place-content-center text-black"
                    >
                    {annonce}
                    </div>
                {/each}
        </div>
        <div class="grid-cols-4 gap-4">
            {#each suites as annonce}
                <div
                class="w-full rounded-md border-gray-400 pe-10 px-5 py-2.5 shadow-sm sm:text-sm place-content-center text-black"
                >
                {annonce}
                </div>
            {/each}
    </div>


    <div>
        <button
        class="ml-8 rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow text-center"
        on:click={() => joinParty()}
        >
        {#if !loading}
        Rejoindre
        {:else}
        <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3.169 1.952 1.952 4.538 3.13 7.35 3.13V17z"></path></svg>
        {/if}

        </button>
    </div>
  </div>
  </svelte:fragment>
</Modal>