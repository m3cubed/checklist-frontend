import { CONNECTION } from "../config/config";
import { updateUser } from "./users";
import { loadDefaultTemplates } from "./templates";
import { loadDefaultCourses } from "./courses";
import { loadDefaultPolls } from "./polls";

export const AUTH_USER = "AUTH_USER";
export const LOGIN_USER = "LOGIN_USER";
export const ADD_USER_TEMPLATE = "ADD_USER_TEMPLATE";
export const DELETE_USER_TEMPLATE = "DELETE_USER_TEMPLATE";
export const ADD_USER_COURSE = "ADD_USER_COURSE";
export const DELETE_USER_COURSE = "DELETE_USER_COURSE";
export const REQUEST_COURSE_ENTRY = "REQUEST_COURSE_ENTRY";
export const ADD_POLLS_RESPONSE = "ADD_POLLS_RESPONSE";
export const LOGOUT_USER = "LOGOUT_USER";

export function authUser(id) {
	return {
		type: AUTH_USER,
		id
	};
}

export function logoutUser() {
	return {
		type: LOGOUT_USER
	};
}

export function loginUser(user) {
	return {
		type: LOGIN_USER,
		user
	};
}

export function addUserTemplate(templateID, length) {
	return {
		type: ADD_USER_TEMPLATE,
		templateID,
		length
	};
}

export function deleteUserTemplate(templateID) {
	return {
		type: DELETE_USER_TEMPLATE,
		templateID
	};
}

export function addUserCourse(courseID) {
	return {
		type: ADD_USER_COURSE,
		courseID
	};
}

export function deleteUserCourse(courseID) {
	return {
		type: DELETE_USER_COURSE,
		courseID
	};
}

export function requestCourseEntry(courseID) {
	return {
		type: REQUEST_COURSE_ENTRY,
		courseID
	};
}

export function addPollsResponse(pollID, responseID) {
	return {
		type: ADD_POLLS_RESPONSE,
		pollID,
		responseID
	};
}

export function handleChangeUser(user, resolve, reject) {
	return (dispatch, getState) => {
		const { authUser } = getState();
		if (user === null) {
			resolve();
			dispatch();
		}
		switch (user.status) {
			case "teacher": {
				fetch(`${CONNECTION}/user/teacher_info`, {
					method: "POST",
					credentials: "include",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ id: user.id })
				})
					.then(res => res.json())
					.then(json => {
						if (json.type === "error") {
							reject();
							return null;
						} else {
							if (authUser !== false) {
								dispatch(updateUser(authUser));
							}
							dispatch(loginUser(user));
							dispatch(loadDefaultTemplates(json.templates));
							dispatch(loadDefaultCourses(json.courses));
							dispatch(loadDefaultPolls(json.polls));
							resolve();
						}
					});
				break;
			}

			case "admin": {
				fetch(`${CONNECTION}/user/teacher_info`, {
					method: "POST",
					credentials: "include",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ id: user.id })
				})
					.then(res => res.json())
					.then(json => {
						if (json.type === "error") {
							reject();
							return null;
						} else {
							if (authUser !== false) {
								dispatch(updateUser(authUser));
							}
							dispatch(loginUser(user));
							dispatch(loadDefaultTemplates(json.templates));
							dispatch(loadDefaultCourses(json.courses));
							dispatch(loadDefaultPolls(json.polls));
							resolve();
						}
					});
				break;
			}

			case "student": {
				fetch(`${CONNECTION}/user/student_info`, {
					method: "POST",
					credentials: "include",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						pollIDs: Object.keys(user.todoPolls),
						courseIDs: Object.keys(user.courseIDs)
					})
				})
					.then(res => res.json())
					.then(json => {
						if (json.completed === true) {
							if (authUser !== false) {
								dispatch(updateUser(authUser));
							}
							dispatch(loginUser(user));
							dispatch(loadDefaultCourses(json.courses));
							dispatch(loadDefaultPolls(json.polls));
							resolve();
						}
					});
				break;
			}
			default:
				return null;
		}
	};
}

export function handleAddPollsResponse(pollIDs, resolve, reject) {
	return (dispatch, getState) => {
		const { authUser } = getState();

		let requests = pollIDs.map(pollID => {
			return new Promise((r_resolve, r_reject) => {
				fetch(`${CONNECTION}/user_poll_responses/new`, {
					method: "POST",
					credentials: "include",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						pollID,
						creatorID: authUser.id
					})
				})
					.then(res => res.json())
					.then(json => {
						if (json.completed === true) {
							dispatch(addPollsResponse(pollID, json.response.id));
							r_resolve();
						} else {
							r_reject();
						}
					});
			});
		});

		Promise.all(requests)
			.then(() => resolve())
			.catch(err => reject(err));
	};
}
