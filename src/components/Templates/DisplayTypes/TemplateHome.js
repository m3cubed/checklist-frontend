import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
//Accessories
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	paper: {
		padding: theme.spacing.unit * 2,
		textAlign: "center"
	}
});

class TemplateHome extends Component {
	state = {};
	render() {
		const { classes } = this.props;
		return (
			<Grid container className={classes.root}>
				<Grid item xs={12}>
					<Grid container align="center" spacing={40}>
						<Grid item xs={3}>
							<Paper className={classes.paper}>1</Paper>
						</Grid>
						<Grid item xs={3}>
							<Paper className={classes.paper}>2</Paper>
						</Grid>
						<Grid item xs={3}>
							<Paper className={classes.paper}>3</Paper>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(styles)(TemplateHome);
