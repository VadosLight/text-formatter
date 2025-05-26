export const escapeJson = (json: string): string => {
	return json
		.replace(/\r?\n/g, "")
		.replace(/\t/g, "")
		.replace(/\s+/g, " ")
		.replace(/"\s+}/g, '"}')
		.replace(/{\s+"/g, '{"')
		.replace(/:\s+"/g, ': "')
		.replace(/"\s+:/g, '":')
		.replace(/"/g, '\\"')
		.trim()
}