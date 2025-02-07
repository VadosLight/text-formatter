import type { FormatterParams } from "../hooks/useFormatter"

import { useState } from "react"

import { Checkbox, FormControlLabel, FormGroup, TextField } from "@mui/material"
import Box from "@mui/material/Box"
import { useDebounce } from "@uidotdev/usehooks"

import { useFormatter } from "../hooks/useFormatter"

const checkboxList = [
	{ name: "predlog", label: "Неразрывные пробелы предлогов" },
	{ name: "numbers", label: "Неразрывные пробелы числительных" },
	{ name: "trim", label: "Убрать висячие пробелы" },
	{ name: "innerSpaces", label: "Убрать повторяющиеся пробелы" },
] as const

const defaultCheckboxes: FormatterParams = {
	numbers: true,
	predlog: true,
	trim: true,
	innerSpaces: true,
}

export const TextFormatter = () => {
	const [checkboxes, setCheckboxes] =
		useState<FormatterParams>(defaultCheckboxes)
	const [initialText, setInitialText] = useState("")
	const debounced = useDebounce(initialText, 1500)
	const { resultText } = useFormatter(debounced, checkboxes)

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCheckboxes({
			...checkboxes,
			[event.target.name]: event.target.checked,
		})
	}

	return (
		<Box
			sx={{
				backgroundColor: "AppWorkspace",
				borderRadius: 1,
				padding: 2,
				display: "flex",
				flexDirection: "column",
				gap: 4,
				width: "100%",
			}}
		>
			<Box
				sx={{
					backgroundColor: "AppWorkspace",
					padding: 1,
					gap: 1,
					display: "flex",
				}}
			>
				<FormGroup>
					{checkboxList.map((item) => {
						return (
							<FormControlLabel
								key={item.name}
								label={item.label}
								control={
									<Checkbox
										checked={!!checkboxes[item.name]}
										onChange={handleChange}
										name={item.name}
									/>
								}
							/>
						)
					})}
				</FormGroup>
			</Box>
			<Box
				sx={{
					backgroundColor: "AppWorkspace",
					padding: 1,
					gap: 1,
					display: "flex",
					flexWrap: "wrap",
				}}
			>
				<TextField
					fullWidth
					multiline
					label="Ваш текст"
					minRows={10}
					maxRows={20}
					value={initialText}
					defaultValue={initialText}
					onChange={(e) => setInitialText(e.currentTarget.value)}
				/>
				<TextField
					fullWidth
					multiline
					label="Результат"
					minRows={10}
					maxRows={20}
					value={resultText}
				/>
			</Box>
		</Box>
	)
}
