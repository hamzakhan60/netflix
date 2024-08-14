// src/app/api/getData/route.js
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient'; // Adjust the path if needed

export async function GET(request) {
    const url=request.nextUrl;
    const userId = url.searchParams.get('userId');
    console.log(url);
    console.log(userId);


  try { 
    const { data, error } = await supabase
    .from('user_screens')
    .select(`*`)
    .eq(`user_id`, userId);
    if (error) {
        console.log(error)
      throw error;
    }
    if(!data.length)
        return NextResponse.json({ error:"Could not found the data" }, { status: 404 });
    else
        return NextResponse.json({data},{status:200});
    
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
