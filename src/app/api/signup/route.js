import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import bcrypt from 'bcryptjs';

export async function POST(req, res) {

    const body = await req.json();
    console.log(body);

    const { email, p, plan_id } = body;

    // Validate the incoming data
    if (!email || !p || !plan_id) {
        return NextResponse.json({error:'Missing required fields'},{status:400});
    }
    const password = await bcrypt.hash(p, 10);
    // Insert the data into the Supabase table
    const { data, error } = await supabase
      .from('users')
      .insert([
        { email, password, plan_id }
      ])
      .select();

    if (error) {
     
      return NextResponse.json({error:error.message},{status:500});
  
    }


    return NextResponse.json({msg:'Successfuly created Your Account'},{status:200});
  
 
}
