import {
	CHANGE_VIEW_STATE,
	TOGGLE_SHOW_IMPORT,
	TOGGLE_SEATING_HOMEWORK
} from "../../actions/PageStates/hwCheckCourse";

export default function hwCheckCourse(
	state = {
		view: "",
		imports: { students: false, homeworks: false },
		seatingHomework: ""
	},
	action
) {
	switch (action.type) {
		case CHANGE_VIEW_STATE: {
			return {
				...state,
				view: action.view
			};
		}
		case TOGGLE_SHOW_IMPORT: {
			return {
				...state,
				imports: {
					...state.imports,
					[action.item]: !state.imports[action.item]
				}
			};
		}
		case TOGGLE_SEATING_HOMEWORK: {
			return {
				...state,
				seatingHomework: action.homework
			};
		}
		default:
			return state;
	}
}
