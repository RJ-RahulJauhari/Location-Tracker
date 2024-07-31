import dbConnect from '../../../lib/mongoose';
import User from '../../../models/Users';

export async function POST(req) {
    try {
        console.log('Received POST request to create user');
        const { name, email } = await req.json();
        console.log('Request data:', { name, email });

        await dbConnect();
        console.log('Database connected');

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('User already exists:', existingUser);
            return new Response(
                JSON.stringify({ success: false, message: 'User already exists' }), { status: 400 }
            );
        }

        // Create a new user
        const user = await User.create({ name, email });
        console.log('User created:', user);

        return new Response(
            JSON.stringify({ success: true, data: user }), { status: 201 }
        );
    } catch (error) {
        console.error('Error creating user:', error.message);
        return new Response(
            JSON.stringify({ success: false, error: error.message }), { status: 400 }
        );
    }
}

export async function GET() {
    try {
        console.log('Received GET request to fetch users');
        await dbConnect();
        console.log('Database connected');

        const users = await User.find({});
        console.log('Users fetched:', users);

        return new Response(
            JSON.stringify({ success: true, data: users }), { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching users:', error.message);
        return new Response(
            JSON.stringify({ success: false, error: error.message }), { status: 400 }
        );
    }
}