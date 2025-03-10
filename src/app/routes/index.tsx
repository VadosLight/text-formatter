/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from "react"
import { createBrowserRouter, Navigate } from "react-router-dom"

import { Box, CircularProgress } from "@mui/material"

import { MainLayout } from "../layouts/MainLayout/MainLayout"

const PageLoader = () => (
	<Box
		display="flex"
		justifyContent="center"
		alignItems="center"
		minHeight="100vh"
	>
		<CircularProgress />
	</Box>
)

const HomePage = lazy(() => import("@pages/home-page"))
const SpaceFixerPage = lazy(() => import("@pages/space-fixer"))
const PrepareJsonPage = lazy(() => import("@pages/prepare-json"))

export const router = createBrowserRouter([
	{
		path: "/text-formatter",
		element: (
			<Suspense fallback={<PageLoader />}>
				<MainLayout />
			</Suspense>
		),
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
