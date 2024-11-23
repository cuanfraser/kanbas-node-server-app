import Database from '../Database/index.js';

export function enrollUserInCourse(userId, courseId) {
    const { enrollments } = Database;
    const newEnrollment = { _id: Date.now().toString(), user: userId, course: courseId };
    enrollments.push(newEnrollment);
    return newEnrollment;
}

export function findEnrollmentsForUser(userId) {
    const { enrollments } = Database;
    return enrollments.filter((enrollment) => enrollment.user === userId);
}

export function deleteEnrollment(enrollmentId) {
    const { enrollments } = Database;
    const newEnrollments = enrollments.filter((enrollment) => enrollment._id !== enrollmentId);
    if (newEnrollments.length === enrollments.length) {
        return 401;
    }
    Database.enrollments = newEnrollments;
    return 200;
}

