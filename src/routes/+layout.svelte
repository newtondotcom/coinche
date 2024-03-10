<script>
    import TopRight from "$lib/ui/TopRight.svelte";
    import "../app.css";
    import Score from "$lib/ui/Score.svelte";
  </script>
  
  <header class="bg-white z-10">
    <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-18 items-center justify-between">
        <div class="md:flex md:items-center md:gap-12 mr-8">
          <a class="block text-teal-600 text-sm" href="/">
              Coinche
          </a>
        </div>
  
        <Score />

        <div class="flex items-center gap-4">
          <TopRight />
  
          <div class="block md:hidden">
            <button
              class="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>

  <div class="bg-slate-200">
  <slot />
  </div>