import {
	LOAD_HW_UNITS,
	ADD_HW_UNIT,
	DELETE_HW_UNIT,
	UPDATE_HW_UNIT
} from "../../actions/HomeworkCheck/hwUnits";
import update from "immutability-helper";

export default function hwStudents(state = null, action) {
	switch (action.type) {
		case LOAD_HW_UNITS: {
			return action.units;
		}
		case ADD_HW_UNIT: {
			return {
				...state,
				[action.unit.id]: action.unit
			};
		}
		case DELETE_HW_UNIT: {
			return update(state, {
				$unset: [action.id]
			});
		}
		case UPDATE_HW_UNIT: {
			return {
				...state,
				[action.unit.id]: action.unit
			};
		}
		default:
			return state;
	}
}
