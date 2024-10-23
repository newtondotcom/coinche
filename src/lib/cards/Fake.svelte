<script lang="ts">
	import { maxCardWidth } from '$lib/constants';
	import { Badge } from "$lib/components/ui/badge/index.js";
  
	export let side: "left" | "right" | "top";
	export let qqty: number;
  </script>
  
  <div
	class="{side === 'left' ? 'flex flex-row absolute -left-0 h-full justify-center items-center' : side === 'right' ? 'flex flex-row absolute -right-0 h-full justify-center items-center' : 'flex flex-col absolute top-0 justify-center w-full shrink'}"
  >
  <img
	src="/dos.webp"
	alt="dos"
	style="max-width:{maxCardWidth + 20}px; height: auto; transform: translateY({side === 'left' ? -side * 20 : side === 'right' ? -side * 20 : side === 'top' ? -0 : 0}px) translateX({side === 'top' ? -side * 20 : 0}px);z-index:1;"
	class="{side === 'top' ? '-rotate-90 self-center' : ''} pointer-events-none"
  />
  <Badge class="mx-auto">{qqty}</Badge>
  </div>
  