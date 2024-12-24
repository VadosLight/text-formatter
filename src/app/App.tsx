import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"

import { HomePage } from "@pages/HomePage"

const router = createBrowserRouter([
	{
		path: "/",
		index: true,
		element: <HomePage />,
		errorElement: <Navigate to={"/"} />,
	},
	{
		path: "*",
		element: <Navigate to={"/"} />,
	},
])

function App() {
	return <RouterProvider router={router} />
}

export default App
