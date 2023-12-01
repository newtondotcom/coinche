<script lang="ts">
    import Modal from "$lib/ui/Modal.svelte";
    import Subtitle from "$lib/ui/Subtitle.svelte";

    let showModalCreate = false
    const handleToggleModalCreate = () => {
        showModalCreate = !showModalCreate
    }
    let showModalJoin = false
    const handleToggleModalJoin = () => {
        showModalJoin = !showModalJoin
    }
</script>

<div class="h-full flex flex-col align-middle gap-4  w-full">
    <Subtitle title="Coinche moi la" subtitle="beaucoup" />
    <div class="sm:flex sm:gap-4 flex-row align-middle justify-center items-center gap-4  w-full">
        <button
        class="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
        on:click={() => handleToggleModalCreate()}
        >
        Créer une partie
        </button>
        <button
        class="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block"
        on:click={() => handleToggleModalJoin()}
        >
        Rejoindre une partie
        </button>
    </div>
</div>

<Modal
  title="Edit your details"
  open={showModalCreate}
  on:close={() => handleToggleModalCreate()}
>
  <svelte:fragment slot="body">
    This is content inside my modal! 👋
  </svelte:fragment>
</Modal>

<Modal
  title="Edit your details"
  open={showModalJoin}
  on:close={() => handleToggleModalJoin()}
>
  <svelte:fragment slot="body">
    This is content inside my modal! 👋
  </svelte:fragment>
</Modal>