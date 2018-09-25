import React, { Component } from "react";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
//Redux
import { loadDefaultHWCourses } from "../../actions/HomeworkCheck/hwCourses";
//Components
import HWLandingPage from "./HWLandingPage";
import HWCoursesMain from "./HWCourses/HWCoursesMain";
import HWAddCourseDialog from "./HWAddCourseDialog";
import HWCourseCreator from "./HWCourses/HWCoursesCreator";
import { changeNavbarTitle } from "../../actions/navbar";

const styles = theme => ({
	root: {
		flexgrow: 1,
		zIndex: 1,
		overflow: "hidden",
		position: "relative",
		display: "flex",
	},
	content: {
		flexGrow: 1,
		marginTop: "10px",
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing.unit * 3,
		minWidth: 0,
	},
});

const HWDisplay = props => {
	return <React.Fragment>{props.children}</React.Fragment>;
};

class HWDashboard extends Component {
	state = {
		addDialogOpen: false,
	};

	componentWillUnmount() {
		this.props.dispatch(changeNavbarTitle({}));
	}

	toggleAddDialog = state => {
		this.setState(state => ({
			addDialogOpen: !state.addDialogOpen,
		}));
	};

	handleSelection = selection => {
		switch (selection) {
			case "home": {
				return <HWLandingPage />;
			}
			case "classes": {
				return (
					<HWCoursesMain
						HWCourseCreator={<HWCourseCreator toggle={this.toggleAddDialog} />}
					/>
				);
			}
			default:
				return null;
		}
	};

	render() {
		const { classes } = this.props;
		const { selection } = this.props.match.params;

		return (
			<div className={classes.root}>
				<HWAddCourseDialog
					open={this.state.addDialogOpen}
					toggle={this.toggleAddDialog}
				/>
				<main className={classes.content}>
					<HWDisplay className={classes.root}>
						{this.handleSelection(selection)}
					</HWDisplay>
				</main>
			</div>
		);
	}
}

function mapStateToProps({ hwCourses }) {
	return { hwCourses };
}

function mapDispatchToProps(dispatch) {
	dispatch(
		changeNavbarTitle({ value: "Homework Check", location: "HWCheck Main" }),
	);
	dispatch(loadDefaultHWCourses());
	return { dispatch };
}
export default compose(
	withStyles(styles),
	connect(
		mapStateToProps,
		mapDispatchToProps,
	),
)(HWDashboard);
