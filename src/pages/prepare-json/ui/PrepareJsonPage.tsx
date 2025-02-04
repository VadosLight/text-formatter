import { ObjectToEscapedJson } from "@features/object-to-escaped-json"
import { PageWrapper } from "@shared/ui/PageWrapper/PageWrapper"

const PrepareJsonPage = () => {
	return (
		<PageWrapper>
			<ObjectToEscapedJson />
		</PageWrapper>
	)
}

export default PrepareJsonPage
