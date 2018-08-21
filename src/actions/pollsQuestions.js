import { CONNECTION } from "../config/config";

export const RETRIEVE_QUESTIONS = "RETRIEVE QUESTIONS";

export function retrieveQuestions(questions) {
	return {
		type: RETRIEVE_QUESTIONS,
		questions
	};
}

export function handleRetrieveQuestions(pollID) {
	return dispatch => {
		fetch(`${CONNECTION}/polls/retrieve_questions`, {
			method: "PUT",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ pollID })
		})
			.then(res => res.json())
			.then(json => dispatch(retrieveQuestions(json)));
	};
}
