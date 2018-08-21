import { CHANGE_VIEW_STATE } from "../../actions/PageStates/hwCheckCourse";

export default function hwCheckCourse(state = null, action) {
	switch (action.type) {
		case CHANGE_VIEW_STATE: {
			return action.state;
		}
		default:
			return state;
	}
}
