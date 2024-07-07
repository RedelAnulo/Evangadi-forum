import React from 'react';

import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState, createContext } from "react";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SharedLayout from "./pages/SharedLayout/SharedLayout";
import Landing from "./pages/Landing/Landing";
import AskQuestion from "./pages/AskQuestion/AskQuestion";
import Answer from "./pages/Answer/Answer";
import NotFound from "./pages/NotFound/NotFound";

import axios from "./axiosConfig";

export const AppState = createContext();

function App() {
	const [user, setUser] = useState({});
	const token = localStorage.getItem("token");
	const navigate = useNavigate();
	async function checkUser() {
		try {
			const { data } = await axios.get("/users/check", {
				headers: {
					Authorization: "Bearer " + token,
				},
			});
			setUser(data);
		} catch (error) {
			console.log(error.response);
			navigate("/login");
		}
	}

	useEffect(() => {
		checkUser();
	}, []);

	return (
		<AppState.Provider value={{ user, setUser }}>
			<Routes>
				<Route path="/" element={<SharedLayout />}>
					<Route path="/" element={<Landing />} />
					<Route path="/questions" element={<Home />} />
					<Route path="/questions/ask" element={<AskQuestion />} />
					<Route path="/questions/:questionid" element={<Answer />} />
					<Route path="/" element={<Login />} />
					<Route path="/*" element={<NotFound />} />
				</Route>
			</Routes>
		</AppState.Provider>
	);
}

export default App;
