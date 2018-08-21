import React, { Component } from "react";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
	root: {
		flexGrow: 1
	}
});

class HWLandingPage extends Component {
	state = {};
	render() {
		return <div>Landing</div>;
	}
}

export default compose(
	withStyles(styles),
	connect()
)(HWLandingPage);
