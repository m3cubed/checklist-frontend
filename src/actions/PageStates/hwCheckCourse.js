export const CHANGE_VIEW_STATE = "CHANGE_VIEW_STATE";
export const TOGGLE_SHOW_IMPORT = "TOGGLE_SHOW_IMPORT";
export const TOGGLE_SEATING_HOMEWORK = "TOGGLE_SEATING_HOMEWORK";

export function changeViewState(view) {
	return {
		type: CHANGE_VIEW_STATE,
		view
	};
}

export function toggleShowImport(item) {
	return {
		type: TOGGLE_SHOW_IMPORT,
		item
	};
}

export function toggleSeatingHomework(homework) {
	return {
		type: TOGGLE_SEATING_HOMEWORK,
		homework
	};
}
