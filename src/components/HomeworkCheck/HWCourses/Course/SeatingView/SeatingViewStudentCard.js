import React, { PureComponent } from "react";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { ItemTypes } from "./ItemTypes";
import { DragSource } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import throttle from "react-throttle-render";
//Accessories
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
//Icons
import PersonIcon from "@material-ui/icons/Person";
//Redux
import { updateStudentStatus } from "../../../../../actions/HomeworkCheck/studentHWStatus";

const height = 100;
const width = height * 0.8;

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		connectDragPreview: connect.dragPreview(),
		isDragging: monitor.isDragging(),
	};
}

const gridSource = {
	beginDrag(props) {
		const { left, id, top, location } = props;
		return { left, id, top, height, width, location };
	},
};

const styles = theme => ({
	grabDiv: {
		height: 10,
		width: "100%",
		backgroundColor: "#eeeeee",
		margin: "auto",
		marginBottom: 5,
		"&:hover": {
			cursor: "grab",
			"&:active": {
				cursor: "grabbing",
			},
		},
		borderTopLeftRadius: 4,
		borderTopRightRadius: 4,
	},
});

class SeatingViewStudentCard extends PureComponent {
	componentDidMount() {
		const { connectDragPreview } = this.props;
		if (connectDragPreview) {
			// Use empty image as a drag preview so browsers don't draw it
			// and we can draw whatever we want on the custom drag layer instead.
			connectDragPreview(getEmptyImage(), {
				// IE fallback: specify that we'd rather screenshot the node
				// when it already knows it's being dragged so we can hide it with CSS.
				captureDraggingState: true,
			});
		}
	}

	handleCardClick() {
		const { homework, id, status, dispatch } = this.props;
		if (homework !== "") {
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
			dispatch(updateStudentStatus(homework, id, newStatus));
		}
	}

	render() {
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
			location,
		} = this.props;

		return (
			<div
				style={{
					position: location == "container" ? "absolute" : null,
					height,
					width,
					top: location === "container" ? top : null,
					left: location === "container" ? left : null,
				}}
			>
				<Paper
					style={{ height, width, backgroundColor: color }}
					onClick={this.handleCardClick.bind(this)}
					onContextMenu={this.props.onContextMenu}
				>
					{connectDragSource(<div className={classes.grabDiv} />)}

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
	}
}

function mapStateToProps(
	{ hwStatus, studentHWStatus, page_hwCheckCourse },
	{ id },
) {
	const data = studentHWStatus[page_hwCheckCourse.seatingHomework];
	if (data) {
		const status = data[id];

		const color = status ? hwStatus[status].color : null;
		return {
			status: status || null,
			color,
			homework: page_hwCheckCourse.seatingHomework,
		};
	} else {
		return {
			status: null,
			color: null,
			homework: page_hwCheckCourse.seatingHomework,
		};
	}
}

export default compose(
	withStyles(styles),
	connect(mapStateToProps),
	DragSource(ItemTypes.STUDENT_CARDS, gridSource, collect),
)(SeatingViewStudentCard);
