import React, { useContext, useEffect, useRef } from "react";
import { AppState } from "../../App";
import axios from "../../axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
function AskQuestion() {
	const { user, setuser } = useContext(AppState);
	console.log(user.userid);

	const token = localStorage.getItem("token");
	const navigatTo = useNavigate();
	const v4Id = uuidv4();

	const titlDom = useRef(null);
	const descriptionDom = useRef(null);
	async function postQuestions(e) {
		e.preventDefault();
		const titleValue = titlDom.current.value;
		const descriptionValue = descriptionDom.current.value;
		// console.log(titleValue, descriptionValue);
		if (!titleValue || !descriptionValue) {
			alert("all fields required");
			return;
		}
		try {
			await axios.post(
				"/questions/post-question",
				{
					questionid: v4Id,
					userid: user.userid,
					title: titleValue,
					description: descriptionValue,
				},
				{
					headers: {
						Authorization: "Bearer " + token,
					},
				}
			);
			alert("question posted");
			navigatTo("/questions");
		} catch (error) {
			console.log(error.response);
		}
	}

	return (
		<div className="bg-gray-200">
			<div className="p-10 pl-20">
				<h1 className="text-3xl underline decoration-solid">
					steps how to write a good questions
				</h1>
				<ul className="text-lg italic list-disc">
					<li className="pt-3 pb-2">
						Summmerize your questions in to one line title
					</li>
					<li className="pb-2">Describe yor question more details</li>

					<li className="pb-2">
						Describe what you tried and what you expected to happen.
					</li>
					<li className="pb-2">Review and post it here</li>
				</ul>
			</div>
			<br />

			<div className="mx-30">
				<h1 className="pr-20 mb-8 text-3xl text-center">Post Your Question</h1>
				<input
					type="text"
					className="w-3/4 p-3 ml-20 border border-gray-400 rounded-md border-radious-2rem bg-gray-50 "
					placeholder=" Question title"
					ref={titlDom}
				/>
				<br />
			</div>
			<br />
			<div className="mx-30">
				<input
					type="text"
					className="w-3/4 p-3 ml-20 border border-gray-500 rounded-lg bg-gray-50 max-h-30 pb-28 text-align-top"
					placeholder="question details..."
					ref={descriptionDom}
				/>
			</div>
			<div className="pb-10 mt-6 ml-20">
				<button
					onClick={postQuestions}
					className="px-3 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
					type="button"
				>
					post question
				</button>
			</div>
		</div>
	);
}

export default AskQuestion;
