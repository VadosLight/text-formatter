export const unescapeJinja = (jinjaTemplate: string): string => {
	return jinjaTemplate.replace(/\\'/g, "'").replace(/\\"/g, '"')
}
