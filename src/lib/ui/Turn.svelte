<script lang="ts">

	export let side: "left" | "right" | "top" | "down";
</script>

<div class="p-2 rounded-3xl bg-slate-300 w-12 h-12 absolute bottom-4 left-4">
    <svg class="w-8 h-8 
    {side === 'top' ? '-rotate-90' : ''} 
    {side === 'left' ? 'rotate-180' : ''}
    {side === 'right' ? 'rotate-0' : ''}
    {side === 'down' ? 'rotate-90' : ''}
    {side === 'down' ? 'text-green-700' : ''}
    {side !== 'down' ? 'text-red-400' : ''}
    pointer-events-none"
     version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path class="st0" d="M64.281,225.656H9.031c-4.984,0-9.031,4.047-9.031,9.031v173.219c0,4.984,4.047,9.031,9.031,9.031h55.25 c5,0,9.047-4.047,9.047-9.031V234.688C73.328,229.703,69.281,225.656,64.281,225.656z"></path> <path class="st0" d="M469.719,195.422H369.297h-24.453h-77.813c-5.891,0-11.422-2.875-14.813-7.703 c-3.375-4.828-4.188-11-2.172-16.547l20.625-56.719c2.016-5.531,1.203-11.703-2.172-16.531c-3.391-4.828-8.922-7.703-14.813-7.703 h-2.719c-18.031,0-34.906,8.969-44.984,23.938L110.516,243.25v132.297l85.281,32.688c5.188,1.594,11.563,3.188,16.609,3.984 l75.813,9.563c23.344,0,44.078-14.938,51.469-37.078l37.75-114.609c1.219-3.688,4.688-6.203,8.594-6.203h91.734 c27.031,0,34.234-15.328,34.234-34.234S488.625,195.422,469.719,195.422z"></path> </g> </g></svg>
</div>