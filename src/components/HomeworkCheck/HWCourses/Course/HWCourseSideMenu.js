import React, { Component } from "react";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
//Accessories
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
//Icons
import AddBoxIcon from "@material-ui/icons/AddBox";

const styles = theme => ({
	buttonBase: {
		width: "100%"
	}
});

class HWCourseSideMenu extends Component {
	state = {};
	render() {
		const { classes } = this.props;
		return (
			<Paper>
				<Grid container>
					<Grid item xs={6}>
						<ButtonBase className={classes.buttonBase}>
							<AddBoxIcon />
						</ButtonBase>
					</Grid>
				</Grid>
			</Paper>
		);
	}
}

export default compose(
	withStyles(styles),
	connect()
)(HWCourseSideMenu);
