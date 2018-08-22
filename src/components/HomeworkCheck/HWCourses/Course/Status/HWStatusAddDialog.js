import React, { Component, Fragment } from "react";
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
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ContainerDimensions from "react-container-dimensions";
//Redux
import { handleAddHWStatus } from "../../../../../actions/HomeworkCheck/hwStatus";

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	tabsPaper: {
		color: theme.palette.primary
	},
	content: {
		flexGrow: 1
	},
	colorBlock: {
		display: "block",
		boxSizing: "border-box",
		height: "100%"
	},
	colorSelected: {
		display: "block",
		boxSizing: "border-box",
		height: "100%",
		border: "2px solid white"
	},
	paper: {
		padding: theme.spacing.unit,
		textAlign: "center",
		color: theme.palette.text.secondary,
		width: "100%"
	}
});

const colorsChoices = [
	["#ef9a9a", "#f48fb1", "#ce93d8", "#b39ddb"],
	["#9fa8da", "#90caf9", "#81d4fa", "#80deea"],
	["#80cbc4", "#a5d6a7", "#c5e1a5", "#e6ee9c"],
	["#fff59d", "#ffe082", "#ffcc80", "#ffab91"]
];

const RenderColorRows = props => {
	const { classes } = props;
	return (
		<Fragment>
			{props.row.map(color => (
				<Grid key={color} item xs={3}>
					<div
						className={
							props.color === color ? classes.colorSelected : classes.colorBlock
						}
						style={{
							backgroundColor: color
						}}
						onClick={props.colorChange(color)}
					/>
				</Grid>
			))}
		</Fragment>
	);
};

class HWCourseStatusAddDialog extends Component {
	state = {
		statusTitle: "",
		statusDescription: "",
		statusType: "Optional",
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
		if (this.state.color === "") {
			alert("You must select a color!");
		} else {
			this.props.dispatch(handleAddHWStatus(this.state));
		}
	};

	handleColor = color => () => {
		this.setState({
			color
		});
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
						<DialogContentText>
							Enter the details for a new status tab. New tabs will be displayed
							at the top of the class page. Tabs are not shared between classes.
						</DialogContentText>
						<div className={classes.content}>
							<Grid
								container
								spacing={24}
								justify="center"
								alignItems="center"
								direction="row"
							>
								<Grid item xs={12}>
									<TextField
										required
										id="statusTitle"
										label="Status Title"
										value={this.state.statusTitle}
										onChange={this.handleValue}
										fullWidth
									/>
								</Grid>

								<Grid item xs={12}>
									<DialogContentText>
										Choose a color for you new status!
									</DialogContentText>
								</Grid>

								<Grid item container spacing={0} justify="center">
									<Grid item xs={12} md={8} lg={6}>
										<ContainerDimensions>
											{({ width }) => (
												<div style={{ height: width, width: width }}>
													{colorsChoices.map((row, index) => (
														<Grid
															key={index}
															item
															container
															xs={12}
															style={{ height: "25%" }}
														>
															<RenderColorRows
																classes={classes}
																row={row}
																colorChange={this.handleColor}
																color={this.state.color}
															/>
														</Grid>
													))}
												</div>
											)}
										</ContainerDimensions>
									</Grid>
								</Grid>
							</Grid>
						</div>
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

// <Grid item xs={12} md={6}>
// <FormControl required style={{ width: "100%" }}>
// 	<InputLabel htmlFor="statusType">Status Type</InputLabel>
// 	<Select
// 		autoWidth
// 		id="statusType"
// 		label="Status Type"
// 		value={this.state.statusType}
// 		onChange={this.handleSelect}
// 		input={<Input id="statusType" />}
// 	>
// 		<MenuItem value="Complete">Success</MenuItem>
// 		<MenuItem value="Incomplete">Incomplete</MenuItem>
// 		<MenuItem value="Warning">Warning</MenuItem>
// 	</Select>
// </FormControl>
// </Grid>

export default compose(
	withStyles(styles),
	connect()
)(HWCourseStatusAddDialog);
