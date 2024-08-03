import React from 'react'
import { useAuth } from '../context/AuthProvider';
import toast from 'react-hot-toast';

const Logout = () => {
    const [authUser, setAuthUser] = useAuth();
    const handleLogout = () => {
        try {
            setAuthUser({
                ...authUser,
                user: null
            });
            toast.success("LoggedOut successfully!");
            setTimeout(() => {
                localStorage.removeItem("Users");
                window.location.reload();

            }, 2000);
        } catch (error) {
            toast.error("Couldn't log out!");
        }
    }
    return (
        <button className='btn btn-danger mx-2' onClick={handleLogout}>Logout</button>
    )
}

export default Logout;