import { v2_colors, v2_flattenedColors, v2_normalizedColors } from '$lib/constants/v2_colors'
import {
	v3_2_colors,
	v3_2_flattenedColors,
	v3_2_normalizedColors,
} from '$lib/constants/v3_2_colors'
import {
	v3_3_colors,
	v3_3_flattenedColors,
	v3_3_normalizedColors,
} from '$lib/constants/v3_3_colors'
import type { InitialColorsMapping } from '$lib/models'

export const load = async () => {
	const typed_v2_colors = v2_colors as unknown as InitialColorsMapping
	const typed_v3_2_colors = v3_2_colors as unknown as InitialColorsMapping
	const typed_v3_3_colors = v3_3_colors as unknown as InitialColorsMapping

	return {
		v2_colors: {
			rawColors: typed_v2_colors,
			normalizedColors: v2_normalizedColors,
			flattenedColors: v2_flattenedColors,
		},
		v3_2_colors: {
			rawColors: typed_v3_2_colors,
			normalizedColors: v3_2_normalizedColors,
			flattenedColors: v3_2_flattenedColors,
		},
		v3_3_colors: {
			rawColors: typed_v3_3_colors,
			normalizedColors: v3_3_normalizedColors,
			flattenedColors: v3_3_flattenedColors,
		},
	}
}
