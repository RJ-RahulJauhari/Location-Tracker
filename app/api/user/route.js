import dbConnect from '../../../lib/mongoose';
import User from '../../../models/Users';

export async function POST(req) {
    const { name, email, savedLocations } = await req.json();

    try {
        await dbConnect();
        const user = await User.create({ name, email, savedLocations });
        return new Response(JSON.stringify({ success: true, data: user }), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error }), { status: 400 });
    }
}

export async function GET() {
    try {
        await dbConnect();
        const users = await User.find({});
        return new Response(JSON.stringify({ success: true, data: users }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error }), { status: 400 });
    }
}