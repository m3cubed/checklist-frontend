import {
	LOAD_DEFAULT_USER,
	UPDATE_USER_FROM_AUTHUSER,
	UPDATE_REQUEST_COURSE_ENTRY
} from "../actions/users";

export default function users(state = {}, action) {
	switch (action.type) {
		case LOAD_DEFAULT_USER: {
			return action.users;
		}

		case UPDATE_USER_FROM_AUTHUSER: {
			return {
				...state,
				[action.authUser.id]: {
					...action.authUser
				}
			};
		}

		case UPDATE_REQUEST_COURSE_ENTRY: {
			return {
				...state,
				[action.studentID]: {
					...state[action.studentID],
					requestedCourses: {
						...state[action.studentID].requestedCourses,
						[action.courseID]: "Confirmed"
					},
					courseIDs: state.courseIDs
						? {
								...state.courseIDs,
								[action.courseID]: Object.keys(state.courseIDs).length + 1
						  }
						: {
								[action.courseID]: 1
						  }
				}
			};
		}

		default:
			return state;
	}
}
