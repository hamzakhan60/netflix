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

  const joinTable = movieId ? 'movies_genres' : 'tvshows_genres';
  const id = movieId || showId;
  try {
    const { data, error } = await supabase
    .from('genres')
    .select(`
        genrename,
       ${joinTable}!inner(
           ${movieId ? 'movieid': 'showid'}
        )
    `)
    .eq(`${joinTable}.${movieId ? 'movieid' : 'showid'}`, id);
    if (error) {    
      throw error;
    }
    const revisedData=data.map((d,index)=>{
      return d.genrename;
    })

    return NextResponse.json(revisedData);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
