/* eslint-disable no-irregular-whitespace */
/**
 * Проверяет, что вся строка состоит только из цифр.
 * Без использования регулярных выражений.
 */
function isDigitsOnly(str: string): boolean {
	if (!str) {
		return false
	}
	for (let i = 0; i < str.length; i++) {
		const code = str.charCodeAt(i)
		// Цифры в ASCII: 48 ('0') - 57 ('9')
		if (code < 48 || code > 57) {
			return false
		}
	}
	return true
}

/**
 * Заменяет обычные пробелы в числах (наподобие 1 000 000)
 * на неразрывные пробелы без использования RegExp.
 */
export function replaceSpacesInNumbers(text: string): string {
	// Разделяем строку по пробелам
	const tokens = text.split(" ")
	const result: string[] = []

	// Этот буфер будет временно хранить подряд идущие числовые токены
	let numericBuffer: string[] = []

	// Функция «сбрасывает» буфер в результат,
	// склеивая все числовые токены через неразрывный пробел
	function flushNumericBuffer() {
		if (numericBuffer.length > 0) {
			result.push(numericBuffer.join("\u00A0"))
			numericBuffer = []
		}
	}

	for (let i = 0; i < tokens.length; i++) {
		const token = tokens[i]
		// Проверяем, состоит ли токен только из цифр
		if (isDigitsOnly(token)) {
			// Если да, добавляем его в буфер
			numericBuffer.push(token)
		} else {
			// Если нет, значит, пора «сбросить» буфер в результат
			flushNumericBuffer()
			// И добавить текущий (нечисловой) токен
			result.push(token)
		}
	}

	// Если после цикла остались числовые токены, «сбрасываем» их
	flushNumericBuffer()

	// Склеиваем результат обратно в строку
	return result.join(" ")
}

// Пример использования
const example = "У меня на счету 1 000 000 рублей и 20 000 долларов."
const replaced = replaceSpacesInNumbers(example)
console.log(replaced)
// Вывод: "У меня на счету 1 000 000 рублей и 20 000 долларов."
