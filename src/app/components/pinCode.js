"use client";
import { useState, useRef } from "react";
import { IoMdClose } from "react-icons/io";

const PinCode = ({ handleInputPin,handleClosePin }) => {
    const [pinCode, setPinCode] = useState({ code1: "", code2: "", code3: "", code4: "" });
    const inputRefs = useRef([]);
    

    const handleClose=()=>{
        handleClosePin();
    }

    const handleChange = (e, index) => {
        const { value } = e.target;
        
        if (/^[0-9]$/.test(value) || value === "") {
            const newPinCode = { ...pinCode, [`code${index + 1}`]: value };
            setPinCode(newPinCode);
            console.log(pinCode);
            // Move to the next input if filled
            if (value !== "" && index < 3) {
                inputRefs.current[index + 1].focus();
            }

            // Move to the previous input if empty
            if (value === "" && index > 0) {
                inputRefs.current[index - 1].focus();
            }
            if (index+1==4) {
                console.log(value);
                const pinCodeString = Object.values(pinCode).join('')+ value;
                handleInputPin(pinCodeString);
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && pinCode[`code${index + 1}`] === "" && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    return (
        <>
            <div className="absolute overflow-hidden -top-5 flex flex-row justify-center items-center mb-2 space-x-10 rtl:space-x-reverse h-screen w-screen bg-black/55 animate-zoom-in">
            
                {[0, 1, 2, 3].map((_, index) => (
                    <div key={index}>
                        <label htmlFor={`code-${index + 1}`} className="sr-only">Code {index + 1}</label>
                        <input
                            type="text"
                            maxLength="1"
                            id={`code-${index + 1}`}
                            className="block w-14 h-18 py-2 text-5xl font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            required
                            value={pinCode[`code${index + 1}`]}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}

                            ref={(el) => inputRefs.current[index] = el}
                        />
                    </div>
                    
                ))}
                <IoMdClose color="white" className="-mt-20 cursor-pointer" size={32}   onClick={handleClose} />
            </div>
        </>
    );
};

export default PinCode;
