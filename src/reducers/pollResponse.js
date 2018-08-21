import {
	RETRIEVE_USER_POLL_RESPONSE,
	EXPORT_USER_POLL_RESPONSE,
	LOAD_CLASS_RESPONSES
} from "../actions/pollResponse";

export default function pollResponse(state = {}, action) {
	switch (action.type) {
		case RETRIEVE_USER_POLL_RESPONSE: {
			return action.userResponse;
		}
		case EXPORT_USER_POLL_RESPONSE: {
			return {};
		}
		case LOAD_CLASS_RESPONSES: {
			return action.responses;
		}
		default:
			return state;
	}
}
