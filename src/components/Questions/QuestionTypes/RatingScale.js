import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
//Accessories
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
//Components

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	textField: {
		width: "100%",
	},
});
class RatingScale extends Component {
	state = {
		details: this.props.details
			? { ...this.props.details }
			: { min: "", max: "", value: "" },
	};

	render() {
		const { handleDetails, classes } = this.props;
		const { details } = this.state;

		return (
			<div className={classes.root}>
				<Grid container spacing={8} justify="space-evenly">
					<Grid item xs={3}>
						<TextField
							className={classes.textField}
							defaultValue={details.min}
							type="number"
							inputProps={{
								min: 0,
								max: 99,
							}}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">Min:</InputAdornment>
								),
							}}
							onChange={e =>
								this.setState(
									{
										details: {
											...details,
											min: Number(e.target.value),
										},
									},
									() => handleDetails(this.state.details),
								)
							}
						/>
					</Grid>

					<Grid item xs={3}>
						<TextField
							className={classes.textField}
							defaultValue={details.max}
							type="number"
							inputProps={{
								min: 1,
								max: 100,
							}}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">Max:</InputAdornment>
								),
							}}
							onChange={e =>
								this.setState(
									{
										details: {
											...details,
											max: Number(e.target.value),
										},
									},
									() => handleDetails(this.state.details),
								)
							}
						/>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default withStyles(styles)(RatingScale);
