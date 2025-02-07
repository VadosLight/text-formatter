// MainLayout.js
import { Outlet, useNavigate } from "react-router-dom"

import { Button } from "@mui/material"

import { Sidebar } from "@widgets/sidebar"

import styles from "./MainLayout.module.css" // Импорт модульных стилей

// Компонент Header
const Header = () => {
	return (
		<header className={styles.header}>
			<h1>Форматтер текста</h1>
		</header>
	)
}

// Базовый компонент MainLayout
export const MainLayout = () => {
	const navigate = useNavigate() // Используем useNavigate для управления навигацией

	const handleBack = () => {
		navigate(-1) // Возвращаемся на предыдущую страницу
	}

	return (
		<div className={styles["main-layout"]}>
			{/* Header */}
			<Header />

			{/* Wrapper для Sidebar и Outline */}
			<div className={styles["content-wrapper"]}>
				<Sidebar />

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
