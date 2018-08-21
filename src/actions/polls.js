export const LOAD_DEFAULT_POLLS = "LOAD_DEFAULT_POLLS";
export const SEND_POLL = "SEND_POLL";

export function sendPoll(poll) {
	return {
		type: SEND_POLL,
		poll
	};
}

export function loadDefaultPolls(polls) {
	return {
		type: LOAD_DEFAULT_POLLS,
		polls
	};
}
