import MenuIcon from "@mui/icons-material/Menu"

import { useAdaptiveWindows } from "@shared/index"

import styles from "./Header.module.css"

type HeaderProps = {
	onMenuClick: () => void
}

export const Header = (props: HeaderProps) => {
	const { onMenuClick } = props
	const { isMobile } = useAdaptiveWindows()

	return (
		<header className={styles.header}>
			{isMobile && <MenuIcon onClick={onMenuClick} />}
			<h1>Форматтер текста</h1>
		</header>
	)
}
