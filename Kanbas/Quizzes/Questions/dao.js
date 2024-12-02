import model from './model.js';

export const createQuestionForQuiz = (quizId, question) => {
  delete question._id;
  return model.create({ ...question, quiz_id: quizId });
};

export const findQuestionById = (questionId) => {
  return model.findById(questionId);
};

export const findQuestionsForQuiz = (quizId) => {
  return model.find({ quiz_id: quizId });
};

export const updateQuestion = (questionId, questionUpdates) => {
  delete questionUpdates._id;
  return model.findOneAndUpdate({ _id: questionId }, questionUpdates, { new: true });
};

export const deleteQuestion = (questionId) => {
  return model.deleteOne({ _id: questionId });
};
