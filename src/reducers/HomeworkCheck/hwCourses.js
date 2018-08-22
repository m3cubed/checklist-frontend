import {
	LOAD_HW_COURSES,
	ADD_HW_COURSE,
	REMOVE_HW_COURSE,
	UPDATE_HW_COURSE
} from "../../actions/HomeworkCheck/hwCourses";
import update from "immutability-helper";

export default function hwCourses(state = null, action) {
	switch (action.type) {
		case LOAD_HW_COURSES: {
			return action.courses;
		}
		case ADD_HW_COURSE: {
			return {
				...state,
				[action.course.id]: action.course
			};
		}
		case REMOVE_HW_COURSE: {
			return update(state, {
				$unset: [action.id]
			});
		}
		case UPDATE_HW_COURSE: {
			return {
				...state,
				[action.course.id]: action.course
			};
		}
		default:
			return state;
	}
}
