export const LOAD_DEFAULT_USER = "LOAD_DEFAULT_USER";
export const ADD_USER = "ADD_USER";
export const DELETE_USER = "DELETE_USER";
export const UPDATE_USER_FROM_AUTHUSER = "UPDATE_USER_FROM_AUTHUSER";
export const UPDATE_REQUEST_COURSE_ENTRY = "UPDATE_REQUEST_COURSE_ENTRY";
export const ADD_COURSE_TO_STUDENT = "ADD_COURSE_TO_STUDENT";

export function loadDefaultUsers(users) {
	return {
		type: LOAD_DEFAULT_USER,
		users
	};
}

export function updateUser(authUser) {
	return {
		type: UPDATE_USER_FROM_AUTHUSER,
		authUser
	};
}

export function updateRequestCourseEntry(courseID, studentID) {
	return {
		type: UPDATE_REQUEST_COURSE_ENTRY,
		courseID,
		studentID
	};
}
