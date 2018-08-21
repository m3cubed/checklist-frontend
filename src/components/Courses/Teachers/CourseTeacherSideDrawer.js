import React, { Component, Fragment } from "react";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
//Accessories
import Badge from "@material-ui/core/Badge";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
//Icons
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import CourseTemplateSend from "./CourseTemplateSend";
//Redux
import { toggleDrawer } from "../../../actions/navbar";

const styles = theme => ({
	root: {
		flexgrow: 1,
		zIndex: 1,
		overflow: "hidden",
		position: "relative",
		display: "flex"
	},
	drawerpaper: {
		position: "relative",
		width: 256
	},
	toolbar: theme.mixins.toolbar,
	badge: {
		margin: theme.spacing.unit * 2
	}
});

class CourseTeacherSideDrawer extends Component {
	state = {
		showSendTemplateDialog: false
	};

	toggleSendTemplateDialog = () => {
		this.setState(state => ({
			showSendTemplateDialog: !state.showSendTemplateDialog
		}));
	};

	render() {
		const { classes, dispatch } = this.props;
		return (
			<Fragment>
				<CourseTemplateSend
					open={this.state.showSendTemplateDialog}
					toggle={this.toggleSendTemplateDialog}
				/>
				<List>
					<ListItem button>
						<ListItemIcon>
							<Badge color="primary" badgeContent={4}>
								<PersonAddIcon />
							</Badge>
						</ListItemIcon>
						<ListItemText>Requests</ListItemText>
					</ListItem>

					<Divider />

					<ListItem
						button
						onClick={() => {
							this.toggleSendTemplateDialog();
							dispatch(toggleDrawer());
						}}
					>
						<ListItemText>Start a class poll</ListItemText>
					</ListItem>
				</List>
			</Fragment>
		);
	}
}

export default compose(
	withStyles(styles),
	connect()
)(CourseTeacherSideDrawer);
