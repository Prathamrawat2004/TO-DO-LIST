import React from 'react';
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
const SignUp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const [AuthUser, setAuthUser] = useAuth();

    const onSubmit = async (data) => {
        const userInfo = {
            email: data.email,
            password: data.password
        };

        try {
            const res = await axios.post("http://localhost:3000/User/signup", userInfo);

            console.log(res.data);
            if (res.data) {
                toast.success("Signup successfull");
                
            }
            // setting up to localstorage in order to protect "add"
            localStorage.setItem("Users", JSON.stringify(res.data.user));
            setAuthUser(res.data.user);
            navigate('/');
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }


    }

    return (
        <>
            <div className='container border shadow rounded d-flex flex-md-column justify-content-center align-items-center col-md-4 mt-5'>
                <div className="container">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="">
                            <h1 className="" id="exampleModalLabel">Signup</h1>
                        </div>
                        <div className="my-2">
                            <span className='mx-2'>Email</span>
                            <input type="email"
                                className='mx-2'
                                placeholder="enter your email"
                                {...register("email", { required: true })} />
                            {errors.email && <span className='red'>This field is required</span>}
                        </div>
                        <div className="my-2">
                            <span className='mx-2'>Password</span>
                            <input type="password"
                                placeholder="enter your password"
                                {...register("password", { required: true })} />
                            {errors.password && <span className='red'>This field is required</span>}
                        </div>
                        <div className='d-flex justify-content-center mb-2 my-2'>
                            <button className='btn btn-danger'>Signup</button>
                        </div>
                    </form>
                </div>


            </div>
        </>
    );
};


export default SignUp;