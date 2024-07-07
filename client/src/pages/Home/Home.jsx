import React, { useContext, useEffect, useState } from "react";
import { AppState } from '../../App';
import axios from "../../axiosConfig";
import { Link } from "react-router-dom";

function Home() {
	const { user, setuser } = useContext(AppState);
	const [questionList, setQuestionList] = useState([]);
	const token = localStorage.getItem("token");
	async function fetchAllQuestions() {
		try {
			const { data } = await axios.get("/questions/all-questions", {
				headers: { Authorization: "Bearer " + token },
			});
			setQuestionList(data.questions);

			// console.log(data);
		} catch (error) {
			console.log(error.response);
		}
	}
	useEffect(() => {
		fetchAllQuestions();
	}, []);
  return (
    <div className="bg-slate-100">
   		   <div className="flex justify-between w-4/5 p-10 ml-10 text-3xl text-center">
				<div>
					<a
						href="/questions/ask"
						className="inline-block px-6 py-3 mt-4 mr-10 text-2xl leading-none text-white bg-blue-500 border border-white rounded hover:border-transparent hover:text-teal-500 hover:bg-blue-700 lg:mt-0"
					>
						Ask Question
					</a>
				</div>

				<h5 className="italic">Welcome: {user.username}</h5>
			</div>
			<div className="mx-30">
				<input
					type="text"
					className="w-4/5 p-3 ml-20 bg-white border border-gray-500 around"
					placeholder="search question"
				/>
				<br />
			</div>
			<hr />

			<div className="w-4/5 pt-8 pb-20 pr-20 mt-5 ml-20 overflow-y-scroll bg-white  max-h-80">
				{questionList?.map((single, i) => {
					let y = (
						<>
							<Link to={`/questions/${single.questionid}`}>
								<div key={i} className="flex justify-around py-6 max-h-50">
									<div className="pb-5 ">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth="1.5"
											stroke="currentColor"
											className="w-20 p-5 border-2 border-black border-solid rounded-full h-30 "
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
											/>
										</svg>

										{single.username}
									</div>

									{single.title}

									<div className="ml-80">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth="1.5"
											stroke="currentColor"
											className="w-6 h-6"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="m8.25 4.5 7.5 7.5-7.5 7.5"
											/>
										</svg>
									</div>
								</div>
							</Link>
							<hr class="h-px my-2 bg-gray-300 border-0 dark:bg-gray-500 mx-5"></hr>
						</>
					);
					return y;
				})}
			</div>
			<br />
			<br />
</div>
)
}

export default Home
