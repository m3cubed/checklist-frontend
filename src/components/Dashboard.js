import React, { Component } from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";

class Dashboard extends Component {
	render() {
		return (
			<div>
				<Typography variant="display2">Home</Typography>
			</div>
		);
	}
}

export default connect()(Dashboard);
