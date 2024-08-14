import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient'; // Adjust the path if needed
import bcrypt from 'bcryptjs';
import { generateToken } from '@/lib/auth';

export async function GET(request) {
    const url = request.nextUrl;
    const email = url.searchParams.get('email');
    const password = url.searchParams.get('password');

    console.log(url);
    console.log(email);

    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email);

        if (error) {
            console.log(error);
            throw error;
        }

        if (!data.length) {
            return NextResponse.json({ msg: "User not registered" }, { status: 404 });
        } else {
            const user = data[0];
            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                const token = generateToken({ userId: user.id, email: user.email });
                const resData={token:token,userId: user.id};
                return NextResponse.json({resData}, { status: 200 });
            } else {
                return NextResponse.json({ msg: 'Wrong Password' }, { status: 401 });
            }
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
