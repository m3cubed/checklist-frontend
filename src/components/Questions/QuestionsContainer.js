import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
//Accessories
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	type: {
		width: "100%"
	}
});

class QuestionsContainer extends Component {
	state = {
		questionTitle: "",
		type: this.props.type
	};
	render() {
		const { classes } = this.props;
		return (
			<Grid container spacing={8} justify="space-between" alignItems="flex-end">
				<Grid item xs={3}>
					<TextField
						required
						id="questionTitle"
						value={this.state.questionTitle}
						label="Question Title"
						onChange={e =>
							this.setState({
								[e.target.id]: e.target.value
							})
						}
					/>
				</Grid>
				<Grid item xs={3}>
					<FormControl className={classes.type}>
						<InputLabel htmlFor="question-type">Question Type</InputLabel>
						<Select
							value={this.state.type}
							label="Choose Question Type"
							onChange={e => {
								this.setState({
									type: e.target.value
								});
								this.props.typeChange(e.target.value);
							}}
							inputProps={{
								name: "type",
								id: "question-type"
							}}
						>
							<MenuItem value="" disabled hidden>
								Choose Here
							</MenuItem>
							<MenuItem value="rating">Rating/Scale</MenuItem>
							<MenuItem value="multiple-choice">Multiple Choice</MenuItem>
						</Select>
					</FormControl>
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(styles)(QuestionsContainer);
