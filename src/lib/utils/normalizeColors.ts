import type { InitialColorsMapping } from '$lib/models'

export const normalizeColors = (colors: InitialColorsMapping) => {
	return Object.entries(colors).reduce(
		(acc, [colorName, value]) => {
			if (typeof value === 'string') {
				if (value.length > 0 && value[0] === '#') {
					acc[colorName] = { [colorName]: value }
				}

				return acc
			}

			acc[colorName] = value

			return acc
		},
		<Record<string, Record<string, string>>>{}
	)
}
