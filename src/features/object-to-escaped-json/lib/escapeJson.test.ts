import { describe, expect, it } from "vitest"
import { escapeJson } from "./escapeJson"

describe("escapeJson", () => {
    it("должен экранировать кавычки", () => {
        expect(escapeJson('{"key": "value"}')).toBe('{\\"key\\": \\"value\\"}')
    })

    it("должен сохранять экранированные \\n", () => {
        expect(escapeJson('{"key": "value\\nnext line\\tTab"}')).toBe(
            '{\\"key\\": \\"value\\nnext line\\tTab\\"}',
        )
    })

    it("должен удалять реальные переносы строк и табуляции", () => {
        expect(escapeJson('{\n\t"key": "value"\n}')).toBe(
            '{\\"key\\": \\"value\\"}',
        )
    })

    it("должен удалять лишние пробелы", () => {
        expect(escapeJson('{"key":    "value"    }')).toBe(
            '{\\"key\\": \\"value\\"}',
        )
    })
})