import { CONNECTION } from "../../config/config";
import { handleChangeUser } from "../../actions/authUser";

class Auth {
	loggedIn = false;

	authenticate = (info, type, dispatch, cb) => {
		fetch(`${CONNECTION}/user/${type}`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ ...info })
		})
			.then(res => res.json())
			.then(json => {
				if (json.type === "error") {
					alert(json.msg);
				} else {
					this.loggedIn = true;
					new Promise((res, rej) => {
						dispatch(handleChangeUser(json.user, res, rej));
					}).then(() => cb());
				}
			});
	};

	signup = (
		email,
		password,
		dispatch,
		cb,
		userFirstName,
		userLastName,
		status
	) => {
		this.authenticate(
			{
				email,
				password,
				userFirstName,
				userLastName,
				status
			},
			"new",
			dispatch,
			cb
		);
	};

	login = (email, password, dispatch, cb) => {
		this.authenticate(
			{
				email,
				password
			},
			"login",
			dispatch,
			cb
		);
	};

	logout = () => {
		fetch(`${CONNECTION}/user/logout`, {
			credentials: "include"
		})
			.then(response => response.json())
			.then(() => {
				this.loggedIn = false;
			});
	};

	checkAuthentication = dispatch => {
		return new Promise((resolve, reject) => {
			fetch(`${CONNECTION}/user/authenticated`, {
				credentials: "include"
			})
				.then(response => response.json())
				.then(json => {
					if (json.authenticated) {
						this.loggedIn = true;
						new Promise((res, rej) => {
							dispatch(handleChangeUser(json.user, res, rej));
						}).then(() => resolve());
					} else {
						resolve();
					}
				});
		});
	};
}

export default Auth;
