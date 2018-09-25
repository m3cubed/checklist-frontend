import {
	CHANGE_VIEW_STATE,
	TOGGLE_SHOW_IMPORT,
	TOGGLE_SEATING_HOMEWORK,
	CHANGE_UNIT,
	TOGGLE_COLLABORATE_MENU,
} from "../../actions/PageStates/page_hwCheckCourse";

export default function page_hwCheckCourse(
	state = {
		view: "",
		imports: { students: false, homeworks: false },
		seatingHomework: "",
		unit: "",
		collaborateMenu: false,
	},
	action,
) {
	switch (action.type) {
		case CHANGE_VIEW_STATE: {
			return {
				...state,
				view: action.view,
			};
		}

		case TOGGLE_SHOW_IMPORT: {
			return {
				...state,
				imports: {
					...state.imports,
					[action.item]: !state.imports[action.item],
				},
			};
		}

		case TOGGLE_SEATING_HOMEWORK: {
			return {
				...state,
				seatingHomework: action.homework,
			};
		}

		case CHANGE_UNIT: {
			return {
				...state,
				unit: action.unit,
			};
		}

		case TOGGLE_COLLABORATE_MENU: {
			return {
				...state,
				collaborateMenu: !state.collaborateMenu,
			};
		}

		default:
			return state;
	}
}
