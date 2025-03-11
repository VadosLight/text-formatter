import { replaceHangingPrepositions } from "../lib/replaceHangingPrepositions"
import { replaceMultipleSpaces } from "../lib/replaceMultipleSpaces"
import { replaceSpacesInNumbers } from "../lib/replaceSpacesInNumbers"
import { trimSpaces } from "../lib/trimSpaces"

export type FormatterParams = {
	predlog?: boolean
	numbers?: boolean
	trim?: boolean
	innerSpaces?: boolean
}

export const useFormatter = (initialText: string, params?: FormatterParams) => {
	let result = initialText

	if (params?.trim) {
		result = trimSpaces(result)
	}

	if (params?.innerSpaces) {
		result = replaceMultipleSpaces(result)
	}

	if (params?.numbers) {
		result = replaceSpacesInNumbers(result)
	}

	if (params?.predlog) {
		result = replaceHangingPrepositions(result)
	}

	return { resultText: result } as const
}
