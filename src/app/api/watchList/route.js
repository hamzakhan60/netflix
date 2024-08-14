// src/app/api/getData/route.js
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient'; // Adjust the path if needed

export async function POST(req) {
    
    const body = await req.json();
    console.log(body);
    const { userId, screenId, movieId, showId } = body;

    if (!userId || !screenId) {
         return NextResponse.json({ msg:  'userId and screenId are required' }, { status: 400 });
     
    }

    try {
        let response;

        if (movieId) {
            response = await supabase
                .from('watchlist_movies')
                .insert([{ user_id: userId, screenId: screenId, movieid: movieId }])
                .select();
        } else if (showId) {
            response = await supabase
                .from('watchlist_shows')
                .insert([{ user_id: userId, screenId: screenId, show_id: showId }])
                .select();
        } else {
             return NextResponse.json({ msg:  'movieId or showId is required' }, { status: 400 });
       
        }


        if (response.error) {
            throw response.error;
        }
        return NextResponse.json({ msg:  'Item added to watchlist successfully' }, { status: 200 });

    } catch (error) {
        console.error('Error inserting into watchlist:', error);
        return NextResponse.json({ msg:  'Internal Server error' }, { status: 500 });
       
    }
}

export async function GET(request) {
    
    const url=request.nextUrl;
    console.log(url);
    const userId = url.searchParams.get('userId');
    const screenId = url.searchParams.get('screenId');
    const showId = url.searchParams.get('showId');
    const movieId = url.searchParams.get('movieId');
    if (!userId || !screenId) {
         return NextResponse.json({ msg:  'userId and screenId are required' }, { status: 400 });
     
    }

    const table = movieId ? 'watchlist_movies' : 'watchlist_shows';
    const id=movieId || showId;
    try {
        

            const data  = await supabase
                .from(table)
                .select(`
                    *,
                   ${movieId ? 'movies' : 'tvshows'}!inner(
                        *,
                       ${movieId ? 'movieid': 'showid'}
                    )
                `)
                .eq('screenId',screenId)
                

                console.log(data);
        
            return NextResponse.json({ data}, { status: 200 });
       
    } catch (error) {
        console.error('Error inserting into watchlist:', error);
        return NextResponse.json({ msg:  'Internal Server error' }, { status: 500 });
       
    }
}
