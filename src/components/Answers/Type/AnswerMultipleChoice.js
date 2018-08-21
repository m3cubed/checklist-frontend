import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { connect } from "react-redux";
//Accessories
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
//Redux
import { updateResponse } from "../../../actions/responses";

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	button: {
		padding: theme.spacing.unit * 2,
		width: "100%"
	}
});

class AnswerMultipleChoice extends Component {
	state = {
		selected: Object.keys(this.props.details.choices).fill(0),
		value: ""
	};

	componentWillReceiveProps(nextProps) {
		this.setState(state => ({
			...nextProps.response.answer
		}));
	}

	render() {
		const { classes } = this.props;
		const { choices } = this.props.details;

		return (
			<Grid container className={classes.root} spacing={8}>
				{Object.keys(choices).map((choice, index) => (
					<Grid item xs={6} key={choices[choice]}>
						<Button
							className={classes.button}
							variant="contained"
							color={this.state.selected[index] === 1 ? "primary" : "secondary"}
							onClick={() => {
								let selected = this.state.selected;
								selected = selected.fill(0);
								selected[index] = 1;
								this.setState(
									{
										selected: selected,
										value: choices[choice]
									},
									() => {
										if (this.props.response) {
											this.props.dispatch(
												updateResponse({
													...this.props.response,
													answer: this.state
												})
											);
										}
									}
								);
							}}
						>
							{choices[choice]}
						</Button>
					</Grid>
				))}
			</Grid>
		);
	}
}

export default compose(
	withStyles(styles),
	connect()
)(AnswerMultipleChoice);
