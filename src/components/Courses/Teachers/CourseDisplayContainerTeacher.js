import React from "react";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import CourseDisplayBox from "./CourseDisplayBox";
import { filterCourses } from "../../../api";

const styles = theme => ({
	root: {
		flexGrowth: 1
	},
	paper: {
		padding: theme.spacing.unit * 2,
		textAlign: "center",
		color: theme.palette.text.secondary
	}
});

const CourseDisplayContainerTeacher = props => {
	const { classes, courses } = props;

	if (courses === null) {
		return (
			<div>
				<Typography variant="display1">Add a new course now!</Typography>
			</div>
		);
	}

	return (
		<Grid container className={classes.root} spacing={24}>
			<Grid item xs={12}>
				<Paper className={classes.paper}>
					{Object.keys(courses).map(courseID => (
						<CourseDisplayBox key={courseID} course={courses[courseID]} />
					))}
				</Paper>
			</Grid>
		</Grid>
	);
};

function mapStateToProps({ courses, authUser }) {
	const userCourses = authUser.courseIDs;

	if (!userCourses || Object.keys(userCourses).length === 0) {
		return {
			courses: null
		};
	}

	return {
		courses: filterCourses(courses, userCourses)
	};
}
export default compose(
	withStyles(styles),
	connect(mapStateToProps)
)(CourseDisplayContainerTeacher);
