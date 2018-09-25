import React, { PureComponent } from "react";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { DragLayer } from "react-dnd";
import throttle from "react-throttle-render";
//Accessories
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
//Icons
import PersonIcon from "@material-ui/icons/Person";

const height = 100;
const width = height * 0.8;

// function snapToGrid(x, y) {
// 	const snappedX = Math.round(x / 5) * 5;
// 	const snappedY = Math.round(y / 5) * 5;
// 	return [snappedX, snappedY];
// }

function getItemStyles(props) {
	const { initialOffset, currentOffset } = props;
	if (!initialOffset || !currentOffset) {
		return {
			display: "none",
		};
	}

	let { x, y } = currentOffset;

	// x -= initialOffset.x;
	// y -= initialOffset.y;
	// [x, y] = snapToGrid(x, y);
	// x += initialOffset.x;
	// y += initialOffset.y;

	const transform = `translate(${x}px, ${y}px)`;
	return {
		transform,
		WebkitTransform: transform,
	};
}

class SeatingViewCustomPreviewA extends PureComponent {
	render() {
		const { item, itemType, isDragging, hwStudents } = this.props;
		if (!isDragging) {
			return null;
		}

		return (
			<div
				style={{
					position: "fixed",
					pointerEvents: "none",
					zIndex: 100,
					left: 0,
					top: 0,
					width,
					height,
				}}
			>
				<div style={getItemStyles(this.props)}>
					<div>
						<Paper
							style={{
								height,
								width,
								// backgroundColor: color,
							}}
						>
							<div
								style={{
									height: 10,
									width: "100%",
									zIndex: 1,
									backgroundColor: "#eeeeee",
									margin: "auto",
									marginBottom: 5,
									borderTopLeftRadius: 4,
									borderTopRightRadius: 4,
								}}
							/>

							<Grid container spacing={0} justify="center" alignItems="center">
								<Grid item xs={12} align="center">
									<Typography variant="display1">
										<PersonIcon fontSize="inherit" />
									</Typography>
								</Grid>

								<Grid item align="center" xs={12}>
									<Typography>{hwStudents[item.id].firstName}</Typography>
								</Grid>

								<Grid item xs={12}>
									<Typography align="center">
										{hwStudents[item.id].lastName}
									</Typography>
								</Grid>
							</Grid>
						</Paper>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ hwStudents }) {
	return {
		hwStudents,
	};
}

const SeatingViewCustomPreview = throttle(25)(SeatingViewCustomPreviewA);

export default compose(
	connect(mapStateToProps),
	DragLayer(monitor => ({
		item: monitor.getItem(),
		itemType: monitor.getItemType(),
		initialOffset: monitor.getInitialSourceClientOffset(),
		currentOffset: monitor.getSourceClientOffset(),
		isDragging: monitor.isDragging(),
	})),
)(SeatingViewCustomPreview);
