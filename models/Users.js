import mongoose from 'mongoose';

const { Schema } = mongoose;

const locationSchema = new Schema({
    name: String,
    coordinates: [Number],
    radius: Number,
});

const userSchema = new Schema({
    name: String,
    email: String,
    savedLocations: [locationSchema],
});

export default mongoose.models.User || mongoose.model('User', userSchema);