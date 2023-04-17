import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"


const ReactRoutes = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />} />
{/* 				<Route path='*' element={<PageNotFound />} /> */}
			</Routes>
		</BrowserRouter>
	)
}

export default ReactRoutes