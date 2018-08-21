import {
	AUTH_USER,
	LOGIN_USER,
	DELETE_USER_TEMPLATE,
	ADD_USER_TEMPLATE,
	ADD_USER_COURSE,
	DELETE_USER_COURSE,
	REQUEST_COURSE_ENTRY,
	ADD_POLLS_RESPONSE,
	LOGOUT_USER
} from "../actions/authUser";
import update from "immutability-helper";

export default function authUser(state = false, action) {
	switch (action.type) {
		case AUTH_USER:
			return action.id;

		case LOGOUT_USER: {
			return false;
		}

		case LOGIN_USER:
			return {
				...action.user
			};

		case ADD_USER_TEMPLATE: {
			return {
				...state,
				templateIDs: {
					...state.templateIDs,
					[action.templateID]: action.length
				}
			};
		}

		case DELETE_USER_TEMPLATE: {
			const templates = state["templateIDs"];
			return {
				...state,
				templateIDs: update(templates, {
					$unset: [action.templateID]
				})
			};
		}

		case ADD_USER_COURSE: {
			const courses = state["courseIDs"];
			if (
				courses === undefined ||
				courses === null ||
				Object.keys(courses) === 0
			)
				return {
					...state,
					courseIDs: {
						[action.courseID]: 1
					}
				};
			return {
				...state,
				courseIDs: {
					...courses,
					[action.courseID]: Object.keys(courses).length + 1
				}
			};
		}

		case DELETE_USER_COURSE: {
			const courses = state["courseIDs"];
			return {
				...state,
				courseIDs: update(courses, {
					$unset: [action.courseID]
				})
			};
		}

		case REQUEST_COURSE_ENTRY: {
			return {
				...state,
				requestedCourses: state.requestedCourses
					? { ...state.requestedCourses, [action.courseID]: "Requested" }
					: { [action.courseID]: "Requested" }
			};
		}

		case ADD_POLLS_RESPONSE: {
			return {
				...state,
				todoPolls: {
					...state.todoPolls,
					[action.pollID]: action.responseID
				}
			};
		}

		default:
			return state;
	}
}
