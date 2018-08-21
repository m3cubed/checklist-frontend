import {
	ADD_COURSE,
	DELETE_COURSE,
	ADD_STUDENT_TO_COURSE,
	CONFIRM_STUDENT,
	LOAD_DEFAULT_COURSES
} from "../actions/courses";
import update from "immutability-helper";

export default function courses(state = {}, action) {
	switch (action.type) {
		case ADD_COURSE:
			return {
				...state,
				[action.course.id]: action.course
			};

		case DELETE_COURSE:
			return update(state, {
				$unset: [action.course.id]
			});

		case ADD_STUDENT_TO_COURSE: {
			return {
				...state,
				[action.course.id]: {
					...action.course,
					students: action.course.students
						? update(action.course.students, {
								$merge: {
									[action.studentID]: { confirmed: false }
								}
						  })
						: { [action.studentID]: { confirmed: false } }
				}
			};
		}

		case LOAD_DEFAULT_COURSES: {
			return action.courses;
		}

		case CONFIRM_STUDENT: {
			return {
				...state,
				[action.course.id]: {
					...action.course,
					students: {
						...action.course.students,
						[action.studentID]: {
							...action.course.students[action.studentID],
							confirmed: true
						}
					}
				}
			};
		}

		default:
			return state;
	}
}
