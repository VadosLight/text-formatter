import { TextFormatter } from "@features/text-formatter"

import styles from "./HomePage.module.scss"

const HomePage = () => {
	return (
		<div className={styles.page}>
			<TextFormatter />
		</div>
	)
}

export default HomePage
