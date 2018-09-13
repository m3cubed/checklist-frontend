// App.js
import React, { Component } from "react";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import {
	HashRouter as Router,
	Route,
	Redirect,
	Switch,
} from "react-router-dom";
//Components
import CssBaseline from "@material-ui/core/CssBaseline";
import Dashboard from "./Dashboard";
import TemplateDashboard from "./Templates/TemplateDashboard";
import QuestionsDashboard from "./Questions/QuestionsDashboard";
import NavBar from "./NavBar";
import CourseDashbord from "./Courses/CourseDashboard";
import CourseTeacherView from "./Courses/Teachers/CourseTeacherView";
import AuthForm from "./Login/AuthForm";
import AnswersDashboard from "./Answers/AnswersDashboard";
import HWDashboard from "./HomeworkCheck/HWDashboard";
import HWCourseDashboard from "./HomeworkCheck/HWCourses/Course/HWCourseDashboard";
import LoadingScreen from "./LoadingScreen";

const styles = theme => ({
	root: {
		flexgrow: 1,
		zIndex: 1,
		overflow: "hidden",
		position: "relative",
		display: "flex",
	},
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing.unit * 3,
		minWidth: 0,
		overflow: "scroll",
		[theme.breakpoints.down("lg")]: {
			padding: 0,
		},
	},
	toolbar: theme.mixins.toolbar,
});

const AuthRoute = ({ component: Component, auth, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			auth.loggedIn ? (
				<Component {...props} />
			) : (
				<Redirect
					to={{
						pathname: "/login",
						state: { from: props.location },
					}}
				/>
			)
		}
	/>
);

const AuthTeacherRoute = ({
	component: Component,
	auth,
	authUser,
	...rest
}) => (
	<Route
		{...rest}
		render={props =>
			auth.loggedIn ? (
				authUser.status === "teacher" || authUser.status === "admin" ? (
					<Component {...props} />
				) : (
					<Redirect to="/" />
				)
			) : (
				<Redirect
					to={{
						pathname: "/login",
						state: { from: props.location },
					}}
				/>
			)
		}
	/>
);

class App extends Component {
	static getDerivedStateFromProps(nextProps) {
		if (nextProps.authUser === false) {
			return {
				authUserID: "",
			};
		}
		return {
			authUserID: nextProps.authUser.id,
		};
	}

	shouldComponentUpdate(nextProps) {
		if (nextProps.auth.loggedIn !== this.props.auth.loggedIn) {
			return true;
		}
		return true;
	}

	constructor(props) {
		super(props);
		this.state = { width: 0, height: 0 };
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
	}

	componentDidMount() {
		this.updateWindowDimensions();
		window.addEventListener("resize", this.updateWindowDimensions);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateWindowDimensions);
	}

	updateWindowDimensions() {
		this.setState({ width: window.innerWidth, height: window.innerHeight });
	}

	render() {
		const { auth, classes, loading } = this.props;

		return (
			<Router>
				<div
					className={classes.root}
					style={{ width: this.state.width, height: this.state.height }}
				>
					<CssBaseline>
						<NavBar auth={auth} />
						<main className={classes.content}>
							<div className={classes.toolbar} />
							<Switch>
								{loading === true ? (
									<LoadingScreen />
								) : (
									<React.Fragment>
										<AuthRoute
											auth={auth}
											path="/"
											exact
											component={Dashboard}
										/>
										<Route
											path="/login"
											render={() => <AuthForm auth={auth} />}
										/>

										<AuthTeacherRoute
											auth={auth}
											authUser={this.props.authUser}
											path="/mytemplates/:selection"
											component={TemplateDashboard}
										/>
										<AuthTeacherRoute
											auth={auth}
											authUser={this.props.authUser}
											path="/template/:id"
											component={QuestionsDashboard}
										/>
										<AuthRoute
											auth={auth}
											path="/myclasses"
											component={CourseDashbord}
										/>

										<AuthTeacherRoute
											auth={auth}
											authUser={this.props.authUser}
											path="/class/:id"
											component={CourseTeacherView}
										/>

										<AuthTeacherRoute
											auth={auth}
											authUser={this.props.authUser}
											path="/homework_check/:selection"
											component={HWDashboard}
										/>

										<AuthTeacherRoute
											auth={auth}
											authUser={this.props.authUser}
											path="/hw_check/class/:id"
											component={HWCourseDashboard}
										/>

										<AuthRoute
											auth={auth}
											path="/poll/:id"
											component={AnswersDashboard}
										/>
									</React.Fragment>
								)}
							</Switch>
						</main>
					</CssBaseline>
				</div>
			</Router>
		);
	}
}

function mapStateToProps({ authUser, loading }) {
	return {
		authUser,
		loading,
	};
}

export default compose(
	withStyles(styles),
	connect(mapStateToProps),
)(App);
