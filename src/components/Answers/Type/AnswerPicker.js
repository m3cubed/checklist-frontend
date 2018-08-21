import React from "react";
import { connect } from "react-redux";
//Components
import AnswerRatingScale from "./AnswerRatingScale";
import AnswerMultipleChoice from "./AnswerMultipleChoice";

const AnswerPicker = props => {
	const { type, details } = props;

	switch (type) {
		case "rating": {
			return <AnswerRatingScale {...props} details={details} />;
		}
		case "multiple-choice": {
			return <AnswerMultipleChoice {...props} details={details} />;
		}
		default:
			return null;
	}
};

export default connect()(AnswerPicker);
