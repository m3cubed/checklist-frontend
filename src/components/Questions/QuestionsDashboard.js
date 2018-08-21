import React, { Component, Fragment } from "react";
import { CONNECTION } from "../../config/config";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
//Accessories
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
//Redux
import { loadDefaultQuestions } from "../../actions/questions";
//Components
import QuestionsAdd from "./QuestionsAdd";
import QuestionsFormat from "./QuestionsFormat";
import AnswersContainer from "../Answers/AnswersContainer";
import { mapQuestionsToEdits } from "../../actions/questionEdits";
import AnswerPicker from "../Answers/Type/AnswerPicker";

const styles = theme => ({
	root: {
		flexGrowth: 1
	},
	itemCenter: {
		flexGrowth: 1,
		justify: "center"
	},
	paper: {
		padding: theme.spacing.unit * 2,
		textAlign: "center",
		color: theme.palette.text.secondary
	}
});

class QuestionDashboard extends Component {
	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			questionsNUM: Object.keys(nextProps.questions).length
		};
	}

	state = {
		questionsNUM: 0
	};

	render() {
		const { templateTitle, id } = this.props.template;
		const { classes, questions, questionEdits } = this.props;

		return (
			<div className={classes.root}>
				<Typography variant="headline">{templateTitle}</Typography>
				<Grid container spacing={40} justify="center">
					<Grid item xs={6}>
						<Paper className={classes.paper}>
							<Grid container spacing={16}>
								{Object.keys(questions).map((item, index) => (
									<Grid
										item
										xs={12}
										key={item}
										// onClick={() => {
										// 	dispatch(toggleEdit(item));
										// }}
									>
										{questionEdits[item] === true ? (
											<AnswersContainer title={questions[item].questionTitle}>
												<AnswerPicker
													type={questions[item].format.type}
													details={questions[item].format.details}
												/>
											</AnswersContainer>
										) : (
											<Fragment>
												<QuestionsFormat
													className="questions-format-container"
													templateID={id}
													questionID={item}
													type={questions[item].format.type}
													onRef={ref => {
														const thisChild = `child${index}`;

														return (this[thisChild] = ref);
													}}
												/>
											</Fragment>
										)}
									</Grid>
								))}
							</Grid>

							<Grid item xs={12}>
								<Paper className={classes.paper}>
									<QuestionsAdd
										className="questions-add-btn"
										templateID={id}
									/>
								</Paper>
							</Grid>
						</Paper>
					</Grid>
				</Grid>

				<br />
				<Button
					className="questions-dashboard-save-btn"
					onClick={() => {
						for (let i = 0; i < this.state.questionsNUM; i++) {
							const thisChild = `child${i}`;
							this[thisChild].questionFormatDispatch();
						}
					}}
				>
					Save
				</Button>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch, { match }) {
	fetch(`${CONNECTION}/questions/retrieve_questions`, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ templateID: match.params.id })
	})
		.then(res => res.json())
		.then(json => {
			if (json.completed === true) {
				dispatch(loadDefaultQuestions(json.questions));
				dispatch(
					mapQuestionsToEdits(
						Object.keys(json.questions).reduce((acc, cv) => {
							acc[cv] = false;
							return acc;
						}, {})
					)
				);
			}
		});
	return { dispatch };
}

function mapStateToProps({ templates, questions, questionEdits }, { match }) {
	const { id } = match.params;
	const template = templates[id];
	if (!template)
		return {
			template: {},
			questions: {},
			questionEdits
		};

	return { template, questions, questionEdits };
}

export default compose(
	withStyles(styles),
	connect(
		mapStateToProps,
		mapDispatchToProps
	)
)(QuestionDashboard);
