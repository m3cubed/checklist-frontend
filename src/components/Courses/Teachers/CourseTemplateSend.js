import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
//Accessories
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
//Redux
import { handleSendPolls } from "../../../actions/courses";

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	select: {
		width: "100%"
	}
});

class CourseTemplateSend extends Component {
	state = {
		value: "",
		success: false
	};
	render() {
		const { dispatch, classes, templates } = this.props;

		if (this.props.open) {
			return (
				<Dialog
					open={this.props.open}
					onClose={() => {
						this.props.toggle();
						this.setState({ success: false });
					}}
				>
					<DialogTitle>Choose a class poll</DialogTitle>
					<DialogContent>
						<Grid container justify="center">
							{this.state.success ? (
								<Grid item xs={12}>
									<DialogContentText align="center">SENT!</DialogContentText>
								</Grid>
							) : (
								<Grid item xs={12}>
									<Select
										className={classes.select}
										value={this.state.value}
										onChange={e => this.setState({ value: e.target.value })}
									>
										<MenuItem value="">
											<em>None</em>
										</MenuItem>
										{Object.keys(templates).map(item => (
											<MenuItem value={item} key={item}>
												{templates[item].templateTitle}
											</MenuItem>
										))}
									</Select>
								</Grid>
							)}
						</Grid>
					</DialogContent>
					<DialogActions>
						{this.state.success ? (
							<Button
								onClick={() => {
									this.props.toggle();
									this.setState({
										success: false
									});
								}}
							>
								Back
							</Button>
						) : (
							<Fragment>
								<Button onClick={this.props.toggle}>Cancel</Button>
								<Button
									onClick={() => {
										new Promise((resolve, reject) => {
											dispatch(
												handleSendPolls(this.state.value, resolve, reject)
											);
										}).then(() => this.setState({ success: true }));
									}}
								>
									Send
								</Button>
							</Fragment>
						)}
					</DialogActions>
				</Dialog>
			);
		}
		return null;
	}
}

function mapStateToProps({ templates }) {
	return {
		templates
	};
}

export default compose(
	withStyles(styles),
	connect(mapStateToProps)
)(CourseTemplateSend);
