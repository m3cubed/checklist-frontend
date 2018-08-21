import React, { Component } from "react";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
//Accessories
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
//Redux
import {
	handleFormatQuestion,
	handleDeleteQuestion
} from "../../actions/questions";
//Components
import RatingScale from "./QuestionTypes/RatingScale";
import MultipleChoice from "./QuestionTypes/MultipleChoice";
import QuestionsContainer from "./QuestionsContainer";
import AnswerPicker from "../Answers/Type/AnswerPicker";

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	paper: {
		padding: theme.spacing.unit * 1,
		textAlign: "center",
		color: theme.palette.text.secondary
	},
	container: {
		paddingBottom: theme.spacing.unit * 2
	}
});

class QuestionFormat extends Component {
	constructor(props) {
		super(props);
		this.state = this.props.questions[this.props.questionID].format;
		this.typeChange = this.typeChange.bind(this);
	}

	componentDidMount() {
		this.props.onRef(this);
	}

	questionFormatDispatch = () => {
		this.props.dispatch(
			handleFormatQuestion(
				this.props.questions[this.props.questionID],
				this.state
			)
		);
	};

	handleDetails = details => {
		this.setState({
			details: { ...details }
		});
	};

	inputType = () => {
		switch (this.state.type) {
			case "rating": {
				return (
					<RatingScale
						className="question-type-container"
						handleDetails={this.handleDetails}
						details={this.state.details}
					/>
				);
			}
			case "multiple-choice": {
				return (
					<MultipleChoice
						className="question-type-container"
						handleDetails={this.handleDetails}
						details={this.state.details}
					/>
				);
			}
			default:
				return null;
		}
	};

	typeChange = type => {
		this.setState({ type });
	};

	render() {
		const { classes, dispatch, questionID, templateID } = this.props;
		return (
			<div>
				<Grid container spacing={16}>
					<Grid item xs={12}>
						<Paper className={classes.paper}>
							<Grid container spacing={0}>
								<Grid item xs={12}>
									<Button
										onClick={() =>
											dispatch(handleDeleteQuestion(questionID, templateID))
										}
									>
										<DeleteIcon />
									</Button>
								</Grid>
								<Grid item className={classes.container} xs={12}>
									<QuestionsContainer
										type={this.state.type}
										typeChange={this.typeChange}
									/>
								</Grid>
								<Grid item className={classes.container} xs={12}>
									{this.inputType()}
								</Grid>
								<Grid item className={classes.container} xs={12}>
									<hr />
									<Typography variant="headline">Preview</Typography>
									<AnswerPicker
										type={this.state.type}
										details={this.state.details}
									/>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
				</Grid>
			</div>
		);
	}
}

function mapStateToProps({ questions }) {
	return { questions };
}

export default compose(
	withStyles(styles),
	connect(mapStateToProps)
)(QuestionFormat);
