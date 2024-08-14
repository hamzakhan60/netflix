// src/app/api/getData/route.js
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient'; // Adjust the path if needed

export async function GET(request) {
    const url=request.nextUrl;
    const movieId = url.searchParams.get('movieId');
    const showId = url.searchParams.get('showId');
    if (!movieId && !showId) {
      return NextResponse.json({ error: 'No movieId or showId provided' }, { status: 400 });
  }

  const joinTable = movieId ? 'movies_actors' : 'tvshows_actors';
  const id = movieId || showId;

  try {
      const { data, error } = await supabase
          .from('actors')
          .select(`
              actorid,
              afname,
              alname,
              ${joinTable}!inner(
                  actorid
              )
          `)
          .eq(`${joinTable}.${movieId ? 'movieid' : 'showid'}`, id);


    if (error) {
        console.log(error)
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
