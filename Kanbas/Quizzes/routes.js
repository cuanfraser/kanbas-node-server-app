import { deleteQuiz, updateQuiz } from './dao.js';

export const QuizzesRoutes = (app) => {
  app.delete('/api/quizzes/:quizId', async (req, res) => {
    const { quizId } = req.params;
    const status = await deleteQuiz(quizId);
    res.send(status);
  });

  app.put('/api/assignments/:quizId', async (req, res) => {
    const { quizId } = req.params;
    const quizUpdates = req.body;
    const status = await updateQuiz(quizId, quizUpdates);
    res.send(status);
  });
};
