import React, { Component, Fragment } from "react";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
//Accessories
import Grid from "@material-ui/core/Grid";
import ContainerDimensions from "react-container-dimensions";
//Components
import HWCoursesContainer from "./HWCoursesContainer";
import HWCourseEditMenu from "./CourseEdits/HWCourseEditMenu";
import HWCourseDeleteDialog from "./CourseEdits/HWCourseDeleteDialog";
import HWCourseEditDialog from "./CourseEdits/HWCourseEditDialog";

const styles = theme => ({
	root: {
		flexGrow: 1
	},

	addContainer: {
		width: "100%"
	}
});

class HWCoursesMain extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openOptions: false,
			anchorEl: null,
			target: null,
			openEdit: false,
			openDelete: false
		};

		this.handleDialogs = this.handleDialogs.bind(this);
	}

	handleOptionsOpen = course => event => {
		this.setState({
			openOptions: true,
			anchorEl: event.currentTarget,
			target: course
		});
	};

	handleOptionsClose = () => {
		this.setState({
			openOptions: false,
			anchorEl: null,
			target: null
		});
	};

	handleDialogs = type => {
		this.setState(
			{
				openOptions: false,
				anchorEl: null
			},
			() => this.setState({ [type]: !this.state[type] })
		);
	};

	render() {
		const { classes, hwCourses } = this.props;

		return (
			<Fragment>
				<HWCourseDeleteDialog
					courseID={this.state.target ? this.state.target.id : null}
					open={this.state.openDelete}
					toggle={this.handleDialogs}
				/>
				{this.state.openEdit ? (
					<HWCourseEditDialog
						course={this.state.target}
						open={this.state.openEdit}
						toggle={this.handleDialogs}
					/>
				) : null}

				<HWCourseEditMenu
					open={this.state.openOptions}
					toggle={this.handleOptionsClose}
					anchorEl={this.state.anchorEl}
					toggleDialog={this.handleDialogs}
				/>

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
												<HWCoursesContainer
													id={item}
													course={hwCourses[item]}
													open={this.state.openOptions}
													toggle={this.handleOptionsOpen}
												/>
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
								<ContainerDimensions>
									{this.props.HWCourseCreator}
								</ContainerDimensions>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Fragment>
		);
	}
}

function mapStateToProps({ hwCourses }) {
	return { hwCourses };
}

export default compose(
	withStyles(styles),
	connect(mapStateToProps)
)(HWCoursesMain);
