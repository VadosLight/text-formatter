import { describe, expect, it } from "vitest"

import { getValidJSON } from "./getValidJSON"

describe("getValidJSON", () => {
	it("должен возвращать валидный JSON с отступами", () => {
		const result = getValidJSON({
			type: "button",
			isActive: true,
			count: 2,
		})

		expect(result).toBe(
			'{\n  "type": "button",\n  "isActive": true,\n  "count": 2\n}',
		)
	})

	it("должен корректно сериализовать вложенные объекты и массивы", () => {
		const result = getValidJSON({
			user: {
				id: 42,
				roles: ["admin", "editor"],
			},
		})

		expect(result).toBe(
			'{\n  "user": {\n    "id": 42,\n    "roles": [\n      "admin",\n      "editor"\n    ]\n  }\n}',
		)
	})

	it("должен пропускать значения, которые не поддерживаются JSON", () => {
		const result = getValidJSON({
			name: "Alice",
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			handler: () => {},
			extra: undefined,
		})

		expect(result).toBe('{\n  "name": "Alice"\n}')
	})

	it("должен выбрасывать ошибку при циклической ссылке", () => {
		const circular: Record<string, unknown> = {}
		circular.self = circular

		expect(() => getValidJSON(circular)).toThrow()
	})

	it("должен корректно сериализовать bigint как строку", () => {
		const result = getValidJSON({ id: 1n, nested: { value: 12345678901234567890n } })

		expect(result).toBe(
			'{\n  "id": "1",\n  "nested": {\n    "value": "12345678901234567890"\n  }\n}',
		)
	})
})
