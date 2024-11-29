import mongoose from 'mongoose';
const schema = new mongoose.Schema(
    {
        title: String,
        course: { type: mongoose.Schema.Types.ObjectId, ref: 'CourseModel' },
        points: Number,
        availableFrom: Date,
        availableTo: Date,
        due: Date,
        modules: String,
        description: String
    },
    { collection: 'assignments' }
);
export default schema;
