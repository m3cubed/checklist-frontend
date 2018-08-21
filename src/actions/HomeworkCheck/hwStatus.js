import { CONNECTION } from "../../config/config";

export const LOAD_HW_STATUS = "LOAD_HW_STATUS";
export const ADD_HW_STATUS = "ADD_HW_STATUS";
export const DELETE_HW_STATUS = "DELETE_HW_STATUS";
export const UPDATE_HW_STATUS = "UPDATE_HW_STATUS";

export function loadHWStatus(status) {
	return {
		type: LOAD_HW_STATUS,
		status
	};
}

function addHWStatus(status) {
	return {
		type: ADD_HW_STATUS,
		status
	};
}

function deleteHWStatus(status) {
	return {
		type: DELETE_HW_STATUS,
		status
	};
}

function updateHWStatus(status) {
	return {
		type: UPDATE_HW_STATUS,
		status
	};
}

export function handleAddHWStatus(status) {
	return dispatch => {
		fetch(`${CONNECTION}/possible_homework_status/new`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ status })
		})
			.then(res => res.json())
			.then(json => {
				if (json.completed === true) {
					dispatch(addHWStatus(json.status));
				}
			});
	};
}

export function loadDefaultHWStatus(courseID, resolve, reject) {
	return dispatch => {
		fetch(`${CONNECTION}/possible_homework_status/retrieve`, {
			method: "PUT",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ courseID })
		})
			.then(res => res.json())
			.then(json => {
				dispatch(loadHWStatus(json.status));
				resolve();
			});
	};
}
