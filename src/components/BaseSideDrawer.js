import React, { Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
//Accessories
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
//Icons
//Components
import HWSideDrawer from "./HomeworkCheck/HWSideDrawer";
import HWCourseSideDrawer from "./HomeworkCheck/HWCourses/Course/HWCourseSideDrawer";

const styles = theme => ({
	drawerPaper: {
		position: "relative",
		width: 256,
		zIndex: 2,
		height: "100%"
	},
	toolbar: theme.mixins.toolbar
});

const DrawerContent = props => {
	if (props.navbar.title) {
		switch (props.navbar.title.location) {
			case "HWCheck Main": {
				return <HWSideDrawer toggleDrawer={props.toggle} />;
			}
			case "HWCheck Course": {
				return (
					<HWCourseSideDrawer
						toggleDrawer={props.toggle}
						id={props.navbar.title.id}
					/>
				);
			}
			default:
				return null;
		}
	}
	return null;
};

const SideDrawer = props => {
	const { classes } = props;
	return (
		<Fragment>
			<Hidden lgUp>
				<Drawer
					variant="temporary"
					open={props.open}
					onClose={() => {
						props.toggle();
					}}
					classes={{
						paper: classes.drawerPaper
					}}
					ModalProps={{ keepMounted: true }}
				>
					{props.children}
				</Drawer>
			</Hidden>
			<Hidden mdDown>
				<Drawer
					variant="permanent"
					open
					classes={{
						paper: classes.drawerPaper
					}}
				>
					<div className={classes.toolbar} />
					{props.children}
				</Drawer>
			</Hidden>
		</Fragment>
	);
};

const BaseSideDrawer = props => {
	return (
		<SideDrawer {...props}>
			<DrawerContent {...props} />
		</SideDrawer>
	);
};

function mapStateToProps({ navbar }) {
	return {
		navbar
	};
}

export default compose(
	withStyles(styles),
	connect(mapStateToProps)
)(BaseSideDrawer);
