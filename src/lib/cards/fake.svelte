<script lang="ts">
	import { maxCardWidth } from '$lib/constants';
  
	export let side: "left" | "right" | "top";
	export let qqty: number;
  
	let tabGen = (qty: number) => {
	  let tab = [];
	  for (let i = 0; i < qty; i++) {
		tab.push(i);
	  }
	  return tab;
	}
  </script>
  
  <div
	class="{side === 'left' ? 'flex flex-col absolute -left-20 h-full justify-center items-center' : side === 'right' ? 'flex flex-col absolute -right-20 h-full justify-center items-center' : 'flex flex-row absolute top-20 justify-center w-full shrink'}"
  >
	{#each tabGen(qqty) as i}
	  <img
		src="/dos.webp"
		alt="dos"
		style="max-width:{maxCardWidth + 20}px; height: auto; transform: translateY({side === 'left' ? -i * 20 : side === 'right' ? -i * 20 : side === 'top' ? -20 : 0}px) translateX({side === 'top' ? -i * 20 : 0}px);z-index:1;"
		class="{side === 'top' ? '-rotate-90' : ''} pointer-events-none"
	  />
	{/each}
  </div>
  