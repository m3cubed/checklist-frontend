import React, { Component } from "react";
import { connect } from "react-redux";
//Acessories
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
//Redux
import { searchCoursesByAccessCode } from "../../../api";
import { handleAddStudentToCourse } from "../../../actions/courses";

class CourseStudentJoin extends Component {
	state = {
		searchTarget: "",
		courseDetails: null
	};
	render() {
		const { dispatch, courses, authUser } = this.props;
		return (
			<Dialog open={this.props.open} onClose={this.props.toggle}>
				<DialogTitle>Enter the access code of the course</DialogTitle>
				<DialogContent>
					<Grid container alignItems="flex-end">
						<Grid item xs={9}>
							<TextField
								autoFocus
								margin="dense"
								label="Access Code"
								type="text"
								onChange={e =>
									this.setState({
										searchTarget: e.target.value
									})
								}
							/>
						</Grid>

						<Grid item xs={2}>
							<Button
								onClick={() => {
									new Promise((resolve, reject) =>
										searchCoursesByAccessCode(
											this.state.searchTarget,
											resolve,
											reject
										)
									)
										.then(courseDetails =>
											this.setState({
												courseDetails: {
													...courseDetails
												}
											})
										)
										.catch(err => this.setState({ courseDetails: false }));
								}}
							>
								Search
							</Button>
						</Grid>

						<Grid item xs={12}>
							<Divider style={{ margin: 10 }} />
						</Grid>

						<Grid item xs={12}>
							<DialogContentText>
								{/*Search Function*/}
								{this.state.courseDetails === null ? (
									"Enter an access code to search for your class!"
								) : this.state.courseDetails === false ? (
									"No such course found."
								) : (
									<div>
										Is this the course you are looking for?
										<br />
										{`${this.state.courseDetails.courseTitle}
										${this.state.courseDetails.courseCode} --- ${this.state.courseDetails.creator}`}
										<div>
											Is this the class you were looking for?
											<br />
											<button
												className="course-join-confirm-btn"
												onClick={() =>
													Object.keys(authUser.requestedCourses).includes(
														this.state.courseDetails.id
													)
														? alert(
																"You have already requested to be in this course!"
														  )
														: dispatch(
																handleAddStudentToCourse(
																	courses[this.state.courseDetails.id],
																	authUser.id
																)
														  )
												}
											>
												Yes
											</button>
										</div>
									</div>
								)}
								{/*Search Function END*/}
							</DialogContentText>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button onClick={this.props.toggle}>Cancel</Button>
					<Button disabled>Add Class</Button>
				</DialogActions>
			</Dialog>
		);
	}
}

function mapStateToProps({ courses, authUser }) {
	return {
		courses,
		authUser
	};
}

export default connect(mapStateToProps)(CourseStudentJoin);
