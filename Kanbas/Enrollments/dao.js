import model from './model.js';

export function findEnrollmentsForUser(userId) {
    return model.find({ user: userId })
}

export function deleteEnrollment(enrollmentId) {
    return model.deleteOne({ _id: enrollmentId });
}

export async function findCoursesForUser(userId) {
    const enrollments = await model.find({ user: userId }).populate('course');
    return enrollments.map((enrollment) => enrollment.course);
}

export async function findUsersForCourse(courseId) {
    const enrollments = await model.find({ course: courseId }).populate('user');
    return enrollments.map((enrollment) => enrollment.user);
}

export function enrollUserInCourse(user, course) {
    return model.create({ user, course });
}

export function unenrollUserFromCourse(user, course) {
    return model.deleteOne({ user, course });
}

export function deleteEnrollmentsForCourse(courseId) {
    return model.deleteMany({ course: courseId });
}