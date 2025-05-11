import React, { useState } from 'react';
import { login } from '../api/api';
import { Link, useNavigate } from 'react-router-dom';
import Layout from './Layout';

const Login = () => {
  const navigate = useNavigate();
     const [input, setInput] = useState({
        
          email: "",
          password:"",
          
        });
        const onSubmitHandler = (e) => {
          const { name, value } = e.target;
          setInput({ ...input, [name]: value });
        };
         const submitHandler =async(e)=>{
                e.preventDefault();
    
                await login(input);
                navigate("/");
            }
    return (
      <Layout>
        <form onSubmit={submitHandler} className="max-w-md mx-auto my-20">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              onChange={onSubmitHandler}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              onChange={onSubmitHandler}
              name="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="floating_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </button>
          <Link to="/signup" className="text-xs ml-3">
            dont have a accout? <span className="font-bold">create here</span>
          </Link>
        </form>
      </Layout>
    );
};

export default Login;