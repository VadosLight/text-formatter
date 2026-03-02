export const unescapeJson = (json: string): string => {
	return json.replace(/\\"/g, '"')
}