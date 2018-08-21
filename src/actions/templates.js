import { addUserTemplate, deleteUserTemplate } from "./authUser";
import { deleteQuestion } from "./questions";
import { CONNECTION } from "../config/config";

export const ADD_TEMPLATE = "ADD_TEMPLATE";
export const DELETE_TEMPLATE = "DELETE_TEMPLATE";
export const ADD_TEMPLATE_QUESTION = "ADD_TEMPLATE_QUESTION";
export const DELETE_TEMPLATE_QUESTION = "DELETE_TEMPLATE_QUESTION";
export const LOAD_DEFAULT_TEMPLATES = "LOAD_DEFAULT_TEMPLATES";

export function loadDefaultTemplates(templates) {
	return {
		type: LOAD_DEFAULT_TEMPLATES,
		templates
	};
}

function addTemplate(template) {
	return {
		type: ADD_TEMPLATE,
		template
	};
}

function deleteTemplate(id) {
	return {
		type: DELETE_TEMPLATE,
		id
	};
}

export function addTemplateQuestion(template, questionID) {
	return {
		type: ADD_TEMPLATE_QUESTION,
		template,
		questionID
	};
}

export function deleteTemplateQuestion(template, questionID) {
	return {
		type: DELETE_TEMPLATE_QUESTION,
		template,
		questionID
	};
}

//Full template data is passed in order to future-proof

export function handleAddTemplate(template) {
	return (dispatch, getState) => {
		const { authUser } = getState();
		const length = Object.keys(authUser.courseIDs).length + 1;

		fetch(`${CONNECTION}/templates/new`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				...template,
				length
			})
		})
			.then(res => res.json())
			.then(json => {
				dispatch(addUserTemplate(json.id, length));
				dispatch(addTemplate(json));
			});
	};
}

export function handleDeleteTemplate(template) {
	return dispatch => {
		fetch(`${CONNECTION}/templates/delete`, {
			method: "PUT",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(template)
		})
			.then(res => res.json())
			.then(json => {
				if (json.completed === true) {
					if (template.questionIDs) {
						Object.keys(template.questionIDs).forEach(item => {
							dispatch(deleteQuestion(item));
						});
					}
					dispatch(deleteUserTemplate(template.id));
					dispatch(deleteTemplate(template.id));
				}
			});
	};
}
