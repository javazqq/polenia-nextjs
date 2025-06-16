import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function GET(){
    const resend = new Resend(process.env.RESEND_API_KEY);

    try{
        const {data} = await resend.emails.send({
            from: 'poleniamx@gmail.com',
            to: 'jorge.avazqqrespaldo@gmail.com',
            subject: 'Welcome to Polenia',
            html: '<h1>Welcome to Polenia</h1>'
        });

        return NextResponse.json({ 'hello': 'world' });
    }catch (error){
        return NextResponse.json({error});
    }
}

// I need my own domain to send emails. Need to set that up first.
