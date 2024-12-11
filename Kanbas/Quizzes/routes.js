import {
  createQuiz,
  deleteQuiz,
  findQuizzesForCourse,
  updateQuiz,
  findQuizById,
  findPublishedQuizzesForCourse,
} from './dao.js';

export const QuizzesRoutes = (app) => {
  app.post('/api/courses/:courseId/quizzes', async (req, res) => {
    const currentUser = req.session['currentUser'];
    if (!currentUser) {
      res.status(401).json({ message: 'User not logged in.' });
      return;
    }
    if (currentUser.role !== 'FACULTY' && currentUser.role !== 'ADMIN') {
      res.status(401).json({ message: 'Must be admin or faculty to create a quiz.' });
      return;
    }

    const { courseId } = req.params;
    if (courseId && courseId !== 'undefined') {
      const quiz = {
        ...req.body,
        course: courseId,
      };
      const newQuiz = await createQuiz(quiz);
      res.send(newQuiz);
    } else {
      res.status(404).json({ message: `Invalid course id: ${courseId}.` });
    }
  });

  app.get('/api/quizzes/:quizId', async (req, res) => {
    const { quizId } = req.params;
    if (quizId && quizId !== 'undefined') {
      const quiz = await findQuizById(quizId);
      res.json(quiz);
    } else {
      res.status(404).json({ message: `Invalid quiz id: ${quizId}.` });
    }
  });

  app.get('/api/courses/:courseId/quizzes', async (req, res) => {
    const currentUser = req.session['currentUser'];
    if (!currentUser) {
      res.status(401).json({ message: 'User not logged in.' });
      return;
    }

    const { courseId } = req.params;
    if (courseId && courseId !== 'undefined') {
      if (currentUser.role === 'FACULTY' || currentUser.role === 'ADMIN') {
        const quizzes = await findQuizzesForCourse(courseId);
        res.json(quizzes);
        return;
      } else {
        const quizzes = await findPublishedQuizzesForCourse(courseId);
        res.json(quizzes);
        return;
      }
    } else {
      res.status(404).json({ message: `Invalid course id: ${courseId}.` });
    }
  });

  app.put('/api/quizzes/:quizId', async (req, res) => {
    const currentUser = req.session['currentUser'];
    if (!currentUser) {
      res.status(401).json({ message: 'User not logged in.' });
      return;
    }
    if (currentUser.role !== 'FACULTY' && currentUser.role !== 'ADMIN') {
      res.status(401).json({ message: 'Must be admin or faculty to update a quiz.' });
      return;
    }

    const { quizId } = req.params;
    if (quizId && quizId !== 'undefined') {
      const quizUpdates = req.body;
      const updatedQuiz = await updateQuiz(quizId, quizUpdates);
      res.send(updatedQuiz);
    } else {
      res.status(404).json({ message: `Invalid quiz id: ${quizId}.` });
    }
  });

  app.delete('/api/quizzes/:quizId', async (req, res) => {
    const currentUser = req.session['currentUser'];
    if (!currentUser) {
      res.status(401).json({ message: 'User not logged in.' });
      return;
    }
    if (currentUser.role !== 'FACULTY' && currentUser.role !== 'ADMIN') {
      res.status(401).json({ message: 'Must be admin or faculty to delete a quiz.' });
      return;
    }

    const { quizId } = req.params;
    if (quizId && quizId !== 'undefined') {
      const status = await deleteQuiz(quizId);
      res.send(status);
    } else {
      res.status(404).json({ message: `Invalid quiz id: ${quizId}.` });
    }
  });
};
