import mongoose from 'mongoose';
const questionSchema = new mongoose.Schema(
  {
    quiz_id: { type: mongoose.Schema.Types.ObjectId, ref: 'QuizzesModel', required: true },
    title: { type: String, required: true },
    points: { type: Number, default: 1, required: true },
    question: String,
    type: {
      type: String,
      enum: ['MULTIPLE_CHOICE', 'TRUE_FALSE', 'FILL_IN'],
      default: 'MULTIPLE_CHOICE',
      required: true,
    },
    choices: [String],
    answer: String,
  },
  { collection: 'questions' }
);
export default questionSchema;
