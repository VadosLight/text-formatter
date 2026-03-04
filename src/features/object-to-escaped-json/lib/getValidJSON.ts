export const getValidJSON = (object: object): string => {
	return JSON.stringify(
		object,
		(_, value) => (typeof value === "bigint" ? value.toString() : value),
		2,
	)
}
