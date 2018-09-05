import { CONNECTION } from "../../config/config";

export const UPDATE_POSITION = "UPDATE_POSITION";
export const LOAD_POSITIONS = "LOAD_POSITIONS";

export function updatePosition(student) {
	return {
		type: UPDATE_POSITION,
		student
	};
}

function loadPositions(positions) {
	return {
		type: LOAD_POSITIONS,
		positions
	};
}

export function loadDefaultSeatingPositions(courseID, resolve, reject) {
	return (dispatch, getState) => {
		const { hwStudents } = getState();
		let seatingPositions = getState().seatingPositions;
		let temp;
		try {
			temp = Object.keys(seatingPositions).reduce((acc, cv) => {
				if (Object.keys(hwStudents).includes(cv)) {
					acc[cv] = seatingPositions[cv];
				}
				return acc;
			}, {});
			seatingPositions = temp;
		} catch (err) {
			console.log(err);
		}

		fetch(`${CONNECTION}/seating_positions/retrieve`, {
			method: "PUT",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ courseID })
		})
			.then(res => res.json())
			.then(json => {
				if (json.completed === true) {
					if (json.seatingPositions) {
						if (
							seatingPositions !== null &&
							Object.keys(seatingPositions).length !== 0 &&
							json.seatingPositions !== seatingPositions
						) {
							dispatch(loadPositions(seatingPositions));
							dispatch(savePositions(courseID));
						} else if (
							Object.keys(json.seatingPositions).includes("positions")
						) {
							dispatch(loadPositions(json.seatingPositions.positions));
						}
					}
					resolve();
				} else {
					reject();
				}
			});
	};
}

export function savePositions(courseID) {
	return (dispatch, getState) => {
		const { seatingPositions } = getState();

		fetch(`${CONNECTION}/seating_positions/upsert`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ seatingPositions, courseID })
		})
			.then(res => res.json())
			.then(json => console.log(json));
	};
}
