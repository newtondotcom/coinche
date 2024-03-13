<script lang="ts">
	import { maxCardWidth } from '$lib/constants';
	import { spaceJoin } from '$lib/utils';
  
	// Define types CardSuite and CardValue if not already defined
  
	export let suite: CardSuite = 'hearts';
	export let value: CardValue = 'A';
	let classStr = '';
	export { classStr as class };
	let cardSvgPath: string;
	
	// Computed property to generate cardSvgPath
	$: {
	  const svgFolder = `/cards`;
	  cardSvgPath = `${svgFolder}/${value === '10' ? 'T' : value}${suite
		.charAt(0)
		.toUpperCase()}.svg`;
	}
  </script>
  
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  <div class={spaceJoin(['card', classStr])}>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<img
	  src={cardSvgPath}
	  alt={`${value} of ${suite} card.`}
	  style={`max-width:${maxCardWidth}px; height: auto;`}
	  class="hover:scale-125"
	  on:click={() => { console.log(`carte ${suite} ${value} cliquée`); }}
	/>
  </div>
  