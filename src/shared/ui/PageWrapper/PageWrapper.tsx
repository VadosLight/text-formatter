import type { PropsWithChildren } from "react"

import styles from "./PageWrapper.module.css"

export const PageWrapper = (props: PropsWithChildren<object>) => {
	return <main className={styles.page}>{props.children}</main>
}
