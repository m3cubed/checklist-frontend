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
//Redux
import { changeUnit } from "../../../../actions/PageStates/page_hwCheckCourse";
//Components
import HWCourseStudentsList from "./StudentList/HWCourseStudentsList";
import ListUnitMenu from "./Menus/ListUnitMenu";
import SeatingViewDashboard from "./SeatingView/SeatingViewDashboard";

const styles = theme => ({
	root: {
		flexGrow: 1,
		height: 700,
		marginTop: 30,
	},
	unitBar: {
		position: "static",
	},
	gridContainer: {
		height: 650,
		backgroundColor: theme.palette.primary,
		display: "block",
	},
	tabBtn: {
		button: {},
	},
});

const searchStudents = props => {
	const { homeworks, hwStudents, studentHWStatus } = props;
	const homeworkIDs = Object.keys(homeworks).reduce((acc, cv) => {
		acc.push(homeworks[cv].id);
		return acc;
	}, []);
};

class HWCourseUnitTabs extends Component {
	state = {
		openUnitMenu: false,
		unitAnchorEl: null,
		targetUnit: null,
	};

	componentDidUpdate(prevProps) {
		if (
			prevProps.currentUnit === "" &&
			this.props.hwUnits !== prevProps.hwUnits
		) {
			const newUnit = Object.keys(this.props.hwUnits)[0];
			this.props.dispatch(changeUnit(newUnit));
		} else if (
			Object.keys(this.props.hwUnits).length === 0 &&
			this.props.hwUnits !== prevProps.hwUnits
		) {
			this.props.dispatch(changeUnit(""));
		}
	}

	componentDidMount() {
		const units = Object.keys(this.props.hwUnits);
		if (units.length > 0) {
			this.props.toggleUnitID(units[0]);
			this.props.dispatch(changeUnit(units[0]));
		}
	}

	componentWillUnmount() {
		this.props.dispatch(changeUnit(""));
	}

	mountTable(unitID) {
		switch (this.props.view) {
			case "Table View": {
				return (
					<HWCourseStudentsList
						unitID={unitID}
						courseID={this.props.courseID}
						toggleAddHW={this.props.toggleHWDialogOpen}
					/>
				);
			}
			case "Seating View": {
				return (
					<SeatingViewDashboard
						unitID={unitID}
						courseID={this.props.courseID}
						toggleAddHW={this.props.toggleHWDialogOpen}
					/>
				);
			}
			default:
				return null;
		}
	}

	handleTabValue = (e, value) => {
		this.setState({ value });
		this.props.dispatch(changeUnit(value));
		this.props.toggleUnitID(value);
	};

	toggleUnitMenu = unit => e => {
		e.preventDefault();
		this.setState({
			openUnitMenu: !this.state.openUnitMenu,
			unitAnchorEl: this.state.unitAnchorEl === null ? e.currentTarget : null,
			targetUnit: unit || null,
		});
	};

	closeUnitMenu = () => {
		this.setState({
			openUnitMenu: false,
			unitAnchorEl: null,
			targetUnit: null,
		});
	};

	render() {
		const { hwUnits, classes } = this.props;

		return (
			<Grid container spocing={0} className={classes.root} justify="center">
				{this.state.openUnitMenu ? (
					<ListUnitMenu
						open={this.state.openUnitMenu}
						toggle={this.closeUnitMenu}
						anchorEl={this.state.unitAnchorEl}
						target={this.state.targetUnit}
					/>
				) : null}
				<Grid item xs={11}>
			
				<AppBar className={classes.unitBar} color="default">
					<Grid container>
						<Grid item xs={1} align="center">
							<Button
								color="primary"
								onClick={this.props.toggleUnitDialogOpen}
							>
								<AddBoxIcon />
							</Button>
						</Grid>
						<Grid item xs={11}>
							<Tabs
								value={this.props.currentUnit}
								onChange={this.handleTabValue}
								indicatorColor="primary"
								textColor="primary"
								scrollable
								scrollButtons="auto"
							>
								{Object.keys(hwUnits).map(item => (
									<Tab
										aria-owns={this.state.unitAnchorEl ? "unit_menu" : null}
										label={hwUnits[item].unitTitle}
										value={item}
										key={item}
										onContextMenu={this.toggleUnitMenu(item)}
									/>
								))}
							</Tabs>
						</Grid>
					</Grid>
				</AppBar>
	
				</Grid>
				<Grid item xs={11}>
					<div className={classes.gridContainer}>
						{this.props.currentUnit !== "" ? (
							<Grid container spacing={8} justify="center" alignItems="center">
								<Grid item xs={12}>
									{this.props.studentHWStatus === null ? null : (
										<div style={{ height: 500 }}>
											{this.mountTable(this.props.currentUnit)}
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

function mapStateToProps({
	hwUnits,
	homeworks,
	hwStudents,
	studentHWStatus,
	page_hwCheckCourse,
}) {
	return {
		hwUnits,
		homeworks,
		hwStudents,
		studentHWStatus,
		currentUnit: page_hwCheckCourse.unit,
		view: page_hwCheckCourse.view,
	};
}

export default compose(
	withStyles(styles),
	connect(mapStateToProps),
)(HWCourseUnitTabs);
