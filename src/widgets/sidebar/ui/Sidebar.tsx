import { useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import clsx from "clsx"
import { useOnClickOutside, useScrollLock } from "usehooks-ts"

import { useAdaptiveWindows } from "@shared/index"

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

type SidebarProps = {
	open: boolean
	onClose: () => void
}

export const Sidebar = (props: SidebarProps) => {
	const { open, onClose } = props
	const navigate = useNavigate()
	const location = useLocation()
	const { isMobile } = useAdaptiveWindows()

	const ref = useRef(null)
	useOnClickOutside(ref, onClose)
	useScrollLock({ autoLock: isMobile && open })

	return (
		<aside
			ref={ref}
			className={clsx(styles.sidebar, {
				[styles.open]: isMobile ? open : undefined,
			})}
		>
			<nav>
				<ul>
					{menuItems.map((item) => (
						<li
							key={item.path}
							onClick={() => {
								onClose()
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
