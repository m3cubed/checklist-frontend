import {
	LOAD_HW_STUDENTS,
	ADD_HW_STUDENT,
	DELETE_HW_STUDENT,
	UPDATE_HW_STUDENT
} from "../../actions/HomeworkCheck/hwStudents";
import update from "immutability-helper";

export default function hwStudents(state = null, action) {
	switch (action.type) {
		case LOAD_HW_STUDENTS: {
			return action.students;
		}
		case ADD_HW_STUDENT: {
			return {
				...state,
				[action.student.id]: action.student
			};
		}
		case DELETE_HW_STUDENT: {
			return update(state, {
				$unset: [action.student.id]
			});
		}
		case UPDATE_HW_STUDENT: {
			return {
				...state,
				[action.student.id]: action.student
			};
		}
		default:
			return state;
	}
}
