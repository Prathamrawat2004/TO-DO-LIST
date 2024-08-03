import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
const Login = ({ dark }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const userInfo = {
            email: data.email,
            password: data.password
        };

        try {
            const res = await axios.post("http://localhost:3000/User/login", userInfo);

            console.log(res.data);
            if (res.data) {
                toast.success("Login successfull");
                setTimeout(()=>{
                    window.location.reload();
                    // setting up to localstorage in order to protect "add"
                    localStorage.setItem("Users", JSON.stringify(res.data.user));

                },2000);
               
            }


        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }



    return (
        <>
            <div className='container border shadow rounded d-flex flex-column justify-content-center align-items-center col-md-4 mt-5 login'>
                <div className="container">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={`${dark ? "white" : "black"}`}>
                            <h1 className="mb-3 login1" id="exampleModalLabel">Login</h1>
                        </div>
                        <div className={`mb-2 ${dark ? "white" : "black"}`}>
                            <span className='mx-1 email'>Email</span>
                            <input type="email"
                                className='mx-3'
                                placeholder="enter your email"
                                {...register("email", { required: true })} />
                            {errors.email && <span className='red'>This field is required</span>}
                        </div>
                        <div className={`mb-2 ${dark ? "white" : "black"}`}>
                            <span className='mx-2 password'>Password</span>
                            <input type="text"
                                placeholder="enter your password"
                                {...register("password", { required: true })} />
                            {errors.password && <span className='red'>This field is required</span>}
                        </div>
                        <div className={`d-flex justify-content-center mb-2 ${dark ? "white" : "black"}`}>
                            <button className='btn btn-danger'>Login</button>
                        </div>

                        <div className='d-flex justify-content-between'>
                            <h6 className={`${dark ? "white" : "black"}`}>Create new account?</h6>
                            <h6> <Link to="/signup">Signup</Link></h6>
                        </div>
                    </form>
                </div>
            </div>


        </>
    )
}

export default Login;