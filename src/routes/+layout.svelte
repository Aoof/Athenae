<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

    import * as NavMenu from "$lib/components/ui/navigation-menu/index.js";

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<NavMenu.Root class="flex align-middle">
</NavMenu.Root>

{@render children()}
