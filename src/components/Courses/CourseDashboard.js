import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";

import CourseCreator from "./CourseCreator";
import CourseDisplayContainerTeacher from "./Teachers/CourseDisplayContainerTeacher";
import CourseStudentView from "./Students/CourseStudentView";

class CourseDashboard extends Component {
	state = {};

	toggleByStatus(status) {
		switch (status) {
			case "teacher": {
				return (
					<Fragment>
						<Typography variant="display3">Classes</Typography>
						<CourseDisplayContainerTeacher />
						<CourseCreator />
					</Fragment>
				);
			}

			case "student": {
				return (
					<Fragment>
						<CourseStudentView />
					</Fragment>
				);
			}
			default:
				return null;
		}
	}
	render() {
		return <div>{this.toggleByStatus(this.props.authUser.status)}</div>;
	}
}

function mapStateToProps({ authUser }) {
	return {
		authUser
	};
}

export default connect(mapStateToProps)(CourseDashboard);
