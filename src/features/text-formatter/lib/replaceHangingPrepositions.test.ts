import { describe, expect, it } from "vitest"

import { replaceHangingPrepositions } from "./replaceHangingPrepositions"

// Вспомогательная функция для проверки наличия неразрывных пробелов
const containsNonBreakingSpace = (
	str: string,
	expectedCount: number,
): boolean => {
	return str.split("\u00A0").length - 1 === expectedCount
}

describe("replaceHangingPrepositions", () => {
	it("должен заменять пробел после предлога на неразрывный", () => {
		const result = replaceHangingPrepositions("в доме")
		expect(containsNonBreakingSpace(result, 1)).toBe(true)
	})

	it("должен обрабатывать несколько предлогов", () => {
		const result = replaceHangingPrepositions("в доме и на работе")
		expect(containsNonBreakingSpace(result, 3)).toBe(true)
		expect(result.startsWith("в\u00A0")).toBe(true)
		expect(result.includes("и\u00A0")).toBe(true)
		expect(result.includes("на\u00A0")).toBe(true)
	})

	it("должен сохранять регистр предлогов", () => {
		const result = replaceHangingPrepositions("В доме")
		expect(result.startsWith("В\u00A0")).toBe(true)
	})

	it("не должен изменять текст без предлогов", () => {
		const result = replaceHangingPrepositions("просто текст")
		expect(containsNonBreakingSpace(result, 0)).toBe(true)
	})

	it("должен обрабатывать предлоги в середине текста", () => {
		const result = replaceHangingPrepositions("дом в лесу")
		expect(result.includes("в\u00A0")).toBe(true)
		expect(containsNonBreakingSpace(result, 1)).toBe(true)
	})

	it("должен корректно обрабатывать пустую строку", () => {
		expect(replaceHangingPrepositions("")).toBe("")
	})

	it("должен обрабатывать предлог в конце строки", () => {
		const result = replaceHangingPrepositions("смотрю на")
		expect(containsNonBreakingSpace(result, 0)).toBe(true)
	})

	it("должен обрабатывать все поддерживаемые предлоги", () => {
		const text =
			"в лесу на поляне за домом о природе у реки с другом к вечеру и утром"
		const result = replaceHangingPrepositions(text)
		expect(containsNonBreakingSpace(result, 8)).toBe(true)
		expect(result.includes("в\u00A0")).toBe(true)
		expect(result.includes("на\u00A0")).toBe(true)
		expect(result.includes("за\u00A0")).toBe(true)
		expect(result.includes("о\u00A0")).toBe(true)
		expect(result.includes("у\u00A0")).toBe(true)
		expect(result.includes("с\u00A0")).toBe(true)
		expect(result.includes("к\u00A0")).toBe(true)
		expect(result.includes("и\u00A0")).toBe(true)
	})
})
