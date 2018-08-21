import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
//Accessories
import Typography from "@material-ui/core/Typography";
//Redux
import { handleConfirmStudent } from "../../../actions/courses";
import { handleGetStudents } from "../../../actions/students";
import { handleLoadClassResponses } from "../../../actions/pollResponse";
//Components
import CourseViewConfirmed from "./CourseViewConfirmed";
import CourseTemplateSend from "./CourseTemplateSend";
import CourseTeacherSideDrawer from "./CourseTeacherSideDrawer";
import CourseBaseSideDrawer from "../CourseBaseSideDrawer";

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
		width: 240
	},
	content: {
		flexGrow: 1,
		backgroudnColor: theme.palette.background.default,
		padding: theme.spacing.unit * 3,
		minWidth: 0
	},
	toolbar: theme.mixins.toolbar,
	badge: {
		margin: theme.spacing.unit * 2
	}
});

class CourseTeacherView extends Component {
	state = {};

	render() {
		const {
			students,
			course,
			dispatch,
			unconfirmed,
			confirmed,
			classes
		} = this.props;

		return (
			<div className={classes.root}>
				<CourseBaseSideDrawer>
					<CourseTeacherSideDrawer />
				</CourseBaseSideDrawer>
				<main className={classes.content}>
					<Typography variant="headline">{course.courseTitle}</Typography>
					<br />
					List of students needing confirmation:
					<br />
					<ul>
						{unconfirmed === null || unconfirmed.length === 0
							? null
							: unconfirmed.map(student => (
									<Fragment key={student}>
										<li>
											{`${students[student].userFirstName} ${
												students[student].userLastName
											}`}
										</li>
										<span>
											<button
												onClick={() => {
													dispatch(handleConfirmStudent(course, student));
												}}
											>
												Confirm
											</button>
										</span>
									</Fragment>
							  ))}
					</ul>
					<div>
						<h4>Students:</h4>
						<CourseTemplateSend courseID={course.id} />

						{confirmed === null || confirmed.length === 0 ? null : (
							<CourseViewConfirmed confirmed={confirmed} />
						)}
					</div>
				</main>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	dispatch(handleGetStudents());
	dispatch(handleLoadClassResponses());
	return { dispatch };
}

function mapStateToProps({ students, courses }, { match }) {
	const { id } = match.params;

	if (students !== null && courses[id].students) {
		const confirmList = Object.keys(courses[id].students);

		return {
			students,
			course: courses[id],
			confirmed: confirmList.filter(
				studentID => courses[id].students[studentID].confirmed === true
			),
			unconfirmed: confirmList.filter(
				studentID => courses[id].students[studentID].confirmed === false
			)
		};
	}
	return {
		students,
		course: courses[id],
		confirmed: [],
		unconfirmed: []
	};
}

export default compose(
	withStyles(styles),
	connect(
		mapStateToProps,
		mapDispatchToProps
	)
)(CourseTeacherView);
