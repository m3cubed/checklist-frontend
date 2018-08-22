import React, { Component } from "react";
import { connect } from "react-redux";
//Accessories
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
//Redux
import { handleDeleteHWCourse } from "../../../../actions/HomeworkCheck/hwCourses";

const HWCourseDeleteDialog = props => {
	const handleToggle = () => {
		props.toggle("openDelete");
	};

	const handleDelete = () => {
		handleToggle();
		props.dispatch(handleDeleteHWCourse(props.courseID));
	};

	return (
		<Dialog open={props.open} onClose={handleToggle}>
			<DialogTitle>Delete This Class?</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Are you sure you want to delete this class? This action cannot be
					undone.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleToggle}>Cancel</Button>
				<Button onClick={handleDelete}>Delete!</Button>
			</DialogActions>
		</Dialog>
	);
};

export default connect()(HWCourseDeleteDialog);
