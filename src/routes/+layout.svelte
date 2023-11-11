<script lang="ts">
	import '../app.css'
	import '@simonwep/pickr/dist/themes/classic.min.css'
	import 'remixicon/fonts/remixicon.css'
</script>

<div class="flex min-h-screen flex-col">
	<header
		class="bg-base-100 text-base-content flex h-16 items-center justify-center bg-opacity-90 backdrop-blur transition-all duration-100 [transform:translate3d(0,0,0)]"
	>
		<div class="navbar container mx-auto flex w-full items-center justify-between">
			<a href="/" class="text-lg font-bold text-white hover:underline focus-visible:underline">
				TailwindTools
			</a>

			<a
				href="https://github.com/fromaline/tailwindtools"
				target="_blank"
				title="TailwindTools GitHub link"
				class="outline-none hover:text-white focus-visible:text-white"
			>
				<i class="ri-github-fill text-2xl"></i>
			</a>
		</div>
	</header>

	<div class="flex flex-col p-4 sm:p-6">
		<slot />
	</div>
</div>
