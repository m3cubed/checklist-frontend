import {
	LOAD_HOMEWORKS,
	ADD_HOMEWORK,
	DELETE_HOMEWORK,
	UPDATE_HOMEWORK
} from "../../actions/HomeworkCheck/homeworks";
import update from "immutability-helper";

export default function homeworks(state = null, action) {
	switch (action.type) {
		case LOAD_HOMEWORKS: {
			return action.homeworks;
		}
		case ADD_HOMEWORK: {
			return {
				...state,
				[action.homework.id]: action.homework
			};
		}
		case DELETE_HOMEWORK: {
			return update(state, {
				$unset: [action.homework.id]
			});
		}
		case UPDATE_HOMEWORK: {
			return {
				...state,
				[action.homework.id]: action.homework
			};
		}
		default:
			return state;
	}
}
