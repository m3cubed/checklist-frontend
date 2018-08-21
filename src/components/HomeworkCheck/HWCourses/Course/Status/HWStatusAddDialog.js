import React, { Component } from "react";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
//Accessories
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
//Redux

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	tabsPaper: {
		color: theme.palette.primary
	}
});

class HWCourseStudentAddDialog extends Component {
	state = {
		statusTitle: "",
		statusDescription: "",
		statusType: "",
		color: "",
		courseID: this.props.courseID
	};

	handleValue = e => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	handleSelect = e => {
		this.setState({
			statusType: e.target.value
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.toggle();
	};

	render() {
		const { classes } = this.props;
		return (
			<Dialog
				open={this.props.open}
				onClose={this.props.toggle}
				className={classes.root}
			>
				<form onSubmit={this.handleSubmit}>
					<DialogTitle>Add a Status</DialogTitle>
					<DialogContent>
						<Grid container spacing={16} justify="center" alignItems="center">
							<Grid item xs={12}>
								<Grid
									container
									spacing={16}
									justify="center"
									alignItems="flex-end"
								>
									<Grid item xs={12} md={6}>
										<TextField
											required
											id="statusTitle"
											label="Status Title"
											value={this.state.statusTitle}
											onChange={this.handleValue}
											fullWidth
										/>
									</Grid>
									<Grid item xs={12} md={6}>
										<FormControl required style={{ width: "100%" }}>
											<InputLabel htmlFor="statusType">Status Type</InputLabel>
											<Select
												autoWidth
												id="statusType"
												label="Status Type"
												value={this.state.statusType}
												onChange={this.handleSelect}
												input={<Input id="statusType" />}
											>
												<MenuItem value="Complete">Success</MenuItem>
												<MenuItem value="Incomplete">Incomplete</MenuItem>
												<MenuItem value="Warning">Warning</MenuItem>
											</Select>
										</FormControl>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.props.toggle}>Cancel</Button>
						<Button color="primary">Add+</Button>
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
