/* eslint-disable no-irregular-whitespace */
import { describe, expect, it } from "vitest"

import { escapeJson } from "./escapeJson"
import { unescapeJson } from "./unescapeJson"

const mock1 = String.raw`{\"type\": \"sequence\",\"actions\": [{\"type\": \"buttonViewState\",\"targetId\": \"send_error_button\",\"setLoading\": false},{\"type\": \"buttonViewState\",\"targetId\": \"send_button\",\"setLoading\": false},{\"type\": \"newScreen\",\"screen\": {\"content\" : {\"buttonAxis\" : \"vertical\",\"firstButton\" : {\"action\" : {\"type\" : \"deeplink\",\"url\" : \"a-investments://CA?type=share&value=Открыть брокейрский счет в Альфе:\\nhttps://alfabank.ru/make-money/investments/brokerskij-schyot/?platformId=referral_unpaid_parents\",\"analytics\": {\"category\": \"Parent control\",\"action\": \"Click\",\"label\": \"Button Copy Link\",\"screen\": \"Add Parent Error Family Connection Screen\",\"dimensions\": [{\"number\": 19,\"value\": \"User id\"},{\"number\": 20,\"value\": \"Success\"}]}},\"style\" : \"primary\",\"text\" : \"Отправить ссылку\"},\"icon\" : {\"icon\" : {\"name\" : \"face_thinking\"},\"shape\" : \"noShape\",\"size\" : \"xLarge\"},\"secondButton\" : {\"action\" : {\"eventType\" : \"close\",\"type\" : \"event\",\"analytics\": {\"category\": \"Parent control\",\"action\": \"Click\",\"label\": \"Button Try One More\",\"screen\": \"Add Parent Error Family Connection Screen\",\"dimensions\": [{\"number\": 19,\"value\": \"User id\"},{\"number\": 20,\"value\": \"Success\"}]}},\"style\" : \"secondary\",\"text\" : \"Попробовать еще раз\"},\"size\" : \"fullScreen\",\"text\" : \"Кажется, у родителя нет брокерского счёта — может открыть его по вашей ссылке\",\"title\" : \"Пока не получится добавить\",\"type\" : \"alert\"},\"header\" : {\"title\" : \"\",\"type\" : \"default\"}},\"analytics\": {\"category\": \"Parent control\",\"action\": \"Load\",\"label\" : \"Open Parent Control Add Parent Error Family Connection Screen\",\"screen\" : \"Add Parent Error Family Connection Screen\",\"dimensions\": [{\"number\": 19,\"value\": \"User id\"},{\"number\": 20,\"value\": \"Success\"}]}}]}`

describe("unescapeJson", () => {
	it("должен возвращать пустую строку без изменений", () => {
		expect(unescapeJson("")).toBe("")
	})

	it("должен раскрывать экранированные кавычки", () => {
		expect(unescapeJson('{\\"key\\": \\"value\\"}')).toBe('{"key": "value"}')
	})

	it("должен сохранять экранированный \\n до JSON.parse", () => {
		expect(unescapeJson('{\\"key\\": \\"value\\nnext line\\"}')).toBe(
			'{"key": "value\\nnext line"}',
		)
	})

	it("должен корректно раскодировать mock1 для JSON.parse", () => {
		const result = unescapeJson(mock1)

		expect(() => JSON.parse(result)).not.toThrow()
	})

	it("должен корректно сохранять экранирование кавычек внутри значения", () => {
		const sourceJson = '{"text": "say \\"hello\\" to me"}'
		const escaped = escapeJson(sourceJson)
		const result = unescapeJson(escaped)

		expect(result).toBe(sourceJson)
		expect(JSON.parse(result)).toEqual({ text: 'say "hello" to me' })
	})
})
