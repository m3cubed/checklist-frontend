import React from "react";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { ItemTypes } from "./ItemTypes";
import { DragSource } from "react-dnd";
//Accessories
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
//Icons
import PersonIcon from "@material-ui/icons/Person";
import { updateStudentStatus } from "../../../../../actions/HomeworkCheck/studentHWStatus";

const height = 100;
const width = 80;

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		connectDragPreview: connect.dragPreview(),
		isDragging: monitor.isDragging()
	};
}

const gridSource = {
	beginDrag(props) {
		const { left, id, top, location } = props;
		return { left, id, top, height, width, location };
	}
};

const styles = theme => ({
	grabDiv: {
		height: 10,
		width: "70%",
		backgroundColor: "#eeeeee",
		margin: "auto",
		marginBottom: 5,
		"&:hover": {
			cursor: "grab",
			"&:active": {
				cursor: "grabbing"
			}
		}
	}
});

const SeatingViewStudentCard = props => {
	const {
		classes,
		status,
		color,
		homework,
		connectDragSource,
		connectDragPreview,
		isDragging,
		id,
		top,
		left,
		firstName,
		lastName,
		gender,
		location
	} = props;

	function handleCardClick() {
		if (props.homework !== "") {
			let newStatus;
			switch (status) {
				case "Complete": {
					newStatus = "Incomplete";
					break;
				}
				case "Incomplete": {
					newStatus = "";
					break;
				}
				default:
					newStatus = "Complete";
			}
			console.log(newStatus);
			props.dispatch(updateStudentStatus(homework, id, newStatus));
		}
	}

	return connectDragPreview(
		<div
			style={{
				position: location == "container" ? "absolute" : null,
				height,
				width,
				top: location === "container" ? top : null,
				left: location === "container" ? left : null
			}}
		>
			<Paper
				style={{ height, width, backgroundColor: color }}
				onClick={handleCardClick}
			>
				{connectDragSource(<div className={props.classes.grabDiv} />)}

				<Grid container spacing={0} justify="center" alignItems="center">
					<Grid item xs={12} align="center">
						<Typography variant="display1">
							<PersonIcon fontSize="inherit" />
						</Typography>
					</Grid>

					<Grid item align="center" xs={12}>
						<Typography>{firstName}</Typography>
					</Grid>

					<Grid item xs={12}>
						<Typography align="center">{lastName}</Typography>
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
};

function mapStateToProps({ hwStatus, studentHWStatus, hwCheckCourse }, { id }) {
	const data = studentHWStatus[hwCheckCourse.seatingHomework];
	if (data) {
		const status = data[id];

		const color = status ? hwStatus[status].color : null;
		return {
			status: status || null,
			color,
			homework: hwCheckCourse.seatingHomework
		};
	} else {
		return {
			status: null,
			color: null,
			homework: hwCheckCourse.seatingHomework
		};
	}
}

export default compose(
	withStyles(styles),
	connect(mapStateToProps),
	DragSource(ItemTypes.STUDENT_CARDS, gridSource, collect)
)(SeatingViewStudentCard);
