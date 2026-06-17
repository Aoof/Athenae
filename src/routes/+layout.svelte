<script lang="ts">
	import "./layout.css";
	import favicon from "$lib/assets/favicon.svg";
    import { initI18n } from "$lib/i18n";

	import * as NavMenu from "$lib/components/ui/navigation-menu/index.js";

    initI18n();

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<NavMenu.Root class="flex align-middle">
</NavMenu.Root>

{@render children()}
