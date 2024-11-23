import * as dao from './dao.js';

export default function EnrollmentRoutes(app) {
    app.delete('/api/enrollments/:enrollmentId', (req, res) => {
        const { enrollmentId } = req.params;
        const status = dao.deleteEnrollment(enrollmentId);
        res.status(status).send();
    });
}
