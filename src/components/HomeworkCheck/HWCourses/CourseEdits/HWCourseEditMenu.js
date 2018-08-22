import React from "react";
//Accessories
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const HWCourseEditMenu = props => {
	const handleToggle = type => () => {
		props.toggleDialog(type);
	};

	return (
		<React.Fragment>
			<Menu
				id="course-options-menu"
				anchorEl={props.anchorEl}
				open={props.open}
				onClose={props.toggle}
			>
				<MenuItem value="openEdit" onClick={handleToggle("openEdit")}>
					Edit
				</MenuItem>
				<MenuItem value="openDuplicate" onClick={handleToggle}>
					Duplicate
				</MenuItem>
				<MenuItem value="openDelete" onClick={handleToggle("openDelete")}>
					Delete
				</MenuItem>
			</Menu>
		</React.Fragment>
	);
};

export default HWCourseEditMenu;
