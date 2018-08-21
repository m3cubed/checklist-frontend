import { addTemplateQuestion, deleteTemplateQuestion } from "./templates";
import { CONNECTION } from "../config/config";

export const ADD_QUESTION = "ADD_QUESTION";
export const FORMAT_QUESTION = "FORMAT_QUESTION";
export const DELETE_QUESTION = "DELETE_QUESTION";
export const LOAD_DEFAULT_QUESTIONS = "LOAD_DEFAULT_QUESTIONS";

export function addQuestion(question) {
	return {
		type: ADD_QUESTION,
		question
	};
}

export function deleteQuestion(questionID) {
	return {
		type: DELETE_QUESTION,
		questionID
	};
}

export function formatQuestion(question, format) {
	return {
		type: FORMAT_QUESTION,
		question,
		format
	};
}

export function loadDefaultQuestions(questions) {
	return {
		type: LOAD_DEFAULT_QUESTIONS,
		questions
	};
}

export function handleAddQuestion(question) {
	return (dispatch, getState) => {
		const { templates } = getState();
		const template = templates[question.templateID];

		const length = Object.keys(template.questionIDs).length + 1;
		fetch(`${CONNECTION}/questions/new`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				...question,
				length
			})
		})
			.then(res => res.json())
			.then(json => {
				dispatch(addTemplateQuestion(template, json.id));
				dispatch(addQuestion(json));
			});
	};
}

export function handleDeleteQuestion(questionID, templateID) {
	return (dispatch, getState) => {
		const { templates } = getState();
		const template = templates[templateID];

		fetch(`${CONNECTION}/questions/delete`, {
			method: "PUT",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				questionID,
				templateID
			})
		})
			.then(res => res.json())
			.then(json => {
				if (json.completed === true) {
					dispatch(deleteTemplateQuestion(template, questionID));
					dispatch(deleteQuestion(questionID));
				}
			});
	};
}

export function handleFormatQuestion(question, format) {
	return dispatch => {
		fetch(`${CONNECTION}/questions/format`, {
			method: "PUT",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				...question,
				format
			})
		})
			.then(res => res.json())
			.then(json => {
				if (json.completed === true) {
					dispatch(formatQuestion(question, format));
				}
			});
	};
}
