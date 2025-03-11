import { describe, expect, it } from "vitest"

import { replaceMultipleSpaces } from "./replaceMultipleSpaces"

describe("replaceMultipleSpaces", () => {
	it("должен заменять множественные пробелы на один", () => {
		expect(replaceMultipleSpaces("text    with    spaces")).toBe(
			"text with spaces",
		)
	})

	it("должен обрабатывать табуляцию", () => {
		expect(replaceMultipleSpaces("text\t\twith\ttabs")).toBe("text with tabs")
	})

	it("должен корректно обрабатывать строку с одиночными пробелами", () => {
		expect(replaceMultipleSpaces("text with spaces")).toBe("text with spaces")
	})

	it("должен обрабатывать пустую строку", () => {
		expect(replaceMultipleSpaces("")).toBe("")
	})
})
