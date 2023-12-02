<script lang="ts">
    import Modal from "$lib/ui/Modal.svelte";
    import Subtitle from "$lib/ui/Subtitle.svelte";

    let showModalCreate = false
    const handleToggleModalCreate = () => {
        showModalCreate = !showModalCreate
    }
    let showModalJoin = true
    const handleToggleModalJoin = () => {
        showModalJoin = !showModalJoin
    }
    let copycode = false
    const handleToggleCopyCode = () => {
        copycode = !copycode
        setTimeout(() => {
            copycode = !copycode
        }, 1000)
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
  title="Voici le code de ta partie 👋"
  open={showModalCreate}
  on:close={() => handleToggleModalCreate()}
>
  <svelte:fragment slot="body">
    <div class="relative flex justify-center flex-box">    
      <div>
      <input
        type="email"
        id="UserEmail"
        placeholder="flea@rhcp.com"
        value="123456"
        class="w-full rounded-md border-gray-200 pe-10 shadow-sm sm:text-sm text-2xl text-center p-4"
        disabled
      />    
    <button
      class="absolute inset-y-0 end-0 grid w-10 place-content-center text-gray-500"
      on:click={() => handleToggleCopyCode()}
    >
    {#if !copycode}
    <svg class="w-5 h-5 ml-1.5 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" /></svg>   
    {:else}               
    <svg class="w-5 h-5 ml-1.5 text-green-500 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" x-cloak><path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" /></svg>
    {/if}
  </button>
    </div>
    

    </div>
  </svelte:fragment>
</Modal>

<Modal
  title="Entre le nom de la partie 👋"
  open={showModalJoin}
  on:close={() => handleToggleModalJoin()}
>
  <svelte:fragment slot="body">
    <div class="relative">
      <label for="UserEmail" class="sr-only"> Email </label>
    
      <input
        type="email"
        id="UserEmail"
        placeholder="flea@rhcp.com"
        class="w-full rounded-md border-gray-200 pe-10 shadow-sm sm:text-sm"
      />
    
      <span
        class="pointer-events-none absolute inset-y-0 end-0 grid w-10 place-content-center text-gray-500"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4">
          <path
            fill-rule="evenodd"
            d="M5.404 14.596A6.5 6.5 0 1116.5 10a1.25 1.25 0 01-2.5 0 4 4 0 10-.571 2.06A2.75 2.75 0 0018 10a8 8 0 10-2.343 5.657.75.75 0 00-1.06-1.06 6.5 6.5 0 01-9.193 0zM10 7.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"
            clip-rule="evenodd"
          />
        </svg>
      </span>
    </div>
  </svelte:fragment>
</Modal>