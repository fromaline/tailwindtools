<script lang="ts">
	import '../app.css'
	import '@simonwep/pickr/dist/themes/classic.min.css'
	import 'remixicon/fonts/remixicon.css'
</script>

<header
	class="supports-backdrop-blur:bg-white/95 sticky top-0 z-40 w-full flex-none bg-white backdrop-blur transition-colors duration-500 dark:border-slate-50/[0.06] dark:bg-slate-900/75 lg:z-50 lg:border-b lg:border-slate-900/10"
>
	<div class="max-w-8xl mx-auto">
		<div
			class="mx-4 border-b border-slate-900/10 py-4 dark:border-slate-300/10 lg:mx-0 lg:border-0 lg:px-8"
		>
			<div class="flex items-center justify-between">
				<span class="font-mono text-lg text-white">TailwindTools</span>

				<a
					href="https://github.com/fromaline"
					target="_blank"
					title="Fromaline's github link"
					class="outline-none hover:text-white focus-visible:text-white"
				>
					<i class="ri-github-fill text-2xl"></i>
				</a>
			</div>
		</div>
	</div>
</header>

<div class="container px-4 py-4 sm:px-6 md:px-8">
	<slot />
</div>
