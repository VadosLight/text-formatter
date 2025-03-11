import { describe, expect, it } from "vitest"

import { replaceHangingPrepositions } from "./replaceHangingPrepositions"

describe("replaceHangingPrepositions", () => {
	const NBSP = " "

	it("заменяет пробел после предлога на неразрывный", () => {
		const result = replaceHangingPrepositions("в лесу")
		expect(result).toBe(`в${NBSP}лесу`)
	})

	it("не заменяет предлоги в середине слова", () => {
		const result = replaceHangingPrepositions("слово")
		expect(result).toBe("слово")
	})

	it("обрабатывает несколько предлогов в тексте", () => {
		const result = replaceHangingPrepositions("в лесу и на поляне")
		expect(result).toBe(`в${NBSP}лесу и${NBSP}на${NBSP}поляне`)
	})

	it("сохраняет оригинальный регистр предлогов", () => {
		const result = replaceHangingPrepositions("В лесу И на поляне")
		expect(result).toBe(`В${NBSP}лесу И${NBSP}на${NBSP}поляне`)
	})

	it("обрабатывает множественные пробелы", () => {
		const result = replaceHangingPrepositions("в   лесу")
		expect(result).toBe(`в${NBSP}лесу`)
	})

	it("сохраняет пробелы в остальном тексте", () => {
		const result = replaceHangingPrepositions("деревья в лесу зеленые")
		expect(result).toBe(`деревья в${NBSP}лесу зеленые`)
	})

	it("Главный тест", () => {
		const result = replaceHangingPrepositions(
			"Я живу в Москве и часто бываю на Красной площади.",
		)
		expect(result).toBe(
			`Я живу в${NBSP}Москве и${NBSP}часто бываю на${NBSP}Красной площади.`,
		)
	})

	it("не заменяет предлоги в середине текста", () => {
		const result1 = replaceHangingPrepositions("живу в Москве")
		expect(result1).toBe(`живу в${NBSP}Москве`)

		const result2 = replaceHangingPrepositions("еду на работу")
		expect(result2).toBe(`еду на${NBSP}работу`)
	})

	it("работает с предлогами в начале строки", () => {
		const result1 = replaceHangingPrepositions("в ")
		expect(result1).toBe(`в${NBSP}`)

		const result2 = replaceHangingPrepositions("на ")
		expect(result2).toBe(`на${NBSP}`)
	})

	it("корректно обрабатывает предлоги в разных регистрах", () => {
		const result1 = replaceHangingPrepositions("текст В ")
		expect(result1).toBe(`текст В${NBSP}`)

		const result2 = replaceHangingPrepositions("текст НА ")
		expect(result2).toBe(`текст НА${NBSP}`)
	})

	it("корректно обрабатывает множественные пробелы после предлога", () => {
		const result1 = replaceHangingPrepositions("текст в   ")
		expect(result1).toBe(`текст в${NBSP}`)

		const result2 = replaceHangingPrepositions("текст на     ")
		expect(result2).toBe(`текст на${NBSP}`)
	})

	it("должен обрабатывать несколько предлогов", () => {
		const result = replaceHangingPrepositions("в доме и на работе")
		expect(result).toBe(`в${NBSP}доме и${NBSP}на${NBSP}работе`)
	})

	it("не должен изменять текст без предлогов", () => {
		const result = replaceHangingPrepositions("просто текст")
		expect(result).toBe("просто текст")
	})

	it("должен корректно обрабатывать пустую строку", () => {
		const result = replaceHangingPrepositions("")
		expect(result).toBe("")
	})

	describe("сложные случаи", () => {
		it("должен сохранять абзацы", () => {
			const result = replaceHangingPrepositions("в лесу.\n\nа также на поляне")
			expect(result).toBe(`в${NBSP}лесу.\n\nа также на${NBSP}поляне`)
		})
	})
})
