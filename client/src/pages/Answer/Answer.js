import React, { useContext, useEffect, useRef, useState } from "react";
import { AppState } from "../../App";
import axios from "../../axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
function AnswerPage() {
	const { user, setuser } = useContext(AppState);
	// console.log(user.userid);
	const token = localStorage.getItem("token");
	const navigatTo = useNavigate();
	const [ansers, setansers] = useState([]);
	const [singlequestion, setsinglequestion] = useState({});
	const { questionid } = useParams();
	// console.log(questionid);
	const answerDom = useRef(null);

	const getanswerid = uuidv4();
	// console.log(getanswerid);

	async function fetchsinglequestion() {
		try {
			const { data } = await axios.get("/questions/" + questionid, {
				headers: { Authorization: "Bearer " + token },
			});
			// console.log(data[0]);
			setsinglequestion(data[0]);
		} catch (error) {
			console.log(error.response);
		}
	}
	async function fetchAnswers() {
		try {
			const { data } = await axios.get("/answers/" + questionid, {
				headers: { Authorization: "Bearer " + token },
			});
			// console.log(data.answers);
			setansers(data.answers);
		} catch (error) {
			console.log(error.response);
		}
	}
	async function postAnser() {
		const answerValue = answerDom.current.value;

		if (!answerValue) {
			alert("answer field is required");
			return;
		}
		try {
			const { data } = await axios.post(
				"/answers/" + questionid,
				{
					answerid: getanswerid,
					userid: user.userid,
					questionid: questionid,
					answer: answerValue,
				},
				{
					headers: {
						Authorization: "Bearer " + token,
					},
				}
			);
			alert("answer posted");
			// navigatTo("/questions");
		} catch (error) {
			console.log(error.response);
		}
	}
	useEffect(() => {
		fetchsinglequestion();
	}, []);
	useEffect(() => {
		fetchAnswers();
	}, []);
	return (
		<div className="pt-10 bg-slate-100 pl-30">
			<div className="pl-20">
				<h1 className="text-4xl underline decoration-solid">QUESTION</h1>
			</div>
			<div className="pl-20 mb-10 text-lg">
				<h1 className="py-3 text-4xl italic decoration-solid">
					{singlequestion.title}
				</h1>
				<p className="text-2xl italic bold">{singlequestion.description}</p>
			</div>
			<hr />
			<div className="py-2 pl-20 ">
				<h1 className="text-5xl">Answer From The Community</h1>
			</div>
			<hr />
			<div className="w-4/5 py-10 pl-10 my-10 ml-20 overflow-y-scroll bg-gray-200  max-h-80">
				{ansers?.map((each, i) => {
					const answersList = (
						<>
							<div className="flex pt-3 pb-10 mb-5 border-black bottom ">
								<div key={i}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="currentColor"
										className="w-20 p-5 border-2 border-black border-solid rounded-full h-30"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
										/>
									</svg>
									<h2 className="pl-3 text-2xl">{user.username}</h2>
								</div>
								<div className="mt-10 ml-10 italic ">{each.answer}</div>
							</div>
							<hr class="h-px my-2 bg-gray-300 border-0 dark:bg-gray-500 mr-5"></hr>
						</>
					);

					return answersList;
				})}
			</div>

			<div className="mx-30 ">
				<input
					type="text"
					className="w-4/5 p-3 ml-20 border border-gray-500 rounded-lg bg-gray-50 max-h-30 pb-28 text-align-top"
					placeholder="your anser..."
					ref={answerDom}
				/>
			</div>
			<div className="flex justify-between w-4/5 pb-10 mt-6 ml-20">
				<button
					onClick={postAnser}
					className="px-3 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
					type="button"
				>
					post Answer
				</button>
				<a
					href="/questions"
					className="px-3 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
				>
					Back to question page
				</a>
			</div>
		</div>
	);
}

export default AnswerPage;
