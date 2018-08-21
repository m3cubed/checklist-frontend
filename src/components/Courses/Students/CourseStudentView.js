import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
//Redux
import { filterCourses } from "../../../api";
import { handleAddPollsResponse } from "../../../actions/authUser";
//Components
import CourseStudentSideDrawer from "./CourseStudentSideDrawer";
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
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing.unit * 3,
		minWidth: 0
	},
	toolbar: theme.mixins.toolbar,
	badge: {
		margin: theme.spacing.unit * 2
	}
});

class CourseStudentView extends Component {
	state = {};

	componentDidMount() {}
	render() {
		const { classes, userCourses, todos, polls, dispatch } = this.props;
		return (
			<div className={classes.root}>
				<CourseBaseSideDrawer>
					<CourseStudentSideDrawer />
				</CourseBaseSideDrawer>
				<main className={classes.content}>
					<h4>My Courses</h4>

					<ul>
						{Object.keys(userCourses).map(courseID => (
							<li key={courseID}>{userCourses[courseID].courseTitle}</li>
						))}
					</ul>
					<h4>My Todos</h4>
					<ul>
						{Object.keys(todos).map(todo => (
							<li key={todo}>
								{todos[todo] === null ? null : (
									<Link to={`/poll/${todo}`}>
										{`${polls[todo].pollTitle} | New!`}
									</Link>
								)}
							</li>
						))}
					</ul>
				</main>
			</div>
		);
	}
}

function mapStateToProps({ courses, authUser, polls }) {
	return {
		userCourses: filterCourses(courses, authUser.courseIDs),
		todos: authUser.todoPolls,
		polls
	};
}

function mapDispatchToProps(dispatch) {
	return { dispatch };
}

function mergeProps(state, { dispatch }, props) {
	const toBeDispatched = Object.keys(state.todos).reduce((acc, item) => {
		if (state.todos[item] === null) {
			acc.push(item);
		}
		return acc;
	}, []);

	if (toBeDispatched.length > 0) {
		new Promise((resolve, reject) => {
			dispatch(handleAddPollsResponse(toBeDispatched, resolve, reject));
		})
			.then(() => {
				return {
					...state,
					dispatch,
					...props
				};
			})
			.catch(err => {
				return {
					...state,
					dispatch,
					...props
				};
			});
	}

	return {
		...state,
		dispatch,
		...props
	};
}

export default compose(
	withStyles(styles),
	connect(
		mapStateToProps,
		mapDispatchToProps,
		mergeProps
	)
)(CourseStudentView);
