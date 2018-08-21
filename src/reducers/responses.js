import {
	RETRIEVE_RESPONSE,
	UPDATE_RESPONSE,
	CLEAR_RESPONSE
} from "../actions/responses";

export default function responses(state = null, action) {
	switch (action.type) {
		case RETRIEVE_RESPONSE: {
			if (state === null) {
				return { [action.response.questionID]: action.response };
			}
			return {
				...state,
				[action.response.questionID]: action.response
			};
		}
		case UPDATE_RESPONSE: {
			return {
				...state,
				[action.response.questionID]: action.response
			};
		}
		case CLEAR_RESPONSE: {
			return null;
		}
		default:
			return state;
	}
}
