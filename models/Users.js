import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ }, // Email format validation
}, { timestamps: true }); // Adds createdAt and updatedAt fields

console.log('User model schema defined');

export default mongoose.model('User', userSchema);