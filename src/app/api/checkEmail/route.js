// src/app/api/getData/route.js
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient'; // Adjust the path if needed

export async function GET(request) {
    const url=request.nextUrl;
    const email = url.searchParams.get('email');
    console.log(url);
    console.log(email);


  try { 
    const { data, error } = await supabase
    .from('users')
    .select(`*`)
    .eq(`email`, email);
    if (error) {
        console.log(error)
      throw error;
    }
    if(!data.length)
        return NextResponse.json({ error:"User not registered" }, { status: 404 });
    else
        return NextResponse.json({data},{status:200});
    
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
