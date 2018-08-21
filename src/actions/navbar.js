export const CHANGE_NAVBAR_TITLE = "CHANGE_NAVBAR_TITLE";
export const TOGGLE_DRAWER_ICON = "TOGGLE_DRAWER_ICON";
export const TOGGLE_DRAWER = "TOGGLE_DRAWER";

export function changeNavbarTitle(title) {
	return {
		type: CHANGE_NAVBAR_TITLE,
		title
	};
}

export function toggleDrawerIcon(status) {
	return {
		type: TOGGLE_DRAWER_ICON,
		status
	};
}

export function toggleDrawer() {
	return {
		type: TOGGLE_DRAWER
	};
}
