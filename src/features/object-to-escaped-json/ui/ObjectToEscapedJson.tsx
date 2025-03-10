import { useEffect, useState } from "react"

import { MenuItem, Select, TextField } from "@mui/material"
import Box from "@mui/material/Box"
import { useDebounce } from "@uidotdev/usehooks"

import { escapeJinjaJson, escapeJson, unescapeJson } from "../lib/json-escape"

export const ObjectToEscapedJson = () => {
	// Состояния для входного и выходного текста, а также для выбора направления операции.
	const [inputText, setInputText] = useState("")
	const [outputText, setOutputText] = useState("")
	// Режим: "object-to-json" или "json-to-object"
	const [direction, setDirection] = useState("object-to-json")
	const debouncedInput = useDebounce(inputText, 1000)

	useEffect(() => {
		if (!debouncedInput.trim()) {
			setOutputText("")
			return
		}

		try {
			if (direction === "object-to-json") {
				// Пробуем выполнить введённую строку как JS-объект.
				const obj = new Function("return " + debouncedInput)()
				// Получаем minified JSON (без переносов строк)
				const json = JSON.stringify(obj)
				setOutputText(escapeJson(json))
			} else if (direction === "json-to-object") {
				const unescaped = unescapeJson(debouncedInput)
				// Парсим строку как JSON
				const obj = JSON.parse(unescaped)
				// Выводим объект в виде отформатированного JSON с отступами 2 пробела
				const result = JSON.stringify(obj, null, 2)
				setOutputText(result)
			} else if (direction === "json-jinja-to-string") {
				setOutputText(escapeJinjaJson(debouncedInput))
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			setOutputText("Ошибка: " + error.message)
		}
	}, [debouncedInput, direction])

	return (
		<Box
			sx={{
				backgroundColor: "AppWorkspace",
				borderRadius: 1,
				padding: 2,
				display: "flex",
				flexDirection: "column",
				gap: 2,
				width: "100%",
			}}
		>
			{/* Блок для выбора направления операции */}
			<Box sx={{ display: "flex", alignItems: "center" }}>
				<Select
					value={direction}
					onChange={(e) => setDirection(e.target.value)}
					fullWidth
				>
					<MenuItem value="object-to-json">
						JS объект → JSON с экранированными кавычками
					</MenuItem>
					<MenuItem value="json-to-object">
						JSON с экранированными кавычками → JS объект
					</MenuItem>
					<MenuItem value="json-jinja-to-string">
						JSON со вставками Jinja → Строка с экранированными символами
					</MenuItem>
				</Select>
			</Box>

			{/* Поле для ввода */}
			<Box
				sx={{
					backgroundColor: "AppWorkspace",
					padding: 1,
					gap: 1,
					display: "flex",
				}}
			>
				<TextField
					multiline
					fullWidth
					minRows={10}
					maxRows={20}
					label={
						direction === "object-to-json"
							? "JS объект"
							: "JSON с экранированными кавычками"
					}
					value={inputText}
					onChange={(e) => setInputText(e.currentTarget.value)}
				/>
			</Box>

			{/* Поле для результата */}
			<Box
				maxHeight={500}
				sx={{
					backgroundColor: "AppWorkspace",
					padding: 1,
					gap: 1,
					display: "flex",
				}}
			>
				<TextField
					multiline
					fullWidth
					minRows={10}
					maxRows={20}
					label={
						direction === "object-to-json"
							? "JSON с экранированными кавычками"
							: "JS объект"
					}
					value={outputText}
					InputProps={{
						readOnly: true,
					}}
				/>
			</Box>
		</Box>
	)
}
