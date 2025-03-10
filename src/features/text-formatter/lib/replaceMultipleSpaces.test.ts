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

	it("должен обрабатывать переносы строк", () => {
		expect(replaceMultipleSpaces("text\n\nwith\nlines")).toBe("text with lines")
	})

	it("должен обрабатывать комбинацию разных пробельных символов", () => {
		expect(replaceMultipleSpaces("text \t \n with  \t\n  mixed")).toBe(
			"text with mixed",
		)
	})

	it("должен корректно обрабатывать строку с одиночными пробелами", () => {
		expect(replaceMultipleSpaces("text with spaces")).toBe("text with spaces")
	})

	it("должен обрабатывать пустую строку", () => {
		expect(replaceMultipleSpaces("")).toBe("")
	})
})
