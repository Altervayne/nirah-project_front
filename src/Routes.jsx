import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import DashBoard from "./pages/DashBoard"
import PageNotFound from "./pages/PageNotFound"
import ChatRoom from "./pages/ChatRoom"
import TermsOfUse from "./pages/TermsOfUse"

const ReactRoutes = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/dashboard' element={<DashBoard />} />
				<Route path='/room/:id' element={<ChatRoom />} />
				<Route path='/termsofuse' element={<TermsOfUse />} />
				<Route path='*' element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	)
}

export default ReactRoutes