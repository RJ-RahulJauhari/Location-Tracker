import mongoose from 'mongoose';

const { Schema } = mongoose;

// Validation function for coordinates
function arrayLimit(val) {
    return val.length === 2; // Assuming coordinates are [latitude, longitude]
}

const locationSchema = new Schema({
    email: { type: String, required: true, match: /.+\@.+\..+/ }, // Email format validation
    name: { type: String, required: true },
    coordinates: { type: [Number], validate: [arrayLimit, 'Coordinates must be an array of numbers'] },
    radius: { type: Number, min: 0 },
}, { timestamps: true });

const Location = mongoose.models.Location || mongoose.model('Location', locationSchema);

export default Location;