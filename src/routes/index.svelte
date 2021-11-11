<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	import LoadingSpinner from '$lib/components/loadingspinner.svelte';
	import ConfigPanel from '$lib/components/configpanel.svelte';

	import { resolutions } from '$lib/helpers/resolutions';
	import { mandelResolutions } from '$lib/helpers/mandelresolutions';
	import { mandelRes } from '$lib/model/mandleres.store';

	let componentMounted: boolean = false;
	let renderInProgress: boolean = false;
	let selectedCanvasRes: number = 0;

	let canvasEl: HTMLCanvasElement;

	onMount(() => {
		componentMounted = true;
	});
	$: if (componentMounted && resolutions[selectedCanvasRes] && mandelResolutions[$mandelRes])
		paintmandelbrot();

	function paintmandelbrot() {
		const canvas = canvasEl.getContext('2d');
		const imgData: ImageData = canvas.getImageData(
			0,
			0,
			resolutions[selectedCanvasRes].w,
			resolutions[selectedCanvasRes].h
		);

		// send mandelbrot processing to be handled by worker thread
		let worker = new Worker('worker.js');
		renderInProgress = true;
		worker.postMessage({ imgData, mandelRes: mandelResolutions[$mandelRes] });
		worker.addEventListener('message', (d) => {
			canvas.putImageData(d.data, 0, 0);
			renderInProgress = false;
			worker.terminate();
		});
	}

	function reset() {
		selectedCanvasRes = 0;
		mandelRes.set(0);
		paintmandelbrot();
	}
</script>

<ConfigPanel {renderInProgress} bind:selectedCanvasRes {reset} />

<LoadingSpinner {renderInProgress} />

<canvas
	transition:fade
	bind:this={canvasEl}
	class="w-screen h-screen"
	width={resolutions[selectedCanvasRes].w}
	height={resolutions[selectedCanvasRes].h}
/>
