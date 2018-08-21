import {
	NEW_QUESTION,
	CHANGE_TYPE,
	CHANGE_FORMAT
} from "../actions/currentQuestionEdit";

export default function currentQuestionEdit(state = {}, action) {
	switch (action.type) {
		case NEW_QUESTION: {
			return action.question;
		}

		case CHANGE_TYPE: {
			return {
				...state,
				type: action.type
			};
		}

		case CHANGE_FORMAT: {
			return {
				...state,
				format: action.format
			};
		}

		default:
			return state;
	}
}
