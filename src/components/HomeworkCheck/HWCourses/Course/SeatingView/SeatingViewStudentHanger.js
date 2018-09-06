import React from "react";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
//Components
import SeatingViewStudentCard from "./SeatingViewStudentCard";

const styles = theme => ({
	root: {
		position: "relative",
		display: "flex",
		justifyContent: "flex-start",
		overflow: "scroll hidden",
		backgroundColor: "grey",
		height: 125,
		alignItems: "center",
		width: "inherit"
	},
	gridList: {
		flexWrap: "nowrap",
		justifyContent: "flex-start",
		// Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
		transform: "translateZ(0)"
	}
});

const SeatingViewStudentHanger = props => {
	const { hwStudents, seatingPositions, classes } = props;
	const seated = Object.keys(seatingPositions);
	const notSeated = Object.keys(hwStudents).reduce((acc, cv) => {
		if (seated.includes(cv) === false) {
			acc.push(cv);
		}
		return acc;
	}, []);

	return (
		<div className={classes.root}>
			{notSeated.map((student, index) => {
				const { firstName, lastName, gender } = hwStudents[student];
				return (
					<React.Fragment key={student}>
						<SeatingViewStudentCard
							id={student}
							top={505}
							left={index * 80}
							firstName={firstName}
							lastName={lastName}
							gender={gender}
							location="hanger"
						/>
					</React.Fragment>
				);
			})}
		</div>
	);
};

function mapStateTopProps({ hwStudents, seatingPositions }) {
	return {
		hwStudents,
		seatingPositions
	};
}

export default compose(
	withStyles(styles),
	connect(mapStateTopProps)
)(SeatingViewStudentHanger);
