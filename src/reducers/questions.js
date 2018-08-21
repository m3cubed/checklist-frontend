import {
	ADD_QUESTION,
	FORMAT_QUESTION,
	DELETE_QUESTION,
	LOAD_DEFAULT_QUESTIONS
} from "../actions/questions";
import update from "immutability-helper";

export default function questions(state = {}, action) {
	switch (action.type) {
		case ADD_QUESTION:
			return {
				...state,
				[action.question.id]: action.question
			};

		case FORMAT_QUESTION:
			return {
				...state,
				[action.question.id]: {
					...action.question,
					format: action.format
				}
			};

		case DELETE_QUESTION: {
			return update(state, {
				$unset: [action.questionID]
			});
		}

		case LOAD_DEFAULT_QUESTIONS: {
			return action.questions;
		}

		default:
			return state;
	}
}
