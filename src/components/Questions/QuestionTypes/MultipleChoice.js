import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
//Accessories
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	textField: {
		width: "80%",
	},
	container: {
		padding: theme.spacing.unit * 2,
	},
});

class MultipleChoice extends Component {
	state = {
		details:
			Object.keys(this.props.details).length > 0
				? { ...this.props.details }
				: { choiceNUM: 1 },
	};

	render() {
		const { handleDetails, classes } = this.props;
		const { details } = this.state;
		let inputChoices = [];

		for (let i = 0; i < details.choiceNUM; i++) {
			inputChoices.push(
				<Grid item key={`choice${i}`} xs={6}>
					<TextField
						className={classes.textField}
						type="text"
						defaultValue={
							details.choices === undefined ||
							details.choices[`choice${i}`] === undefined
								? ""
								: details.choices[`choice${i}`]
						}
						onChange={e =>
							this.setState(
								{
									details: {
										...details,
										choices: {
											...details.choices,
											[`choice${i}`]: e.target.value,
										},
									},
								},
								() => handleDetails(this.state.details),
							)
						}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									{`Choice ${i + 1}`}
								</InputAdornment>
							),
						}}
					/>
				</Grid>,
			);
		}

		return (
			<div className={classes.root}>
				<Grid container spacing={0}>
					<Grid item className={classes.container} xs={12}>
						<TextField
							type="number"
							inputProps={{
								min: 1,
								max: 10,
							}}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										Number of Choices:
									</InputAdornment>
								),
							}}
							defaultValue={details.choiceNUM}
							onChange={e =>
								this.setState(
									{
										details: {
											...details,
											choiceNUM: Number(e.target.value),
										},
									},
									() => handleDetails(this.state.details),
								)
							}
						/>
					</Grid>
					<Grid item className={classes.container} xs={12}>
						<Grid container spacing={0} justify="space-between" direction="row">
							{inputChoices}
						</Grid>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default withStyles(styles)(MultipleChoice);
