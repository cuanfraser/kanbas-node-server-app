import {
  createQuestionForQuiz,
  findQuestionById,
  findQuestionsForQuiz,
  updateQuestion,
  deleteQuestion,
} from './dao.js';

export const QuestionRoutes = (app) => {
  app.post('/api/quizzes/:quizId/questions', async (req, res) => {
    const { quizId } = req.params;
    if (quizId && quizId !== 'undefined') {
      const question = {
        ...req.body,
        quiz_id: quizId,
      };
      const newQuestion = await createQuestionForQuiz(quizId, question);
      res.send(newQuestion);
    } else {
      res.status(404).json({ message: `Invalid quiz id: ${quizId}.` });
    }
  });

  app.get('/api/questions/:questionId', async (req, res) => {
    const { questionId } = req.params;
    if (questionId && questionId !== 'undefined') {
      const question = await findQuestionById(questionId);
      res.json(question);
    } else {
      res.status(404).json({ message: `Invalid question id: ${questionId}.` });
    }
  });

  app.get('/api/quizzes/:quizId/questions', async (req, res) => {
    const { quizId } = req.params;
    if (quizId && quizId !== 'undefined') {
      const questions = await findQuestionsForQuiz(quizId);
      res.json(questions);
    } else {
      res.status(404).json({ message: `Invalid quiz id: ${quizId}.` });
    }
  });

  app.put('/api/questions/:questionId', async (req, res) => {
    const { questionId } = req.params;
    if (questionId && questionId !== 'undefined') {
      const questionUpdates = req.body;
      const updatedQuestion = await updateQuestion(questionId, questionUpdates);
      res.send(updatedQuestion);
    } else {
      res.status(404).json({ message: `Invalid question id: ${questionId}.` });
    }
  });

  app.delete('/api/questions/:quizId', async (req, res) => {
    const { questionId } = req.params;
    if (questionId && questionId !== 'undefined') {
      const status = await deleteQuestion(questionId);
      res.send(status);
    } else {
      res.status(404).json({ message: `Invalid question id: ${questionId}.` });
    }
  });
};
