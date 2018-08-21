import React, { Component } from "react";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
//Accessories
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
//Redux
import {
	handleRetrieveQuestions,
	retrieveQuestions
} from "../../actions/pollsQuestions";
import { handleRetrieveUserPollResponse } from "../../actions/pollResponse";
import {
	handleCreateResponses,
	handleRetrieveResponses,
	handleSubmitResponses
} from "../../actions/responses";
//Components
import AnswersContainer from "./AnswersContainer";
import AnswerPicker from "./Type/AnswerPicker";

const styles = theme => ({
	root: {
		flexGrowth: 1,
		marginTop: 50
	},
	paper: {
		padding: theme.spacing.unit * 2,
		textAlign: "center",
		color: theme.palette.text.secondary
	}
});

class AnswersDashboard extends Component {
	state = {};

	componentDidMount() {
		this.props.dispatch(handleRetrieveQuestions(this.props.pollID));
		this.props.dispatch(
			handleRetrieveUserPollResponse(this.props.pollResponseID)
		);
	}

	componentWillUnmount() {
		this.props.dispatch(retrieveQuestions({}));
	}

	handleSubmit = () => {
		const { dispatch, pollsQuestions, responses } = this.props;
		for (let i = 0; i < pollsQuestions.required.length; i++) {
			if (Object.keys(responses[pollsQuestions.required[i]]).length === 0) {
				alert(
					`Question ${
						pollsQuestions.order[pollsQuestions.required[i]]
					} is required!`
				);
			} else {
				dispatch(handleSubmitResponses());
			}
		}
	};

	render() {
		const { classes, pollResponseID, responses } = this.props;
		const { questions } = this.props.pollsQuestions;

		if (pollResponseID === null) return <Redirect to="/" />;

		if (questions && responses !== null) {
			return (
				<div className={classes.root}>
					<Grid container spacing={40} justify="center">
						<Grid item xs={12} sm={10} md={8} lg={6}>
							<Grid container spacing={16}>
								{Object.keys(questions).map((key, index) => (
									<Grid item xs={12} key={questions[key].id}>
										<AnswersContainer
											title={questions[key].questionTitle}
											index={index}
											required={questions[key].required}
										>
											<AnswerPicker
												type={questions[key].format.type}
												details={questions[key].format.details}
												response={responses[questions[key].id]}
											/>
										</AnswersContainer>
									</Grid>
								))}
							</Grid>
						</Grid>
						<Grid item xs={12} align="center">
							<Button
								variant="contained"
								color="primary"
								size="large"
								onClick={this.handleSubmit}
							>
								Submit
							</Button>
						</Grid>
					</Grid>
				</div>
			);
		} else {
			return null;
		}
	}
}

function mapStateToProps({ responses, pollsQuestions, authUser }, { match }) {
	const { id } = match.params;

	return {
		authUser,
		pollsQuestions,
		pollResponseID: authUser.todoPolls[id] ? authUser.todoPolls[id] : null,
		pollID: id,
		responses
	};
}

function mapDispatchToProps(dispatch) {
	return { dispatch };
}

function mergeProps(state, { dispatch }, props) {
	if (state.pollsQuestions.order && state.responses === null) {
		const questionIDs = Object.keys(state.pollsQuestions.order);

		new Promise((resolve, reject) => {
			dispatch(handleRetrieveResponses(state.pollResponseID, resolve, reject));
		}).catch(err => {
			new Promise((resolve, reject) => {
				dispatch(
					handleCreateResponses(
						questionIDs,
						state.pollResponseID,
						resolve,
						reject
					)
				);
			});
		});
	}
	return {
		...state,
		dispatch,
		...props
	};
}
export default compose(
	withStyles(styles),
	connect(
		mapStateToProps,
		mapDispatchToProps,
		mergeProps
	)
)(AnswersDashboard);
