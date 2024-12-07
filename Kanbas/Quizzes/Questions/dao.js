import model from './model.js';

export const createQuestionForQuiz = (quizId, question) => {
  delete question._id;
  if (question.type && question.type === 'TRUE_FALSE') {
    question.choices = ['true', 'false'];
    if (
      question.answer &&
      question.answer !== 'true' &&
      question.answer !== 'false' &&
      question.answer !== ''
    ) {
      question.answer = '';
    }
  }
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
  if (questionUpdates.type && questionUpdates.type === 'TRUE_FALSE') {
    questionUpdates.choices = ['true', 'false'];
    if (
      questionUpdates.answer &&
      questionUpdates.answer !== 'true' &&
      questionUpdates.answer !== 'false' &&
      questionUpdates.answer !== ''
    ) {
      questionUpdates.answer = '';
    }
  }
  return model.findOneAndUpdate({ _id: questionId }, questionUpdates, { new: true });
};

export const deleteQuestion = (questionId) => {
  return model.deleteOne({ _id: questionId });
};
