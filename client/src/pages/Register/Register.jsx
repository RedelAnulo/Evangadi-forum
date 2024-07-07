import React from 'react';
import { useRef, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import axios from '../../axiosConfig';

        function Register({toggle}) {
          const navigate = useNavigate()
    const userNameDom = useRef();
    const firstNameDom = useRef();
    const lastNameDom = useRef();
    const emailDom = useRef();
    const passwordDom = useRef();
    const [show, setshow] = useState(false);

    function handlePassword() {
      if (!show) {
        setshow(true);
      } else {
        setshow(false);
      }
    }

      async function handleSubmit(e) {
      e.preventDefault()

      const usernameValue = userNameDom.current.value;
      const firstValue = firstNameDom.current.value;
      const lastValue = lastNameDom.current.value;
      const emailValue = emailDom.current.value;
      const passwordValue = passwordDom.current.value;

      if (!usernameValue || !firstValue || !lastValue || !emailValue || !passwordValue) {
        alert('please provide all required information');
        return;
      }

      try {
        await axios.post('/users/register', {
          username: usernameValue,
					firstname: firstValue,
					lastname: lastValue,
					email: emailValue,
					password: passwordValue,
        })
        alert('register successful')
        navigate('/login')
      } catch (error) {
        alert('something went wrong')
        console.log(error.response)
      }
      }


  return (
    <>
    <div className="w-1/3 p-2 mt-10 mb-5 ml-20 border border-gray-200 rounded-md bg-zinc-100 max-h-90">
    <h1 className="text-2xl text-center">create account</h1>
      <form onSubmit={handleSubmit} className="px-8 pt-6 pb-10 rounded ">
        <div className="mb-4">
          <input className="w-full px-3 py-3 leading-tight text-gray-700 border border-gray-400 rounded shadow appearance-none focus:outline-none focus:bg-green-50" ref={userNameDom} type="text" placeholder='username'/>
        </div>
        <div className="mb-4">
          <input className="w-full px-3 py-2 leading-tight text-gray-700 border border-gray-400 rounded shadow appearance-none focus:outline-none focus:bg-green-50" ref={firstNameDom} type="text" placeholder='first name'/>
        </div>
        <div className="mb-4">
          <input className="w-full px-3 py-2 leading-tight text-gray-700 border border-gray-400 rounded shadow appearance-none focus:outline-none focus:bg-green-50" ref={lastNameDom} type="text" placeholder='last name'/>
        </div>
        <div className="mb-4">
          <input className="w-full px-3 py-2 leading-tight text-gray-700 border border-gray-400 rounded shadow appearance-none focus:outline-none focus:bg-green-50" ref={emailDom} type="text" placeholder='email'/>
        </div>
        <div className="flex justify-between mb-6">
						<input
							className="inline-flex w-full px-3 py-2 leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:bg-green-50 "
							id="password"
							type={show ? "text" : "password"}
							placeholder="******************"
							ref={passwordDom}
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
          <div className="flex items-center justify-between px-10">
						<button
							className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
							type="submit"
						>
							Register
						</button>
						<button
							onClick={() => toggle(true)}
							className="px-6 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
							type="button"
						>
							I have account
						</button>
					</div>
      </form>
    </div>
    </>
  )
}

export default Register
