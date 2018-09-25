import {
	LOAD_COLLABORATORS,
	ADD_COLLABORATOR,
} from "../../actions/HomeworkCheck/collaborate";

export default function collaborators(state = null, action) {
	switch (action.type) {
		case LOAD_COLLABORATORS: {
			return action.collaborators;
		}
		case ADD_COLLABORATOR: {
			return {
				...state,
				[action.collaborator.id]: action.collaborator,
			};
		}
		default:
			return state;
	}
}
