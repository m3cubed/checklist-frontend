import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";

import { handleAddQuestion } from "../../actions/questions";

class QuestionsAdd extends Component {
	render() {
		const { dispatch, templateID } = this.props;
		return (
			<div>
				<Button
					className="question-add-btn"
					onClick={() => {
						const question = {
							questionTitle: "",
							templateID: templateID
						};

						dispatch(handleAddQuestion(question));
					}}
				>
					Add a new question
				</Button>
			</div>
		);
	}
}

export default connect()(QuestionsAdd);
