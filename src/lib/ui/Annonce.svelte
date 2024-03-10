<script lang="ts">
import Modal from "$lib/ui/Modal.svelte";
export let annonceOuverte = false;
let toogle = () => {
    annonceOuverte = !annonceOuverte;
};
let loading = false;
let annonces = [80,90,100,110,120,130,140,150]
let suites = ['♠️','♥️','♦️','♣️']

let joinParty = () => {
    loading = true;
    setTimeout(() => {
        loading = false;
        toogle();
    }, 2000);
};

</script>

<Modal
  title="Annonce moi ca comme un roi 👋"
  open={annonceOuverte}
  on:close={toogle}
>
  <svelte:fragment slot="body">
    <div class="flex flex-row align-middle justify-center">
        <div class="grid grid-cols-4 gap-4">
                {#each annonces as annonce}
                    <div
                    class="w-full h-full rounded-md border-gray-500 px-5 py-2.5 shadow-sm sm:text-sm place-content-center items-center text-black"
                    >
                    {annonce}
                    </div>
                {/each}
        </div>
        <div class="grid-cols-4 gap-4">
            {#each suites as annonce}
                <div
                class="w-full rounded-md border-gray-500 px-5 py-2.5 shadow-sm sm:text-sm place-content-center items-center text-black"
                >
                {annonce}
                </div>
            {/each}
    </div>


    <div class="flex flex-col">
        <div >Annonce actuelle : 100 coeur</div>
        <button
        class="flex rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow text-center"
        on:click={() => joinParty()}
        >
        Passer
        </button>
        <button
        class="flex rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow text-center"
        on:click={() => joinParty()}
        >
        Coincher
        </button>
    </div>
  </div>
  </svelte:fragment>
</Modal>