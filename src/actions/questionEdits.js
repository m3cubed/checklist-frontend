export const MAP_QUESTIONS_TO_EDITS = "MAP_QUESTIONS_TO_EDITS";
export const TOGGLE_EDIT = "TOGGLE_EDIT";

export function mapQuestionsToEdits(questions) {
	return {
		type: MAP_QUESTIONS_TO_EDITS,
		questions
	};
}

export function toggleEdit(questionID) {
	return {
		type: TOGGLE_EDIT,
		questionID
	};
}
