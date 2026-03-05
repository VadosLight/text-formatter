import { escapeJson } from "./escapeJson"
import { escapeJinjaJson } from "./escapeJinjaJson"
import { getValidJSON } from "./getValidJSON"
import { unescapeJinja } from "./unescapeJinja"
import { unescapeJson } from "./unescapeJson"

export type Direction =
	| "js-to-json"
	| "object-to-json"
	| "json-to-object"
	| "json-jinja-to-string"
	| "string-jinja-to-json"

export const convertByDirection = (value: string, direction: Direction) => {
	if (direction === "js-to-json") {
		const obj = new Function("return " + value)()
		return getValidJSON(obj)
	}

	if (direction === "object-to-json") {
		const obj = new Function("return " + value)()
		const json = JSON.stringify(obj)
		return escapeJson(json)
	}

	if (direction === "json-to-object") {
		const unescaped = unescapeJson(value)
		const obj = JSON.parse(unescaped)
		return JSON.stringify(obj, null, 2)
	}

	if (direction === "json-jinja-to-string") {
		return escapeJinjaJson(value)
	}

	return unescapeJinja(value)
}
