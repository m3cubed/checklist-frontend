import {
	UPDATE_POSITION,
	LOAD_POSITIONS
} from "../../actions/HomeworkCheck/seatingPositions";

export default function seatingPositions(state = {}, action) {
	switch (action.type) {
		case UPDATE_POSITION: {
			return {
				...state,
				[action.student.id]: action.student
			};
		}

		case LOAD_POSITIONS: {
			return action.positions;
		}

		default:
			return state;
	}
}
