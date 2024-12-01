import model from './model.js';

export const createQuiz = (quiz) => {
  delete quiz._id;
  return model.create(quiz);
};

export const findQuizById = (quizId) => {
  return model.findById(quizId);
}

export const findQuizzesForCourse = (courseId) => {
  return model.find({ course: courseId });
};

export const updateQuiz = (quizId, quizUpdates) => {
  return model.updateOne({ _id: quizId }, quizUpdates);
};

export const deleteQuiz = (quizId) => {
  return model.deleteOne({ _id: quizId });
};
