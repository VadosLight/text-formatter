import { useCallback, useEffect, useMemo, useState } from "react"

import { useDebounce } from "@uidotdev/usehooks"
import { convertByDirection, type Direction } from "../lib/convertByDirection"

type DirectionLabels = {
	input: string
	output: string
}

type DirectionOption = {
	value: Direction
	label: string
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

export const DIRECTION_OPTIONS: ReadonlyArray<DirectionOption> = [
	{ value: "js-to-json", label: "JS объект → JSON" },
	{
		value: "object-to-json",
		label: "JS объект → JSON с экранированными кавычками",
	},
	{
		value: "json-to-object",
		label: "JSON с экранированными кавычками → JS объект",
	},
	{
		value: "json-jinja-to-string",
		label: "JSON со вставками Jinja → Строка с экранированными символами",
	},
	{
		value: "string-jinja-to-json",
		label: "Строка с экранированными символами + Jinja → JSON",
	},
] as const

export const useObjectToEscapedJson = () => {
	const [inputText, setInputText] = useState("")
	const [outputText, setOutputText] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const [direction, setDirection] = useState<Direction>("object-to-json")
	const debouncedInput = useDebounce(inputText, 1000)

	const directionLabels = useMemo(() => DIRECTION_LABELS[direction], [direction])

	const handleInputChange = useCallback((value: string) => {
		setInputText(value)
		setIsLoading(Boolean(value.trim()))
	}, [])

	const handleDirectionChange = useCallback(
		(nextDirection: Direction) => {
			setDirection(nextDirection)
			setIsLoading(Boolean(inputText.trim()))
		},
		[inputText],
	)

	useEffect(() => {
		if (!debouncedInput.trim()) {
			setOutputText("")
			setIsLoading(false)
			return
		}

		try {
			setOutputText(convertByDirection(debouncedInput, direction))
		} catch (error: unknown) {
			const errorMessage =
				error instanceof Error ? error.message : "Неизвестная ошибка"
			setOutputText("Ошибка: " + errorMessage)
		} finally {
			setIsLoading(false)
		}
	}, [debouncedInput, direction])

	return {
		direction,
		directionLabels,
		handleDirectionChange,
		handleInputChange,
		inputText,
		isLoading,
		outputText,
	} as const
}

export type { Direction }
