import { CONNECTION } from "../config/config";

export const RETRIEVE_USER_POLL_RESPONSE = "RETRIEVE_USER_POLL_RESPONSE";
export const EXPORT_USER_POLL_RESPONSE = "EXPORT_USER_POLL_RESPONSE";
export const LOAD_CLASS_RESPONSES = "LOAD_CLASS_RESPONSES";

function retrieveUserPollResponse(userResponse) {
	return {
		type: RETRIEVE_USER_POLL_RESPONSE,
		userResponse
	};
}

function exportUserPollResponse() {
	return {
		type: EXPORT_USER_POLL_RESPONSE
	};
}

function loadClassResponses(responses) {
	return {
		type: LOAD_CLASS_RESPONSES,
		responses
	};
}

export function handleRetrieveUserPollResponse(userResponseID) {
	return dispatch => {
		fetch(`${CONNECTION}/user_poll_responses/retrieve`, {
			method: "PUT",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ userResponseID })
		})
			.then(res => res.json())
			.then(json => {
				if (json.completed === true) {
					dispatch(retrieveUserPollResponse(json.userResponse));
				}
			});
	};
}

export function handleExportUserPollResponse() {
	return (dispatch, getState) => {
		const { pollResponse } = getState();
		fetch(`${CONNECTION}/user_poll_response/update`, {
			method: "PUT",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ pollResponse })
		})
			.then(res => res.json())
			.then(json => {
				if (json.completed === true) {
					dispatch(exportUserPollResponse());
				}
			});
	};
}

export function handleLoadClassResponses() {
	return (dispatch, getState) => {
		const { polls } = getState();
		const pollIDs = Object.keys(polls);
		if (pollIDs.length > 0) {
			fetch(`${CONNECTION}/courses/retrieve_poll_responses`, {
				method: "PUT",
				credentials: "include",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ pollIDs })
			})
				.then(res => res.json())
				.then(json => {
					if (json.completed === true) {
						dispatch(loadClassResponses(json.responses));
					}
				});
		}
	};
}
