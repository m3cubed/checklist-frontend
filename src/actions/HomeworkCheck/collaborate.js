import { CONNECTION } from "../../config/config";

export const LOAD_COLLABORATORS = "LOAD_COLLABORATORS";
export const ADD_COLLABORATOR = "ADD_COLLABORATOR";

export function loadCollaborators(collaborators) {
	return {
		type: LOAD_COLLABORATORS,
		collaborators,
	};
}

function addCollaborator(collaborator) {
	return {
		type: ADD_COLLABORATOR,
		collaborator,
	};
}

export function handleAddCollaborator(collaborator) {
	return dispatch => {
		fetch(`${CONNECTION}/collaborate/new`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ collaborator }),
		})
			.then(res => res.json())
			.then(json => {
				if (json.completed) {
					dispatch(addCollaborator(json.collaborator));
				}
			});
	};
}

export function loadDefaultCollaborators(courseID, resolve, reject) {
	return dispatch => {
		fetch(`${CONNECTION}/collaborate/retrieve`, {
			method: "PUT",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ courseID }),
		})
			.then(res => res.json())
			.then(json => {
				if (json.completed === true) {
					dispatch(loadCollaborators(json.collaborators));
					resolve();
				} else {
					reject();
				}
			});
	};
}
