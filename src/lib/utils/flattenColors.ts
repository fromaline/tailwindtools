import type { InitialColorsMapping } from '$lib/models'

export const flattenColors = (colors: InitialColorsMapping) => {
	return Object.entries(colors).reduce(
		(acc, [colorName, value]) => {
			if (typeof value === 'string') {
				if (value.length > 0 && value[0] === '#') {
					acc[colorName] = value
				}

				return acc
			}

			for (const key in value) {
				acc[`${colorName}-${key}`] = value[key]
			}

			return acc
		},
		<Record<string, string>>{}
	)
}
