import {
	LOAD_STUDENT_HW_STATUS,
	ADD_STUDENT_HW_STATUS,
	DELETE_STUDENT_HW_STATUS,
	UPDATE_STUDENT_HW_STATUS,
	UPDATE_COLUMN_HW_STATUS
} from "../../actions/HomeworkCheck/studentHWStatus";
import update from "immutability-helper";

export default function studentHWStatus(state = null, action) {
	switch (action.type) {
		case LOAD_STUDENT_HW_STATUS: {
			return action.studentHWStatus;
		}
		case ADD_STUDENT_HW_STATUS: {
			return {
				...state,
				[action.studentHWStatus.homeworkTitle]: action.studentHWStatus
			};
		}
		case DELETE_STUDENT_HW_STATUS: {
			return update(state, {
				$unset: [action.homeworkID]
			});
		}
		case UPDATE_STUDENT_HW_STATUS: {
			return {
				...state,
				[action.homework]: {
					...state[action.homework],
					[action.student]: action.status
				}
			};
		}
		case UPDATE_COLUMN_HW_STATUS: {
			return {
				...state,
				[action.column.id]: action.column.values
			};
		}
		default:
			return state;
	}
}
