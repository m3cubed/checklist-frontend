import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { SHA256 } from "crypto-js";
//Accessories
import Grid from "@material-ui/core/Grid";

const clientID = process.env.REACT_APP_GOOGLE_CLIENT;
const APP_SECRET = process.env.REACT_APP_APP_SECRET;

const hash = str => {
	return SHA256(`${APP_SECRET}${str}${APP_SECRET}`).toString();
};

class AuthForm extends Component {
	static getDerivedStateFromProps(nextProps) {
		return {
			redirectToReferrer: nextProps.auth.loggedIn
		};
	}
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
			redirectToReferrer: this.props.auth.loggedIn,
			googleRegisterDialog: false
		};
		this.toggleGoogleRegisterDialog = this.toggleGoogleRegisterDialog.bind(
			this
		);
	}

	toggleGoogleRegisterDialog = () => {
		this.setState({
			googleRegisterDialog: !this.state.googleRegisterDialog
		});
	};

	shouldComponentUpdate(nextProps) {
		if (nextProps.auth.loggedIn !== this.props.auth.loggedIn) {
			return true;
		}
		return true;
	}

	responseGoogle = (type, cb) => response => {
		const { dispatch } = this.props;

		switch (type) {
			case "register": {
				const { email, familyName, givenName } = response.profileObj;
				this.props.auth.signup(
					email,
					hash(email),
					dispatch,
					cb,
					familyName,
					givenName,
					email === process.env.REACT_APP_ADMIN ? "admin" : "teacher"
				);
				break;
			}
			case "login": {
				const { email } = response.profileObj;
				this.props.auth.login(email, hash(email), dispatch, cb);

				break;
			}
			default:
				return null;
		}
	};

	render() {
		const { from } = this.props.location
			? this.props.location.state
			: { from: { pathname: "/" } };
		const { redirectToReferrer } = this.state;

		if (redirectToReferrer) {
			return <Redirect to={from} />;
		}

		return (
			<Grid
				container
				justify="center"
				alignItems="center"
				style={{ height: 600 }}
			>
				<Grid item xs={2} align="center">
					<GoogleLogin
						clientId={clientID}
						buttonText="Register with Google"
						onSuccess={this.responseGoogle("register", () =>
							this.props.history.push("/")
						)}
						uxMode="redirect"
						onFailure={this.responseGoogle()}
					/>
				</Grid>
				<Grid item xs={2} align="center">
					<GoogleLogin
						clientId={clientID}
						onSuccess={this.responseGoogle("login", () =>
							this.props.history.push("/")
						)}
						uxMode="redirect"
						onFailure={this.responseGoogle()}
					/>
				</Grid>
			</Grid>
		);
	}
}

export default connect()(withRouter(AuthForm));
