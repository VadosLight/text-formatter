import { describe, expect, it } from "vitest"

import { convertByDirection } from "./convertByDirection"

describe("convertByDirection", () => {
	it("конвертирует JS объект в экранированный JSON", () => {
		const result = convertByDirection("({ foo: 'bar' })", "object-to-json")
		expect(result).toBe('{\\"foo\\": \\"bar\\"}')
	})

	it("конвертирует экранированный JSON в форматированный объект", () => {
		const result = convertByDirection('{\\"foo\\":\\"bar\\"}', "json-to-object")
		expect(result).toBe('{\n  "foo": "bar"\n}')
	})

	it("возвращает понятную ошибку при невалидном JSON", () => {
		expect(() =>
			convertByDirection('{\\"foo\\":}', "json-to-object"),
		).toThrowError()
	})
})
