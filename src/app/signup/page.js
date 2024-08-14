"use client";
import Forum from "../components/forum";
import Image from "next/image";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import PlanSelection from "../components/planCard";
import { useRouter } from 'next/navigation';

const SignUp = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [proceedSignup, setProceedSignup] = useState(true);
    const [password, setPassword] = useState(null);
    const [moveForward, setMoveForward] = useState(null);
    const [planSelection, setPlanSelection] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [loading, setLoading] = useState(false);

    const handlePassword = (p) => {
        setPassword(p);
    };

    const handleEmail = (e) => {
        setEmail(e);
    };

    const handleGetStarted = () => {
        fetchData();
    };

    const handleSign = (e, p) => {
        setEmail(e);
        setPassword(p);
        setMoveForward(false);
        setPlanSelection(true);
    };

    const handlePlan = (p) => {
        setSelectedPlan(p);
        createAccount();
        console.log(p);
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/checkEmail?email=${email}`);
            console.log(response.status);
            const status = response.status;
            if (status === 404) {
                setProceedSignup(true);
                setMoveForward(true);
            } else {
                setProceedSignup(false);
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };

    const createAccount = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, p: password, plan_id: selectedPlan }),
            });
            console.log(response.status);
            const status = response.status;
            if (status === 200) {
                alert("Successfully Created Account");
                router.push(`/login?email=${email}&p=${password}`);
            } else {
                alert("Error Occurred. Please Try Again");
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading && (
                <div class="absolute top-20 left-20 right-20 flex justify-center items-center">
                    <div class="absolute  animate-spin rounded-full h-60 w-60 border-t-4 border-b-4 border-purple-500"></div>
                    <img src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg" class="rounded-full h-56 w-56" />
                </div>
            )}
            {!loading && planSelection && (
                <div className="flex flex-col justify-center items-center bg-white mb-5">
                    <h1 className="text-3xl font-semibold mt-8">Choose the plan that's right for you</h1>
                    <PlanSelection handlePlan={handlePlan} />
                </div>
            )}
            {!loading && !planSelection && (
                <div className="relative min-h-screen bg-black">
                    <div className="bg-black opacity-50">
                        <img
                            src="https://wpassets.brainstation.io/app/uploads/2017/04/13100509/Netflix-Background.jpg"
                            alt="Background"
                            className="w-full h-full"
                        />
                    </div>
                    <nav className="w-full p-6 absolute top-2 z-50">
                        <Image src="/netflixLogo.png" width={180} height={60} alt="logo" />
                    </nav>
                    {moveForward ? (
                        <Forum sign="Up" email={email} handlePassword={handlePassword} handleEmail={handleEmail} handleSign={handleSign} />
                    ) : (
                        <div className="flex flex-col w-11/12 justify-center items-center absolute top-2 z-50 min-h-screen">
                            <p className="text-white font-serif font-normal text-5xl">Welcome!</p>
                            <h1 className="text-white font-serif font-normal text-center text-3xl">
                                This is a Netflix Clone App for Learning Purposes, but you can SignUp here as it implements a complete Auth system
                            </h1>
                            <div className={`mt-5 p-4 mb-4 flex flex-row justify-center items-center text-sm text-red-800 font-semibold rounded-lg bg-red-50 dark:bg-gray-800/25 dark:text-red-400 animate-fade-in-down ${!proceedSignup ? 'block' : 'hidden'}`} role="alert">
                                <span className="font-medium">404 Alert!</span> Email: {email} Already Exists
                                <span className="ml-10 cursor-pointer">
                                    <IoMdClose onClick={() => setProceedSignup(true)} color="white" size={25} />
                                </span>
                            </div>
                            <div className="w-1/2 mt-10 flex flex-row">
                                <input
                                    type="text"
                                    className="py-3 px-4 block w-2/3 text-white text-xl border-white rounded-lg bg-gray-500/40"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button
                                    onClick={handleGetStarted}
                                    className="text-white text-xl text-center bg-red-500 w-1/3 rounded-lg font-semibold hover:bg-red-500/85 ml-5"
                                >
                                    Get Started
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default SignUp;
