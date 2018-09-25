import { LOAD_COLLABORATIONS } from "../actions/courseCollaborations";

export default function courseCollaborations(state = {}, action) {
	switch (action.type) {
		case LOAD_COLLABORATIONS: {
			return action.collaborations;
		}
		default:
			return state;
	}
}
