import { CONNECTION } from "../../config/config";
import { nameDuplicate } from "../../api";
import _debounce from "lodash";

export const LOAD_STUDENT_HW_STATUS = "LOAD_STUDENT_HW_STATUS";
export const ADD_STUDENT_HW_STATUS = "ADD_STUDENT_HW_STATUS";
export const DELETE_STUDENT_HW_STATUS = "DELETE_STUDENT_HW_STATUS";
export const UPDATE_STUDENT_HW_STATUS = "UPDATE_STUDENT_HW_STATUS";
export const UPDATE_COLUMN_HW_STATUS = "UPDATE_COLUMN_HW_STATUS";

export function loadStudentStatus(studentHWStatus) {
	return {
		type: LOAD_STUDENT_HW_STATUS,
		studentHWStatus,
	};
}

function addStudentStatus(studentHWStatus) {
	return {
		type: ADD_STUDENT_HW_STATUS,
		studentHWStatus,
	};
}

export function deleteStudentStatus(homeworkID) {
	return {
		type: DELETE_STUDENT_HW_STATUS,
		homeworkID,
	};
}

export function updateStudentStatus(homework, student, status) {
	return {
		type: UPDATE_STUDENT_HW_STATUS,
		homework,
		student,
		status,
	};
}

function updateColumnStatus(column) {
	return {
		type: UPDATE_COLUMN_HW_STATUS,
		column,
	};
}

export function handleAddStudentStatus(studentHWStatus) {
	return dispatch => {
		fetch(`${CONNECTION}/student_homework_status/new`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ studentHWStatus }),
		})
			.then(res => res.json())
			.then(json => {
				if (json.completed === true) {
					dispatch(addStudentStatus(json.studentHWStatus));
				}
			});
	};
}

export function loadDefaultStudentStatus(courseID, resolve, reject) {
	return (dispatch, getState) => {
		const { homeworks } = getState();
		let studentHWStatus = getState().studentHWStatus;
		let temp;
		try {
			temp = Object.keys(studentHWStatus).reduce((acc, cv) => {
				if (Object.keys(homeworks).includes(cv)) {
					acc[cv] = studentHWStatus[cv];
				}
				return acc;
			}, {});
			studentHWStatus = temp;
		} catch (err) {
			// console.log(err);
		}

		fetch(`${CONNECTION}/student_homework_status/retrieve`, {
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
					if (
						studentHWStatus !== null &&
						Object.keys(studentHWStatus).length !== 0 &&
						json.studentHWStatus !== studentHWStatus
					) {
						dispatch(loadStudentStatus(studentHWStatus));
						dispatch(saveAllStatus(courseID));
					} else {
						dispatch(loadStudentStatus(json.studentHWStatus));
					}
					resolve();
				} else {
					reject();
				}
			});
	};
}

export function handleUpdateColumn(hwID, statusTitle) {
	return (dispatch, getState) => {
		const { hwStudents } = getState();

		const column = {
			id: hwID,
			values: {},
		};
		Object.keys(hwStudents).forEach(cv => {
			column.values[cv] = statusTitle;
		});

		dispatch(updateColumnStatus(column));
	};
}

export function saveAllStatus(courseID) {
	return (dispatch, getState) => {
		const { studentHWStatus } = getState();
		const statusList = studentHWStatus;

		fetch(`${CONNECTION}/student_homework_status/upsert`, {
			method: "PUT",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ statusList, courseID }),
		})
			.then(res => res.json())
			.then(json => console.log(json));
	};
}
