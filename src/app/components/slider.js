"use client";
import { Virtual, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Card from './card';
import './slider.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import React, { useState, useEffect } from 'react';



export default function Slider({ array, title }) {
  const [slides, setSlides] = useState([]);
  const [hoveredSlide, setHoveredSlide] = useState(null);
  const width=120;

  useEffect(() => {
    if (array) {
      const data = array.map((element, index) => (
        <Card key={index} data={element} width={width} />
      ));
      setSlides(data);
    }
  }, [array]);

  const handleMouseEnter = (index) => {
    console.log("hover on slide");
    setHoveredSlide(index);
  }

  const handleMouseLeave = () => {
    setHoveredSlide(null);
  }

  return (
    <>
      <h1 className='text-white  font-serif font-semibold text-xl'>{title}</h1>
      <Swiper
        className='w-full h-auto py-3'
        modules={[Virtual, Navigation, Pagination]}
        slidesPerView={4} // Adjust number of slides visible at once
        centeredSlides={false}
        spaceBetween={0} // Adjust spacing between slides
        navigation={true}
        style={{ overflow: 'visible' }}
      >
        {slides.map((slideContent, index) => (
          <SwiperSlide
            key={index}
            virtualIndex={index}
            className={`relative z-10 overflow-visible ${hoveredSlide === index ? 'z-20' : 'z-10'}`} // Center content within each slide
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="w-80"> {/* Adjust width and height of each slide */}
              {slideContent}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
