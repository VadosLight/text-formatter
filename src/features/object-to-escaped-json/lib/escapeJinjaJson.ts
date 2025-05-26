



export const escapeJinjaJson = (text: string): string => {
    let result = "";
    let inQuotes = false;
    let prevChar = "";
    let spaceBuffer = false; // Флаг, указывающий, был ли пробел

    for (let i = 0; i < text.length; i++) {
        const char = text[i];

        // Обработка кавычек
        if (char === '"' && prevChar !== "\\") {
            inQuotes = !inQuotes;
            result += '\\"';
            prevChar = char;
            continue;
        }

        // Внутри кавычек оставляем все без изменений
        if (inQuotes) {
            if (spaceBuffer) {
                spaceBuffer = false;
            }
            result += char;
            prevChar = char;
            continue;
        }

        // Удаляем неявные новые строки
        if (char === "\n" || char === "\r") {
            prevChar = char;
            continue;
        }

        // Если пробелы были накоплены и следующий символ не пробел — удаляем пробел
        if (char === " " || char === "\t") {
            spaceBuffer = true;
            prevChar = char;
            continue;
        }

        // Если был накопленный пробел, но следующий символ не пробел — не добавляем его
        if (spaceBuffer) {
            spaceBuffer = false;
        }

        // Экранируем двойные кавычки
        if (char === '"') {
            result += '\\"';
            prevChar = char;
            continue;
        }

        // Обычные символы
        result += char;
        prevChar = char;
    }

    return result.trim(); // Убираем лишние пробелы в начале и конце строки
};
