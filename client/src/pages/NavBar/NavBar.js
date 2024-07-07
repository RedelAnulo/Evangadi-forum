import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../axiosConfig";

function Navbar() {
	// const { user, setuser } = useContext(AppState);
	const [user, setuser] = useState(false);
	const token = localStorage.getItem("token");
	const [signin, setSignin] = useState(true);
	async function getUser() {
		try {
			const { data } = await axios.get("/users/check", {
				headers: { Authorization: "Bearer " + token },
			});
			setuser(true);
			setSignin(false);
		} catch (error) {
			console.log(error.response);
		}
	}
	// console.log(user);
	function handlesignin() {
		if (!user) {
			setSignin(true);
		} else {
			setSignin(false);
		}
	}
	function handleUser() {
		const token = localStorage.removeItem("token");
		setuser("");
		setSignin(true);
		return token;
	}
	useEffect(() => {
		getUser();
	});

	// useEffect(() => {
	// 	handlesignin();
	// }, [signin]);
	return (
		<nav className="flex flex-wrap items-center justify-between px-20 py-10 bg-white">
			<div className="flex items-center flex-shrink-0 mr-6 text-black">
				<img
					src="https://forum.ibrodev.com/assets/evangadi-logo-5fea54cc.png"
					alt=""
				/>
			</div>
			<div className="justify-around flex-grow block w-full lg:flex lg:items-right lg:w-auto">
				<div className="justify-between  lg:flex-grow pl-80 items-right">
					<a
						href="#responsive-header"
						className="block mt-4 mr-4 text-black lg:inline-block lg:mt-0 hover:text-white"
					>
						HOME
					</a>
					<a
						href="#responsive-header"
						className="block mt-4 text-black lg:inline-block lg:mt-0 hover:text-white "
					>
						How it works
					</a>
				</div>
				<div>
					{signin ? (
						<Link
							to="/"
							className="inline-block px-10 py-2 pr-10 mt-4 mr-10 text-sm leading-none text-white bg-blue-500 border border-white rounded hover:border-transparent hover:text-teal-500 hover:bg-blue-700 lg:mt-0"
						>
							SIGN IN
						</Link>
					) : (
						<Link
							onClick={handleUser}
							to="/"
							className="inline-block px-10 py-2 pr-10 mt-4 mr-10 text-sm leading-none text-white bg-blue-500 border border-white rounded hover:border-transparent hover:text-teal-500 hover:bg-blue-700 lg:mt-0"
						>
							SIGN OUT
						</Link>
					)}
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
