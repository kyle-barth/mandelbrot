<script lang="ts">
	import { LoaderIcon } from 'svelte-feather-icons';
	import { fade } from 'svelte/transition';

	export let renderInProgress: boolean;
</script>

{#if renderInProgress}
	<div
		transition:fade
		class="bg-black absolute w-screen h-screen text-gray-50 flex flex-col justify-center items-center"
	>
		<LoaderIcon class="animate-spin mb-4" size="75" />
		<h1 class="font-extrabold text-3xl">Loading...</h1>
	</div>
{/if}
