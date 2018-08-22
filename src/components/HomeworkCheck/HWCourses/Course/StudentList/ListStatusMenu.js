import React, { Component } from "react";
import { connect } from "react-redux";
//Accessories
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const ListStatusMenu = props => {
	const { anchorEl, open, toggle, hwStatus, change } = props;

	const changeStatus = status => () => {
		props.change(status);
	};

	return (
		<Menu
			id="status-header-menu"
			anchorEl={anchorEl}
			open={open}
			onClose={toggle()}
		>
			<MenuItem onClick={() => change("")}>{""}</MenuItem>
			{Object.keys(hwStatus).map(item => (
				<MenuItem key={item} onClick={changeStatus(item)}>
					{item}
				</MenuItem>
			))}
		</Menu>
	);
};

function mapStateToProps({ hwStatus }) {
	return { hwStatus };
}

export default connect(mapStateToProps)(ListStatusMenu);
