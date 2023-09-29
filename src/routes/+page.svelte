<script lang="ts">
	import type { PageServerData } from './$types'
	import { writable } from 'svelte/store'
	import { normalizeColors } from '$lib/utils/normalizeColors'
	// @ts-expect-error no types
	import nearestColour from 'nearest-color'
	import ColorPicker from '$lib/components/ColorPicker.svelte'
	import { pickedColor } from '$lib/stores'
	import { colord } from 'colord'

	export let data: PageServerData

	const colorsMapping = writable(data.normalizedColors)
	const getNearestColor = nearestColour.from(data.flattenedColors)
	let justCopiedColor = ''
	let pickedGroupName = ''
	let pickedColorName = ''

	$: {
		if ($pickedColor && colord($pickedColor).isValid()) {
			try {
				pickedColorName = getNearestColor($pickedColor).name
			} catch (e) {
				console.log('catch error')
			}

			pickedGroupName = pickedColorName.includes('-')
				? pickedColorName.split('-')[0]
				: pickedColorName

			colorsMapping.set(
				normalizeColors({
					[pickedGroupName]: data.rawColors[pickedGroupName],
				})
			)
		}
	}
</script>

<svelte:head>
	<title>TailwindTools — Find the nearest Tailwind Colour</title>
</svelte:head>

<div class="mb-12 flex items-center justify-start">
	<h1 class="text-2xl">Find the nearest tailwindcss color</h1>
</div>

<div class="mb-12 flex w-full flex-col items-center justify-center space-y-3">
	<ColorPicker />

	<button
		type="button"
		class="flex items-center justify-center space-x-2 rounded-md bg-slate-700 px-2 py-1"
		aria-label="Reset colors"
		on:click={() => {
			pickedColor.set('')
			colorsMapping.set(data.normalizedColors)
		}}
	>
		<span>Reset</span>
		<i class="ri-loop-left-line text-xl"></i>
	</button>
</div>

<div class="grid grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-x-2 gap-y-8 sm:grid-cols-1">
	{#each Object.entries($colorsMapping) as [groupName, groupValue]}
		<div class="2xl:contents">
			<span
				class="block text-sm font-semibold text-slate-900 dark:text-slate-200 2xl:col-end-1 2xl:pt-2.5"
			>
				{groupName}
			</span>

			<div class="mt-3 grid grid-cols-1 gap-x-2 gap-y-3 sm:mt-2 sm:grid-cols-11 2xl:mt-0">
				{#each Object.entries(groupValue) as [colorName, colorValue]}
					{@const textColor = colord(colorValue).isDark() ? '#fff' : '#000'}

					<div class="relative flex flex-col items-center">
						{#if groupName !== colorName ? `${groupName}-${colorName}` === pickedColorName : colorName === pickedColorName}
							<div
								class="absolute bottom-full left-1/2 mb-3.5 -translate-x-1/2 translate-y-0 scale-100 pb-1 opacity-100"
							>
								<div
									class="relative whitespace-nowrap rounded-lg px-1.5 font-mono text-sm leading-6"
									style={`background-color: ${colorValue}; color: ${textColor}`}
								>
									<span>Nearest color</span>

									<svg
										aria-hidden="true"
										width="16"
										height="6"
										viewBox="0 0 16 6"
										class="absolute left-1/2 top-full -ml-2 -mt-px"
										style={`color: ${colorValue}`}
									>
										<path
											fill-rule="evenodd"
											clip-rule="evenodd"
											d="M15 0H1V1.00366V1.00366V1.00371H1.01672C2.72058 1.0147 4.24225 2.74704 5.42685 4.72928C6.42941 6.40691 9.57154 6.4069 10.5741 4.72926C11.7587 2.74703 13.2803 1.0147 14.9841 1.00371H15V0Z"
											fill="currentColor"
										></path>
									</svg>
								</div>
							</div>
						{/if}

						<button
							class="flex w-full transform-gpu cursor-pointer appearance-none items-center gap-x-3 outline-none transition-transform hover:scale-105 focus-visible:scale-105 sm:block sm:space-y-1.5"
							on:click={() => {
								window.navigator.clipboard.writeText(colorValue).then(() => {
									justCopiedColor = colorValue

									setTimeout(() => {
										justCopiedColor = ''
									}, 1500)
								})
							}}
						>
							<div
								class="flex h-10 w-10 items-center justify-center rounded text-center dark:ring-1 dark:ring-inset dark:ring-white/10 sm:w-full"
								style={`background-color: ${colorValue}`}
							>
								{#if justCopiedColor === colorValue}
									<span
										class="block whitespace-nowrap text-center font-mono text-sm"
										style={`color: ${textColor}`}
									>
										Copied!
									</span>
								{/if}
							</div>

							<div class="px-0.5">
								<span
									class="block w-6 text-xs font-medium text-slate-900 dark:text-white 2xl:w-full"
								>
									{colorName}
								</span>

								<span
									class="block text-left font-mono text-xs lowercase text-slate-500 dark:text-slate-400 sm:text-[0.625rem] md:text-xs lg:text-[0.625rem] 2xl:text-xs"
								>
									{colorValue}
								</span>
							</div>
						</button>
					</div>
				{/each}
			</div>
		</div>
	{/each}
</div>
