import { useEffect, useState } from "react"

import { CircularProgress, InputAdornment, MenuItem, Select, TextField } from "@mui/material"
import Box from "@mui/material/Box"
import { useDebounce } from "@uidotdev/usehooks"
import { escapeJson } from "../lib/escapeJson"
import { escapeJinjaJson } from "../lib/escapeJinjaJson"
import { getValidJSON } from "../lib/getValidJSON"
import { unescapeJinja } from "../lib/unescapeJinja"
import { unescapeJson } from "../lib/unescapeJson"

type Direction =
	| "js-to-json"
	| "object-to-json"
	| "json-to-object"
	| "json-jinja-to-string"
	| "string-jinja-to-json"

type DirectionLabels = {
	input: string
	output: string
}

const DIRECTION_LABELS: Record<Direction, DirectionLabels> = {
	"js-to-json": {
		input: "JS объект",
		output: "JSON",
	},
	"object-to-json": {
		input: "JS объект",
		output: "JSON с экранированными кавычками",
	},
	"json-to-object": {
		input: "JSON с экранированными кавычками",
		output: "JS объект",
	},
	"json-jinja-to-string": {
		input: "JSON со вставками Jinja",
		output: "Строка с экранированными символами",
	},
	"string-jinja-to-json": {
		input: "Строка с экранированными символами + Jinja",
		output: "JSON со вставками Jinja",
	},
}

export const ObjectToEscapedJson = () => {
	// Состояния для входного и выходного текста, а также для выбора направления операции.
	const [inputText, setInputText] = useState("")
	const [outputText, setOutputText] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	// Режим: "object-to-json" или "json-to-object"
	const [direction, setDirection] = useState<Direction>("object-to-json")
	const debouncedInput = useDebounce(inputText, 1000)

	useEffect(() => {
		setIsLoading(Boolean(inputText.trim()))
	}, [inputText, direction])

	useEffect(() => {
		if (!debouncedInput.trim()) {
			setOutputText("")
			setIsLoading(false)
			return
		}

		try {
			if (direction === "js-to-json") {
				const obj = new Function("return " + debouncedInput)()
				setOutputText(getValidJSON(obj))
			} else if (direction === "object-to-json") {
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
			} else if (direction === "string-jinja-to-json") {
				setOutputText(unescapeJinja(debouncedInput))
			}
		} catch (error: unknown) {
			const errorMessage =
				error instanceof Error ? error.message : "Неизвестная ошибка"
			setOutputText("Ошибка: " + errorMessage)
		} finally {
			setIsLoading(false)
		}
	}, [debouncedInput, direction])
	const directionLabels = DIRECTION_LABELS[direction]

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
					onChange={(e) => setDirection(e.target.value as Direction)}
					fullWidth
				>
					<MenuItem value="js-to-json">JS объект → JSON</MenuItem>
					<MenuItem value="object-to-json">
						JS объект → JSON с экранированными кавычками
					</MenuItem>
					<MenuItem value="json-to-object">
						JSON с экранированными кавычками → JS объект
					</MenuItem>
					<MenuItem value="json-jinja-to-string">
						JSON со вставками Jinja → Строка с экранированными символами
					</MenuItem>
					<MenuItem value="string-jinja-to-json">
						Строка с экранированными символами + Jinja → JSON
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
					label={directionLabels.input}
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
					label={directionLabels.output}
					value={outputText}
					InputProps={{
						readOnly: true,
						endAdornment: isLoading ? (
							<InputAdornment position="end">
								<CircularProgress size={20} />
							</InputAdornment>
						) : undefined,
					}}
				/>
			</Box>
		</Box>
	)
}
