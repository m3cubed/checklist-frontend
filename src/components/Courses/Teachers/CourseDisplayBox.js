import React, { Component } from "react";
import { handleDeleteCourse } from "../../../actions/courses";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardAction from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

class CourseDisplayBox extends Component {
	state = {};
	render() {
		const { course, dispatch } = this.props;
		return (
			<div>
				<Link to={`class/${course.id}`}>
					<Card>
						<CardHeader
							title={course.courseTitle}
							subheader={course.courseCode}
						/>
						<CardAction>
							<IconButton onClick={e => dispatch(handleDeleteCourse(course))}>
								<DeleteIcon />
							</IconButton>
						</CardAction>
					</Card>
				</Link>
			</div>
		);
	}
}

export default CourseDisplayBox;
