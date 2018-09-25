import { LOAD_COLLABORATIONS } from "../actions/courseCollaborations";

export default function courseCollaborations(state = null, action) {
	switch (action.type) {
		case LOAD_COLLABORATIONS: {
			return action.collaborations;
		}
		default:
			return state;
	}
}
