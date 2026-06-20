<script lang="ts">
	import { resolve } from '$app/paths';
	import { locale } from '$lib/stores/locale';
	import { _ } from 'svelte-i18n';

	function linkHref(path: string) {
		return resolve(`/${$locale}${path}`);
	}

	const orgLinks = [
		{ key: 'nav.about', path: '/about' },
		{ key: 'news.all_posts', path: '/news' },
		{ key: 'contact.eyebrow', path: '/contact' }
	] as const;

	const participateLinks = [
		{ key: 'nav.programs', path: '/programs' },
		{ key: 'nav.getInvolved', path: '/get-involved' },
		{ key: 'nav.donate', path: '/donate' }
	] as const;

	const legalLinks = [
		{ key: 'footer.privacy', path: '/legal/privacy' },
		{ key: 'footer.terms', path: '/legal/terms' }
	] as const;
</script>

<footer class="border-t border-navy-700/30 bg-navy-950">
	<!-- Main footer -->
	<div class="section-container py-16">
		<div class="grid grid-cols-1 gap-12 md:grid-cols-4">
			<!-- Brand column -->
			<div class="md:col-span-1">
				<p class="mb-4 font-display text-lg text-offwhite/70 italic">Athenae Initiative</p>
				<p class="text-body-muted text-xs">{$_('footer.tagline')}</p>
				<p class="text-muted-blue/50 mt-3 font-body text-xs">{$_('footer.charity')}</p>
			</div>

			<!-- Organization -->
			<div>
				<p class="text-eyebrow mb-5">{$_('footer.links_org')}</p>
				<ul class="space-y-3" role="list">
					{#each orgLinks as item (item.key)}
						<li>
							<a
								href={linkHref(item.path)}
								class="text-muted-blue font-body text-xs tracking-wide transition-colors hover:text-bronze-400"
							>
								{$_(item.key)}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Participate -->
			<div>
				<p class="text-eyebrow mb-5">{$_('footer.links_participate')}</p>
				<ul class="space-y-3" role="list">
					{#each participateLinks as item (item.key)}
						<li>
							<a
								href={linkHref(item.path)}
								class="text-muted-blue font-body text-xs tracking-wide transition-colors hover:text-bronze-400"
							>
								{$_(item.key)}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Legal -->
			<div>
				<p class="text-eyebrow mb-5">{$_('footer.links_legal')}</p>
				<ul class="space-y-3" role="list">
					{#each legalLinks as item (item.key)}
						<li>
							<a
								href={linkHref(item.path)}
								class="text-muted-blue font-body text-xs tracking-wide transition-colors hover:text-bronze-400"
							>
								{$_(item.key)}
							</a>
						</li>
					{/each}
				</ul>

				<!-- Email -->
				<div class="mt-6">
					<p class="text-eyebrow mb-2">Contact</p>
					<a
						href="mailto:example@athenae.ca"
						class="font-body text-xs text-bronze-400 transition-colors hover:text-bronze-300"
					>
						example@athenae.ca
					</a>
				</div>
			</div>
		</div>
	</div>

	<!-- Bottom bar -->
	<div class="border-t border-navy-700/20">
		<div
			class="section-container flex flex-col items-center justify-between gap-3 py-5 sm:flex-row"
		>
			<p class="text-muted-blue/40 font-body text-xs">{$_('footer.rights')}</p>
			<div class="divider-bronze-short opacity-30"></div>
		</div>
	</div>
</footer>
