export const LOAD_COLLABORATIONS = "LOAD_COLLABORATIONS";

export function loadDefaultCollaborations(collaborations) {
	return {
		type: LOAD_COLLABORATIONS,
		collaborations,
	};
}
