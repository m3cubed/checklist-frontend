import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
//Accessories
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
//Icons
import MenuIcon from "@material-ui/icons/Menu";

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	menuIcon: {
		position: "absolute",
		top: 30,
		right: 25
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

const HWCoursesContainer = props => {
	const { course, classes } = props;

	return (
		<React.Fragment>
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
						<IconButton
							aria-owns={props.open ? "course-options-menu" : null}
							onClick={props.toggle(props.course)}
							className={classes.menuIcon}
						>
							<MenuIcon />
						</IconButton>
					</Grid>
				</CardContent>
			</Card>
		</React.Fragment>
	);
};

export default withStyles(styles)(HWCoursesContainer);
