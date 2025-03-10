import { describe, expect, it } from "vitest"

import { trimSpaces } from "./trimSpaces"

describe("trimSpaces", () => {
	it("должен удалять пробелы в начале и конце строки", () => {
		expect(trimSpaces("  text  ")).toBe("text")
	})

	it("должен сохранять пробелы внутри строки", () => {
		expect(trimSpaces("  text with spaces  ")).toBe("text with spaces")
	})

	it("должен корректно обрабатывать строку без пробелов по краям", () => {
		expect(trimSpaces("text")).toBe("text")
	})

	it("должен обрабатывать строку только из пробелов", () => {
		expect(trimSpaces("   ")).toBe("")
	})

	it("должен обрабатывать пустую строку", () => {
		expect(trimSpaces("")).toBe("")
	})
})
