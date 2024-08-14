// src/app/api/screens/updateScreen/route.js

import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient'; // Adjust the path as necessary

export async function POST(request) {
    const { id, screen_name, screen_password } = await request.json();

    if (!id || !screen_name || !screen_password) {
        return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    try {
        const { data, error } = await supabase
            .from('user_screens')
            .update({ screen_name, screen_password })
            .eq('id', id)
            .select();

        if (error) {
            throw error;
        }

        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
