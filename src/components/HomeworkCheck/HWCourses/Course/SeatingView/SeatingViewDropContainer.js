import React, { Component } from "react";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { ItemTypes } from "./ItemTypes";
import { DropTarget } from "react-dnd";
import debounce from "lodash/debounce";
import update from "immutability-helper";
//Accessories
import Paper from "@material-ui/core/Paper";
//Components
import SeatingViewStudentCard from "./SeatingViewStudentCard";
import SeatingViewStudentHanger from "./SeatingViewStudentHanger";
import {
	updatePosition,
	savePositions
} from "../../../../../actions/HomeworkCheck/seatingPositions";

const styles = theme => ({
	root: {
		flexGrow: 1
	}
});

const gridTarget = {
	drop(props, monitor, component) {
		const item = monitor.getItem();
		const { maxWidth } = props;
		const delta = monitor.getDifferenceFromInitialOffset();
		const left = Math.round(item.left + delta.x);
		const top = Math.round(item.top + delta.y);
		let hMove, vMove;

		//Does the object move past the right most side?
		hMove = item.width + left > maxWidth ? maxWidth - item.width : left;
		//Does the object move past the left most side?
		left <= 0 ? (hMove = 0) : null;

		//Does the object move past the bottom most side?
		vMove = item.height + top > 500 ? 400 : top;
		//Does the object move past the top most side?
		top <= 0 ? (vMove = 0) : null;
		if (item.location === "hanger" && delta.y < -60) {
			component.moveGrids({
				...item,
				left: hMove,
				top: vMove,
				location: "container"
			});
		} else if (item.location === "container") {
			component.moveGrids({
				...item,
				left: Math.floor(hMove / 5) * 5,
				top: Math.floor(vMove / 5) * 5
			});
		}
	}
};

class SeatingViewContainer extends Component {
	state = {};

	moveGrids(newPosition) {
		this.props.dispatch(updatePosition(newPosition));
	}

	componentDidUpdate(prevProps) {
		if (prevProps.seatingPositions !== this.props.seatingPositions) {
			debounce(
				() => this.props.dispatch(savePositions(this.props.courseID)),
				1500
			);
		}
	}

	render() {
		const {
			connectDropTarget,
			students,
			seatingPositions,
			maxWidth
		} = this.props;
		return connectDropTarget(
			<div style={{ width: maxWidth }}>
				<div
					style={{
						height: 500,
						border: "3px solid #8D6E63",
						position: "relative",
						backgroundColor: "#D7CCC8"
					}}
				>
					{Object.keys(seatingPositions).length > 0
						? Object.keys(seatingPositions).map(student => {
								if (students[student]) {
									const { firstName, lastName, gender } = students[student];
									return (
										<SeatingViewStudentCard
											key={student}
											{...seatingPositions[student]}
											id={student}
											firstName={firstName}
											lastName={lastName}
											gender={gender}
											location="container"
										/>
									);
								}
						  })
						: null}
				</div>
				<SeatingViewStudentHanger />
			</div>
		);
	}
}

function mapStateToProps({ hwStudents, seatingPositions }) {
	return {
		hwStudents,
		seatingPositions
	};
}

export default compose(
	withStyles(styles),
	connect(mapStateToProps),
	DropTarget(ItemTypes.STUDENT_CARDS, gridTarget, connect => ({
		connectDropTarget: connect.dropTarget()
	}))
)(SeatingViewContainer);
