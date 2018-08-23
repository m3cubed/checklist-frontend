import React, { Component } from "react";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
//Accessories
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
	paper: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
			.spacing.unit * 3}px `
	},
	form: {
		width: "100%",
		marginTop: theme.spacing.unit
	},
	submit: {
		marginTop: theme.spacing.unit * 3
	}
});

class StandardLoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showRegister: false,
			send: { email: "", password: "", userFirstName: "", userLastName: "" }
		};

		this.toggleRegister = this.toggleRegister.bind(this);
	}

	toggleRegister = () => {
		this.setState({
			showRegister: !this.state.showRegister
		});
	};

	render() {
		const { classes } = this.props;
		return (
			<Grid item container xs={8} justify="center" alignItems="center">
				<Paper className={classes.paper}>
					<form className={classes.form}>
						<FormControl required fullWidth>
							<InputLabel htmlFor="email" name="email" autoComplete="email">
								Email
							</InputLabel>
							<Input id="email" />
						</FormControl>
						<FormControl required fullWidth>
							<InputLabel htmlFor="password">Password</InputLabel>
							<Input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
							/>
						</FormControl>
						{this.state.showRegister ? (
							<Grid container spacing={16}>
								<Grid item xs={6}>
									<FormControl required fullWidth>
										<InputLabel htmlFor="userFirstName" name="userFirstName">
											First Name
										</InputLabel>
										<Input id="userFirstName" />
									</FormControl>
								</Grid>
								<Grid item xs={6}>
									<FormControl required fullWidth>
										<InputLabel
											htmlFor="userLastName"
											name="userLastName"
											autoComplete="userLastName"
										>
											Last Name
										</InputLabel>
										<Input id="userLastName" />
									</FormControl>
								</Grid>
							</Grid>
						) : null}
						<Grid container spacing={16}>
							<Grid item xs={6}>
								<Button
									fullWidth
									variant="raised"
									color="secondary"
									className={classes.submit}
									onClick={this.toggleRegister}
								>
									{this.state.showRegister ? "Login Instead" : "Register"}
								</Button>
							</Grid>
							<Grid item xs={6}>
								<Button
									type="submit"
									fullWidth
									variant="raised"
									color="primary"
									className={classes.submit}
								>
									{this.state.showRegister ? "Submit Info" : "Login"}
								</Button>
							</Grid>
						</Grid>
					</form>
				</Paper>
			</Grid>
		);
	}
}

export default compose(
	withStyles(styles),
	connect()
)(StandardLoginForm);
