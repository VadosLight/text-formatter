import { describe, expect, it } from "vitest"

import { replaceSpacesInNumbers } from "./replaceSpacesInNumbers"

describe("replaceSpacesInNumbers", () => {
	it("должен заменять пробелы в числах на неразрывные", () => {
		expect(replaceSpacesInNumbers("1 000 000")).toBe("1\u00A0000\u00A0000")
	})

	it("должен обрабатывать числа в тексте", () => {
		expect(replaceSpacesInNumbers("У меня 100 000 рублей")).toBe(
			"У меня 100\u00A0000 рублей",
		)
	})

	it("должен обрабатывать несколько чисел в тексте", () => {
		expect(replaceSpacesInNumbers("1 000 рублей и 2 000 долларов")).toBe(
			"1\u00A0000 рублей и 2\u00A0000 долларов",
		)
	})

	it("не должен изменять текст без чисел", () => {
		expect(replaceSpacesInNumbers("обычный текст")).toBe("обычный текст")
	})

	it("не должен изменять числа без пробелов", () => {
		expect(replaceSpacesInNumbers("1000000")).toBe("1000000")
	})

	it("должен корректно обрабатывать пустую строку", () => {
		expect(replaceSpacesInNumbers("")).toBe("")
	})

	it("должен обрабатывать числа в начале и конце текста", () => {
		expect(replaceSpacesInNumbers("1 000 текст 2 000")).toBe(
			"1\u00A0000 текст 2\u00A0000",
		)
	})
})
