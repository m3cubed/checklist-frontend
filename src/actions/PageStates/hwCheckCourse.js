export const CHANGE_VIEW_STATE = "CHANGE_VIEW_STATE";
export const TOGGLE_SHOW_IMPORT = "TOGGLE_SHOW_IMPORT";

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
