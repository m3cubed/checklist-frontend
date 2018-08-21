export const RECEIVE_LIST = "RECEIVE_LIST";
export const TOGGLE_STUDENT = "TOGGLE_STUDENT";

export function receiveList(list) {
	return {
		type: RECEIVE_LIST,
		list
	};
}

export function toggleStudent(student) {
	return {
		type: TOGGLE_STUDENT,
		student
	};
}
