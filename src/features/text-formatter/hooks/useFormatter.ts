import { replaceHangingPrepositions } from "../lib/replaceHangingPrepositions"
import { replaceSpacesInNumbers } from "../lib/replaceSpacesInNumbers"
import { trimSpaces } from "../lib/trimSpaces"

export type FormatterParams = Partial<{
	predlog: boolean
	numbers: boolean
	trim: boolean
}>

export const useFormatter = (initialText: string, params?: FormatterParams) => {
	let result = initialText

	if (params?.trim) {
		result = trimSpaces(result)
	}

	if (params?.predlog) {
		result = replaceHangingPrepositions(result)
	}

	if (params?.numbers) {
		result = replaceSpacesInNumbers(result)
	}

	return { resultText: result } as const
}
