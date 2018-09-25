import React, { Fragment, Component } from "react";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
//Accessories
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
//Icons
import ImportExportIcon from "@material-ui/icons/ImportExport";
import PageviewIcon from "@material-ui/icons/Pageview";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import PeopleIcon from "@material-ui/icons/People";
//Redux
import {
	changeViewState,
	toggleShowImport,
	toggleCollaborateMenu,
} from "../../../../actions/PageStates/page_hwCheckCourse";

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	nestedList: {
		paddingLeft: theme.spacing.unit * 4,
	},
});
class HWCourseSideDrawer extends Component {
	state = {
		viewOpen: false,
		addOpen: false,
		collaborateOpen: false,
	};

	handleToggle = type => () => {
		this.setState({
			[type]: !this.state[type],
		});
	};

	handleViewChange = view => () => {
		this.props.dispatch(changeViewState(view));
		this.props.toggleDrawer();
	};

	toggleImport = type => () => {
		this.props.dispatch(toggleShowImport(type));
	};

	render() {
		const { classes, dispatch } = this.props;
		return (
			<Fragment>
				<List>
					<ListItem button onClick={this.handleToggle("viewOpen")}>
						<ListItemIcon>
							<PageviewIcon />
						</ListItemIcon>
						<ListItemText>Views</ListItemText>
						{this.state.viewOpen ? <ExpandLess /> : <ExpandMore />}
					</ListItem>

					<Collapse in={this.state.viewOpen} timeout="auto" unmountOnExit>
						<List>
							<ListItem
								button
								className={classes.nestedList}
								onClick={this.handleViewChange("Table View")}
							>
								<ListItemText>Table View</ListItemText>
							</ListItem>
						</List>
						<Divider />
						<List>
							<ListItem
								button
								className={classes.nestedList}
								onClick={this.handleViewChange("Seating View")}
							>
								<ListItemText>Seating View</ListItemText>
							</ListItem>
						</List>
					</Collapse>

					<Divider />

					<ListItem button onClick={this.handleToggle("addOpen")}>
						<ListItemIcon>
							<ImportExportIcon />
						</ListItemIcon>
						<ListItemText>Import/Copy</ListItemText>
						{this.state.addOpen ? <ExpandLess /> : <ExpandMore />}
					</ListItem>

					<Collapse in={this.state.addOpen} timeout="auto" unmountOnExit>
						<List>
							<ListItem
								button
								className={classes.nestedList}
								onClick={this.toggleImport("students")}
							>
								<ListItemText>Students</ListItemText>
							</ListItem>
						</List>
					</Collapse>

					<Divider />

					<ListItem button onClick={this.handleToggle("collaborateOpen")}>
						<ListItemIcon>
							<GroupWorkIcon />
						</ListItemIcon>
						<ListItemText>Collaborate</ListItemText>
						{this.state.collaborateOpen ? <ExpandLess /> : <ExpandMore />}
					</ListItem>

					<Collapse
						in={this.state.collaborateOpen}
						timeout="auto"
						unmountOnExit
					>
						<List disablePadding>
							<ListItem className={classes.nestedList} button>
								<ListItemIcon>
									<PeopleIcon />
								</ListItemIcon>
								<ListItemText>Collaborators</ListItemText>
							</ListItem>

							<ListItem
								className={classes.nestedList}
								button
								onClick={() => dispatch(toggleCollaborateMenu())}
							>
								<ListItemIcon>
									<PersonAddIcon />
								</ListItemIcon>
								<ListItemText>Add Collaborator</ListItemText>
							</ListItem>
						</List>
					</Collapse>

					<Divider />
				</List>
			</Fragment>
		);
	}
}

export default compose(
	withStyles(styles),
	connect(),
)(HWCourseSideDrawer);
