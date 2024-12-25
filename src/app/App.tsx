import { lazy } from "react"

const HomePage = lazy(() => import("@pages/HomePage/ui/HomePage"))

function App() {
	return <HomePage />
}

export default App
