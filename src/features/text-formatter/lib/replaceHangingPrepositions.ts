/* eslint-disable no-irregular-whitespace */
/**
 * Заменяет пробелы после коротких «висячих» предлогов на неразрывные
 * без использования регулярных выражений.
 *
 * @param text - Исходный текст
 * @returns Текст, в котором пробел после предлогов заменён на неразрывный
 */
export const replaceHangingPrepositions = (text: string): string => {
	// Неразрывный пробел
	const NBSP = " "

	// Список предлогов для обработки
	const prepositions = [
		"в",
		"без",
		"до",
		"из",
		"к",
		"на",
		"по",
		"о",
		"от",
		"перед",
		"при",
		"через",
		"с",
		"у",
		"за",
		"над",
		"об",
		"под",
		"про",
		"для",
		"и",
	]

	let result = ""
	let i = 0

	while (i < text.length) {
		// Проверяем, находимся ли мы в начале текста или после пробела
		const isWordStart = i === 0 || text[i - 1] === " "

		if (isWordStart) {
			// Проверяем каждый предлог
			let foundPrep = false
			for (const prep of prepositions) {
				const currentWord = text.slice(i, i + prep.length).toLowerCase()
				const nextChar = text[i + prep.length]

				// Проверяем, что это предлог и после него пробел
				if (currentWord === prep.toLowerCase() && nextChar === " ") {
					// Проверяем, что после пробелов идет слово или конец строки
					let j = i + prep.length + 1
					while (j < text.length && text[j] === " ") j++

					// Если после пробелов конец строки или начало нового слова
					if (j === text.length || /\S/.test(text[j])) {
						// Добавляем предлог в оригинальном регистре
						result += text.slice(i, i + prep.length) + NBSP
						i = j
						foundPrep = true
						break
					}
				}
			}
			if (!foundPrep) {
				result += text[i]
				i++
			}
		} else {
			result += text[i]
			i++
		}
	}

	return result
}

// Пример использования
const example = "Я живу в Москве и часто бываю на Красной площади."
const replaced = replaceHangingPrepositions(example)
console.log(replaced)
// Вывод: "Я живу в Москве и часто бываю на Красной площади."
