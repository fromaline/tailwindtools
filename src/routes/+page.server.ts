import type { InitialColorsMapping } from '$lib/models'
import { flattenColors } from '$lib/utils/flattenColors'
import { normalizeColors } from '$lib/utils/normalizeColors'
import colors from 'tailwindcss/colors'

export const load = async () => {
	const typedColors = colors as unknown as InitialColorsMapping

	return {
		rawColors: typedColors,
		normalizedColors: normalizeColors(typedColors),
		flattenedColors: flattenColors(typedColors),
	}
}
