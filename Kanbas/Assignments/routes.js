import * as dao from './dao.js';
export default function AssignmentRoutes(app) {

    app.delete('/api/assignments/:assignmentId', (req, res) => {
        const { assignmentId } = req.params;
        const status = dao.deleteAssignment(assignmentId);
        res.send(status);
    });

    app.put('/api/assignments/:assignmentId', (req, res) => {
        const { assignmentId } = req.params;
        const assignmentUpdates = req.body;
        const status = dao.updateAssignment(assignmentId, assignmentUpdates);
        res.send(status);
    });
}
