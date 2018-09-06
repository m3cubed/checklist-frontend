import React, { Component } from "react";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
//Accessories
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { AutoSizer } from "react-virtualized";
//Components
import SeatingViewDropContainer from "./SeatingViewDropContainer";
import SeatingViewStudentHanger from "./SeatingViewStudentHanger";
import { savePositions } from "../../../../../actions/HomeworkCheck/seatingPositions";
import SeatingViewHWList from "./SeatingViewHWList";

const styles = theme => ({
	root: {
		flexGrow: 1,
		height: "100%"
	}
});

class SeatingViewDashboard extends Component {
	state = {};

	componentWillUnmount() {
		this.props.dispatch(savePositions(this.props.courseID));
	}

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<Grid container spacing={0}>
					<Grid item xs={2} style={{ height: "inherit" }}>
						<SeatingViewHWList />
					</Grid>
					<Grid item xs={10}>
						<div style={{ width: "100%" }}>
							<AutoSizer>
								{({ width }) => (
									<SeatingViewDropContainer
										courseID={this.props.courseID}
										students={this.props.hwStudents}
										seatingPositions={this.props.seatingPositions}
										maxWidth={width}
									/>
								)}
							</AutoSizer>
						</div>
					</Grid>
				</Grid>
			</div>
		);
	}
}

function mapStateToProps({ hwUnits, hwStudents, hwCourses, seatingPositions }) {
	return {
		hwUnits,
		hwStudents,
		hwCourses,
		seatingPositions
	};
}

export default compose(
	withStyles(styles),
	connect(mapStateToProps),
	DragDropContext(HTML5Backend)
)(SeatingViewDashboard);
