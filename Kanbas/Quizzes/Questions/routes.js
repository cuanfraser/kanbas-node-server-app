import { findQuizById } from '../dao.js';
import {
  createQuestionForQuiz,
  findQuestionById,
  findQuestionsForQuiz,
  updateQuestion,
  deleteQuestion,
} from './dao.js';

export const QuestionRoutes = (app) => {
  app.post('/api/quizzes/:quizId/questions', async (req, res) => {
    const currentUser = req.session['currentUser'];
    if (!currentUser) {
      res.status(401).json({ message: 'User not logged in.' });
      return;
    }
    if (currentUser.role !== 'FACULTY' && currentUser.role !== 'ADMIN') {
      res.status(401).json({ message: 'Must be admin or faculty to create quiz questions.' });
      return;
    }

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
    const currentUser = req.session['currentUser'];
    if (!currentUser) {
      res.status(401).json({ message: 'User not logged in.' });
      return;
    }

    const { questionId } = req.params;
    if (!questionId || questionId === 'undefined') {
      res.status(404).json({ message: `Invalid question id: ${questionId}.` });
      return;
    }
    const question = await findQuestionById(questionId);

    if (currentUser.role !== 'FACULTY' && currentUser.role !== 'ADMIN') {
      const quiz = await findQuizById(question.quiz_id);
      if (!quiz.published) {
        res.status(401).json({ message: 'Quiz not published yet.' });
        return;
      }
      if (quiz.due > new Date()) {
        delete question.answer;
      }
    }

    res.json(question);
  });

  app.get('/api/quizzes/:quizId/questions', async (req, res) => {
    const currentUser = req.session['currentUser'];
    if (!currentUser) {
      res.status(401).json({ message: 'User not logged in.' });
      return;
    }

    const { quizId } = req.params;
    if (quizId && quizId !== 'undefined') {
      const questions = await findQuestionsForQuiz(quizId);
      if (currentUser.role !== 'FACULTY' && currentUser.role !== 'ADMIN') {
        const quiz = await findQuizById(quizId);
        if (!quiz.published) {
          res.status(401).json({ message: 'Quiz not published yet.' });
          return;
        }
        if (quiz.due > new Date()) {
          for (const question of questions) {
            delete question.answer;
          }
        }
      }
      res.json(questions);
    } else {
      res.status(404).json({ message: `Invalid quiz id: ${quizId}.` });
    }
  });

  app.put('/api/questions/:questionId', async (req, res) => {
    const currentUser = req.session['currentUser'];
    if (!currentUser) {
      res.status(401).json({ message: 'User not logged in.' });
      return;
    }
    if (currentUser.role !== 'FACULTY' && currentUser.role !== 'ADMIN') {
      res.status(401).json({ message: 'Must be admin or faculty to update quiz questions.' });
      return;
    }

    const { questionId } = req.params;
    if (questionId && questionId !== 'undefined') {
      const questionUpdates = req.body;
      const updatedQuestion = await updateQuestion(questionId, questionUpdates);
      res.send(updatedQuestion);
    } else {
      res.status(404).json({ message: `Invalid question id: ${questionId}.` });
    }
  });

  app.delete('/api/questions/:questionId', async (req, res) => {
    const currentUser = req.session['currentUser'];
    if (!currentUser) {
      res.status(401).json({ message: 'User not logged in.' });
      return;
    }
    if (currentUser.role !== 'FACULTY' && currentUser.role !== 'ADMIN') {
      res.status(401).json({ message: 'Must be admin or faculty to delete quiz questions.' });
      return;
    }

    const { questionId } = req.params;
    if (questionId && questionId !== 'undefined') {
      const status = await deleteQuestion(questionId);
      res.send(status);
    } else {
      res.status(404).json({ message: `Invalid question id: ${questionId}.` });
    }
  });
};
