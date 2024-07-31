import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongoose';
import User from '../../../../models/Users';

export const POST = async(req) => {
    try {
        const { email } = await req.json();
        await dbConnect();

        if (!email) {
            return new NextResponse(JSON.stringify({ error: 'Email is required' }), { status: 400 });
        }

        const user = await User.findOne({ email });

        return new NextResponse(
            JSON.stringify({ exists: !!user }), { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Error checking user existence:', error);
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
};