import { MAP_QUESTIONS_TO_EDITS, TOGGLE_EDIT } from "../actions/questionEdits";

export default function quesitonEdits(state = {}, action) {
	switch (action.type) {
		case MAP_QUESTIONS_TO_EDITS: {
			return action.questions;
		}
		case TOGGLE_EDIT: {
			return {
				...state,
				[action.questionID]: !state[action.questionID]
			};
		}
		default:
			return state;
	}
}
