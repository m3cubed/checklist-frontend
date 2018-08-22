import { CONNECTION } from "../../config/config";

export const LOAD_HW_COURSES = "LOAD_HW_COURSES";
export const ADD_HW_COURSE = "ADD_HW_COURSE";
export const REMOVE_HW_COURSE = "REMOVE_HW_COURSE";
export const UPDATE_HW_COURSE = "UPDATE_HW_COURSE";

export function loadHWCourses(courses) {
	return {
		type: LOAD_HW_COURSES,
		courses
	};
}

export function addHWCourse(course) {
	return {
		type: ADD_HW_COURSE,
		course
	};
}

function removeHWCourse(id) {
	return {
		type: REMOVE_HW_COURSE,
		id
	};
}

function updateHWCourse(course) {
	return {
		type: UPDATE_HW_COURSE,
		course
	};
}

export function loadDefaultHWCourses(resolve, reject) {
	return (dispatch, getState) => {
		const { authUser } = getState();

		fetch(`${CONNECTION}/homework_check_courses/retrieve`, {
			method: "PUT",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ creatorID: authUser.id })
		})
			.then(res => res.json())
			.then(json => {
				if (json.completed === true) {
					dispatch(loadHWCourses(json.courses));
					try {
						resolve();
					} catch (err) {
						console.log(err);
					}
				} else {
					try {
						reject();
					} catch (err) {
						console.log(err);
					}
				}
			});
	};
}

export function handleDeleteHWCourse(id) {
	return dispatch => {
		fetch(`${CONNECTION}/homework_check_courses/delete`, {
			method: "PUT",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ id })
		})
			.then(res => res.json())
			.then(json => {
				if (json.completed === true) {
					dispatch(removeHWCourse(id));
				}
			});
	};
}

export function handleAddHWCourse(course) {
	return (dispatch, getState) => {
		const { authUser } = getState();
		course.creatorID = authUser.id;

		fetch(`${CONNECTION}/homework_check_courses/new`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ course })
		})
			.then(res => res.json())
			.then(json => {
				if (json.completed === true) {
					dispatch(addHWCourse(json.course));
				}
			});
	};
}

export function handleUpdateHWCourse(course) {
	return dispatch => {
		fetch(`${CONNECTION}/homework_check_courses/update`, {
			method: "PUT",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ course })
		})
			.then(res => res.json())
			.then(json => {
				if (json.completed === true) {
					dispatch(updateHWCourse(json.course));
				} else {
					console.log(json.err);
				}
			});
	};
}
