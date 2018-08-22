import React, { Component, Fragment } from "react";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
//Accessories
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
//Icons
import AddBoxIcon from "@material-ui/icons/AddBox";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
//Components
import HWCourseStudentsList from "./StudentList/HWCourseStudentsList";

const styles = theme => ({
	root: {
		flexGrow: 1,
		height: 700,
		marginTop: 30
	},
	unitBar: {
		position: "static"
	},
	gridContainer: {
		height: 650,
		backgroundColor: theme.palette.primary,
		display: "block"
	},
	tabBtn: {
		button: {}
	}
});

const searchStudents = props => {
	const { homeworks, hwStudents, studentHWStatus } = props;
	const homeworkIDs = Object.keys(homeworks).reduce((acc, cv) => {
		acc.push(homeworks[cv].id);
		return acc;
	}, []);
};

class HWCourseUnitTabs extends Component {
	static getDerivedStateFromProps(nextProps, state) {
		if (!state.value && nextProps) {
			return {
				value: Object.keys(nextProps.hwUnits)[0]
			};
		}
		return null;
	}
	state = { value: Object.keys(this.props.hwUnits)[0] };

	componentDidMount() {
		const units = Object.keys(this.props.hwUnits);
		this.props.toggleUnitID(units[0]);
	}

	mountTable(unitID) {
		return (
			<HWCourseStudentsList
				unitID={unitID}
				courseID={this.props.courseID}
				toggleAddHW={this.props.toggleHWDialogOpen}
			/>
		);
	}

	handleTabValue = (e, value) => {
		this.setState({ value });
		this.props.toggleUnitID(value);
	};

	render() {
		const { hwUnits, classes } = this.props;
		// if (!this.state.value) return null;

		return (
			<Grid container spocing={0} className={classes.root} justify="center">
				<Grid item xs={11}>
					<AppBar className={classes.unitBar} color="default">
						<Grid container alignItems="center">
							<Grid item xs="auto">
								<Tabs
									value={this.state.value}
									onChange={this.handleTabValue}
									indicatorColor="primary"
									textColor="primary"
								>
									{Object.keys(hwUnits).map(item => (
										<Tab
											label={hwUnits[item].unitTitle}
											value={item}
											key={item}
										/>
									))}
								</Tabs>
							</Grid>

							<Grid item xs={1}>
								<Button
									color="primary"
									onClick={this.props.toggleUnitDialogOpen}
								>
									<AddBoxIcon />
								</Button>
							</Grid>
						</Grid>
					</AppBar>
				</Grid>
				<Grid item xs={11}>
					<div className={classes.gridContainer}>
						{this.state.value ? (
							<Grid container spacing={8} justify="center" alignItems="center">
								<Grid item xs={12}>
									{this.props.studentHWStatus === null ? null : (
										<div style={{ height: 500 }}>
											{this.mountTable(this.state.value)}
										</div>
									)}
								</Grid>
							</Grid>
						) : (
							<Grid container spacing={16} style={{ marginLeft: 12 }}>
								<Grid item>
									<ArrowUpwardIcon color="primary" />
								</Grid>
								<Grid item>
									<Typography variant="headline">
										Press the + button to get started!
									</Typography>
								</Grid>
							</Grid>
						)}
					</div>
				</Grid>
			</Grid>
		);
	}
}

function mapStateToProps({ hwUnits, homeworks, hwStudents, studentHWStatus }) {
	return {
		hwUnits,
		homeworks,
		hwStudents,
		studentHWStatus
	};
}

export default compose(
	withStyles(styles),
	connect(mapStateToProps)
)(HWCourseUnitTabs);
