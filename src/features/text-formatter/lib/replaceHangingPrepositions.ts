/* eslint-disable no-irregular-whitespace */
/**
 * Заменяет пробелы после коротких «висячих» предлогов на неразрывные
 * без использования регулярных выражений.
 *
 * @param text - Исходный текст
 * @returns Текст, в котором пробел после предлогов заменён на неразрывный
 */
export function replaceHangingPrepositions(text: string): string {
	// Список коротких висячих предлогов
	const prepositions = ["в", "на", "за", "о", "у", "с", "к", "и"]

	// Разбиваем строку на массив слов
	const words = text.split(" ")
	const result: string[] = []

	let i = 0
	while (i < words.length) {
		const currentWord = words[i]
		// Приводим к нижнему регистру для сравнения
		const lowerCased = currentWord.toLowerCase()

		// Если текущее слово — короткий предлог и впереди ещё есть слова
		if (prepositions.includes(lowerCased) && i < words.length - 1) {
			// «Склеиваем» его со следующим словом через неразрывный пробел
			result.push(currentWord + "\u00A0" + words[i + 1])
			// Пропускаем следующее слово, так как оно уже «присоединено»
			i += 2
		} else {
			// Иначе просто добавляем текущее слово
			result.push(currentWord)
			i++
		}
	}

	// Объединяем обратно в строку
	return result.join(" ")
}

// Пример использования
const example = "Я живу в Москве и часто бываю на Красной площади."
const replaced = replaceHangingPrepositions(example)
console.log(replaced)
// Вывод: "Я живу в Москве и часто бываю на Красной площади."
