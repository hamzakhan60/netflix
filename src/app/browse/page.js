// pages/browse.js
"use client"
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import VideoPlayer from '../components/backgroundVideo';
import Title from '../components/tittle';
import Slider from '../components/slider';
import ShowDetails from "../components/detailPage";
import { removeMovie } from "../redux/features/movieSlice";
import { useRouter } from 'next/navigation';

export default function Browse() {
  const router=useRouter();
  
  const [hoveredSlider, setHoveredSlider] = useState(null);
  const [movies, setMovies] = useState([]);
  const [visible, setVisible] = useState(false);
  const movieData = useSelector((state) => state.data);
  const [tvShows, setTvShows] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData("movies");
    fetchData("tvShows");
  }, []);

  useEffect(() => {
    console.log("movieData:", movieData);
    console.log("Setting visible to:", !!movieData);
    setVisible(!!movieData);
  }, [movieData]);

  const fetchData = async (endPoint) => {
    try {
      // Retrieve token and screenId from localStorage
      const userData = JSON.parse(localStorage.getItem('data'));
      const token = userData?.token;
      const screenId = userData?.screenId;

      // If token or screenId is missing, throw an error
      if (!userData || !token) {
        router.push('/login');
     
        throw new Error('Missing token or screenId');
      }
      else if(!screenId){
          router.push('/screens');
      }
      // Make the API request with the Authorization header and screenId
      const response = await fetch(`/api/${endPoint}?screenId=${screenId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      console.log(data);

      // Update state based on the endpoint
      if (endPoint === "movies") {
        setMovies(data);
      } else {
        setTvShows(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleMouseEnter = (index) => {
    setHoveredSlider(index);
  };

  const handleMouseLeave = () => {
    setHoveredSlider(null);
  };

  const closeDetailPage = () => {
    setVisible(false);
  };

  return (
    <>
      <div className={`bg-[#141414] ${visible ? 'inset-0 fixed' : ''}`} onClick={closeDetailPage}>
        <div className={`relative h-screen`}>
          <VideoPlayer videoUrl={movies.length ? movies[0].trailerurl : null} />
          <Title data={movies.length ? movies[0] : null} titleColor="red" titleSize="9xl" animation={true} description={true} play={true} infoButton={true} />
        </div>
        <div className="relative flex flex-col justify-between overflow-x-hidden -top-20">
          <div
            className={`relative ${hoveredSlider === 0 ? 'z-20' : 'z-0'}`}
            onMouseEnter={() => handleMouseEnter(0)}
            onMouseLeave={handleMouseLeave}
          >
            <Slider array={movies} title={"Movies"} />
          </div>
          <div
            className={`relative pt-10 pb-20 ${hoveredSlider === 1 ? 'z-20' : 'z-0'}`}
            onMouseEnter={() => handleMouseEnter(1)}
            onMouseLeave={handleMouseLeave}
          >
            <Slider array={tvShows} title={"Tv Shows"} />
          </div>
        </div>
      </div>
      {console.log("Visible state:", visible)}
      {visible && <ShowDetails closeDetailPage={closeDetailPage} />}
    </>
  );
}
