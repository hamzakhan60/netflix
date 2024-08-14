// src/app/api/getData/route.js
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient'; // Adjust the path if needed

export async function GET(request) {
    const url=request.nextUrl;
    const movies=url.searchParams.get('movieGenres');
    const tvshows=url.searchParams.get('tvshowGenres');
    console.log(url); 
    const table =movies ? 'movies' : 'tvshows';
    const joinTable=movies ? 'movies_genres' : 'tvshows_genres';
    const genreNames = tvshows || movies;
    const genres=JSON.parse(genreNames.replace(/'/g, '"'));
  
  
  try {
    const { data, error } = await supabase
    .from(`${table}`)
    .select(`
        *,
        ${joinTable}!inner(genrecode),
        genres!inner(genrename)
    `);
    if (error) {
        console.log(error)
      throw error;
    }
    const filteredData = data.filter(movie => {
      let flag=false;
      movie.genres.forEach(genre=>{
          if(genres.includes(genre.genrename))
            {
                flag=true;
                return;
            }
      }
      );
      if(flag)
          {
            return movie;
          }

    });

    return NextResponse.json(filteredData);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
