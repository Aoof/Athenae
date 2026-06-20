<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { userStore } from '$lib/stores/user';
	import { isLocale } from '$lib/stores/locale';

	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import Logo from '$lib/assets/athenae_logo.png';

	$effect(() => {
		const lp = page.params.locale;
		if (lp && isLocale(lp)) userStore.setLanguage(lp);
	});

	onMount(() => {
		const lp = page.params.locale;
		if (lp && isLocale(lp)) userStore.setLanguage(lp);
	});

	let { children } = $props();
</script>

<svelte:head>
	<meta
		name="description"
		content="Athenae Initiative — Free public events fighting anti-intellectualism. Événements publics gratuits contre l'anti-intellectualisme."
	/>
	<meta property="og:site_name" content="Athenae Initiative" />
	<meta property="og:image" content={Logo} />
</svelte:head>

<Nav />

<main id="main-content" tabindex="-1">
	{@render children()}
</main>

<Footer />
