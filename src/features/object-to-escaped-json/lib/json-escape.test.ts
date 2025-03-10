import { describe, expect, it } from "vitest"

import { escapeJinjaJson, escapeJson, unescapeJson } from "./json-escape"

describe("escapeJson", () => {
	it("должен экранировать кавычки", () => {
		expect(escapeJson('{"key": "value"}')).toBe('{\\"key\\": \\"value\\"}')
	})

	it("должен сохранять экранированные \\n и \\t", () => {
		expect(escapeJson('{"key": "value\\nnext line\\tTab"}')).toBe(
			'{\\"key\\": \\"value\\nnext line\\tTab\\"}',
		)
	})

	it("должен удалять реальные переносы строк и табуляции", () => {
		expect(escapeJson('{\n\t"key": "value"\n}')).toBe(
			'{\\"key\\": \\"value\\"}',
		)
	})

	it("должен удалять лишние пробелы", () => {
		expect(escapeJson('{"key":    "value"    }')).toBe(
			'{\\"key\\": \\"value\\"}',
		)
	})
})

describe("unescapeJson", () => {
	it("должен раскрывать экранированные кавычки", () => {
		expect(unescapeJson('{\\"key\\": \\"value\\"}')).toBe('{"key": "value"}')
	})

	it("должен преобразовывать \\n в перенос строки", () => {
		expect(unescapeJson('{\\"key\\": \\"value\\nnext line\\"}')).toBe(
			'{"key": "value\nnext line"}',
		)
	})
})

describe("escapeJinjaJson", () => {
	it("должен экранировать Jinja теги", () => {
		expect(escapeJinjaJson('{"key": "{{ value }}"}')).toBe(
			'{\\"key\\": \\"\\{{ value \\}}\\"}',
		)
	})

	it("должен экранировать Jinja блоки", () => {
		expect(escapeJinjaJson('{"key": "{% if condition %}"}')).toBe(
			'{\\"key\\": \\"\\{%if condition%\\}\\"}',
		)
	})

	it("должен комбинировать экранирование JSON и Jinja", () => {
		expect(escapeJinjaJson('{"key": "{{ value }}\nNext line"}')).toBe(
			'{\\"key\\": \\"\\{{ value \\}}\\nNext line\\"}',
		)
	})
})
