import { loadDefaultUsers } from "./actions/users";
import { CONNECTION } from "./config/config";
import { hideLoading, showLoading } from "./actions/loading";

export function filterTemplates(all, user) {
	return Object.keys(user).reduce((filtered, key) => {
		if (all[key]) filtered[key] = all[key];

		return filtered;
	}, {});
}

export function filterQuestions(all, template) {
	return Object.keys(template).reduce((filtered, key) => {
		if (all[key]) filtered[key] = all[key];

		return filtered;
	}, {});
}

export function filterCourses(all, user) {
	return Object.keys(user).reduce((filtered, key) => {
		if (all[key]) filtered[key] = all[key];

		return filtered;
	}, {});
}

export function searchCoursesByAccessCode(accessID, resolve, reject) {
	fetch(`${CONNECTION}/courses/find`, {
		method: "PUT",
		credentials: "include",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ accessID })
	})
		.then(res => res.json())
		.then(json => {
			if (json.completed === true) {
				if (Object.keys(json.course).length === 0) reject();

				const { courseTitle, courseCode, creator } = json.course;

				resolve({
					courseTitle,
					courseCode,
					creator
				});
			} else {
				reject();
			}
		});
}

export function loadDefaults(dispatch) {
	fetch(`${CONNECTION}/user/all`, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(res => res.json())
		.then(json => {
			const collected = json.reduce((collect, user) => {
				return {
					...collect,
					[user.id]: user
				};
			}, {});
			dispatch(loadDefaultUsers(collected));
		});
}

// export function loadingAPI(dispatch, dispatchArray) {
// 	dispatch(showLoading());

// 	const promises = dispatchArray.reduce((acc, cv) => {
// 		acc.push(
// 			new Promise((resolve, reject) => {
// 				if (cv.condition) {
// 					dispatch(cv.action(cv.condition, resolve, reject));
// 				} else {
// 					dispatch(cv.action(resolve, reject));
// 				}
// 			})
// 		);
// 		return acc;
// 	}, []);
// 	Promise.all(promises).then(() => {
// 		dispatch(hideLoading());
// 	});
// }

export async function loadingAPI(dispatch, dispatchArray) {
	dispatch(showLoading());

	const promises0 = dispatchArray[0].reduce((acc, cv) => {
		acc.push(
			new Promise((resolve, reject) => {
				if (cv.condition) {
					dispatch(cv.action(cv.condition, resolve, reject));
				} else {
					dispatch(cv.action(resolve, reject));
				}
			})
		);
		return acc;
	}, []);
	await Promise.all(promises0);
	try {
		const promises1 = dispatchArray[1].reduce((acc, cv) => {
			acc.push(
				new Promise((resolve, reject) => {
					if (cv.condition) {
						dispatch(cv.action(cv.condition, resolve, reject));
					} else {
						dispatch(cv.action(resolve, reject));
					}
				})
			);
			return acc;
		}, []);
		await Promise.all(promises1);
	} finally {
		dispatch(hideLoading());
	}
}

export function nameDuplicate(name, list, condition, filter) {
	let count = 0;
	const brackets = /\(\d*\)/;

	if (filter) {
		list = Object.keys(list).reduce((acc, cv) => {
			if (list[cv][filter[0]] === filter[1]) {
				acc[cv] = list[cv];
			}
			return acc;
		}, {});
	}

	const newList = Object.keys(list).reduce((acc, cv) => {
		const value = list[cv][condition].toLowerCase();
		if (
			value === name.toLowerCase() ||
			brackets.test(value.replace(name.toLowerCase(), ""))
		) {
			count++;
		}
		return acc;
	}, []);

	return count === 0 ? name : `${name}(${count})`;
}

export function randomFirstName() {
	const girls = `Emma
	Olivia
	Ava
	Isabella
	Sophia
	Mia
	Charlotte
	Amelia
	Evelyn
	Abigail
	Harper
	Emily
	Elizabeth
	Avery
	Sofia
	Ella
	Madison
	Scarlett
	Victoria
	Aria
	Grace
	Chloe
	Camila
	Penelope
	Riley
	Layla
	Lillian
	Nora
	Zoey
	Mila
	Aubrey
	Hannah
	Lily
	Addison
	Eleanor
	Natalie
	Luna
	Savannah
	Brooklyn
	Leah
	Zoe
	Stella
	Hazel
	Ellie
	Paisley
	Audrey
	Skylar
	Violet
	Claire
	Bella`;

	const boys = `Liam
	Noah
	William
	James
	Logan
	Benjamin
	Mason
	Elijah
	Oliver
	Jacob
	Lucas
	Michael
	Alexander
	Ethan
	Daniel
	Matthew
	Aiden
	Henry
	Joseph
	Jackson
	Samuel
	Sebastian
	David
	Carter
	Wyatt
	Jayden
	John
	Owen
	Dylan
	Luke
	Gabriel
	Anthony
	Isaac
	Grayson
	Jack
	Julian
	Levi
	Christopher
	Joshua
	Andrew
	Lincoln
	Mateo
	Ryan
	Jaxon
	Nathan
	Aaron
	Isaiah
	Thomas
	Charles
	Caleb`;

	const girlArray = girls.split(/\n\t/g);
	const boyArray = boys.split(/\n\t/g);
	const total = girlArray.concat(boyArray);

	return total[Math.floor(Math.random() * 100)];
}

export function randomLastName() {
	const last = `Schmitt
    Contreras
    Mayo
    Farrell
    Rojas
    Lester
    Bailey
    Combs
    Morgan
    Stokes
    Mathews
    Mcfarland
    Duke
    Barry
    Lyons
    Lucero
    Bartlett
    Oneal
    Giles
    Henson
    Knapp
    Webster
    Liu
    Humphrey
    Cox
    Christian
    Wilson
    Kane
    Turner
    Riggs
    Sawyer
    Sparks
    Newman
    Sweeney
    Copeland
    Oconnor
    Parks
    Calhoun
    Miranda
    Juarez
    Barrett
    Bernard
    Barton
    Robles
    Noble
    Mullen
    Gordon
    Garner
    Rose
    Bowers
    Rich
    Davies
    Rosales
    Horton
    Zimmerman
    Mccall
    Moreno
    Sims
    Booth
    Velez
    Mora
    Tapia
    Marsh
    Brady
    Evans
    Day
    Michael
    Davila
    Barrera
    Steele
    Barron
    Guerrero
    Beard
    Castro
    Collier
    Payne
    Norton
    Nicholson
    Vance
    Hickman
    Huang
    Lowe
    Walter
    Preston
    Pennington
    Cardenas
    Zuniga
    Hartman
    Adams
    Curtis
    Mendoza
    Chambers
    Willis
    Tanner
    Galloway
    Eaton
    Walker
    Wise
    Tate
    Friedman`;

	const listArray = last.split(/\n    /);

	return listArray[Math.floor(Math.random() * 100)];
}
