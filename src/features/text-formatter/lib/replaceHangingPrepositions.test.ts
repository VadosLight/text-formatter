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

	describe("сложные случаи", () => {
		it("должен корректно обрабатывать последовательные предлоги", () => {
			const result = replaceHangingPrepositions("и в и на доме")
			expect(containsNonBreakingSpace(result, 4)).toBe(true)
			expect(result).toBe("и\u00A0в\u00A0и\u00A0на\u00A0доме")
		})

		it("должен обрабатывать предлоги с разным регистром", () => {
			const result = replaceHangingPrepositions("В лесу И на ПОЛЯНЕ к дому")
			expect(containsNonBreakingSpace(result, 4)).toBe(true)
			expect(result).toBe("В\u00A0лесу И\u00A0на\u00A0ПОЛЯНЕ к\u00A0дому")
		})

		it("должен обрабатывать множественные пробелы", () => {
			const result = replaceHangingPrepositions("дом    в    лесу")
			expect(containsNonBreakingSpace(result, 1)).toBe(true)
			expect(result).toBe("дом в\u00A0лесу")
		})

		it("должен корректно обрабатывать предлоги с пунктуацией", () => {
			const result = replaceHangingPrepositions(
				"пошел в лес, и на поляну, к реке",
			)
			expect(containsNonBreakingSpace(result, 4)).toBe(true)
			expect(result).toBe(
				"пошел в\u00A0лес, и\u00A0на\u00A0поляну, к\u00A0реке",
			)
		})

		it("должен обрабатывать предлоги в начале и конце предложения", () => {
			const result = replaceHangingPrepositions("в лесу живет и")
			expect(containsNonBreakingSpace(result, 1)).toBe(true)
			expect(result).toBe("в\u00A0лесу живет и")
		})

		it("должен корректно обрабатывать текст с цифрами", () => {
			const result = replaceHangingPrepositions("в 2024 году и на 5 этаже")
			expect(containsNonBreakingSpace(result, 3)).toBe(true)
			expect(result).toBe("в\u00A02024 году и\u00A0на\u00A05 этаже")
		})

		it("должен обрабатывать предлоги рядом со знаками препинания", () => {
			const result = replaceHangingPrepositions(
				"идти: в лес, на поляну; к реке!",
			)
			expect(containsNonBreakingSpace(result, 3)).toBe(true)
			expect(result).toBe("идти: в\u00A0лес, на\u00A0поляну; к\u00A0реке!")
		})

		it("должен обрабатывать специальные символы как пробелы", () => {
			const result = replaceHangingPrepositions("в\tлесу\nи\tна\nполяне")
			expect(result).toBe("в\u00A0лесу и\u00A0на\u00A0поляне")
		})
	})
})
