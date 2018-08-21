import {
	addUserCourse,
	deleteUserCourse,
	requestCourseEntry
} from "./authUser";
import { updateRequestCourseEntry } from "./users";
import { sendPoll } from "./polls";
import { CONNECTION } from "../config/config";
import { handleGetStudents } from "./students";

export const ADD_COURSE = "ADD_COURSE";
export const DELETE_COURSE = "DELETE_COURSE";
export const ADD_STUDENT_TO_COURSE = "ADD_STUDENT_TO_COURSE";
export const CONFIRM_STUDENT = "CONFIRM_STUDENT";
export const LOAD_DEFAULT_COURSES = "LOAD_DEFAULT_COURSES";
export const ADD_SENT_TEMPLATE = "ADD_SENT_TEMPLATE";
export const CONFIRM_COMPLETE = "CONFIRM_COMPLETE";

function addCourse(course) {
	return {
		type: ADD_COURSE,
		course
	};
}

export function deleteCourse(course) {
	return {
		type: DELETE_COURSE,
		course
	};
}

export function addStudentToCourse(course, studentID) {
	return {
		type: ADD_STUDENT_TO_COURSE,
		course,
		studentID
	};
}

export function confirmStudent(course, studentID) {
	return {
		type: CONFIRM_STUDENT,
		course,
		studentID
	};
}

export function loadDefaultCourses(courses) {
	return {
		type: LOAD_DEFAULT_COURSES,
		courses
	};
}

export function addSentTemplate(students) {
	return {
		type: ADD_SENT_TEMPLATE,
		students
	};
}

export function confirmComplete(student) {
	return {
		type: CONFIRM_COMPLETE,
		student
	};
}

//Full course data is passed in order to future-proof

export function handleAddCourse(course) {
	return (dispatch, getState) => {
		const { authUser } = getState();
		const length = Object.keys(authUser.courseIDs).length + 1;

		fetch(`${CONNECTION}/courses/new`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				...course,
				length
			})
		})
			.then(res => res.json())
			.then(json => {
				if (json.completed === true) {
					dispatch(addUserCourse(json.course.id));
					dispatch(addCourse(json.course));
				}
			});
	};
}

export function handleDeleteCourse(course) {
	return dispatch => {
		dispatch(deleteUserCourse(course.id));
		dispatch(deleteCourse(course));
	};
}

export function handleAddStudentToCourse(course, studentID) {
	return dispatch => {
		fetch(`${CONNECTION}/courses/students/request`, {
			method: "PUT",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				courseID: course.id,
				studentID
			})
		})
			.then(res => res.json())
			.then(json => {
				if (json.completed === true) {
					dispatch(requestCourseEntry(course.id));
					dispatch(addStudentToCourse(course, studentID));
				}
			});
	};
}

export function handleConfirmStudent(course, studentID) {
	return (dispatch, getState) => {
		const { authUser } = getState();
		const length = Object.keys(authUser.courseIDs).length;

		fetch(`${CONNECTION}/courses/students/confirm`, {
			method: "PUT",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				courseID: course.id,
				studentID,
				length
			})
		})
			.then(res => res.json())
			.then(json => {
				if (json.completed === true) {
					dispatch(updateRequestCourseEntry(course.id, studentID));
					dispatch(confirmStudent(course, studentID));
				}
			});
	};
}

export function handleSendPolls(templateID, resolve, reject) {
	return (dispatch, getState) => {
		const { authUser, sentToList } = getState();

		new Promise((r_resolve, r_reject) => {
			fetch(`${CONNECTION}/polls/new`, {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					templateID: templateID,
					creatorID: authUser.id,
					creator: `${authUser.userLastName}, ${authUser.userFirstName}`,
					students: sentToList
				})
			})
				.then(res => res.json())
				.then(json => {
					if (json.completed === true) {
						dispatch(sendPoll(json.poll));
						r_resolve();
					}
					r_reject();
				});
		})
			.then(() => {
				dispatch(handleGetStudents());
				resolve();
			})
			.catch(err => {
				reject(err);
			});
	};
}
