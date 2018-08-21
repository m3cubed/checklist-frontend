import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

const LoadingScreen = props => {
	return (
		<Grid
			container
			justify="center"
			alignItems="center"
			style={{ flexGrow: 1, height: "100%" }}
		>
			<Grid item xs={12} align="center">
				<CircularProgress
					style={{ display: "flex", alignItems: "center" }}
					size={100}
				/>
			</Grid>
		</Grid>
	);
};

export default LoadingScreen;
