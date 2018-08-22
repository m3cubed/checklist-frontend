export const CHANGE_VIEW_STATE = "CHANGE_VIEW_STATE";

export function changeViewState(view) {
	return {
		type: CHANGE_VIEW_STATE,
		view
	};
}
