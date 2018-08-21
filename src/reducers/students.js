import { GET_STUDENTS } from "../actions/students";

export default function students(state = null, action) {
	switch (action.type) {
		case GET_STUDENTS: {
			return action.students;
		}
		default:
			return state;
	}
}
