import React from 'react';
import { SlPlus } from "react-icons/sl";

const RecommendationCard = ({data}) => {
  return (
    <div className="flex m-1 w-64  ">
      <div className="w-full bg-[#2F2F2F] rounded overflow-hidden shadow-lg">
        <img
          className="w-full"
          src= {data.imageurl||"https://tailwindcss.com/img/card-top.jpg"}
          alt="Sunset in the mountains"
        />
        <div className="px-6 py-4">
        <div className='flex flex-row justify-between'>
          <div className="font-bold   text-xl mb-2">
          <span className=" border border-[#A4A4A4] text-center rounded  px-2 text-white  text-base  font-sans">{data.mpaarating}</span>
          <span className="ml-2 mt-0.5 rounded text-center  px-2  text-xs h-5 border border-[#A4A4A4] w-10 ">HD</span>
        <span className='ml-2 text-base font-normal'>{data.releaseyear}</span>
          </div>
          <div><button> <SlPlus color="white"  className="rounded-full   ml-9  " size={32} /></button></div>
          </div>
          <p className=" text-sm pb-3">
            {data.description}
          </p>
        </div>
       
      </div>
    </div>
  );
};

export default RecommendationCard;
