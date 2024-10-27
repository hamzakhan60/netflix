"use client";
import Forum from "../components/forum";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState,useEffect } from "react";
import { IoMdClose } from "react-icons/io";

const Login = () => {
    const [email, setEmail] = useState('xyz@gmail.com');
    const [password, setPassword] = useState('12345');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();


    
    const handlePassword = (p) => {
        console.log(p);
    };

    const handleEmail = (e) => {
        console.log(e);
    };

    const handleSign = (e, p) => {
        console.log("email", e, "password", p);
        setEmail(e);
        setPassword(p);
        if (e && p) {
            loginUser();
        }
    };

    const loginUser = async () => {
        setLoading(true);
        try {
            const encodedEmail = encodeURIComponent(email);
            const encodedPassword = encodeURIComponent(password);
            const response = await fetch(`/api/login?email=${encodedEmail}&password=${encodedPassword}`);
            console.log(response.status);
            const status = response.status;
            
            if (!response.ok) {
                console.log(status)
                if (status == 404) {
                    setError('User Not Registered');
                } else if (status == 401) {
                    setError('Incorrect Password');
                }
               
            }
            const data = await response.json();
            if (status === 200) {
                localStorage.setItem("data", JSON.stringify(data.resData));
                router.push('/screens');
            }
            console.log(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-black">
            <div className="bg-black opacity-50">
                <img src="https://wpassets.brainstation.io/app/uploads/2017/04/13100509/Netflix-Background.jpg" alt="Background" className="w-full h-full" />
            </div>
            <nav className="w-full p-6 absolute top-1 z-50">
                <a href="#"><Image src="/netflixLogo.png" width={180} height={60} alt="logo" /></a>
                <div className={`p-4 ml-16 mb-4 flex flex-row justify-center items-center text-sm text-red-800 font-semibold rounded-lg bg-red-50 dark:bg-gray-800/25 dark:text-red-400 animate-fade-in-down ${error ? 'block' : 'hidden'}`} role="alert">
                    <span className="font-medium">Alert!</span> {error}
                    <span className="ml-10 cursor-pointer"><IoMdClose onClick={() => setError(null)} color="white" size={25} /></span>
                </div>
            </nav>

            {loading ? (
                <div class="absolute top-20 left-20 right-20 flex justify-center items-center">
                    <div class="absolute  animate-spin rounded-full h-60 w-60 border-t-4 border-b-4 border-purple-500"></div>
                    <img src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg" class="rounded-full h-56 w-56" />
                </div>
            ) : (
                <Forum sign="In" handlePassword={handlePassword} handleEmail={handleEmail} handleSign={handleSign} />
            )}
        </div>
    );
}

export default Login;
