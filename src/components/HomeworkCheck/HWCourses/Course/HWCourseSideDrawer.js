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
import { changeViewState } from "../../../../actions/PageStates/hwCheckCourse";

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
		open: false
	};

	handleOpen = () => {
		this.setState(state => ({
			open: !state.open
		}));
	};

	render() {
		const { dispatch, classes } = this.props;
		return (
			<Fragment>
				<List>
					<ListItem button onClick={this.handleOpen}>
						<ListItemText>Views</ListItemText>
						{this.state.open ? <ExpandLess /> : <ExpandMore />}
					</ListItem>
					<Collapse in={this.state.open} timeout="auto" unmountOnExit>
						<List>
							<ListItem
								inset
								button
								className={classes.nestedList}
								onClick={() => {
									dispatch(changeViewState("Table View"));
									this.props.toggleDrawer();
								}}
							>
								<ListItemText>Table View</ListItemText>
							</ListItem>
						</List>
						<Divider />
						<List>
							<ListItem
								inset
								button
								className={classes.nestedList}
								onClick={() => {
									dispatch(changeViewState("Seating View"));
									this.props.toggleDrawer();
								}}
							>
								<ListItemText>Seating View</ListItemText>
							</ListItem>
						</List>
					</Collapse>
				</List>
				<Divider />
			</Fragment>
		);
	}
}

export default compose(
	withStyles(styles),
	connect()
)(HWCourseSideDrawer);
