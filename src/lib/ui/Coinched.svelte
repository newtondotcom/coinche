<script lang="ts">
import Modal from "$lib/ui/Modal.svelte";
export let getCoinched = false;
let toogle = () => {
    getCoinched = !getCoinched;
};

</script>

<Modal
  title="T'as été coinché !? ⚠️"
  open={getCoinched}
  on:close={toogle}
>
  <svelte:fragment slot="body">
    <div class="flex flex-row justify-center">
        <button
        class="flex rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow text-center mr-6"
        on:click={() => getCoinched = false}
        >
        Passer
        </button>
        <button
        class="flex rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow text-center"
        on:click={() => getCoinched = false}
        >
        Surcoincher
        </button>
    </div>
  </svelte:fragment>
</Modal>