import { useWindowSize } from "@uidotdev/usehooks"

export const useAdaptiveWindows = () => {
	const { width } = useWindowSize()

	if (!width) {
		return {
			isDesktop: true,
			isMobile: false,
			type: "desktop",
		}
	}

	return {
		isDesktop: width >= 768,
		isMobile: width < 768,
		type: "desktop",
	}
}
