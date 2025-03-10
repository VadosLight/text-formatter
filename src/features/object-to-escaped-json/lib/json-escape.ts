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

export const unescapeJson = (json: string): string => {
	return json.replace(/\\"/g, '"').replace(/\\n/g, "\n")
}

export const escapeJinjaJson = (json: string): string => {
	return json
		.replace(/\n/g, "\\n")
		.replace(/\t/g, "")
		.replace(/\s+/g, " ")
		.replace(/"\s+}/g, '"}')
		.replace(/{\s+"/g, '{"')
		.replace(/:\s+"/g, ': "')
		.replace(/"\s+:/g, '":')
		.replace(/{{/g, "\\{{")
		.replace(/}}/g, "\\}}")
		.replace(/{%\s*/g, "\\{%")
		.replace(/\s*%}/g, "%\\}")
		.replace(/\\n/g, "\\\\n")
		.replace(/"/g, '\\"')
		.replace(/\\\\n/g, "\\n")
		.trim()
}
