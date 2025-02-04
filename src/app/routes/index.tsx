/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react"
import { createBrowserRouter, Navigate } from "react-router-dom"

import { MainLayout } from "../layouts/MainLayout/MainLayout"

const HomePage = lazy(() => import("@pages/home-page/ui/HomePage"))
const SpaceFixerPage = lazy(
	() => import("@pages/space-fixer/ui/SpaceFixerPage"),
)
const PrepareJsonPage = lazy(
	() => import("@pages/prepare-json/ui/PrepareJsonPage"),
)

export const router = createBrowserRouter([
	{
		path: "/text-formatter",
		element: <MainLayout />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: "/text-formatter/space-fixer",
				element: <SpaceFixerPage />,
			},
			{
				path: "/text-formatter/prepare-json",
				element: <PrepareJsonPage />,
			},
		],
	},
	{
		path: "*",
		element: <Navigate to={"/text-formatter"} />,
	},
])
