import React, { Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
//Accessories
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
//Icons
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
//Components
import HWSideDrawer from "./HomeworkCheck/HWSideDrawer";
import HWCourseSideDrawer from "./HomeworkCheck/HWCourses/Course/HWCourseSideDrawer";

const drawerWidth = 240;

const styles = theme => ({
	toolbarIcon: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: "0 8px",
		...theme.mixins.toolbar
	},
	drawerPaper: {
		position: "relative",
		whiteSpace: "nowrap",
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	drawerPaperClose: {
		position: "relative",
		overflowX: "hidden",
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		width: theme.spacing.unit * 7,
		[theme.breakpoints.up("sm")]: {
			width: theme.spacing.unit * 9
		}
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

// const SideDrawer = props => {
// 	const { classes } = props;
// 	return (
// 		<Fragment>
// 			<Hidden lgUp>
// 				<Drawer
// 					variant="temporary"
// 					open={props.open}
// 					onClose={() => {
// 						props.toggle();
// 					}}
// 					classes={{
// 						paper: classes.drawerPaper
// 					}}
// 					ModalProps={{ keepMounted: true }}
// 				>
// 					{props.children}
// 				</Drawer>
// 			</Hidden>
// 			<Hidden mdDown>
// 				<Drawer
// 					variant="permanent"
// 					open
// 					classes={{
// 						paper: classes.drawerPaper
// 					}}
// 				>
// 					<div className={classes.toolbar} />
// 					{props.children}
// 				</Drawer>
// 			</Hidden>
// 		</Fragment>
// 	);
// };

const SideDrawer = props => {
	const { classes } = props;
	return (
		<Fragment>
			<Drawer
				variant="permanent"
				classes={{
					paper: props.open ? classes.drawerPaperClose : classes.drawerPaper
				}}
				open={props.open}
			>
				<div className={classes.toolbarIcon}>
					<IconButton onClick={props.toggle}>
						<ChevronLeftIcon />
					</IconButton>
				</div>
				<Divider />
				{props.children}
			</Drawer>
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
