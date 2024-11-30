import mongoose from 'mongoose';
const questionSchema = new mongoose.Schema(
  {
    quiz_id: { type: mongoose.Schema.Types.ObjectId, ref: 'QuizzesModel' },
    title: String,
    points: Number,
    question: String,
    type: {
      type: String,
      enum: ['MULTIPLE_CHOICE', 'TRUE_FALSE', 'FILL_IN'],
      default: 'MULTIPLE_CHOICE',
    },
    choices: [String],
    answer: String,
  },
  { collection: 'questions' }
);
export default questionSchema;
