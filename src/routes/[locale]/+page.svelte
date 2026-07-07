<script lang="ts">
	import Logo from '$lib/assets/athenae_logo.png';
</script>

<section
	class="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy-800 px-6 py-24"
>
	<div
		class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC43NSIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWx0ZXI9InVybCgjbikiIG9wYWNpdHk9IjEiLz48L3N2Zz4=')] opacity-[0.03]"
	></div>

	<div class="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center text-center">
		<img
			src={Logo}
			alt="Athenae Initiative"
			class="mb-8 h-auto w-[min(220px,52vw)] object-contain brightness-0 invert"
			style="filter: invert(1) sepia(0.2) saturate(0.8) brightness(0.9);"
		/>

		<div class="divider-bronze-short mb-6 opacity-60"></div>
		<p class="text-eyebrow mb-3">Athenae Initiative</p>
		<h1
			class="mb-4 font-display text-display-2xl leading-[1.05] tracking-tight text-offwhite italic"
		>
			Coming Soon
		</h1>
		<p class="mx-auto mb-10 max-w-xl text-sm leading-loose text-offwhite/85">
			We are preparing a new experience. Please check back soon for updates.
		</p>

		<div class="w-full max-w-md border border-bronze-600/30 bg-navy-900/40 px-6 py-5">
			<p class="text-eyebrow mb-2">Contact</p>
			<p class="mb-2 text-sm text-offwhite/80">For inquiries, reach us at:</p>
			<a
				href="mailto:example@athenae.ca"
				class="font-body text-sm text-bronze-400 transition-colors hover:text-bronze-300"
			>
				example@athenae.ca
			</a>
		</div>
	</div>
</section>
