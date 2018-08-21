import {
	LOAD_HW_STATUS,
	ADD_HW_STATUS,
	DELETE_HW_STATUS,
	UPDATE_HW_STATUS
} from "../../actions/HomeworkCheck/hwStatus";
import update from "immutability-helper";

export default function hwStatus(state = null, action) {
	switch (action.type) {
		case LOAD_HW_STATUS: {
			return action.status;
		}
		case ADD_HW_STATUS: {
			return {
				...state,
				[action.status.statusTitle]: action.status
			};
		}
		case DELETE_HW_STATUS: {
			return update(state, {
				$unset: [action.status.statusTitle]
			});
		}
		case UPDATE_HW_STATUS: {
			return {
				...state,
				[action.status.statusTitle]: action.status
			};
		}
		default:
			return state;
	}
}
