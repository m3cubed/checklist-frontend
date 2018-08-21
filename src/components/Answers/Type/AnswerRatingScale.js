import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
//Accessories
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/lab/Slider";
import Typography from "@material-ui/core/Typography";
//Redux
import { updateResponse } from "../../../actions/responses";

const styles = theme => ({
	root: {
		flexGrow: 1
	}
});

class AnswerRatingScale extends Component {
	state = {
		value: Math.floor((this.props.details.min + this.props.details.max) / 2)
	};

	componentWillReceiveProps(nextProps) {
		this.setState(state => ({
			...nextProps.response.answer
		}));
	}

	handleValueChange = (e, value) => {
		this.setState(state => ({
			value: value
		}));
		if (this.props.response) {
			this.props.dispatch(
				updateResponse({
					...this.props.response,
					answer: {
						value: value
					}
				})
			);
		}
	};

	render() {
		const { classes } = this.props;
		const { min, max } = this.props.details;
		return (
			<Grid container className={classes.root} spacing={24} justify="center">
				<Grid item xs={12}>
					<Grid container className={classes.root} spacing={8} justify="center">
						<Grid item xs={1}>
							<Typography variant="body1">{min}</Typography>
						</Grid>
						<Grid item xs={10}>
							<Slider
								min={min}
								max={max}
								step={1}
								value={this.state.value}
								onChange={this.handleValueChange}
							/>
						</Grid>
						<Grid item xs={1}>
							<Typography variant="body1">{max}</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="subheading">{this.state.value}</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		);
	}
}

export default compose(
	withStyles(styles),
	connect()
)(AnswerRatingScale);
