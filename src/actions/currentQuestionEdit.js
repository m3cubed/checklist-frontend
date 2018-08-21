export const NEW_QUESTION = "NEW_QUESTION";
export const CHANGE_TYPE = "CHANGE_TYPE";
export const CHANGE_FORMAT = "CHANGE_FORMAT";

export function newQuestion(question) {
	return {
		type: NEW_QUESTION,
		question
	};
}

export function changeType(type) {
	return {
		type: CHANGE_TYPE,
		type
	};
}

export function changeFormat(format) {
	return {
		type: CHANGE_FORMAT,
		format
	};
}
