import React, { Component } from "react";
//Accessories
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

class GoogleRegisterDialog extends Component {
	state = { open: this.props.open };
	render() {
		return (
			<Dialog open={this.state.open}>
				<form>
					<DialogTitle>Confirm Your Information</DialogTitle>
					<DialogContent>
						<Grid container>
							<TextField
								id="givenName"
								label="Given Name"
								value={this.state.givenName}
								onChange={this.handleChange}
								fullWidth
							/>
							<TextField
								id="familyName"
								label="Family Name"
								value={this.state.familyName}
								onChange={this.handleChange}
								fullWidth
							/>
						</Grid>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.props.toggle}>Cancel</Button>
						<Button color="primary">Register!</Button>
					</DialogActions>
				</form>
			</Dialog>
		);
	}
}

export default GoogleRegisterDialog;
