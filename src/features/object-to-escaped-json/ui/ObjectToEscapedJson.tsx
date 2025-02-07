import { useEffect, useState } from "react"

import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material"
import Box from "@mui/material/Box"
import { useDebounce } from "@uidotdev/usehooks"

export const ObjectToEscapedJson = () => {
	// Состояния для входного и выходного текста, а также для выбора направления операции.
	const [inputText, setInputText] = useState("")
	const [outputText, setOutputText] = useState("")
	// Режим: "object-to-json" или "json-to-object"
	const [direction, setDirection] = useState("object-to-json")
	const debouncedInput = useDebounce(inputText, 1500)

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
				// Экранируем все двойные кавычки
				const escapedJson = json.replace(/"/g, '\\"')
				setOutputText(escapedJson)
			} else if (direction === "json-to-object") {
				// Сначала заменяем экранированные кавычки на обычные.
				const unescaped = debouncedInput.replace(/\\"/g, '"')
				// Парсим строку как JSON
				const obj = JSON.parse(unescaped)
				// Выводим объект в виде отформатированного JSON с отступами 2 пробела
				const result = JSON.stringify(obj, null, 2)
				setOutputText(result)
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
			}}
		>
			{/* Блок для выбора направления операции */}
			<Box sx={{ display: "flex", alignItems: "center" }}>
				<RadioGroup
					row
					value={direction}
					onChange={(e) => setDirection(e.target.value)}
				>
					<FormControlLabel
						value="object-to-json"
						control={<Radio />}
						label="JS объект → JSON с экранированными кавычками"
					/>
					<FormControlLabel
						value="json-to-object"
						control={<Radio />}
						label="JSON с экранированными кавычками → JS объект"
					/>
				</RadioGroup>
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
