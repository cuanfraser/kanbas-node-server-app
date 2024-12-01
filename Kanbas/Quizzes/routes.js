import { createQuiz, deleteQuiz, findQuizzesForCourse, updateQuiz } from './dao.js';

export const QuizzesRoutes = (app) => {
  app.post('/api/courses/:courseId/quizzes', async (req, res) => {
    const { courseId } = req.params;
    const quiz = {
      ...req.body,
      course: courseId,
    };
    const newQuiz = await createQuiz(quiz);
    res.send(newQuiz);
  });

  app.get('/api/courses/:courseId/quizzes', async (req, res) => {
    const { courseId } = req.params;
    const quizzes = await findQuizzesForCourse(courseId);
    res.json(quizzes);
  });

  app.put('/api/assignments/:quizId', async (req, res) => {
    const { quizId } = req.params;
    const quizUpdates = req.body;
    const status = await updateQuiz(quizId, quizUpdates);
    res.send(status);
  });

  app.delete('/api/quizzes/:quizId', async (req, res) => {
    const { quizId } = req.params;
    const status = await deleteQuiz(quizId);
    res.send(status);
  });
};
