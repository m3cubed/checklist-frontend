import React, { Component, Fragment } from "react";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
//Accessories
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Divider } from "@material-ui/core";
import { toggleSeatingHomework } from "../../../../../actions/PageStates/page_hwCheckCourse";

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
});

class SeatingViewHWList extends Component {
	state = {};

	handleMenuItemClick = homework => e => {
		this.props.dispatch(toggleSeatingHomework(homework));
	};

	render() {
		const { homeworks } = this.props;
		const keys = Object.keys(homeworks);

		return (
			<div>
				<MenuList>
					{keys.length > 0 ? (
						keys.map(homework => (
							<MenuItem
								key={homework}
								button
								selected={this.props.selected === homework}
								onClick={this.handleMenuItemClick(homework)}
							>
								<ListItemText>{homeworks[homework].homeworkTitle}</ListItemText>
							</MenuItem>
						))
					) : (
						<MenuItem>
							<ListItemText primary="You Haven't Added a Homework!" />
						</MenuItem>
					)}
				</MenuList>
			</div>
		);
	}
}

function mapStateToProps({ homeworks, page_hwCheckCourse }) {
	const unit = page_hwCheckCourse.unit;
	return {
		homeworks: Object.keys(homeworks).reduce((acc, cv) => {
			if (homeworks[cv].unitID === unit) {
				acc[cv] = homeworks[cv];
			}
			return acc;
		}, {}),
		selected: page_hwCheckCourse.seatingHomework,
	};
}
export default compose(
	withStyles(styles),
	connect(mapStateToProps),
)(SeatingViewHWList);
