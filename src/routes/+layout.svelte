<script lang="ts">
	import '../app.css'
	import '@simonwep/pickr/dist/themes/classic.min.css'
	import 'remixicon/fonts/remixicon.css'
</script>

<div class="flex min-h-screen flex-col">
	<header
		class="flex h-16 items-center justify-center bg-base-100 bg-opacity-90 text-base-content backdrop-blur transition-all duration-100 [transform:translate3d(0,0,0)]"
	>
		<div class="container navbar mx-auto flex w-full items-center justify-between space-x-3">
			<a href="/" class="text-lg font-bold text-white hover:underline focus-visible:underline">
				TailwindTools
			</a>

			<div class="space-x-3">
				<a href="https://chainspect.app/" target="_blank"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 180 180"
						width="24"
						height="24"
						><circle cx="90" cy="90" r="90" fill="#000" /><path
							fill="url(#a)"
							d="M128 64V49H53v83h75v-15H68V64h60Z"
						/><defs
							><radialGradient
								id="a"
								cx="0"
								cy="0"
								r="1"
								gradientTransform="matrix(75 -83 75 67.8 53 132)"
								gradientUnits="userSpaceOnUse"
								><stop stop-color="#1BE6AB" /><stop
									offset="1"
									stop-color="#027DFD"
								/></radialGradient
							></defs
						></svg
					></a
				>

				<a
					href="https://github.com/fromaline/tailwindtools"
					target="_blank"
					title="TailwindTools GitHub link"
					class="outline-none hover:text-white focus-visible:text-white"
				>
					<i class="ri-github-fill text-2xl"></i>
				</a>
			</div>
		</div>
	</header>

	<div class="flex flex-col p-4 sm:p-6">
		<slot />
	</div>
</div>
