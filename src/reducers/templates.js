import {
	LOAD_DEFAULT_TEMPLATES,
	ADD_TEMPLATE,
	DELETE_TEMPLATE,
	ADD_TEMPLATE_QUESTION,
	DELETE_TEMPLATE_QUESTION
} from "../actions/templates";
import update from "immutability-helper";

export default function templates(state = {}, action) {
	switch (action.type) {
		case LOAD_DEFAULT_TEMPLATES: {
			return action.templates;
		}

		case ADD_TEMPLATE: {
			return {
				...state,
				[action.template.id]: action.template
			};
		}

		case DELETE_TEMPLATE:
			return update(state, {
				$unset: [action.id]
			});

		case ADD_TEMPLATE_QUESTION: {
			const questions = action.template["questionIDs"];
			if (!questions || Object.keys(questions).length === 0)
				return {
					...state,
					[action.template.id]: {
						...action.template,
						questionIDs: {
							[action.questionID]: 1
						}
					}
				};

			return {
				...state,
				[action.template.id]: {
					...action.template,
					questionIDs: {
						...questions,
						[action.questionID]: Object.keys(questions).length + 1
					}
				}
			};
		}

		case DELETE_TEMPLATE_QUESTION: {
			const questions = action.template["questionIDs"];

			return {
				...state,
				[action.template.id]: {
					...action.template,
					questionIDs: update(questions, {
						$unset: [action.questionID]
					})
				}
			};
		}

		default:
			return state;
	}
}
