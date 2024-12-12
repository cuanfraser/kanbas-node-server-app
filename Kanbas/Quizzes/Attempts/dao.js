import { findQuestionById } from '../Questions/dao.js';
import model from './model.js';

export const createAttemptForQuiz = async (attempt) => {
  const newAttempt = { ...attempt};
  delete newAttempt._id;
  delete newAttempt.score;
  delete newAttempt.number;

  const previousAttempts = await findAttemptsByUserForQuiz(attempt.user_id);
  newAttempt.number = previousAttempts.length + 1;

  newAttempt.score = await getScoreForAttempt(newAttempt);

  return model.create(newAttempt);
};

export const findAttemptById = (attemptId) => {
  return model.findById(attemptId);
};

export const findAttemptsByUserForQuiz = (userId, quizId) => {
  return model.find({ user_id: userId, quiz_id: quizId });
};

export const updateAttempt = async (attemptId, attemptUpdates) => {
  const attempt = { ...attemptUpdates, _id: attemptId };
  delete attempt.score;
  delete attempt.number;

  attempt.score = await getScoreForAttempt(attempt);

  return model.findOneAndUpdate({ _id: attemptId }, attempt, { new: true });
};

export const deleteAttempt = (attemptId) => {
  return model.deleteOne({ _id: attemptId });
};

const getScoreForAttempt = async (attempt) => {
  let score = 0;
  if (attempt.submitted) {
    for (const answer of attempt.answers) {
      const question = await findQuestionById(answer.question_id);
      if (question) {
        const correctAnswer = question.answer?.trim().toLowerCase();
        const attemptAnswer = answer.answer?.trim().toLowerCase();
        if (correctAnswer === attemptAnswer) {
          score = score + question.points;
        }
      }
    }
  }
  return score;
};
