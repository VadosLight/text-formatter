import { describe, expect, it } from "vitest"

import { escapeJinjaJson } from "./escapeJinjaJson"
import { unescapeJinja } from "./unescapeJinja"

describe("unescapeJinja", () => {
	it("должен возвращать пустую строку без изменений", () => {
		expect(unescapeJinja("")).toBe("")
	})

	it("должен убирать экранирование кавычек", () => {
		expect(unescapeJinja('{\\"key\\":\\"value\\"}')).toBe('{"key":"value"}')
	})

	it("должен корректно работать с jinja-вставками", () => {
		expect(unescapeJinja('{\\"key\\":\\"{{ value }}\\"}')).toBe(
			'{"key":"{{ value }}"}',
		)
		expect(unescapeJinja('{\\"key\\":\\"{% if condition %}\\"}')).toBe(
			'{"key":"{% if condition %}"}',
		)
		expect(
			unescapeJinja('{\\"key\\":\\"{% if \\\'female\\\' == parent.gender %}\\"}'),
		).toBe('{"key":"{% if \'female\' == parent.gender %}"}')
	})

	it("должен корректно работать с jinja-циклом", () => {
		const escapedWithLoop =
			'{\\"items\\":[{% for parent in parents %}{\\"name\\":\\"{{ parent.name }}\\"}{% if not loop.last %},{% endif %}{% endfor %}]}'

		expect(unescapeJinja(escapedWithLoop)).toBe(
			'{"items":[{% for parent in parents %}{"name":"{{ parent.name }}"}{% if not loop.last %},{% endif %}{% endfor %}]}',
		)
	})

	it("должен быть обратной операцией для escapeJinjaJson", () => {
		const source = '{"key":"{{ parent.name }}","type":"TextLabel"}'
		const escaped = escapeJinjaJson(source)

		expect(unescapeJinja(escaped)).toBe(source)
	})
})
