import React, { Component } from "react";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
//Accessories
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
//Icons
import AddIcon from "@material-ui/icons/Add";

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	statusContainer: {
		height: 30,
		border: "1px solid transparent",
		borderRadius: 5,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
});

class HWStatusBar extends Component {
	state = {};
	render() {
		const { hwStatus, classes } = this.props;
		return (
			<Paper className={classes.root}>
				<Grid container alignItems="center" justify="center">
					{Object.keys(hwStatus).map((status, index) => (
						<Grid
							key={status}
							item
							xs={11}
							className={classes.statusContainer}
							style={{
								backgroundColor: hwStatus[status]
									? hwStatus[status].color
									: "inherit",
								margin: 3,
								marginTop: index === 0 ? 6 : 3,
							}}
						>
							<Typography>{status}</Typography>
						</Grid>
					))}
					<Grid item xs={11} align="center">
						<Chip
							key="add"
							label="Add"
							style={{ marginTop: 5, marginBottom: 8 }}
							onClick={this.props.add}
							avatar={
								<Avatar>
									<AddIcon />
								</Avatar>
							}
						/>
					</Grid>
				</Grid>
			</Paper>
		);
	}
}

function mapStateToProps({ hwStatus }) {
	return {
		hwStatus,
	};
}

export default compose(
	withStyles(styles),
	connect(mapStateToProps),
)(HWStatusBar);
