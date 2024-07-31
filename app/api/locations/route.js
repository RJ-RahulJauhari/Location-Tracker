import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongoose';
import Location from '@/models/Location';

export const GET = async(req) => {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get('email');
        await dbConnect();

        if (!email) {
            return new NextResponse(JSON.stringify({ error: 'Email is required' }), { status: 400 });
        }

        const locations = await Location.find({ email });

        if (locations.length > 0) {
            return new NextResponse(JSON.stringify(locations), { status: 200, headers: { 'Content-Type': 'application/json' } });
        } else {
            return new NextResponse(JSON.stringify({ error: 'No locations found' }), { status: 404 });
        }
    } catch (error) {
        console.error('Error fetching locations:', error);
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
};

export const POST = async(req) => {
    try {
        const { email, name, coordinates, radius } = await req.json();
        await dbConnect();

        // Input validation
        if (!email || !name || !coordinates || coordinates.length !== 2 || radius === undefined) {
            return new NextResponse(JSON.stringify({ error: 'Invalid input data' }), { status: 400 });
        }

        // Create new location
        const newLocation = new Location({
            email,
            name,
            coordinates,
            radius,
        });

        // Save location to the database
        const savedLocation = await newLocation.save();

        return new NextResponse(JSON.stringify(savedLocation), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error adding location:', error);
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
};

export const DELETE = async(req) => {
    try {
        const { id } = await req.json();
        await dbConnect();

        if (!id) {
            return new NextResponse(JSON.stringify({ error: 'Location ID is required' }), { status: 400 });
        }

        const deletedLocation = await Location.findByIdAndDelete(id);

        if (!deletedLocation) {
            return new NextResponse(JSON.stringify({ error: 'Location not found' }), { status: 404 });
        }

        return new NextResponse(JSON.stringify({ message: 'Location deleted successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error deleting location:', error);
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
};