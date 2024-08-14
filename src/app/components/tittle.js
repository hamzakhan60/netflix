"use client"
import { SiNetflix } from 'react-icons/si';
import { FaPlay } from "react-icons/fa6";
import { Anton } from 'next/font/google';
import { MdInfoOutline } from "react-icons/md";
import { useEffect, useState } from 'react';
import { SlPlus } from "react-icons/sl";
import { FaThumbsUp } from "react-icons/fa6";

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
});

const Title = ({ data,titleColor,titleSize,animation,description,play,infoButton }) => { // Destructure the data prop
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false); // Correct spelling

  useEffect(() => {
    if (data) {
      setDetails(data);
      console.log(data);
    } else {
      setLoading(true);
    }
  }, [data]);

  return (
    <>
      {!details ? (
        <p>loading...</p> // Correct closing tag for <p>
      ) : (
        <>
          <div className="absolute top-20 left-11 inset-0 flex flex-col justify-center items-start">
            <div className="flex flex-row justify-left">
              <SiNetflix color="red" size={32} />
              <span className={`font-sans text-2xl font-semibold text-white`}>
                {details.movieid ? 'F I L M' : 'S E R I E S'}
              </span>
            </div>
            <h1 className={`${anton.className} justify-self-start text-${titleColor}-700 text-${titleSize} font-bold italic ${animation ? 'animate-shrink' : 'animation-none'} ${!titleColor ? 'text-red-700': '' } `}>
              {details.title}
            </h1>
            <h2 className={`font-sans text-white font-semibold w-1/2 animate-slide-down ${description ? 'block':'hidden'}`}>
              {details.description}
            </h2>
            <div className="w-1/4 flex flex-row justify-evenly items-center mt-4">
            <button className="flex items-center bg-white text-black font-bold px-4 py-2 rounded">
          <FaPlay className="mr-2" /> Play
        </button>
              <button className={`${infoButton ? 'flex':'hidden'} justify-center text-xl  items-center text-white font-bold bg-[#2D2D2D] px-4 py-2 rounded-md `}>
                <MdInfoOutline  color="white" className="mr-2" />
                More Info
              </button>
              <button className={!infoButton ? 'block' : 'hidden' }>
              <SlPlus color="white" className="mr-3 bg-slate-700/70 rounded-full ml-2" size={39} />
              </button>
              <button className={!infoButton ? 'block' : 'hidden' }>
              <FaThumbsUp color="white" className="mr-3 rounded-full p-2  ml-2  bg-slate-700/70  border border-white " size={39} />
              </button>
              
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Title;
