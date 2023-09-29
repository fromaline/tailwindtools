<script lang="ts">
	import { pickedColor } from '$lib/stores'
	import type Pickr from '@simonwep/pickr'
	import { random } from 'colord'
	import { onMount } from 'svelte'

	let pickerDiv: HTMLElement | null = null

	onMount(() => {
		let pickerInstance: Pickr | null = null

		;(async () => {
			const module = await import('@simonwep/pickr')
			const Pickr = module.default

			if (pickerDiv && !pickerInstance) {
				pickerInstance = Pickr.create({
					el: pickerDiv,
					theme: 'classic',
					useAsButton: true,
					inline: true,
					showAlways: true,
					default: random().toHex(),
					components: {
						preview: true,
						hue: true,
						interaction: {
							hex: true,
							input: true,
						},
					},
				})

				pickerInstance.on('change', (color: any) => {
					pickedColor.set(color.toHEXA().toString())
				})
			}
		})()

		return () => {
			if (pickerInstance) {
				pickerInstance.destroy()
			}
		}
	})
</script>

<div class="mx-auto" bind:this={pickerDiv} />
