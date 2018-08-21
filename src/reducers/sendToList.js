import { RECEIVE_LIST, TOGGLE_STUDENT } from "../actions/sendToList";
export default function sendToList(state = {}, action) {
	switch (action.type) {
		case RECEIVE_LIST: {
			return {
				...action.list
			};
		}

		case TOGGLE_STUDENT: {
			return {
				...state,
				[action.student]: !state[action.student]
			};
		}

		default:
			return state;
	}
}
