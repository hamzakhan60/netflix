import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient'; 


export async function GET(request) {
 

  const url=request.nextUrl;
  const showId = url.searchParams.get('showid');
  const seasonId=url.searchParams.get('seasonid');
  try {
  const { data, error } = await supabase
    .from('episodes')
    .select('*, seasons!inner(seasonid)')
    .eq('seasonid', seasonId)
    .eq('seasons.showid', showId);

    if (error) {
        throw error;
      }
    return NextResponse.json(data);
} catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  } 



