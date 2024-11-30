import mongoose from 'mongoose';
const quizzesSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'CourseModel' },
    title: String,
    description: String,
    type: {
      type: String,
      enum: ['GRADED', 'PRACTICE', 'GRADED_SURVEY', 'UNGRADED_SURVEY'],
      default: 'GRADED',
    },
    points: Number,
    group: {
      type: String,
      enum: ['QUIZZES', 'EXAMS', 'ASSIGNMENTS', 'PROEJCT'],
      default: 'QUIZZES',
    },
    shuffle: { type: Boolean, default: true },
    time: { type: Number, default: 20 },
    multiple_attempts: { type: Boolean, default: false },
    attempts: { type: Number, default: 1 },
    show_correct: String,
    access_code: { type: String, default: '' },
    one_question_at_a_time: { type: Boolean, default: true },
    webcam: { type: Boolean, default: false },
    lock_after_answers: { type: Boolean, default: false },
    due: Date,
    available: Date,
    available_until: Date,
  },
  { collection: 'quizzes' }
);
export default quizzesSchema;
