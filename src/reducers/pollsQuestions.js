import { RETRIEVE_QUESTIONS } from "../actions/pollsQuestions";

export default function pollsQuestions(state = {}, action) {
	switch (action.type) {
		case RETRIEVE_QUESTIONS: {
			return action.questions;
		}
		default:
			return state;
	}
}
