import dbConnect from '../../../lib/mongoose';
import User from '../../../models/User';

export async function POST(req) {
    const { userId, location } = await req.json();

    try {
        await dbConnect();
        const user = await User.findById(userId);

        if (!user) {
            return new Response(JSON.stringify({ success: false, message: 'User not found' }), { status: 404 });
        }

        user.savedLocations.push(location);
        await user.save();

        return new Response(JSON.stringify({ success: true, data: user }), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error }), { status: 400 });
    }
}