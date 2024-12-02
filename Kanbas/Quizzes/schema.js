import mongoose from 'mongoose';
const quizSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'CourseModel' },
    title: { type: String, default: 'New Quiz', required: true },
    published: { type: Boolean, default: false, required: true },
    description: String,
    type: {
      type: String,
      enum: ['GRADED', 'PRACTICE', 'GRADED_SURVEY', 'UNGRADED_SURVEY'],
      default: 'GRADED',
      required: true,
    },
    points: { type: Number, default: 100, required: true },
    group: {
      type: String,
      enum: ['QUIZZES', 'EXAMS', 'ASSIGNMENTS', 'PROJECT'],
      default: 'QUIZZES',
      required: true,
    },
    shuffle: { type: Boolean, default: true, required: true },
    time: { type: Number, default: 20, required: true },
    multiple_attempts: { type: Boolean, default: false, required: true },
    attempts: { type: Number, default: 1 },
    show_correct: String,
    access_code: { type: String, default: '' },
    one_question_at_a_time: { type: Boolean, default: true },
    webcam: { type: Boolean, default: false },
    lock_after_answers: { type: Boolean, default: false },
    due: { type: Date, default: new Date('2024-12-01'), required: true },
    available: { type: Date, default: new Date('2024-01-01'), required: true },
    available_until: { type: Date, default: new Date('2024-12-01'), required: true },
  },
  { collection: 'quizzes' }
);
export default quizSchema;
