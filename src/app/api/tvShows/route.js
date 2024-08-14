// src/app/api/getData/route.js
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient'; // Adjust the path if needed

export async function GET(request) {
  try {
    const { data, error } = await supabase
      .from('tvshows')
      .select('*');

    if (error) {
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
