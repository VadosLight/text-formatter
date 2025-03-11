export const replaceMultipleSpaces = (str: string): string => {
	// Сохраняем переносы строк, заменяя их на маркер
	const NEWLINE_MARKER = "§§NEWLINE§§"
	const textWithMarkers = str.replace(/\n/g, NEWLINE_MARKER)

	// Заменяем множественные пробелы на один
	const processedText = textWithMarkers.replace(/\s+/g, " ").trim()

	// Восстанавливаем переносы строк
	return processedText.replace(new RegExp(NEWLINE_MARKER, "g"), "\n")
}
