import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
//Accessories
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
//Icons
import PersonIcon from "@material-ui/icons/Person";
import MenuIcon from "@material-ui/icons/Menu";
//Redux
import { loadDefaults } from "../api";
import BaseSideDrawer from "./BaseSideDrawer";
//Components

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	flex: {
		flexGrow: 1
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20
	},
	navIconHide: {
		[theme.breakpoints.up("lg")]: {
			display: "none"
		}
	},
	appBar: {
		position: "absolute",
		marginLeft: 256
	}
});

class NavBar extends Component {
	static getDerivedStateFromProps(nextProps) {
		if (nextProps.authUser === false) {
			return { authUserID: "" };
		}
		switch (nextProps.authUser.username_hash) {
			case "afc6f36f653ebe2002e27f2b45856411a5a8c65a43e432ec46678a7295343aaa":
				return { authUserID: "teacher1" };
			case "7fff2555d3d6513b542045de2a8600000e5568d15b355508a9a649c7043935ea":
				return { authUserID: "student1" };
			case "e29e3684c6c787ad00c908ceb32218fc4a0724727571678eb265391b75fc4cae":
				return { authUserID: "student2" };
			case "9bd1a9785c4d7649fbd9560d9eb31475c01a08d2f9bf9319aa3006b5ccb6800f":
				return { authUserID: "student3" };
			default:
				return { authUserID: "" };
		}
	}
	constructor(props) {
		super(props);
		this.state = {
			authUserID: "",
			drawerOpen: false
		};
		this.toggleDrawer = this.toggleDrawer.bind(this);
		this.authTarget = this.authTarget.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
	}

	componentDidMount() {
		const { dispatch } = this.props;
		loadDefaults(dispatch);
	}

	toggleDrawer() {
		this.setState({
			drawerOpen: !this.state.drawerOpen
		});
	}

	nameDisplay(hash) {
		switch (hash) {
			case "07ca57c3053e52564226f58e31a135b2025ce665d8e9ea3589fe070d4d1dc654":
				return "teacher1@gmail.com";
			case "7b56972e49d2ed53c5302ed430cd9d9cbabdaebca5ab4f0795cfe6fa6d6c286d":
				return "student1@gmail.com";
			case "8f9a3412dbdac5a86c71f3d76ba690c853c93933625ab57138e1925bc0785c7a":
				return "student2@gmail.com";
			case "f19169de22691162b129b9faea6ffe2015379e5059ffbd084d2c24d0e292fb13":
				return "student3@gmail.com";
			default:
				return null;
		}
	}

	authTarget = e => {
		if (e.target.value === "") {
			this.props.auth.logout();
		} else {
			this.props.auth.login(e.target.value, "a", this.props.dispatch);
		}
	};

	handleLogout = (cb, dispatch) => () => {
		this.props.auth.logout(cb, dispatch);
	};

	render() {
		const { classes, auth, authUser, users, navbar, dispatch } = this.props;

		return (
			<Fragment>
				<AppBar className={classes.appBar}>
					<ToolBar>
						<IconButton
							color="inherit"
							aria-label="Open Drawer"
							onClick={() => {
								this.toggleDrawer();
							}}
							className={classes.navIconHide}
						>
							<MenuIcon />
						</IconButton>

						<Typography variant="title" className={classes.flex}>
							{navbar.title ? navbar.title.value : "Folio"}
						</Typography>

						{auth.loggedIn ? (
							<Fragment>
								{authUser.status === "admin" ? (
									<Fragment>
										<Select
											value={this.state.authUserID}
											onChange={this.authTarget}
											inputProps={{
												name: "user",
												id: "user"
											}}
										>
											<MenuItem value="">
												<em>None</em>
											</MenuItem>
											{Object.keys(users).map(user => (
												<MenuItem
													key={user}
													value={this.nameDisplay(users[user].email_hash)}
												>
													{this.nameDisplay(users[user].email_hash)}
												</MenuItem>
											))}
										</Select>
										<NavLink to="/mytemplates/home">
											<Button>My Templates</Button>
										</NavLink>
										<NavLink to="/myclasses">
											<Button>My Classes</Button>
										</NavLink>
									</Fragment>
								) : null}
								{authUser.status === "teacher" ||
								authUser.status === "admin" ? (
									<Fragment>
										<Button
											color="secondary"
											variant="contained"
											onClick={this.handleLogout(
												() => this.props.history.push("/"),
												dispatch
											)}
										>
											Logout
										</Button>
										<NavLink to="/homework_check/home">
											<Button>HW Check</Button>
										</NavLink>
									</Fragment>
								) : null}
							</Fragment>
						) : null}
					</ToolBar>
				</AppBar>
				<BaseSideDrawer
					open={this.state.drawerOpen}
					toggle={this.toggleDrawer}
				/>
			</Fragment>
		);
	}
}

function mapStateToProps({ authUser, users, navbar }) {
	return { authUser, users, navbar };
}

export default compose(
	withStyles(styles),
	connect(mapStateToProps)
)(withRouter(NavBar));
