import { useLocation, useNavigate } from "react-router-dom"

import styles from "./Sidebar.module.css"

type MenuItem = {
	label: string
	path: string
}

const menuItems: MenuItem[] = [
	{
		label: "Главная",
		path: "/text-formatter",
	},
	{
		label: "Настройка неразрывных отступов",
		path: "/text-formatter/space-fixer",
	},
	{
		label: "Конвертер SDUI шаблона",
		path: "/text-formatter/prepare-json",
	},
]

export const Sidebar = () => {
	const navigate = useNavigate()
	const location = useLocation()

	return (
		<aside className={styles.sidebar}>
			<nav>
				<ul>
					{menuItems.map((item) => (
						<li
							key={item.path}
							onClick={() => {
								navigate(item.path)
							}}
							className={
								location.pathname === item.path ? styles.activeLink : ""
							}
						>
							{item.label}
						</li>
					))}
				</ul>
			</nav>
		</aside>
	)
}
