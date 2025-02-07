// MainLayout.js
import { useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"

import { Button } from "@mui/material"

import { Header } from "@widgets/header"
import { Sidebar } from "@widgets/sidebar"

import styles from "./MainLayout.module.css" // Импорт модульных стилей

// Базовый компонент MainLayout
export const MainLayout = () => {
	const [isSidebarOpen, setSidebarOpen] = useState(true)
	const navigate = useNavigate() // Используем useNavigate для управления навигацией

	const handleBack = () => {
		navigate(-1) // Возвращаемся на предыдущую страницу
	}

	return (
		<div className={styles["main-layout"]}>
			{/* Header */}
			<Header onMenuClick={() => setSidebarOpen((p) => !p)} />

			{/* Wrapper для Sidebar и Outline */}
			<div className={styles["content-wrapper"]}>
				<Sidebar
					open={isSidebarOpen}
					onClose={() => {
						if (isSidebarOpen) {
							setSidebarOpen(false)
						}
					}}
				/>

				{/* Outline (основной контент) - используем Outlet */}
				<main className={styles.outline}>
					{/* Кнопка "Назад" */}
					<Button onClick={handleBack} className={styles["back-button"]}>
						Назад
					</Button>

					{/* Отображение дочерних маршрутов */}
					<Outlet />
				</main>
			</div>
		</div>
	)
}
