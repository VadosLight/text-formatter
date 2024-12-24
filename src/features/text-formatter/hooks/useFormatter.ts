import { replaceHangingPrepositions } from "../lib/replaceHangingPrepositions"
import { replaceSpacesInNumbers } from "../lib/replaceSpacesInNumbers"

export type FormatterParams = Partial<{
	predlog: boolean
	numbers: boolean
}>

export const useFormatter = (initialText: string, params?: FormatterParams) => {
	let result = initialText

	if (params?.predlog) {
		result = replaceHangingPrepositions(result)
	}

	if (params?.numbers) {
		result = replaceSpacesInNumbers(result)
	}

	return { resultText: result } as const
}
