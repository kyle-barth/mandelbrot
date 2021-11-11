<script>
	import { onMount } from 'svelte';
	import 'virtual:windi.css';

	onMount(() => {
		import('virtual:windi-devtools');
	});
</script>

<slot />
