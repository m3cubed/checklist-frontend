export const CHANGE_VIEW_STATE = "CHANGE_VIEW_STATE";
export const TOGGLE_SHOW_IMPORT = "TOGGLE_SHOW_IMPORT";
export const TOGGLE_SEATING_HOMEWORK = "TOGGLE_SEATING_HOMEWORK";
export const CHANGE_UNIT = "CHANGE_UNIT";
export const TOGGLE_COLLABORATE_MENU = "TOGGLE_COLLABORATE_MENU";

export function changeViewState(view) {
	return {
		type: CHANGE_VIEW_STATE,
		view,
	};
}

export function toggleShowImport(item) {
	return {
		type: TOGGLE_SHOW_IMPORT,
		item,
	};
}

export function toggleSeatingHomework(homework) {
	return {
		type: TOGGLE_SEATING_HOMEWORK,
		homework,
	};
}

export function changeUnit(unit) {
	return {
		type: CHANGE_UNIT,
		unit,
	};
}

export function toggleCollaborateMenu() {
	return {
		type: TOGGLE_COLLABORATE_MENU,
	};
}
