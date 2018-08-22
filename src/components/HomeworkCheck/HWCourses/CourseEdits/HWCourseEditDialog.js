import React, { Component } from "react";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
//Accessories
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { handleUpdateHWCourse } from "../../../../actions/HomeworkCheck/hwCourses";
//Redux

const styles = theme => ({
	root: {
		flexGrow: 1
	}
});

class HWCourseEditDialog extends Component {
	state = {
		courseTitle: "",
		grade: "",
		subject: "",
		startDate: "",
		endDate: "",
		semester: "",
		courseDescription: ""
	};

	componentDidMount() {
		this.setState({
			...this.props.course
		});
	}

	handleChangeValue = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		this.handleToggle();
		this.props.dispatch(handleUpdateHWCourse(this.state));
	};

	handleToggle = () => {
		this.props.toggle("openEdit");
	};

	render() {
		return (
			<Dialog open={this.props.open} onClose={this.handleToggle}>
				<form onSubmit={this.handleSubmit}>
					<DialogTitle>Edit class details</DialogTitle>
					<DialogContent>
						<Grid
							container
							spacing={24}
							alignItems="center"
							justify="space-evenly"
						>
							<Grid item xs={11}>
								<TextField
									id="courseTitle"
									label="Class Title"
									value={this.state.courseTitle}
									onChange={this.handleChangeValue}
									fullWidth
									required
								/>
							</Grid>

							<Grid item xs={11} sm={5}>
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
							<Grid item xs={11} sm={5}>
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
						<Button onClick={this.handleToggle}>Cancel</Button>
						<Button type="submit" color="primary">
							Submit!
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
)(HWCourseEditDialog);
