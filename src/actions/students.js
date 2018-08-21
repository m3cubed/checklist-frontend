import { CONNECTION } from "../config/config";

export const GET_STUDENTS = "GET_STUDENTS";

function getStudents(students) {
	return {
		type: GET_STUDENTS,
		students
	};
}

export function handleGetStudents() {
	return dispatch => {
		fetch(`${CONNECTION}/courses/get_students`, {
			method: "GET",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => res.json())
			.then(json => {
				if (json.completed === true) {
					dispatch(getStudents(json.students));
				}
			});
	};
}
