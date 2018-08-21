import React, { Fragment } from "react";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
//Accessories
import Grid from "@material-ui/core/Grid";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ContainerDimensions from "react-container-dimensions";
//Components

const styles = theme => ({
	root: {
		flexGrow: 1
	},

	addContainer: {
		width: "100%"
	}
});

function dateConverter(date) {
	const month = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	];

	date = date.split("-");
	date[1] = month[Number(date[1]) - 1];
	date[2] = date[2].split("");
	let suffix;
	switch (date[2][1]) {
		case "1": {
			suffix = "st";
			break;
		}
		case "2": {
			suffix = "nd";
			break;
		}
		case "3": {
			suffix = "rd";
			break;
		}
		default:
			suffix = "th";
	}
	if (date[2][0] === "0") {
		date[2].shift();
	} else if (date[2][0] === "1") {
		suffix = "th";
	}
	return `${date[1]} ${date[2].join("")}${suffix}, ${date[0]}`;
}

const HWCourseContainer = props => {
	const { course } = props;

	return (
		<Card style={{ height: props.width }}>
			<CardContent>
				<Grid container spacing={40}>
					<Grid item xs={12}>
						<Link to={`/hw_check/class/${props.id}`}>
							<Typography variant="display1">{course.courseTitle}</Typography>
						</Link>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="caption">
							{dateConverter(course.startDate)} -{" "}
							{dateConverter(course.endDate)}
						</Typography>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
};

const HWCoursesMain = props => {
	const { classes, hwCourses } = props;

	return (
		<Fragment>
			<Grid container justify="center" alignItems="center" spacing={0}>
				<Grid item xs={12} md={10}>
					<Grid container spacing={40}>
						{hwCourses === null
							? null
							: Object.keys(hwCourses).map(item => (
									<Grid
										key={item}
										item
										className={classes.addContainer}
										align="center"
										xs={10}
										sm={4}
									>
										<ContainerDimensions>
											<HWCourseContainer id={item} course={hwCourses[item]} />
										</ContainerDimensions>
									</Grid>
							  ))}

						<Grid
							item
							className={classes.addContainer}
							align="center"
							xs={12}
							sm={4}
						>
							<ContainerDimensions>{props.HWCourseCreator}</ContainerDimensions>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Fragment>
	);
};

function mapStateToProps({ hwCourses }) {
	return { hwCourses };
}

export default compose(
	withStyles(styles),
	connect(mapStateToProps)
)(HWCoursesMain);
