import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongoose';
import Location from '@/models/Location';


export const GET = async(req) => {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    try {
        await dbConnect();

        if (email) {
            const res = await Location.find({ email });
            if (res.length > 0) {
                return new NextResponse(JSON.stringify({ res, message: `Locations have been fetched for user with email ${email}` }), { status: 200 });
            } else {
                return new NextResponse(JSON.stringify({ message: `No saved locations for ${email}` }), { status: 404 });
            }
        } else {
            return new NextResponse(JSON.stringify({ message: "Email not specified..." }), { status: 400 });
        }
    } catch (error) {
        console.error('Error:', error);
        return new NextResponse(JSON.stringify({ message: error.message }), { status: 500 });
    }
}



export const POST = async(req) => {
    const { name, email, coordinates, radius } = await req.json();
    try {
        await dbConnect();
        if (email) {
            const newLocation = new Location({
                email: email,
                name: name,
                coordinates: [coordinates[0], coordinates[1]],
                radius: radius
            });
            const res = await newLocation.save();
            console.log(res);
            return new NextResponse(JSON.stringify({ res }), { status: 200 });
        } else {
            return new NextResponse(JSON.stringify({ message: "Email Missing" }), { status: 404 });
        }
    } catch (error) {
        console.error('Error:', error);
        return new NextResponse(JSON.stringify({ message: error }), { status: 500 });
    }
}


export const DELETE = async(req) => {
    const { id } = await req.json();
    try {
        await dbConnect();
        if (id) {
            const res = await Location.findByIdAndDelete(id);
            if (res) {
                console.log(res);
                return new NextResponse(JSON.stringify({ res, message: "Deleted successfully!" }), { status: 200 });
            } else {
                return new NextResponse(JSON.stringify({ message: "ID was not found in DB..." }), { status: 404 });
            }
        } else {
            return new NextResponse(JSON.stringify({ message: "No ID specified" }), { status: 401 })
        }
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: error }), { status: 500 });
    }
}