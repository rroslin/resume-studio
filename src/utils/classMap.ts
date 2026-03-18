export type ClassMapping = Record<string, unknown>

export function classMap(classMapping: ClassMapping): string {
	return Object.entries(classMapping)
		.filter(([, enabled]) => Boolean(enabled))
		.map(([className]) => className)
		.join(' ')
}