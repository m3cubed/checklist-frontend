import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
//Accessories
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
//Icons
//Redux
import {
	toggleDrawerIcon,
	toggleDrawer,
	changeNavbarTitle
} from "../../actions/navbar";

const styles = theme => ({
	drawerPaper: {
		position: "relative",
		width: 256
	},
	navIconHide: {
		[theme.breakpoints.up("md")]: {
			display: "none"
		}
	},
	content: {
		flexGrow: 1,
		backgroudnColor: theme.palette.background.default,
		padding: theme.spacing.unit * 3,
		minWidth: 0
	},
	toolbar: theme.mixins.toolbar
});

class TemplateBaseSideDrawer extends Component {
	static getDerivedStateFromProps(nextProps) {
		return {
			open: nextProps.navbar.showDrawer
		};
	}
	state = { open: this.props.navbar.showDrawer };

	componentDidMount() {
		this.props.dispatch(toggleDrawerIcon(true));
		this.props.dispatch(changeNavbarTitle("Classes"));
	}

	componentWillUnmount() {
		this.props.dispatch(toggleDrawerIcon(false));
	}

	render() {
		const { classes } = this.props;
		return (
			<Fragment>
				<Hidden mdUp>
					<Drawer
						variant="temporary"
						open={this.state.open}
						onClose={() => {
							this.props.dispatch(toggleDrawer());
						}}
						classes={{
							paper: classes.drawerPaper
						}}
						ModalProps={{ keepMounted: true }}
					>
						{this.props.children}
					</Drawer>
				</Hidden>
				<Hidden smDown>
					<Drawer
						variant="permanent"
						open
						classes={{
							paper: classes.drawerPaper
						}}
					>
						{this.props.children}
					</Drawer>
				</Hidden>
			</Fragment>
		);
	}
}

function mapStateToProps({ navbar }) {
	return {
		navbar
	};
}

export default compose(
	withStyles(styles),
	connect(mapStateToProps)
)(TemplateBaseSideDrawer);
