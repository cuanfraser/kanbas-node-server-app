import express from 'express';
import mongoose from "mongoose";
import Hello from './Hello.js';
import Lab5 from './Lab5/index.js';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import 'dotenv/config';
import UserRoutes from './Kanbas/Users/routes.js';
import CourseRoutes from './Kanbas/Courses/routes.js';
import ModuleRoutes from './Kanbas/Modules/routes.js';
import AssignmentRoutes from './Kanbas/Assignments/routes.js';
import { QuizzesRoutes } from './Kanbas/Quizzes/routes.js';
import { QuestionRoutes } from './Kanbas/Quizzes/Questions/routes.js';


const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"
mongoose.connect(CONNECTION_STRING).
    catch(error => console.log(error));

const app = express();
app.use(cors({ credentials: true, origin: process.env.NETLIFY_URL || 'http://localhost:3000' }));
const sessionOptions = {
    secret: process.env.SESSION_SECRET || 'kanbas',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: CONNECTION_STRING })
};
if (process.env.NODE_ENV !== 'development') {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: 'none',
        secure: true,
        domain: process.env.NODE_SERVER_DOMAIN,
    };
}
app.use(session(sessionOptions));

app.use(express.json());
Hello(app);
Lab5(app);
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
QuizzesRoutes(app);
QuestionRoutes(app);
app.listen(process.env.PORT || 4000);