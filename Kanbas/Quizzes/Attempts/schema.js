import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  question_id: mongoose.Schema.Types.ObjectId,
  answer: String,
  correct: Boolean,
});

const quizAttemptSchema = new mongoose.Schema(
  {
    quiz_id: { type: mongoose.Schema.Types.ObjectId, ref: 'QuizzesModel', required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel', required: true },
    answers: {
      type: [answerSchema],
      default: [],
      required: true,
    },
    score: { type: Number, default: 0, required: true },
    number: { type: Number, default: 1, required: true },
    started: { type: Date, required: true },
    submitted: { type: Boolean, default: false, required: true },
  },
  { collection: 'quiz_attempts', timestamps: true }
);

export default quizAttemptSchema;
