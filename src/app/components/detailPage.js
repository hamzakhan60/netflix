"use client";
import { useEffect, useState, useRef } from "react";
import Title from './tittle';
import { IoIosVolumeHigh } from "react-icons/io";
import { IoVolumeMuteOutline } from "react-icons/io5";
import { FaRegCirclePlay } from "react-icons/fa6";
import Dropdown from "./dropdown";
import RecommendationCard from "./recomendationCard";
import { useSelector } from "react-redux";
import { useRouter,useDispatch } from 'next/navigation';


import { MdClose } from "react-icons/md";

const ShowDetails = ({closeDetailPage}) => {
    const router=useRouter();
 
    const [episodes, setEpisodes] = useState([]);
    const [isVideoOn, setVideoOn] = useState(false);
    const [videoLink, setVideoLink] = useState(null);
    const videoRef = useRef(null); // Reference to the video element
    const [ismuted, setMuted] = useState(true);
    const [selectedSeason, setSelectedSeason] = useState({});
    const [recomendation, setRecomendation] = useState([]);
    const [visible, setVisible] = useState(false);
    const [actorsData, setActorsData] = useState([]);
    const [movieGenres, setMovieGenres] = useState([]);
    const [movieDirector, setMovieDirector] = useState([]);
    const movieData = useSelector((movie) => movie.data);
    const [formate,setFormate]=useState('');
    const [seasons,setSeasons]=useState([]);
    const [token,setToken]=useState(null);
    const [screenId,setScreenId]=useState(null);
 
    const buildApiRequest = (endpoint) => {
    
        const url = `${endpoint}&screenId=${screenId}`;
    
        const headers = {
            'Authorization': `Bearer ${token}`,  // Include the token in the Authorization header
            'Content-Type': 'application/json'   // Example header, adjust as needed
        };
    
        return {
            url,
            options: {
                headers
            }
        };
    };

    const handleClose=()=>{
       
        closeDetailPage();
    }
    
    

    const data = {
        "movieid": 1,
        "title": "Spider-Man No Way Home",
        "description": "Tom Holland returns as the wisecracking web-slinger, alongside an all-star cast that includes Zendaya, Benedict Cumberbatch, Willem Dafoe and more.",
        "duration": 148,
        "trailerurl": "https://utjxbnhbwyaakgditdjg.supabase.co/storage/v1/object/public/netflixBucket/media/movies/1/yt5s.io-SPIDER-MAN_%20NO%20WAY%20HOME%20-%20Official%20Trailer-(1080p).mp4?t=2024-07-20T20%3A32%3A20.656Z",
        "imageurl": "https://utjxbnhbwyaakgditdjg.supabase.co/storage/v1/object/public/netflixBucket/media/movies/1/spide%20man%20Noway%20home.jpg",
        "releaseyear": 2021,
        "mpaarating": "13+"
    };

    useEffect(() => {
       const tokenData=JSON.parse(localStorage.getItem('data'));
       if(!tokenData || !tokenData.token)
        {
            router.push('/login');
        }
        else if(!tokenData.screenId)
        {
            router.push('/screens');
        }
        setToken(tokenData.token);
        setScreenId(tokenData.screenId);
        console.log(movieData);
        if(movieData){
        if(movieData.movieid ){
            console.log("hi i am here ")
            setFormate('movieId')
        }
           
        else
           { 
            setFormate('showId')
            fetchSeasons(movieData.showid);
           }
        fetctMovieActors(movieData.movieid || movieData.showid);
        fetchMovieGenres(movieData.movieid || movieData.showid);
        fetchMovieDirector(movieData.movieid || movieData.showid);
        
           
            }

        // setEpisodes(fetchedEpisodes);
        if (movieData)
            setVideoLink(movieData.trailerurl || "https://utjxbnhbwyaakgditdjg.supabase.co/storage/v1/object/public/netflixBucket/media/movies/3/jaane%20jaan%20Trailer?t=2024-07-22T15%3A57%3A47.717Z");





        setTimeout(() => {
            setVideoOn(true);
        }, 10000);

        setTimeout(() => {
            const video = videoRef.current;
            if ( isVideoOn && video) {
                if(video.paused)
                     video.play();
            }
        }, 2000);
        console.log(movieData)



    }, [movieData,formate]);



    const fetctMovieActors = async (id) => {
        console.log("ok: ",formate)
        const apiRequest = buildApiRequest(`/api/movieActor?${formate}=${id}`);
        try {
            const response = await fetch(apiRequest.url,apiRequest.options);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setActorsData(data);
            console.log(data);
        } catch (error) {
            console.log(error.message);
        }
    };

    const fetchMovieGenres = async (id) => {
        try {
            const response = await fetch(`/api/movieGenres?${formate}=${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            console.log(data);
            let g;
            if(formate=="movieId")
                g="movieGenres";
            else
                g="tvshowGenres"
            setMovieGenres(data);
            if (data)
                fetchRelatedMovies(data,g);
            console.log(data);
        } catch (error) {
            console.log(error.message);
        }
    };
    const fetchMovieDirector = async (id) => {
        try {
            const response = await fetch(`/api/movieDirector?${formate}=${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            console.log(data);
            setMovieDirector(data);
            console.log(data);
        } catch (error) {
            console.log(error.message);
        }
    };
    const fetchRelatedMovies = async (genres,g) => {
        
        const genresString = JSON.stringify(genres);
        try {
            const response = await fetch(`/api/relatedMovies?${g}=${genresString}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            console.log(data);
            setRecomendation(data);
            console.log(data);
        } catch (error) {
            console.log(error.message);
        }
    };
    const fetchSeasons= async (id)=>{
        try {
            const response = await fetch(`/api/tvShows/seasons?showid=${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            console.log(data);
            setSeasons(data);
            setSelectedSeason(data[0]);
            console.log(data[0]);
            fetchEpisodes(data[0].seasonid)
            console.log(seasons);
        } catch (error) {
            console.log(error.message);
        }
    }
    const fetchEpisodes= async (id)=>{
        try {
            const response = await fetch(`/api/tvShows/seasons/episodes?showid=${movieData.showid}&seasonid=${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            console.log(data);
            setEpisodes(data);
            console.log(seasons);
        } catch (error) {
            console.log(error.message);
        }
    }



    useEffect(() => {
        console.log(recomendation);
    }, [recomendation]);

    const handleSeasonSelect = (season) => {
        setSelectedSeason(season);
        fetchEpisodes(season.seasonid);
        
        console.log(`Selected Season: ${season}`);
    };


    const handleVolume = () => {
        setMuted(!ismuted);

    };
    function convertMinutesToHoursAndMinutes(minutes) {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h ${remainingMinutes}m`;
    }


    return (
        <div   >
            <div className="bg-[#181818] text-white mt-8  rounded-lg w-full max-w-4xl mx-auto absolute -top-4 animate-zoom-in-up left-16 right-16 z-50">

                <div className="relative">
                    <div className="absolute top-3 right-3">
                        <MdClose
                            onClick={closeDetailPage}
                            className="rounded-full bg-slate-600/60 cursor-pointer hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]"
                            color="white"
                            size={30}
                            style={{ padding: 0, margin: 0, boxSizing: 'content-box' }}
                        />
                    </div>
                    {isVideoOn && videoLink ? (
                        <video
                            ref={videoRef}
                            className="w-screen rounded-lg  object-cover h-80" src={videoLink}
                            loop
                            autoPlay={true}
                            muted={ismuted ? true : false}
                            controls={false}
                            preload="auto"


                        >
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <img
                            className="w-full h-96 object-cover rounded-lg"
                            src={movieData.imageurl|| null}
                            alt="Show banner"
                        />
                    )}
                    <button className="absolute -right-1 top-56 " onClick={handleVolume}>
                        {ismuted ? <IoVolumeMuteOutline color="white" className="" size={32} /> :
                            <IoIosVolumeHigh color="white" className="" size={32} />}

                    </button>
                    <Title data={movieData} titleColor="white" titleSize="3xl" animation={false} description={false} play={true} infoButton={false} />

                </div>
                <div className="flex flex-row justify-between">
                    <div className="w-1/2  ml-10">
                        <div className="text-[#696969] font-sans font-semibold flex justify-evenly w-1/2 text-lg mt-5  ">
                            <span className=" ">{movieData.movieid ? movieData.releaseyear :`${movieData.startyear }-${movieData.endyear}`}</span>
                            {movieData.showid ? (<span> {seasons.length} Seasons</span>) : <span>{convertMinutesToHoursAndMinutes(movieData.duration)}</span>}
                            <span className=" rounded text-center mt-1  text-xs h-5 border border-[#A4A4A4] w-10 ">HD</span>
                        </div>

                        <div className="  w-full flex justify-start ml-3  mt-1">
                            <span className="border border-[#A4A4A4] text-center rounded  px-2 text-white  text-base  font-sans">{movieData.mpaarating}</span>
                            <span className="text-white pl-3 text-sm font-bold ">voilance,sex,nudity,language,substance,suicide</span>
                        </div>
                        <div className="mt-5">
                            {movieData.description}
                        </div>
                    </div>
                    <div className="w-1/3  mt-5 mr-5 flex flex-col justify-evenly ">
                        <div>
                            <span className="text-[#696969] text-base">Cast:</span>
                            {actorsData.length ? (actorsData.slice(0, 4).map((a, i) => {
                                return (< span key={i}>{`${a.afname} ${a.alname},`}</span>)
                            })) : ''}
                        </div>
                        <div>
                            <span className="text-[#696969] ">Generes:</span>
                            {movieGenres.length ? (movieGenres.map((a, i) => {
                                return (< span key={i}>{`${a},`}</span>)
                            })) : ''}
                        </div>
                        <div>
                            <span className="text-[#696969] ">This Show is</span>
                            <span></span>  </div>

                    </div>
                </div>

                <div className="mt-4 m-8  p-6">
                    {movieData.showid ? (<div className="flex flex-row justify-between">
                        <h2 className="text-2xl font-bold">Episodes</h2>
                        <Dropdown total={seasons} selectedSeason={selectedSeason} onSeasonSelect={handleSeasonSelect} /></div>) : ''}

                    {movieData.showid ? (<div className="mt-2">
                        {episodes.length > 0 ? (
                            episodes.map((episode, index) => (
                                <div key={index} className="group flex bg-transparent  cursor-pointer items-center space-x-7 border border-transparent p-8 border-b-neutral-400 mb-4 hover:bg-[#333333] ">
                                    <div className="text-2xl">{episode.episodenumber}</div>
                                    <img
                                        className="w-28 h-18 object-cover rounded-lg"
                                        src={episode.imageurl}
                                        alt={episode.title}
                                    />
                                    <FaRegCirclePlay color="white" size={40} className=" absolute hidden  left-36 group-hover:block transition-all duration-300 ease-in-out   " />
                                    <div>
                                        <h3 className="text-base font-bold">{episode.title}</h3>
                                        <p className="text-xs text-gray-400">{episode.description} </p>
                                    </div>
                                    <div>{episode.duration}m</div>
                                </div>
                            ))
                        ) : (
                            <p>No episodes available</p>
                        )}
                    </div>) : ''}
                </div>
                <div className="w-full ">
                    <div className="ml-4 px-5 -mt-8  text-2xl font-semibold">More Like This</div>
                    <div className=" flex flex-wrap w-full border mx-10 border-transparent  border-b-neutral-400">
                        {recomendation.length || recomendation ? (recomendation.map((data, index) => {
                            return <RecommendationCard data={data} key={index} />
                        })) : (<p>no more like this</p>)}</div>


                </div>
                <div className="ml-4 px-5 mt-5   text-2xl font-semibold">About {movieData.title}</div>
                <div className="w-1/2 text-sm pb-10 mt-5 ml-10 flex flex-col justify-evenly ">
                    <div>
                        {movieData.showid ? (<span className="text-[#696969] "> Creator</span>) : <span className="text-[#696969] ">Director</span>}

                        {movieDirector.length ? (
                            movieDirector.map((a, i) => (
                                <span key={i}>{`${a.directorfirst} ${a.directorlast},`}</span>
                            ))
                        ) : ''}
                    </div>
                    <div >
                        <span className="text-[#696969] ">Cast:</span>
                        {actorsData.length ? (
                            actorsData.map((a, i) => (
                                <span key={i}>{`${a.afname} ${a.alname},`}</span>
                            ))
                        ) : ''}
                    </div>
                    <div>
                        <span className="text-[#696969] ">Generes:</span>
                        {movieGenres.length ? (movieGenres.map((a, i) => {
                            return (< span key={i}>{`${a},`}</span>)
                        })) : ''}
                    </div>
                    <div>
                        <span className="text-[#696969] ">This Show is:</span>
                        <span></span>
                    </div>
                    <div>
                        <span className="text-[#696969] ">Maturity Rating:</span>
                        <span className="border border-[#A4A4A4] text-center rounded  px-2 text-white  text-base  font-sans">{data.mpaarating}</span>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default ShowDetails;
