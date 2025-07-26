import React from 'react'
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form'
import { redirect } from 'react-router-dom'
import { NavLink } from 'react-router-dom';
import { useAuth } from './AuthContext';
const Login = () => {

  const {setIsLoggedIn, setUser} = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const onSubmit = async (data) => {
    console.log(data)

    try {

      const response = await fetch(`http://localhost:3000/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        credentials: "include"
      });

      if (response.ok) {
        const result = await response.json();
        if(result.islogin){
          setIsLoggedIn(true);
          setUser(result.user);
          console.log("User loggedin:", result);
          alert("User Loggedin successfully!");
          reset(); // clear form
          if (result.user.role === "freelancer") {
          navigate(`/freelancerprofile/${result.user.freelancerId}`);
          } else {
            navigate(`/clientprofile/${result.user.clientId}`);
            console.log("client")
          }
        }else{
          alert("something Went Wrong!");
        }
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.log(error.message)
    }

  }

  return (
    <div className='min-h-screen flex justify-center items-center'>
      <form onSubmit={handleSubmit(onSubmit)} className='M flex flex-col justify-center items-center p-3 gap-10 shadow-md lg:h-[500px] w-[550px] border border-slate-300 rounded-md'>
        <div className='lg:text-4xl font-bold'>
          Login To Your Account
        </div>
        
        <div>
          <input
            className='p-1 lg:w-[500px] border border-slate-300 rounded-xl'
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
            })}
          />
          {errors.email && <p className='text-red-600'>{errors.email.message}</p>}
        </div>

        <div>
          <input
            type="password"
            className='p-1 lg:w-[500px] border border-slate-300 rounded-xl'
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 4, message: 'Minimum length is 4' },
              maxLength: { value: 10, message: 'Maximum length is 10' }
            })}
          />
          {errors.password && <p className='text-red-600'>{errors.password.message}</p>}
        </div>


        <button type='submit' className='bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 lg:w-[500px]'>Login</button>
        <div>You dont have an account?
          <NavLink to="/Signin" className="text-blue-600">
            Signup
          </NavLink>
        </div>
      </form>
    </div>
  )
}

export default Login;
