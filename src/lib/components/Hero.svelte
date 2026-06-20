<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { resolve } from '$app/paths';
	import { locale } from '$lib/stores/locale';
	import { scrollProgress } from '$lib/utils/animations';
	import { onMount } from 'svelte';

    import Logo from '$lib/assets/athenae_logo.png';

	let heroEl: HTMLElement;
	let scrollY = $state(0);
	let mounted = $state(false);

	// Rune-based scroll tracking
	$effect(() => {
		const onScroll = () => {
			scrollY = window.scrollY;
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	onMount(() => {
		// Stagger entrance
		setTimeout(() => {
			mounted = true;
		}, 80);
	});

	// Scroll-derived values for JS fallback (when CSS animation-timeline isn't available)
	const patternRotate = $derived(scrollY * 0.02);
	const patternScale = $derived(1 + scrollY * 0.0003);
	const patternOpacity = $derived(Math.max(0, 0.55 - scrollY * 0.002));
	const logoOffset = $derived(scrollY * 0.18);
	const textOffset = $derived(scrollY * 0.12);

	function linkHref(path: string) {
		return resolve(`/${$locale}${path}`);
	}
</script>

<section
	bind:this={heroEl}
	class="relative flex min-h-screen py-20 flex-col items-center justify-center overflow-hidden bg-navy-800"
	aria-label="Hero"
>
	<!-- ── Background noise texture ─────────────────── -->
	<div
		class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC43NSIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWx0ZXI9InVybCgjbikiIG9wYWNpdHk9IjEiLz48L3N2Zz4=')] opacity-[0.03]"
	></div>

	<!-- ── SVG Orbital Pattern ───────────────────────── -->
	<div
		class="hero-pattern-parallax pointer-events-none absolute inset-0 flex items-center justify-center"
		style="opacity: {patternOpacity}; transform: rotate({patternRotate}deg) scale({patternScale});"
		aria-hidden="true"
	>
		<svg
			viewBox="0 0 700 700"
			class="h-[min(90vw,700px)] w-[min(90vw,700px)]"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<defs>
				<style>
					.ring {
						stroke: #b87333;
						fill: none;
					}
					.ring-dim {
						stroke: #b87333;
						fill: none;
						opacity: 0.35;
					}
					.ring-faint {
						stroke: #d4a85c;
						fill: none;
						opacity: 0.18;
					}
					.dot {
						fill: #b87333;
					}
					.dot-dim {
						fill: #b87333;
						opacity: 0.4;
					}
					.tick {
						stroke: #b87333;
					}
					.tick-dim {
						stroke: #b87333;
						opacity: 0.3;
					}
				</style>
			</defs>

			<!-- Outermost faint ring -->
			<circle cx="350" cy="350" r="340" class="ring-faint" stroke-width="0.5" />

			<!-- Outer rotating ring with tick marks -->
			<g class="hero-pattern-ring" style="--duration:60s; --direction:normal;">
				<circle
					cx="350"
					cy="350"
					r="310"
					class="ring-dim"
					stroke-width="0.75"
					stroke-dasharray="4 8"
				/>
				<!-- 24 tick marks evenly spaced -->
				{#each Array(24) as __, i (i)}
					{@const angle = (i / 24) * Math.PI * 2}
					{@const x1 = 350 + Math.cos(angle) * 302}
					{@const y1 = 350 + Math.sin(angle) * 302}
					{@const x2 = 350 + Math.cos(angle) * 318}
					{@const y2 = 350 + Math.sin(angle) * 318}
					<line
						{x1}
						{y1}
						{x2}
						{y2}
						class={i % 6 === 0 ? 'tick' : 'tick-dim'}
						stroke-width={i % 6 === 0 ? '1.5' : '0.75'}
					/>
				{/each}
			</g>

			<!-- Second ring — counter-rotating, diamond markers -->
			<g class="hero-pattern-ring" style="--duration:45s; --direction:reverse;">
				<circle cx="350" cy="350" r="270" class="ring" stroke-width="0.5" />
				{#each Array(12) as __, i (i)}
					{@const angle = (i / 12) * Math.PI * 2}
					{@const cx = 350 + Math.cos(angle) * 270}
					{@const cy2 = 350 + Math.sin(angle) * 270}
					<!-- Diamond shape at each marker -->
					<polygon
						points="{cx},{cy2 - 5} {cx + 4},{cy2} {cx},{cy2 + 5} {cx - 4},{cy2}"
						class={i % 3 === 0 ? 'dot' : 'dot-dim'}
					/>
				{/each}
			</g>

			<!-- Inner ring with fine dashes -->
			<g class="hero-pattern-ring" style="--duration:80s; --direction:normal;">
				<circle
					cx="350"
					cy="350"
					r="220"
					class="ring-dim"
					stroke-width="0.5"
					stroke-dasharray="2 14"
				/>
			</g>

			<!-- Oval / ellipse echoing the logo containment -->
			<g class="hero-pattern-ring" style="--duration:50s; --direction:reverse;">
				<ellipse
					cx="350"
					cy="350"
					rx="180"
					ry="240"
					class="ring"
					stroke-width="0.75"
					stroke-dasharray="6 10"
					transform="rotate(15 350 350)"
				/>
			</g>

			<!-- Fine cross-hair lines -->
			<line
				x1="350"
				y1="30"
				x2="350"
				y2="670"
				class="ring-faint"
				stroke-width="0.3"
				stroke-dasharray="2 20"
			/>
			<line
				x1="30"
				y1="350"
				x2="670"
				y2="350"
				class="ring-faint"
				stroke-width="0.3"
				stroke-dasharray="2 20"
			/>
			<!-- Diagonals -->
			<line
				x1="110"
				y1="110"
				x2="590"
				y2="590"
				class="ring-faint"
				stroke-width="0.3"
				stroke-dasharray="1 18"
			/>
			<line
				x1="590"
				y1="110"
				x2="110"
				y2="590"
				class="ring-faint"
				stroke-width="0.3"
				stroke-dasharray="1 18"
			/>

			<!-- Center small ring -->
			<circle cx="350" cy="350" r="4" class="dot" />
			<circle cx="350" cy="350" r="10" class="ring" stroke-width="0.5" />
			<circle
				cx="350"
				cy="350"
				r="140"
				class="ring-faint"
				stroke-width="0.4"
				stroke-dasharray="3 6"
			/>

			<!-- Corner flourish arcs - top left -->
			<path d="M 40 180 Q 180 40 340 30" class="ring-faint" stroke-width="0.4" />
			<path d="M 40 220 Q 220 40 360 30" class="ring-faint" stroke-width="0.3" />
			<!-- Bottom right -->
			<path d="M 660 520 Q 520 660 360 670" class="ring-faint" stroke-width="0.4" />
			<path d="M 660 480 Q 480 660 340 670" class="ring-faint" stroke-width="0.3" />

			<!-- Pulsing dots layer -->
			<g class="hero-pattern-dots">
				{#each Array(8) as __, i (i)}
					{@const angle = (i / 8) * Math.PI * 2 + Math.PI / 8}
					{@const cx = 350 + Math.cos(angle) * 310}
					{@const cy2 = 350 + Math.sin(angle) * 310}
					<circle {cx} cy={cy2} r="2" class="dot-dim" />
				{/each}
			</g>
		</svg>
	</div>

	<!-- ── Main hero content ─────────────────────────── -->
	<div class="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center px-6 text-center">
		<!-- Eyebrow text above logo -->
		<div
			class="transition-all duration-1000 ease-out"
			style="
        opacity: {mounted ? 1 : 0};
        transform: translateY({mounted ? textOffset * -0.5 + 'px' : '-16px'});
        transition-delay: 0ms;
      "
		>
			<p class="text-eyebrow mb-3">{$_('home.eyebrow')}</p>
			<div class="divider-bronze-short mx-auto mb-8 opacity-60"></div>
		</div>

		<!-- Logo -->
		<div
			class="relative mb-8 transition-all duration-1000 ease-out"
			style="
        opacity: {mounted ? 1 : 0};
        transform: translateY({mounted ? logoOffset * -1 + 'px' : '24px'});
        transition-delay: 150ms;
      "
		>
			<img
				src={Logo}
				alt="Athenae Initiative — two birds in flight within an oval"
				class="h-auto w-[min(240px,52vw)] object-contain brightness-0 invert"
				style="filter: invert(1) sepia(0.2) saturate(0.8) brightness(0.9);"
			/>
		</div>

		<!-- Headline below logo -->
		<div
			class="transition-all duration-1000 ease-out"
			style="
        opacity: {mounted ? 1 : 0};
        transform: translateY({mounted ? textOffset * 0.3 + 'px' : '24px'});
        transition-delay: 300ms;
      "
		>
			<div class="divider-bronze-short mx-auto mb-8 opacity-60"></div>
			<h1 class="mb-5 font-display text-display-2xl leading-[1.05] tracking-tight text-offwhite">
				<span class="block text-bronze-400 italic">{$_('home.headline')}</span>
			</h1>
			<p class="text-body-muted mx-auto mb-10 max-w-md text-sm leading-loose">
				{$_('home.subheadline')}<br />
			</p>

			<!-- CTAs -->
			<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
				<a href={linkHref(`/programs`)} class="btn-bronze">
					{$_('home.cta_primary')}
					<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
						<path
							d="M1 7h12M8 3l4 4-4 4"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</a>
				<a href={linkHref(`/about`)} class="btn-outline-bronze">
					{$_('home.cta_secondary')}
				</a>
			</div>
		</div>
	</div>

	<!-- Scroll indicator -->
	<div
		class="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 transition-all duration-700"
		style="opacity: {mounted ? Math.max(0, 1 - scrollY * 0.008) : 0};"
		aria-hidden="true"
	>
		<p class="text-eyebrow text-[10px] opacity-60">{$_('home.scroll_hint')}</p>
		<div class="h-10 w-px animate-pulse bg-linear-to-b from-bronze-600/50 to-transparent"></div>
	</div>
</section>
