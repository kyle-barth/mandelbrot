<script lang="ts">
	import { resolutions } from '$lib/helpers/resolutions';
	import { mandelResolutions } from '$lib/helpers/mandelresolutions';
	import { mandelRes } from '$lib/model/mandleres.store';

	export let renderInProgress: boolean;
	export let selectedCanvasRes: number;
	export let reset: () => {};
</script>

<div class={renderInProgress ? 'config-panel z-50 cursor-wait' : 'config-panel z-50'}>
	<h1 class="space-y">Render Options:</h1>

	<h1 class="space-y">Canvas Resolution:</h1>
	<div class="space-y flex flex-col">
		{#each resolutions as _res, i}
			<div>
				<input
					type="radio"
					name="resolution"
					bind:group={selectedCanvasRes}
					value={i}
					disabled={renderInProgress}
				/>
				<label for="Resolution">{_res.name}</label>
			</div>
		{/each}
	</div>

	<h1>Mandelbrot Resolution:</h1>
	<h2 class="space-y text-sm">(the number of iterations)</h2>
	<div class="space-y flex flex-col">
		{#each mandelResolutions as _res, i}
			<div>
				<input
					type="radio"
					name="mandelbrot resolution"
					bind:group={$mandelRes}
					value={i}
					disabled={renderInProgress}
				/>
				<label for="Resolution">{_res}</label>
			</div>
		{/each}
	</div>

	<hr class="pb-4" />
	<div class="w-full flex justify-center">
		<button class="button" on:click={reset} disabled={renderInProgress}>Reset</button>
	</div>
</div>

<style lang="postcss">
	.config-panel {
		@apply flex flex-col fixed bg-gray-900 bg-opacity-90 top-0 left-0 text-gray-50 px-4 py-4 border-b-2 border-r-2 border-gray-700 rounded-br-xl;
	}
	.button {
		@apply transition transition-all;
		@apply cursor-pointer rounded-xl shadow-xl border-2 border-orange-800 px-2 py-1;
		@apply bg-orange-600 hover:bg-orange-600;
		@apply disabled:cursor-wait disabled:bg-gray-500 disabled:text-gray-300 disabled:border-gray-600;
	}
	.space-y {
		@apply pb-3;
	}
</style>
