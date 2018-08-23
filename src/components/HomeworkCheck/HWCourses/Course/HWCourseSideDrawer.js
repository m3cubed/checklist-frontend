import React, { Fragment, Component } from "react";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
//Accessories
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
//Icons
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
//Redux
import {
	changeViewState,
	toggleShowImport
} from "../../../../actions/PageStates/hwCheckCourse";

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	nestedList: {
		paddingLeft: theme.spacing.unit * 4
	}
});
class HWCourseSideDrawer extends Component {
	state = {
		viewOpen: false,
		addOpen: false
	};

	handleViewToggle = () => {
		this.setState(state => ({
			viewOpen: !state.viewOpen
		}));
	};

	handleAddToggle = () => {
		this.setState(state => ({
			addOpen: !state.addOpen
		}));
	};

	handleViewChange = view => () => {
		this.props.dispatch(changeViewState(view));
		this.props.toggleDrawer();
	};

	toggleImport = type => () => {
		this.props.dispatch(toggleShowImport(type));
	};

	render() {
		const { classes } = this.props;
		return (
			<Fragment>
				<List>
					<ListItem button onClick={this.handleViewToggle}>
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
								// onClick={this.handleViewChange("Seating View")}
							>
								<ListItemText>Seating View</ListItemText>
							</ListItem>
						</List>
					</Collapse>
				</List>
				<Divider />
				<ListItem button onClick={this.handleAddToggle}>
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
					<Divider />
					<List>
						<ListItem button className={classes.nestedList}>
							<ListItemText>Homeworks</ListItemText>
						</ListItem>
					</List>
				</Collapse>
				<Divider />
			</Fragment>
		);
	}
}

export default compose(
	withStyles(styles),
	connect()
)(HWCourseSideDrawer);
