import { CONNECTION } from "../../config/config";

export const LOAD_HW_STUDENTS = "LOAD_HW_STUDENTS";
export const ADD_HW_STUDENT = "ADD_HW_STUDENT";
export const DELETE_HW_STUDENT = "DELETE_HW_STUDENT";
export const UPDATE_HW_STUDENT = "UPDATE_HW_STUDENT";

export function loadHWStudents(students) {
	return {
		type: LOAD_HW_STUDENTS,
		students
	};
}

function addHWStudent(student) {
	return {
		type: ADD_HW_STUDENT,
		student
	};
}

function deleteHWStudent(id) {
	return {
		type: DELETE_HW_STUDENT,
		id
	};
}

function updateHWStudent(student) {
	return {
		type: UPDATE_HW_STUDENT,
		student
	};
}

export function handleAddHWStudent(student) {
	return dispatch => {
		fetch(`${CONNECTION}/students/new`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ student })
		})
			.then(res => res.json())
			.then(json => {
				if (json.completed === true) {
					dispatch(addHWStudent(json.student));
				}
			});
	};
}

export function loadDefaultHWStudents(courseID, resolve, reject) {
	return dispatch => {
		fetch(`${CONNECTION}/students/retrieve`, {
			method: "PUT",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ courseID })
		})
			.then(res => res.json())
			.then(json => {
				dispatch(loadHWStudents(json.students));
				resolve();
			});
	};
}

export function handleDeleteHWStudent(id) {
	return dispatch => {
		fetch(`${CONNECTION}/students/delete`, {
			method: "PUT",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ id })
		})
			.then(res => res.json())
			.then(json => {
				if (json.completed) {
					dispatch(deleteHWStudent(id));
				}
			});
	};
}

export function handleUpdateHWStudent(student) {
	return dispatch => {
		fetch(`${CONNECTION}/students/update`, {
			method: "PUT",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ student })
		})
			.then(res => res.json())
			.then(json => {
				if (json.completed) {
					dispatch(updateHWStudent(json.student));
				}
			});
	};
}

export function handleSubmitMultipleStudents(students, courseID) {
	console.log(2);
	return dispatch => {
		fetch(`${CONNECTION}/students/insert_many`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ students, courseID })
		})
			.then(res => res.json())
			.then(json => {
				if (json.completed === true) {
					json.students.forEach(student => dispatch(addHWStudent(student)));
				}
			});
	};
}
