import { describe, expect, it } from "vitest"
import { unescapeJson } from "./unescapeJson"




describe("unescapeJson", () => {
    it("должен раскрывать экранированные кавычки", () => {
        expect(unescapeJson('{\\"key\\": \\"value\\"}')).toBe('{"key": "value"}')
    })

    it("должен преобразовывать \\n в перенос строки", () => {
        expect(unescapeJson('{\\"key\\": \\"value\\nnext line\\"}')).toBe(
            '{"key": "value\nnext line"}',
        )
    })
})