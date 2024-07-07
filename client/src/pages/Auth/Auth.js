import React from "react";
import { useRef, useState } from "react";
import axios from "../../axiosConfig";
import { useNavigate } from "react-router-dom";

function Auth() {
	const navigatTo = useNavigate();
	const [login, setlogin] = useState(true);
	const [animate, setanimate] = useState(false);

	async function loginToggle() {
		setTimeout(
			() => {
				setanimate((animate) => !animate);
			},
			500,

			setlogin((login) => !login)
		);
	}

	const classToggle = animate ? "spin" : "none";
	const emailNameDom = useRef(null);
	const passWordDom = useRef(null);
	const userNameDom = useRef(null);
	const firstNameDom = useRef(null);
	const lastNameDom = useRef(null);

	const [show, setshow] = useState(false);

	function handlePassword() {
		if (!show) {
			setshow(true);
		} else {
			setshow(false);
		}
	}

	async function handlSubmit(e) {
		e.preventDefault();
		const emailValue = emailNameDom.current.value;
		const passWordValue = passWordDom.current.value;
		if (!emailValue || !passWordValue) {
			alert("all fields required");
			return;
		}
		try {
			const { data } = await axios.post("/users/login", {
				email: emailValue,
				password: passWordValue,
			});
			alert("user logged in successfully");
			localStorage.setItem("token", data.token);
			// console.log(data);
			navigatTo("/questions");
			// localStorage.setItem("", data.token);
		} catch (error) {
			alert(error.response?.data?.msg);
			console.log(error.response.data);
			navigatTo("/");
		}
	}

	async function handleSubmit(e) {
		e.preventDefault();
		const userNameValue = userNameDom.current.value;
		const firstNameValue = firstNameDom.current.value;
		const lastNameValue = lastNameDom.current.value;
		const emailValue = emailNameDom.current.value;
		const passWordValue = passWordDom.current.value;
		if (
			!userNameValue ||
			!firstNameValue ||
			!lastNameValue ||
			!emailValue ||
			!passWordValue
		) {
			alert("all fields required");
			return;
		}
		try {
			await axios.post("/users/register", {
				username: userNameValue,
				firstname: firstNameValue,
				lastname: lastNameValue,
				email: emailValue,
				password: passWordValue,
			});
			alert("user registered successfully");
			setTimeout(
				() => {
					setanimate((animate) => !animate);
				},
				500,
				setlogin(true)
			);

			navigatTo("/");
		} catch (error) {
			alert("somthing went wrong");
			console.log(error.response.data);
		}
	}

	return (
		<>
			{login ? (
				<div
					id="login"
					className={`animate-${classToggle} bg-white mt-10 mb-5 ml-20 text-center w-1/3 border rounded-md border-gray-200 scroll-smooth`}
				>
					<br />
					<div className="w-full px-5">
						<div className="px-5 text-2xl text-center">
							Login to your account
						</div>

						<div className="p-1">
							<span>Don’t have an account? </span>

							<div
								onClick={loginToggle}
								className="text-red-400 hover:cursor-pointer touch-pan-right"
							>
								Create a new account
							</div>
						</div>
						<form
							onSubmit={handlSubmit}
							className="px-4 pt-6 pb-4 mb-4 rounded "
						>
							<div className="mb-4">
								<input
									className="w-full px-3 py-2 mb-5 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
									id="email"
									type="email"
									placeholder="email"
									ref={emailNameDom}
								/>
								<br />
							</div>
							<div className="flex justify-between mb-6">
								<input
									className="inline-flex w-full px-3 py-2 mb-5 leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:bg-green-50 "
									id="password"
									type={show ? "text" : "password"}
									placeholder="password"
									ref={passWordDom}
								/>

								<p
									onClick={handlePassword}
									className="absolute py-2 pl-10 text-xs italic text-black ml-60 hover:cursor-pointer"
								>
									{show ? (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											class="w-5 h-5"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
											/>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
											/>
										</svg>
									) : (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											class="w-5 h-5"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
											/>
										</svg>
									)}
								</p>
							</div>
							<div className="flex items-center justify-between">
								<button
									className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
									type="submit"
								>
									Sign In
								</button>
								<button
									onClick={loginToggle}
									className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
								>
									Sign Up
								</button>
							</div>
						</form>
					</div>
					<br />
				</div>
			) : (
				<div
					whiconstap={{ x: -100, opacity: 0 }}
					className="w-1/3 p-2 mt-10 mb-5 ml-20 bg-white border border-gray-200 rounded-md"
				>
					<h1 className="text-2xl text-center">create account</h1>
					<form onSubmit={handleSubmit} className="px-8 pt-6 pb-4 rounded ">
						<div className="mb-4">
							<input
								className="w-full px-3 py-3 leading-tight text-gray-700 border border-gray-400 rounded shadow appearance-none focus:outline-none focus:bg-green-50"
								// id="username"
								type="text"
								placeholder="Username"
								ref={userNameDom}
								// value={userNameDom}
							/>
						</div>
						<div className="mb-4">
							<input
								className="w-full px-3 py-2 leading-tight text-gray-700 border border-gray-400 rounded shadow appearance-none focus:outline-none focus:bg-green-50"
								// id="username"
								type="text"
								placeholder="first name"
								ref={firstNameDom}
							/>
						</div>
						<div className="mb-4">
							<input
								className="w-full px-3 py-2 leading-tight text-gray-700 border border-gray-400 rounded shadow appearance-none focus:outline-none focus:bg-green-50"
								// id="username"
								type="text"
								placeholder="last name"
								ref={lastNameDom}
							/>
						</div>
						<div className="mb-4">
							<input
								className="w-full px-3 py-2 leading-tight text-gray-700 border border-gray-400 rounded shadow appearance-none focus:outline-none focus:bg-green-50"
								// id="username"
								type="email"
								placeholder="email"
								ref={emailNameDom}
							/>
						</div>
						<div className="flex justify-between mb-6">
							<input
								className="inline-flex w-full px-3 py-2 leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:bg-green-50 "
								id="password"
								type={show ? "text" : "password"}
								placeholder="******************"
								ref={passWordDom}
							/>

							<p
								onClick={handlePassword}
								className="absolute py-2 pl-10 text-xs italic text-black ml-60 hover:cursor-pointer"
							>
								{show ? (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="w-5 h-5"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
										/>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
										/>
									</svg>
								) : (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="w-5 h-5"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
										/>
									</svg>
								)}
							</p>
						</div>

						<div className="flex items-center justify-between text-center ">
							<button
								className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
								type="submit"
							>
								Register
							</button>
							<button
								onClick={loginToggle}
								className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
							>
								I have account
							</button>
						</div>
					</form>
				</div>
			)}
		</>
	);
}

export default Auth;
