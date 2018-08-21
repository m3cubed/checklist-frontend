import { CONNECTION } from "../config/config";

export const RETRIEVE_RESPONSE = "RETRIEVE_RESPONSE";
export const UPDATE_RESPONSE = "UPDATE_RESPONSE";
export const CLEAR_RESPONSE = "CLEAR_RESPONSE";

function retrieveResponse(response) {
	return {
		type: RETRIEVE_RESPONSE,
		response
	};
}

export function updateResponse(response) {
	return {
		type: UPDATE_RESPONSE,
		response
	};
}

export function clearResponse() {
	return {
		type: CLEAR_RESPONSE
	};
}

export function handleCreateResponses(
	questionIDs,
	pollResponseID,
	resolve,
	reject
) {
	return dispatch => {
		let requests = questionIDs.map(questionID => {
			return new Promise((r_resolve, r_reject) => {
				fetch(`${CONNECTION}/responses/new`, {
					method: "POST",
					credentials: "include",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ questionID, pollResponseID })
				})
					.then(res => res.json())
					.then(json => {
						if (json.completed === true) {
							dispatch(retrieveResponse(json.response));
							r_resolve();
						} else {
							r_reject();
						}
					});
			});
		});

		Promise.all(requests)
			.then(() => resolve())
			.catch(err => reject(err));
	};
}

export function handleRetrieveResponses(pollResponseID, resolve, reject) {
	return dispatch => {
		fetch(`${CONNECTION}/responses/retrieve`, {
			method: "PUT",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ pollResponseID })
		})
			.then(res => res.json())
			.then(json => {
				if (json.completed === true) {
					json.responses.forEach(item => {
						dispatch(retrieveResponse(item));
					});
					resolve();
				} else {
					reject(json.completed);
				}
			});
	};
}

export function handleSubmitResponses(pollResponseID) {
	return (dispatch, getState) => {
		const { responses } = getState();

		fetch(`${CONNECTION}/responses/submit_answers`, {
			method: "PUT",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ responses, pollResponseID })
		})
			.then(res => res.json())
			.then(json => {
				if (json.completed === true) {
					dispatch(clearResponse());
				}
			});
	};
}
