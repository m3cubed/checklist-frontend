import { CONNECTION } from "../../config/config";
import { nameDuplicate } from "../../api";
import { deleteStudentStatus } from "./studentHWStatus";

export const LOAD_HOMEWORKS = "LOAD_HOMEWORKS";
export const ADD_HOMEWORK = "ADD_HOMEWORK";
export const DELETE_HOMEWORK = "DELETE_HOMEWORK";
export const UPDATE_HOMEWORK = "UPDATE_HOMEWORK";

export function loadHomeworks(homeworks) {
	return {
		type: LOAD_HOMEWORKS,
		homeworks,
	};
}

function addHomework(homework) {
	return {
		type: ADD_HOMEWORK,
		homework,
	};
}

function deleteHomework(id) {
	return {
		type: DELETE_HOMEWORK,
		id,
	};
}

function updateHomework(homework) {
	return {
		type: UPDATE_HOMEWORK,
		homework,
	};
}

export function handleAddHomework(homework) {
	return (dispatch, getState) => {
		const { homeworks } = getState();
		homework.homeworkTitle = nameDuplicate(
			homework.homeworkTitle,
			homeworks,
			"homeworkTitle",
			["unitID", homework.unitID],
		);

		fetch(`${CONNECTION}/homeworks/new`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ homework }),
		})
			.then(res => res.json())
			.then(json => {
				if (json.completed === true) {
					dispatch(addHomework(json.homework));
				}
			});
	};
}

export function loadDefaultHomeworks(courseID, resolve, reject) {
	return dispatch => {
		fetch(`${CONNECTION}/homeworks/retrieve`, {
			method: "PUT",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ courseID }),
		})
			.then(res => res.json())
			.then(json => {
				if (json.completed === true) {
					dispatch(loadHomeworks(json.homeworks));
					resolve();
				} else {
					reject();
				}
			});
	};
}

export function handleUpdateHomework(homework) {
	return dispatch => {
		fetch(`${CONNECTION}/homeworks/update`, {
			method: "PUT",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ homework }),
		})
			.then(res => res.json())
			.then(json => {
				if (json.completed) {
					dispatch(updateHomework(json.homework));
				}
			});
	};
}

export function handleDeleteHomework(id) {
	return dispatch => {
		fetch(`${CONNECTION}/homeworks/delete`, {
			method: "PUT",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id }),
		})
			.then(res => res.json())
			.then(json => {
				if (json.completed) {
					dispatch(deleteHomework(id));
					dispatch(deleteStudentStatus(id));
				}
			});
	};
}
