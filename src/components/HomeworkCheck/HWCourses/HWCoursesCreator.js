import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
//Accessories
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
//Icons
import AddIcon from "@material-ui/icons/Add";

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	paper: {
		padding: theme.spacing.unit * 2
	}
});

const HWCoursesCreator = props => {
	const { classes } = props;
	return (
		<Paper className={classes.paper} style={{ height: props.width }}>
			<Grid container spacing={16}>
				<Grid item xs={12}>
					<Button variant="fab" color="secondary" onClick={props.toggle}>
						<AddIcon />
					</Button>
				</Grid>
				<Grid item xs={12}>
					<Typography>Add a Class!</Typography>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default compose(
	withStyles(styles),
	connect()
)(HWCoursesCreator);
