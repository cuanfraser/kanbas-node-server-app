import {
  createAttemptForQuiz,
  deleteAttempt,
  findAttemptById,
  findAttemptsByUserForQuiz,
  updateAttempt,
} from './dao.js';

export const AttemptRoutes = (app) => {
  app.post('/api/quizzes/:quizId/attempts', async (req, res) => {
    const currentUser = req.session['currentUser'];
    if (!currentUser) {
      res.status(401).json({ message: 'User not logged in.' });
    }

    const { quizId } = req.params;
    if (quizId && quizId !== 'undefined') {
      const attempt = {
        ...req.body,
        quiz_id: quizId,
        user_id: currentUser._id,
      };
      const newQuestion = await createAttemptForQuiz(attempt);
      res.send(newQuestion);
    } else {
      res.status(404).json({ message: `Invalid quiz id: ${quizId}.` });
    }
  });

  app.get('/api/attempts/:attemptId', async (req, res) => {
    const { attemptId } = req.params;
    if (attemptId && attemptId !== 'undefined') {
      const attempt = await findAttemptById(attemptId);
      res.json(attempt);
    } else {
      res.status(404).json({ message: `Invalid attempt id: ${attemptId}.` });
    }
  });

  app.get('/api/quizzes/:quizId/attempts', async (req, res) => {
    const { quizId } = req.params;
    const currentUser = req.session['currentUser'];

    if (!currentUser) {
      res.status(401).json({ message: 'User not logged in.' });
    }

    if (quizId && quizId !== 'undefined') {
      const attempts = await findAttemptsByUserForQuiz(currentUser._id, quizId);
      res.json(attempts);
    } else {
      res.status(404).json({ message: `Invalid quiz id: ${quizId}.` });
    }
  });

  app.put('/api/attempts/:attemptId', async (req, res) => {
    const { attemptId } = req.params;
    const currentUser = req.session['currentUser'];
    if (!currentUser) {
      res.status(401).json({ message: 'User not logged in.' });
    }
    if (!attemptId || attemptId === 'undefined') {
      res.status(404).json({ message: `Invalid attempt id: ${attemptId}.` });
    }

    const attemptUpdates = req.body;

    if (currentUser.role !== 'FACULTY' && currentUser.role !== 'ADMIN') {
      delete attemptUpdates.started;
      const existingAttempt = await findAttemptById(attemptId);
      if (existingAttempt.submitted) {
        res.status(401).json({ message: 'Attempt already submitted.' });
      }
    }

    const updatedAttempt = await updateAttempt(attemptId, attemptUpdates);
    res.send(updatedAttempt);
  });

  app.delete('/api/attempt/:attemptId', async (req, res) => {
    const { attemptId } = req.params;

    const currentUser = req.session['currentUser'];

    if (!currentUser || (currentUser.role !== 'FACULTY' && currentUser.role !== 'ADMIN')) {
      res.status(401).json({ message: 'Only faculty and admins can delete quiz attempts.' });
    }

    if (attemptId && attemptId !== 'undefined') {
      const status = await deleteAttempt(attemptId);
      res.send(status);
    } else {
      res.status(404).json({ message: `Invalid attempt id: ${attemptId}.` });
    }
  });
};
