"use client";
import { FaPlayCircle, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { SlPlus } from "react-icons/sl";
import { FaThumbsUp } from "react-icons/fa6";
import { IoIosArrowDropdown,IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setSelectedMovie } from "../redux/features/movieSlice";


const Card = ({ data,width }) => {
  const [hover, setHover] = useState(false);
  const [showIframe, setShowIframe] = useState(false);
  const [link, setLink] = useState("");
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for the video
  const [volume, setVolume] = useState(false);
  const hoverRef = useRef(false); // Reference to keep track of hover state
  const [duration, setDuration] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [genres, setGenres] = useState([]);
  const dispatch = useDispatch();
  const[isShow,setIsShow]=useState(null);
  const [existInWatchList,setExistance]=useState(null);

  useEffect(() => {
    if (data) {
      const url = data.trailerurl;
      console.log(data);
      if (data.movieid) {
        checkWatchList("movieId", data.movieid)
        setDuration(convertMinutesToHoursAndMinutes(data.duration));
        fetchMovieGenres("movieId", data.movieid);
        setIsShow(false);
      } else {
        checkWatchList("showId", data.showid);
        fetchSeasons(data.showid);
        fetchMovieGenres("showId", data.showid);
        setIsShow(true);
      }
      setDetails(data);
      setLink(url);
    }
  }, [data]);

  function convertMinutesToHoursAndMinutes(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  }

  const fetchSeasons = async (id) => {
    try {
      const response = await fetch(`/api/tvShows/seasons?showid=${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setSeasons(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchMovieGenres = async (format, id) => {
    try {
      const response = await fetch(`/api/movieGenres?${format}=${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setGenres(data);
    } catch (error) {
      console.log(error.message);
    }
  };
    const handleWatchList=()=>{
        setExistance(true);
      updateWatchList();

    }

    const checkWatchList= async (endpoint,id)=>{
      const d=JSON.parse(localStorage.getItem('data'));
      try {
        const response = await fetch(`/api/watchList?userId=${d.userId}&screenId=${d.screenId}&${endpoint}=${id}`
        );
        const status=response.status;
        const data = await response.json();
        
        const abc=data.data;
        console.log(abc.data);
        abc.data.map((a,i)=>{
          const _id=a.show_id || a.movieid;
          if(_id==id)
            setExistance(true);
        });
    } catch (error) {
        console.log(error.message);
    }
    }


    const updateWatchList = async () => {
      const d=JSON.parse(localStorage.getItem('data'));
      const abc = {
        ...(isShow ? { showId: data.showid } : { movieId: data.movieid }),
        screenId:d.screenId,
        userId:d.userId,
      };
      try {
          const response = await fetch(`/api/watchList`,{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({...abc}),
          }
          );
         
          const data = await response.json();
          console.log(data);

          if(isShow)
            checkWatchList("showId",data.showid)
          else
            checkWatchList("movieId",data.movieid)


      } catch (error) {
          console.log(error.message);
      }
  };

  const handleDetailPage = () => {
    dispatch(setSelectedMovie(details));
  };

  const handleMouseEnter = () => {
    setHover(true);
    hoverRef.current = true;
    setTimeout(() => {
      if (hoverRef.current) {
        setShowIframe(true);
      }
    }, 1000); // 1 second delay
  };

  const handleMouseLeave = () => {
    setHover(false);
    hoverRef.current = false;
    setShowIframe(false);
    setLoading(true); // Reset loading state when hover ends
  };

  const handleVolumeToggle = () => {
    setVolume(!volume);
  };

  return (
    <>
      <div
        className={`card overflow-x-hidden animate-zoom-in group w-80 hover:animate-zoom-in ${
          hover ? `w-[${width}%] z-20 transition-all duration-300 ease-in-out rounded-lg` : "w-80 z-10"
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ position: hover ? "absolute" : "relative" }}
      >
        <div className="card-header w-full">
          {showIframe ? (
            <div className="video-container relative w-full h-0 pb-[56.25%] overflow-hidden">
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <span className="sr-only">Loading...</span>
                  <div className="h-5 w-5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="h-5 w-5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="h-5 w-5 bg-white rounded-full animate-bounce"></div>
                </div>
              )}
              <video
                className="absolute top-0 left-0 w-full h-full"
                src={link}
                loop
                muted={!volume}
                autoPlay
                controls={false}
                onCanPlay={() => setLoading(false)} // Video is ready to play
                onError={() => setLoading(false)} // Error occurred, hide loading
              ></video>
              <div className="absolute top-2 right-2">
                {volume ? (
                  <FaVolumeUp className="text-white cursor-pointer" size={24} onClick={handleVolumeToggle} />
                ) : (
                  <FaVolumeMute className="text-white cursor-pointer" size={24} onClick={handleVolumeToggle} />
                )}
              </div>
            </div>
          ) : (
            <img
              className="card-image rounded-lg w-full h-40"
              src={
                details.imageurl ||
                "https://m.media-amazon.com/images/M/MV5BZjllMGZlZmMtNmQ2NS00ZmZjLThkMDQtNTU5MWJlNDFiZDg1XkEyXkFqcGdeQXRyYW5zY29kZS13b3JrZmxvdw@@._V1_.jpg"
              }
              alt="movie banner"
            />
          )}
        </div>
        <div className={`w-full bg-[#181818] px-5 ${hover ? "block" : "hidden"}`}>
          <div className="flex flex-row justify-between py-5">
            <div className="flex flex-row">
              <FaPlayCircle className="mr-3" color="white" size={35} />
              {!existInWatchList ?   <SlPlus color="white" className="mr-3 cursor-pointer" size={35} onClick={handleWatchList} />: <IoIosCheckmarkCircleOutline color="white" className="mr-3 cursor-pointer" size={39} />}
              <FaThumbsUp color="white" className="mr-3" size={35} />
            </div>
            <IoIosArrowDropdown
              color="gray"
              className="mr-3 justify-self-end cursor-pointer hover:text-white"
              size={40}
              onClick={handleDetailPage}
            />
          </div>
          <div className="flex flex-row">
            <p className="text-green-600 text-xl font-bold mr-3 font-serif">98% Match</p>
            <p className="border border-[#A4A4A4] text-center h-9 w-14 text-[#A4A4A4] mr-3 text-xl font-bold font-sans">
              {data.mpaarating}
            </p>
            <p className="text-[#A4A4A4] font-sans font-semibold mr-3 text-xl">
              {data.movieid ? duration : `${seasons.length} seasons`}
            </p>
            <p className="text-white rounded-md text-center pt-0.5 text-xs h-5 border border-[#A4A4A4] w-10 mr-3">
              HD
            </p>
          </div>
          <p className="text-white pb-10 font-normal mt-5 font-serif text-xl w-full">
            {genres.length ? genres.map((a, i) => <span key={i}>{a} | </span>) : "loading"}
          </p>
        </div>
      </div>
    </>
  );
};

export default Card;
