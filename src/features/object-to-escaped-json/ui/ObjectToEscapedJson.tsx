import { CircularProgress, InputAdornment, MenuItem, Select, TextField } from "@mui/material"
import Box from "@mui/material/Box"
import {
	DIRECTION_OPTIONS,
	type Direction,
	useObjectToEscapedJson,
} from "../hooks/useObjectToEscapedJson"

export const ObjectToEscapedJson = () => {
	const {
		direction,
		directionLabels,
		handleDirectionChange,
		handleInputChange,
		inputText,
		isLoading,
		outputText,
	} = useObjectToEscapedJson()

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
					onChange={(event) =>
						handleDirectionChange(event.target.value as Direction)
					}
					fullWidth
				>
					{DIRECTION_OPTIONS.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
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
					onChange={(event) => handleInputChange(event.currentTarget.value)}
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
