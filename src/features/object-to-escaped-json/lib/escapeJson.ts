export const escapeJson = (json: string): string => {
	if (!json.trim()) {
		return ""
	}

	const normalizedJson = JSON.stringify(JSON.parse(json)).replace(/":/g, '": ')

	return normalizedJson.replace(/"/g, '\\"')
}