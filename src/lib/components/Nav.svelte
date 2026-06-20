<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { locale, type Locale } from '$lib/stores/locale';
	import { userStore } from '$lib/stores/user';
	import { cn } from '$lib/utils/cn';
	import { _ } from 'svelte-i18n';

	import Logo from '$lib/assets/athenae_logo.png';

	let menuOpen = $state(false);
	let scrolled = $state(false);

	const currentPath = $derived.by(() => {
		const segments = page.url.pathname.split('/').filter(Boolean);
		return segments.length > 1 ? '/' + segments.slice(1).join('/') : '/';
	});

	$effect(() => {
		const handleScroll = () => {
			scrolled = window.scrollY > 40;
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});

	function toggleLocale() {
		const next: Locale = $locale === 'en' ? 'fr' : 'en';
		userStore.setLanguage(next);
		const segments = page.url.pathname.split('/').filter(Boolean);
		const rest = segments.slice(1).join('/');
		window.location.href = `/${next}${rest ? '/' + rest : ''}`;
	}

	function linkHref(path: string) {
		return resolve(`/${$locale}${path === '/' ? '' : path}`);
	}

	function isActive(path: string) {
		return currentPath === path || (path !== '/' && currentPath.startsWith(path));
	}

	const navLinks = [
		{ key: 'nav.about', path: '/about' },
		{ key: 'nav.programs', path: '/programs' },
		{ key: 'nav.getInvolved', path: '/get-involved' },
		{ key: 'nav.news', path: '/news' },
		{ key: 'nav.contact', path: '/contact' }
	] as const;
</script>

<a
	href="#main-content"
	class="btn-bronze sr-only text-xs focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50"
>
	{$_('common.skip_to_content')}
</a>

<header
	class={cn(
		'fixed top-0 right-0 left-0 z-40 transition-all duration-500',
		scrolled ? 'border-b border-navy-700/30 bg-navy-900/95 backdrop-blur-sm' : 'bg-transparent'
	)}
>
	<nav
		class="section-container flex h-16 items-center justify-between lg:h-20"
		aria-label="Main navigation"
	>
		<!-- Logo / wordmark -->
		<a
			href={linkHref('/')}
			class="group flex items-center gap-3"
			aria-label="Athenae Initiative — Home"
		>
			<img
				src={Logo}
				alt="Athenae Initiative"
				class="h-9 w-9 object-contain opacity-90 brightness-0 invert transition-opacity group-hover:opacity-100"
			/>
			<span
				class="flex flex-col font-display text-lg font-black text-offwhite/90 transition-colors group-hover:text-offwhite"
			>
				<span class="leading-none tracking-widest">ATHENAE</span>
				<span class="text-md leading-none">INITIATIVE</span>
			</span>
		</a>

		<!-- Desktop nav -->
		<ul class="hidden items-center gap-8 lg:flex" role="list">
			{#each navLinks as link (link.key)}
				<li>
					<a
						href={linkHref(link.path)}
						class='nav-link'
                        class:nav-link-active={isActive(link.path)}
						aria-current={isActive(link.path) ? 'page' : undefined}
					>
						{$_(link.key)}
					</a>
				</li>
			{/each}
		</ul>

		<!-- Right actions -->
		<div class="flex items-center gap-4">
			<!-- Language toggle -->
			<button
				onclick={toggleLocale}
				class="nav-link hidden sm:block"
				aria-label="Switch language to {$_('common.language')}"
			>
				{$_('common.language')}
			</button>

			<!-- Donate CTA -->
			<a href={linkHref('/donate')} class="btn-bronze hidden px-4 py-2 text-xs sm:inline-flex">
				{$_('nav.donate')}
			</a>

			<!-- Mobile hamburger -->
			<button
				onclick={() => (menuOpen = !menuOpen)}
				class="relative -mr-2 flex h-8 w-8 items-center justify-center transition-all ease-in lg:hidden"
				class:-translate-y-1.5={menuOpen}
				aria-label={$_('common.open_menu')}
				aria-expanded={menuOpen}
				aria-controls="mobile-menu"
			>
				<span
					class="hamburger-line -translate-y-1.5"
					class:translate-y-1.5={menuOpen}
					class:rotate-45={menuOpen}
				></span>

				<span class="hamburger-line" class:opacity-0={menuOpen}></span>

				<span
					class="hamburger-line translate-y-1.5"
					class:-translate-y-1.5={menuOpen}
					class:-rotate-45={menuOpen}
				></span>
			</button>
		</div>
	</nav>

	<!-- Mobile menu -->
	{#if menuOpen}
		<div
			id="mobile-menu"
			class="border-t border-navy-700/30 bg-navy-900/98 backdrop-blur-sm lg:hidden"
			role="dialog"
			aria-label="Mobile navigation"
		>
			<ul class="section-container space-y-4 py-6" role="list">
				{#each navLinks as link (link.key)}
					<li>
						<a
							href={linkHref(link.path)}
							onclick={() => (menuOpen = false)}
							class='nav-link'
                            class:nav-link-active={isActive(link.path)}
						>
							{$_(link.key)}
						</a>
					</li>
				{/each}
				<li class="flex items-center justify-between pt-2">
					<button onclick={toggleLocale} class="nav-link">
						{$_('common.language')}
					</button>
					<a
						href={linkHref('/donate')}
						onclick={() => (menuOpen = false)}
						class="btn-bronze px-4 py-2 text-xs"
					>
						{$_('nav.donate')}
					</a>
				</li>
			</ul>
		</div>
	{/if}
</header>
