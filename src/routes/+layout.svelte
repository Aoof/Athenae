<script lang="ts">
	import './layout.css';
	import { initI18n } from '$lib/i18n';

	initI18n();

	let { children } = $props();
</script>

{@render children()}
