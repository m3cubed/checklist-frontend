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
	savePositions,
} from "../../../../../actions/HomeworkCheck/seatingPositions";
import ListStatusMenu from "../Menus/ListStatusMenu";
import {
	updateStudentStatus,
	saveAllStatus,
} from "../../../../../actions/HomeworkCheck/studentHWStatus";

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
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
				location: "container",
			});
		} else if (item.location === "container") {
			component.moveGrids({
				...item,
				left: Math.floor(hMove / 5) * 5,
				top: Math.floor(vMove / 5) * 5,
			});
		}
	},
};

const debouncePosition = debounce(
	(courseID, dispatch) => dispatch(savePositions(courseID)),
	1500,
);

const debounceStatus = debounce((courseID, dispatch) =>
	dispatch(saveAllStatus(courseID), 1500),
);

class SeatingViewContainer extends Component {
	componentDidUpdate(prevProps) {
		const {
			seatingPositions,
			studentHWStatus,
			courseID,
			dispatch,
		} = this.props;
		if (prevProps.seatingPositions !== seatingPositions) {
			debouncePosition(courseID, dispatch);
		}
		if (prevProps.studentHWStatus !== studentHWStatus) {
			debounce(courseID, dispatch);
		}
	}

	componentWillUnmount() {
		this.props.dispatch(saveAllStatus(this.props.courseID));
	}

	constructor(props) {
		super(props);
		this.state = {
			openStatusMenu: false,
			statusAnchorEl: null,
			target: null,
		};

		this.changeStudentStatus = this.changeStudentStatus.bind(this);
	}

	moveGrids(newPosition) {
		this.props.dispatch(updatePosition(newPosition));
	}

	toggleStatusMenu = (homework, student) => e => {
		e.preventDefault();
		if (homework !== "") {
			this.setState({
				openStatusMenu: !this.state.openStatusMenu,
				statusAnchorEl:
					this.state.statusAnchorEl === null ? e.currentTarget : null,
				target: [homework, student] || null,
			});
		}
	};

	changeStudentStatus(status) {
		this.props.dispatch(
			updateStudentStatus(this.state.target[0], this.state.target[1], status),
		);
		this.setState({
			openStatusMenu: !this.state.openStatusMenu,
			statusAnchorEl: null,
			target: null,
		});
	}

	render() {
		const {
			connectDropTarget,
			students,
			seatingPositions,
			maxWidth,
			homeworkID,
		} = this.props;
		return (
			<React.Fragment>
				<ListStatusMenu
					open={this.state.openStatusMenu}
					toggle={this.toggleStatusMenu}
					anchorEl={this.state.statusAnchorEl}
					change={this.changeStudentStatus}
				/>
				{connectDropTarget(
					<div style={{ width: maxWidth }}>
						<div
							style={{
								height: 500,
								border: "3px solid #8D6E63",
								position: "relative",
								backgroundColor: "#D7CCC8",
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
													onContextMenu={this.toggleStatusMenu(
														homeworkID,
														student,
													)}
												/>
											);
										}
								  })
								: null}
						</div>
						<SeatingViewStudentHanger />
					</div>,
				)}
			</React.Fragment>
		);
	}
}

function mapStateToProps({
	hwStudents,
	seatingPositions,
	page_hwCheckCourse,
	studentHWStatus,
}) {
	return {
		studentHWStatus,
		hwStudents,
		seatingPositions,
		homeworkID: page_hwCheckCourse.seatingHomework,
	};
}

export default compose(
	withStyles(styles),
	connect(mapStateToProps),
	DropTarget(ItemTypes.STUDENT_CARDS, gridTarget, connect => ({
		connectDropTarget: connect.dropTarget(),
	})),
)(SeatingViewContainer);
