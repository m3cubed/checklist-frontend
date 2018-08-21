import React from "react";
import { withStyles } from "@material-ui/core/styles";
//Accessories
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
	root: {
		flexGrowth: 1
	},
	paper: {
		padding: theme.spacing.unit * 2,
		textAlign: "center",
		color: theme.palette.text.secondary
	}
});

const AnswersContainer = props => {
	const { classes } = props;

	return (
		<Paper className={classes.paper}>
			<Grid container className={classes.root} spacing={40}>
				<Grid item xs={12}>
					<Typography variant="title" align="left">
						{`${props.index}. ${props.title}`}
					</Typography>
					{props.required ? (
						<Typography variant="caption" align="left">
							Required*
						</Typography>
					) : null}
				</Grid>
				<Grid item xs={12}>
					{props.children}
				</Grid>
			</Grid>
		</Paper>
	);
};

export default withStyles(styles)(AnswersContainer);
