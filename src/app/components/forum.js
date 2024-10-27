"use client"
import { useState } from "react"
import { IoMdClose } from "react-icons/io";


const Forum = ({ sign, email, handlePassword, handleEmail, handleSign}) => {

    const [password, setPassword] = useState(12345);
    const [proceed, setProceed] = useState(true);
    const [inputEmail,setInputEmail]=useState('xyz@gmail.com');

    const submit = () => {
        console.log(inputEmail,password)
        if (!password && !inputEmail)
            setProceed(false);
        else {
            setProceed(true);
            handlePassword(password)
                handleEmail(inputEmail)
                handleSign(inputEmail,password);
        }

    }

    return (
        <div className="flex justify-center absolute top-5 left-60 right-60  z-40 items-center min-h-screen animate-zoom-in">
            <div className="bg-black bg-opacity-50 p-8 rounded-lg w-full max-w-md">
                <h2 className="text-white text-3xl mb-8">Sign {sign}</h2>
                
                    <div className="relative mb-6">
                        <input type="text" value={'xyz@gmail.com'} onChange={(e)=>{setInputEmail(e.target.value)}} required className="w-full p-4 bg-gray-700 rounded focus:outline-none focus:bg-gray-800 text-white" placeholder="Email or phone number" />

                    </div>
                    <div className="relative mb-6">
                        <input type="password" value={12345} onChange={(e) => { setPassword(e.target.value) }} required className="w-full p-4 bg-gray-700 rounded focus:outline-none focus:bg-gray-800 text-white" placeholder="Password" />

                    </div>
                    <div className={`mt-5 p-4 mb-4  flex flex-row justify-center items-center text-sm text-red-800 font-semibold rounded-lg bg-red-50 dark:bg-gray-800/25 dark:text-red-400 animate-fade-in-down ${!proceed ? 'block' : 'hidden'}`} role="alert">
                        <span className="font-medium">Alert!</span> Please Fill Out The Fields
                        <span className="ml-10 cursor-pointer"><IoMdClose onClick={(e) => setProceed(true)} color="white" size={25} /></span>
                    </div>
                    <button  onClick={submit} className="w-full py-3 bg-red-600 text-white rounded mt-6 hover:bg-red-700">Sign {sign}</button>
                    <div className="flex justify-between items-center mt-4 text-gray-400">
                        <div className="flex items-center">
                            <input type="checkbox" id="remember-me" className="mr-2" />
                            <label htmlFor="remember-me">Remember me</label>
                        </div>
                        <a href="#" className="hover:underline">Need help?</a>
                    </div>
                
                {sign=="In" ?( 
                <p  className="text-gray-400 mt-6 ">New to Netflix? <a href="#" className="text-white hover:underline">Sign up now</a></p>
               ):'' }</div>
        </div>
    )
}


export default Forum
