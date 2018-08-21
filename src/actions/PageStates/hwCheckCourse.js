export const CHANGE_VIEW_STATE = "CHANGE_VIEW_STATE";

export function changeViewState(state) {
	return {
		type: CHANGE_VIEW_STATE,
		state
	};
}
