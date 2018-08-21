import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
//Accessories
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
//Icons
import SearchIcon from "@material-ui/icons/Search";
//Redux
import { toggleDrawer } from "../../../actions/navbar";
//Components
import CourseStudentJoin from "./CourseStudentJoin";

const styles = theme => ({
	root: {
		flexgrow: 1,
		zIndex: 1,
		overflow: "hidden",
		position: "relative",
		display: "flex"
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1
	},
	drawerpaper: {
		position: "relative",
		width: 256
	},
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing.unit * 3,
		minWidth: 0
	},
	toolbar: theme.mixins.toolbar,
	badge: {
		margin: theme.spacing.unit * 2
	}
});

class CourseStudentSideDrawer extends Component {
	state = {
		showSearchDialog: false
	};

	toggleSearchDialog = () => {
		this.setState(state => ({
			showSearchDialog: !state.showSearchDialog
		}));
	};

	render() {
		return (
			<Fragment>
				<CourseStudentJoin
					open={this.state.showSearchDialog}
					toggle={this.toggleSearchDialog}
				/>
				<List>
					<ListItem
						button
						onClick={() => {
							this.props.dispatch(toggleDrawer());
							this.toggleSearchDialog();
						}}
					>
						<ListItemIcon>
							<SearchIcon />
						</ListItemIcon>
						<ListItemText>Search for a class</ListItemText>
					</ListItem>
					<Divider />
				</List>
			</Fragment>
		);
	}
}

export default compose(
	withStyles(styles),
	connect()
)(CourseStudentSideDrawer);
