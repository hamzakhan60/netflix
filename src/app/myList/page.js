"use client"
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ShowDetails from "../components/detailPage";
import Card from '../components/card';


const MyList = () => {
    const [tvShows, setTvShows] = useState([]);
    const [movies,setMovies]=useState([]);
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();
    const movieData = useSelector((state) => state.data);
    const width = 30;

    useEffect(() => {
        console.log("movieData:", movieData);
        console.log("Setting visible to:", !!movieData);
        setVisible(!!movieData);
    }, [movieData]);

    useEffect(() => {
        fetchData("showId");
        fetchData("movieId");
    }, []);

    const closeDetailPage = () => {
        setVisible(false);
    };

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
            else if (!screenId) {
                router.push('/screens');
            }
            // Make the API request with the Authorization header and screenId
            const response = await fetch(`/api/watchList?userId=${userData.userId}&screenId=${userData.screenId}&${endPoint}=${1}`);

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();

            if (endPoint == 'showId')
                setTvShows(data.data.data);
            else
                setMovies(data.data.data);
            console.log(data.data.data);

          
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <>
            <div className={`bg-[#141414] overflow-x-hidden h-screen w-screen ${visible ? 'inset-0 fixed' : ''}`} onClick={closeDetailPage}>
            <h1 className='text-white pt-20 text-2xl'>Movies</h1>
                <div className="    overflow-x-hidden  flex flex-row justify-normal flex-wrap  w-full  ">
                    
                    {movies.length ? movies.map((m, index) => {
                        return <div className='w-80  m-2 z-10 hover:z-20  '> <Card key={index} data={m.movies} width={width} /></div>
                    }): <p className='text-white'>No Movies in WatchList</p>}
                    </div>
                    <h1 className='text-2xl text-white'>TvShows</h1>
                    <div className="    overflow-x-hidden  flex flex-row justify-normal flex-wrap  w-full  ">
                 
                    {tvShows.length ? tvShows.map((m, index) => {
                        tvShows.map((t,i)=>{

                        })
                        {console.log(m.tvshows)}
                        return <div className='w-80  m-2 z-10 hover:z-20  '> <Card key={index} data={m.tvshows} width={width} /></div>
                    }):<p className='text-white'>No Tv Shows in WatchList</p>}





                </div>
            </div>
            {console.log("Visible state:", visible)}
            {visible && <ShowDetails closeDetailPage={closeDetailPage} />}
        </>
    )
}

export default MyList