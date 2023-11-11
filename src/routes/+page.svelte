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

	type TailwindVersion = 'v2_colors' | 'v3_2_colors' | 'v3_3_colors'

	const tailwindVersions: { id: TailwindVersion; text: string }[] = [
		{ id: 'v3_3_colors', text: 'v3.3+' },
		{ id: 'v3_2_colors', text: 'v3.2' },
		{ id: 'v2_colors', text: 'v2' },
	]

	let pickedTailwindVersion: TailwindVersion = 'v3_3_colors'

	const colorsMapping = writable(data[pickedTailwindVersion].normalizedColors)
	let justCopiedColor = ''
	let pickedGroupName = ''
	let pickedColorName = ''

	$: {
		if ($pickedColor && colord($pickedColor).isValid()) {
			try {
				const getNearestColor = nearestColour.from(data[pickedTailwindVersion].flattenedColors)
				pickedColorName = getNearestColor($pickedColor).name
			} catch (e) {
				console.log('catch error')
			}

			pickedGroupName = pickedColorName.includes('-')
				? pickedColorName.split('-')[0]
				: pickedColorName

			colorsMapping.set(
				normalizeColors({
					[pickedGroupName]: data[pickedTailwindVersion].rawColors[pickedGroupName],
				})
			)
		}
	}
</script>

<svelte:head>
	<title>TailwindTools — Find the nearest (closest) Tailwind CSS color</title>
	<meta
		name="description"
		content="Find the nearest (closest) color from the Tailwind CSS color palette. Enter color in HEX, RGBA, HSLA, CMYK and get the class name for Tailwind CSS."
	/>
	<meta
		name="keywords"
		content="tailwindcss, nearest color tailwindcss, nearest color tailwindcss, Tailwind CSS, HEX, RGBA, HSLA, CMYK"
	/>
	<link rel="canonical" href="https://tailwindtools.xyz/" />
	<meta property="og:image" content="https://tailwindtools.xyz/og.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:creator" content="@fromaline" />
	<meta
		name="twitter:title"
		content="TailwindTools — Find the nearest (closest) Tailwind CSS color"
	/>
	<meta
		name="twitter:description"
		content="Find the nearest (closest) color from the Tailwind CSS color palette. Enter color in HEX, RGBA, HSLA, CMYK and get the class name for Tailwind CSS."
	/>
	<meta name="twitter:image" content="https://tailwindtools.xyz/og.png" />
</svelte:head>

<div class="container mx-auto mb-12 flex items-end justify-between">
	<h1 class="mr-2 text-xl font-semibold md:text-2xl">
		Find the nearest (closest) Tailwind CSS color
	</h1>

	<div class="form-control w-full max-w-xs">
		<label class="label" for="tailwindcss-version">
			<span class="label-text">Tailwind CSS version</span>
		</label>

		<select
			class="select select-bordered"
			bind:value={pickedTailwindVersion}
			id="tailwindcss-version"
			name="tailwindcss-version"
		>
			{#each tailwindVersions as tailwindVersion}
				<option value={tailwindVersion.id}>{tailwindVersion.text}</option>
			{/each}
		</select>
	</div>
</div>

<div class="container mx-auto mb-12 flex flex-col items-center justify-center space-y-3">
	<ColorPicker />

	<button
		type="button"
		class="btn"
		aria-label="Reset colors"
		on:click={() => {
			pickedColor.set('')
			colorsMapping.set(data[pickedTailwindVersion].normalizedColors)
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

			<div
				class="mt-3 grid grid-cols-1 gap-x-2 gap-y-4 sm:mt-2 sm:grid-cols-11 sm:gap-y-3 2xl:mt-0"
			>
				{#each Object.entries(groupValue) as [colorName, colorValue]}
					{@const textColor = colord(colorValue).isDark() ? '#fff' : '#000'}
					{@const fullColorName = `${groupName}-${colorName}`}

					<div class="relative flex flex-col items-center">
						<button
							class="flex w-full transform-gpu cursor-pointer appearance-none items-center gap-x-3 outline-none transition-transform focus-visible:scale-105 sm:block sm:space-y-1.5 sm:hover:scale-105"
							on:click={() => {
								window.navigator.clipboard.writeText(fullColorName).then(() => {
									justCopiedColor = fullColorName

									setTimeout(() => {
										justCopiedColor = ''
									}, 1500)
								})
							}}
						>
							<div
								class="flex h-10 w-16 items-center justify-center rounded text-center dark:ring-1 dark:ring-inset dark:ring-white/10 sm:w-full"
								style={`background-color: ${colorValue}`}
							>
								{#if justCopiedColor === fullColorName}
									<span
										class="block whitespace-nowrap text-center font-mono text-sm"
										style={`color: ${textColor}`}
									>
										Copied!
									</span>
								{:else if groupName !== colorName ? fullColorName === pickedColorName : colorName === pickedColorName}
									<span
										class="block whitespace-nowrap text-center font-mono text-sm"
										style={`color: ${textColor}`}
									>
										Nearest
									</span>
								{/if}
							</div>

							<div class="px-0.5">
								<span
									class="block text-start text-xs font-medium text-slate-900 dark:text-white 2xl:w-full"
								>
									{#if groupName === colorName}
										{colorName}
									{:else}
										{fullColorName}
									{/if}
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
