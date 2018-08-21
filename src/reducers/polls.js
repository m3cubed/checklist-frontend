import { LOAD_DEFAULT_POLLS, SEND_POLL } from "../actions/polls";

export default function polls(state = {}, action) {
	switch (action.type) {
		case LOAD_DEFAULT_POLLS: {
			return action.polls;
		}
		case SEND_POLL: {
			return {
				...state,
				[action.poll.id]: action.poll
			};
		}
		default:
			return state;
	}
}
