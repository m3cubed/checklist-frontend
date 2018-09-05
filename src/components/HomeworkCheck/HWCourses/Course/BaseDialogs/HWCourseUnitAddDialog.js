import React, { Component } from "react";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
//Accessories
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import { handleAddHWUnit } from "../../../../../actions/HomeworkCheck/hwUnits";

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	tabsPaper: {
		color: theme.palette.primary
	}
});

class HWCourseStudentAddDialog extends Component {
	close = this.props.toggle("unit");

	state = {
		courseID: this.props.courseID,
		unitTitle: "",
		unitStartDate: "",
		unitEndDate: "",
		unitDescription: ""
	};

	handleValue = e => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		this.close();
		this.props.dispatch(handleAddHWUnit(this.state));
	};

	render() {
		const { classes } = this.props;
		return (
			<Dialog open={this.props.open} onClose={this.close}>
				<form onSubmit={this.handleSubmit}>
					<DialogTitle>Add a unit</DialogTitle>
					<DialogContent>
						<Grid container spacing={16} justify="center" alignItems="center">
							<Grid item xs={11}>
								<TextField
									required
									label="Unit Title"
									id="unitTitle"
									value={this.state.firstName}
									onChange={this.handleValue}
									fullWidth
								/>
							</Grid>
							<Grid item xs={5}>
								<hr />
							</Grid>
							<Grid item xs={2} align="center">
								<DialogContentText>Optional</DialogContentText>
							</Grid>
							<Grid item xs={5}>
								<hr />
							</Grid>
							<Grid item xs={11} sm={6}>
								<TextField
									label="Start Date"
									type="date"
									id="unitStartDate"
									value={this.state.lastName}
									onChange={this.handleValue}
									InputLabelProps={{
										shrink: true
									}}
									fullWidth
								/>
							</Grid>
							<Grid item xs={11} sm={6}>
								<TextField
									label="End Date"
									type="date"
									id="unitEndDate"
									value={this.state.gender}
									onChange={this.handleValue}
									InputLabelProps={{
										shrink: true
									}}
									fullWidth
								/>
							</Grid>
						</Grid>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.close}>Cancel</Button>
						{/*<Button color="primary">Add+</Button>*/}
						<Button color="primary" type="submit">
							Add
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
)(HWCourseStudentAddDialog);
