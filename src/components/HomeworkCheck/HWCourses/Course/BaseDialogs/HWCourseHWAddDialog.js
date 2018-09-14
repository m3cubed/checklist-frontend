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
import { handleAddHomework } from "../../../../../actions/HomeworkCheck/homeworks";

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	tabsPaper: {
		color: theme.palette.primary,
	},
});

class HWCourseHWAddDialog extends Component {
	close = this.props.toggle("hw");

	state = {
		homework: {
			unitID: this.props.unitID,
			homeworkTitle: "",
			submitDate: "",
			courseID: this.props.courseID,
		},
		plus: false,
	};

	componentDidUpdate(prevState) {
		if (prevState.unitID !== this.props.unitID) {
			this.setState({
				unitID: this.props.unitID,
			});
		}
	}

	handleValue = e => {
		this.setState({
			homework: {
				...this.state.homework,
				[e.target.id]: e.target.value,
			},
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		console.log(this.state.homework);
		if (!this.state.plus) {
			this.close();
		}
		this.setState({ plus: false });
		this.props.dispatch(handleAddHomework(this.state.homework));
	};

	render() {
		const { classes } = this.props;
		return (
			<Dialog open={this.props.open} onClose={this.close}>
				<form onSubmit={this.handleSubmit}>
					<DialogTitle>Add a homework</DialogTitle>
					<DialogContent>
						<Grid container spacing={16} justify="center" alignItems="center">
							<Grid item xs={12}>
								<TextField
									required
									label="Title"
									id="homeworkTitle"
									// value={this.state.homework.homeworkTitle}
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
							<Grid item xs={12}>
								<TextField
									label="Submit Date"
									id="submitDate"
									type="date"
									// value={this.state.homework.submitDate}
									onChange={this.handleValue}
									InputLabelProps={{
										shrink: true,
									}}
									fullWidth
								/>
							</Grid>
						</Grid>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.close}>Cancel</Button>
						<Button
							color="primary"
							onClick={() => this.setState({ plus: true })}
							type="submit"
						>
							Add+
						</Button>
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
	connect(),
)(HWCourseHWAddDialog);
