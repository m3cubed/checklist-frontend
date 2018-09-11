import { CONNECTION } from "../../config/config";
import { nameDuplicate } from "../../api";

export const LOAD_HW_UNITS = "LOAD_HW_UNITS";
export const ADD_HW_UNIT = "ADD_HW_UNIT";
export const DELETE_HW_UNIT = "DELETE_HW_UNIT";
export const UPDATE_HW_UNIT = "UPDATE_HW_UNIT";

export function loadHWUnits(units) {
	return {
		type: LOAD_HW_UNITS,
		units,
	};
}

function addHWUnit(unit) {
	return {
		type: ADD_HW_UNIT,
		unit,
	};
}

function deleteHWUnit(id) {
	return {
		type: DELETE_HW_UNIT,
		id,
	};
}

function updateHWUnit(unit) {
	return {
		type: UPDATE_HW_UNIT,
		unit,
	};
}

export function handleAddHWUnit(unit) {
	return (dispatch, getState) => {
		const { hwUnits } = getState();
		unit.unitTitle = nameDuplicate(unit.unitTitle, hwUnits, "unitTitle");

		fetch(`${CONNECTION}/homework_check_units/new`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ unit }),
		})
			.then(res => res.json())
			.then(json => {
				if (json.completed === true) {
					dispatch(addHWUnit(json.unit));
				}
			});
	};
}

export function loadDefaultHWUnits(courseID, resolve, reject) {
	return dispatch => {
		fetch(`${CONNECTION}/homework_check_units/retrieve`, {
			method: "PUT",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ courseID }),
		})
			.then(res => res.json())
			.then(json => {
				dispatch(loadHWUnits(json.units));
				resolve();
			});
	};
}

export function handleDeleteHWUnit(id) {
	return dispatch => {
		fetch(`${CONNECTION}/homework_check_units/delete`, {
			method: "PUT",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id }),
		})
			.then(res => res.json())
			.then(json => {
				if (json.completed) {
					dispatch(deleteHWUnit(id));
				}
			});
	};
}
