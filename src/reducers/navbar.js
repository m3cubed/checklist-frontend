import {
	CHANGE_NAVBAR_TITLE,
	TOGGLE_DRAWER_ICON,
	TOGGLE_DRAWER,
} from "../actions/navbar";

export default function navbar(state = {}, action) {
	switch (action.type) {
		case CHANGE_NAVBAR_TITLE: {
			return {
				...state,
				title: action.title,
			};
		}
		case TOGGLE_DRAWER_ICON: {
			return {
				...state,
				showDrawerIcon: action.status,
			};
		}
		case TOGGLE_DRAWER: {
			return {
				...state,
				showDrawer: !state.showDrawer,
			};
		}
		default:
			return state;
	}
}
