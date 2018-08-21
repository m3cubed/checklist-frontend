import React, { Component } from "react";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
//Accessories
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
//Redux
import { handleAddHWCourse } from "../../actions/HomeworkCheck/hwCourses";

const styles = theme => ({
	root: {
		flexGrow: 1
	}
});

class HWAddCourseDialog extends Component {
	state = {
		courseTitle: "",
		grade: "",
		subject: "",
		startDate: "",
		endDate: "",
		semester: "",
		courseDescription: ""
	};

	handleChangeValue = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.toggle();
		this.props.dispatch(handleAddHWCourse(this.state));
	};

	render() {
		return (
			<Dialog open={this.props.open} onClose={this.props.toggle}>
				<form onSubmit={this.handleSubmit}>
					<DialogTitle>Input information for new course</DialogTitle>
					<DialogContent>
						<Grid container spacing={16} alignItems="center">
							<Grid item xs={11}>
								<TextField
									id="courseTitle"
									label="Course Name"
									value={this.state.courseName}
									onChange={this.handleChangeValue}
									fullWidth
									required
								/>
							</Grid>

							<Grid item xs={11} sm={6}>
								<TextField
									id="startDate"
									label="Start Date"
									type="date"
									value={this.state.startDate}
									onChange={this.handleChangeValue}
									InputLabelProps={{
										shrink: true
									}}
									fullWidth
									required
								/>
							</Grid>
							<Grid item xs={11} sm={6}>
								<TextField
									id="endDate"
									label="End Date"
									type="date"
									value={this.state.endDate}
									onChange={this.handleChangeValue}
									InputLabelProps={{
										shrink: true
									}}
									fullWidth
									required
								/>
							</Grid>
						</Grid>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.props.toggle}>Cancel</Button>
						<Button type="submit" color="primary">
							Create!
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		);
	}
}

export default compose(
	withStyles(styles),
	connect()
)(HWAddCourseDialog);
