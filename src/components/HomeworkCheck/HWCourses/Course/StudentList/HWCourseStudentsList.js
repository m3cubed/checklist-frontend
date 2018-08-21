import React, { Component } from "react";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import update from "immutability-helper";
import "react-virtualized/styles.css"; // only needs to be imported once
import scrollbarSize from "dom-helpers/util/scrollbarSize";
//Accessories
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Grid as VGrid, ScrollSync, AutoSizer } from "react-virtualized";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
//Icons
import AddIcon from "@material-ui/icons/Add";
//Redux
import {
	randomFirstName,
	randomLastName,
	loadingAPI
} from "../../../../../api";
//Components
import ListFirstLastNames from "./ListFirstLastNames";
import ListHWMenu from "./ListHWMenu";
import ListStatusMenu from "./ListStatusMenu";
import {
	updateStudentStatus,
	loadStudentStatus,
	handleUpdateColumn
} from "../../../../../actions/HomeworkCheck/studentHWStatus";

const styles = theme => ({
	root: {
		flexGrow: 1,
		width: "100%",
		height: "100%"
	},
	studentColContainer: {
		overflow: "hidden hidden !important"
	},
	hwHeaderContainer: {
		overflow: "hidden hidden !important"
	},
	topRow: {
		flexGrow: 1,
		border: "1px solid #e0e0e0",
		borderRight: "none",
		borderLeft: "none"
	},
	studentColLeft: {
		flexGrow: 1,
		border: "1px solid #e0e0e0",
		borderRight: "none",
		borderLeft: "none",
		borderTop: "none"
	},
	studentCol: {
		flexGrow: 1,
		border: "1px solid #e0e0e0",
		borderLeft: "none",
		borderTop: "none"
	},
	studentBody: {
		flexGrow: 1,
		border: "1px solid #e0e0e0",
		borderRight: "none",
		borderLeft: "none",
		borderTop: "none"
	},
	containerPaper: {
		flexGrow: 1,
		position: "relative"
	},
	statusContainer: {
		height: 30,
		border: "1px solid transparent",
		borderRadius: 5,
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	}
});

function _createStudentStatus(props) {
	const { homeworks, hwStudents, studentHWStatus, dispatch } = props;
	const homeworkKeys = Object.keys(homeworks);

	const studentObj = Object.keys(hwStudents).reduce((acc, cv) => {
		acc[hwStudents[cv].id] = "Null";
		return acc;
	}, {});

	const statusObj = homeworkKeys.reduce((acc, cv) => {
		acc[homeworks[cv].homeworkTitle] = studentObj;
		return acc;
	}, {});

	const tempList = update(statusObj, {
		$merge: studentHWStatus
	});

	return tempList;
}

function _createState(props) {
	const { homeworks, hwStudents } = props;
	const hwKeys = Object.keys(homeworks);
	const hwTitles = hwKeys.reduce((acc, cv) => {
		acc.push([homeworks[cv].homeworkTitle, homeworks[cv].submitDate]);
		return acc;
	}, []);

	const state = {
		homeworks: [hwTitles],
		students: []
	};

	state.homeworksColLength = Object.keys(state.homeworks[0]).length;

	Object.keys(hwStudents).map(cv => {
		state.students.push([
			hwStudents[cv].firstName,
			hwStudents[cv].lastName,
			hwStudents[cv].id
		]);
	});

	state.studentsRowLength = Object.keys(state.students).length;

	return state;
}

function _dateConvertor(date) {
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
	date.shift();
	date[0] = month[Number(date[0]) - 1];
	date[1] = Number(date[1]);
	return date.join(" ");
}

class HWCourseStudentsList extends Component {
	static getDerivedStateFromProps(nextProps, state) {
		if (nextProps) {
			return {
				..._createState(nextProps)
			};
		} else {
			return { ...state };
		}
	}

	componentDidUpdate(prevProps) {
		if (
			prevProps.studentHWStatus !== this.props.studentHWStatus &&
			this._setStudentBodyRef
		) {
			this._setStudentBodyRef.current.recomputeGridSize();
		}
		if (
			prevProps.homeworks !== this.props.homeworks &&
			this._setHWHeaderRef.current
		) {
			this._setHWHeaderRef.current.recomputeGridSize();
			this._setStudentBodyRef.current.recomputeGridSize();
		}
		if (prevProps.unitID !== this.props.unitID && this._setStudentBodyRef) {
			this._setStudentBodyRef.current.recomputeGridSize();
		}
		if (
			prevProps.hwStudents !== this.props.hwStudents &&
			this._setStudentBodyRef
		) {
			this._setStudentColRef.current.recomputeGridSize();
			this._setStudentBodyRef.current.recomputeGridSize();
		}
	}

	constructor(props) {
		super(props);
		this.state = {
			..._createState(this.props),
			// studentStatus: _createStudentStatus(this.props),
			openHWMenu: false,
			openStatusMenu: false,
			anchorEl: null,
			statusAnchorEl: null,
			target: null,
			bodyColWidth: 140,
			bodyRowHeight: 50,
			targetHW: null
		};

		this._setStudentBodyRef = React.createRef();
		this._setHWHeaderRef = React.createRef();
		this._setStudentColRef = React.createRef();

		this.toggleHWMenu = this.toggleHWMenu.bind(this);
		this.toggleStatusMenu = this.toggleStatusMenu.bind(this);
		this.changeStudentStatus = this.changeStudentStatus.bind(this);
		this.changeStudentCol = this.changeStudentCol.bind(this);

		this._renderHWHeaderCell = this._renderHWHeaderCell.bind(this);
		this._renderStudentColumnCell = this._renderStudentColumnCell.bind(this);
		this._renderStudentBodyCell = this._renderStudentBodyCell.bind(this);
	}

	_renderHWHeaderCell({ columnIndex, key, rowIndex, style }) {
		if (this.state.homeworksColLength === columnIndex) {
			return (
				<Grid
					container
					key={key}
					style={style}
					className={this.props.classes.topRow}
					justify="center"
					alignItems="center"
				>
					<Button
						variant="contained"
						color="primary"
						size="small"
						style={{
							paddingTop: 6,
							paddingBottom: 6,
							paddingLeft: 7,
							paddingRight: 7
						}}
					>
						<AddIcon />
					</Button>
				</Grid>
			);
		}
		if (this.state.homeworks[rowIndex][columnIndex] === undefined) {
			return (
				<div key={key} style={style} className={this.props.classes.topRow} />
			);
		}
		return (
			<Grid
				container
				key={key}
				spacing={0}
				style={style}
				className={this.props.classes.topRow}
				aria-owns={this.state.anchorEl ? "HW_header_menu" : null}
				onClick={this.toggleHWMenu(
					this.state.homeworks[rowIndex][columnIndex][0]
				)}
				justify="center"
				alignItems="center"
			>
				<Grid item xs={12} align="center">
					<Typography variant="body1">
						{this.state.homeworks[rowIndex][columnIndex][0]}
					</Typography>
				</Grid>
				<Grid item xs={12} align="center">
					<Typography variant="caption">
						{_dateConvertor(this.state.homeworks[rowIndex][columnIndex][1])}
					</Typography>
				</Grid>
			</Grid>
		);
	}

	_renderStudentColumnCell({ columnIndex, key, rowIndex, style }) {
		if (this.state.students[rowIndex] === undefined) {
			return (
				<div
					className={
						columnIndex === 0
							? this.props.classes.studentColLeft
							: this.props.classes.studentCol
					}
					key={key}
					style={{
						...style,
						backgroundColor: rowIndex % 2 === 1 ? "#f5f5f5" : "none"
					}}
				/>
			);
		}
		return (
			<Grid
				container
				className={
					columnIndex === 0
						? this.props.classes.studentColLeft
						: this.props.classes.studentCol
				}
				key={key}
				style={{
					...style,
					backgroundColor: rowIndex % 2 === 1 ? "#f5f5f5" : "none"
				}}
				justify="center"
				alignItems="center"
			>
				<Typography variant="subheading">
					{this.state.students[rowIndex][columnIndex]}
				</Typography>
			</Grid>
		);
	}

	_renderStudentBodyCell({ columnIndex, key, rowIndex, style }) {
		const { students, homeworks } = this.state;
		const { studentHWStatus, hwStatus } = this.props;

		if (
			rowIndex >= this.state.studentsRowLength ||
			columnIndex >= this.state.homeworksColLength
		) {
			return (
				<div
					className={this.props.classes.studentBody}
					key={key}
					style={{
						...style,
						backgroundColor: rowIndex % 2 === 1 ? "#f5f5f5" : "none"
					}}
				/>
			);
		} else {
			const whichHW = homeworks[0][columnIndex][0];
			const whichStudent = students[rowIndex][2];
			return (
				<Grid
					container
					className={this.props.classes.studentBody}
					key={key}
					style={{
						...style,
						backgroundColor: rowIndex % 2 === 1 ? "#f5f5f5" : "none"
					}}
					aria-owns={this.state.statusAnchorEl ? "status_body_menu" : null}
					onClick={this.toggleStatusMenu(whichHW, whichStudent)}
					justify="center"
					alignItems="center"
				>
					{studentHWStatus[whichHW] === undefined ||
					studentHWStatus[whichHW][whichStudent] === undefined ? null : (
						<Grid
							item
							xs={9}
							className={this.props.classes.statusContainer}
							style={{
								backgroundColor: hwStatus[
									studentHWStatus[whichHW][whichStudent]
								]
									? hwStatus[studentHWStatus[whichHW][whichStudent]].color
									: "none"
							}}
							align="center"
						>
							<Typography>{studentHWStatus[whichHW][whichStudent]}</Typography>
						</Grid>
					)}
				</Grid>
			);
		}
	}

	toggleHWMenu = homework => e => {
		this.setState({
			openHWMenu: !this.state.openHWMenu,
			anchorEl: this.state.anchorEl === null ? e.currentTarget : null,
			targetHW: homework
		});
	};

	toggleStatusMenu = (homework, student) => e => {
		this.setState({
			openStatusMenu: !this.state.openStatusMenu,
			statusAnchorEl:
				this.state.statusAnchorEl === null ? e.currentTarget : null,
			target: [homework, student]
		});
	};

	changeStudentStatus(status) {
		this.props.dispatch(
			updateStudentStatus(this.state.target[0], this.state.target[1], status)
		);
		this.setState({
			openStatusMenu: !this.state.openStatusMenu,
			statusAnchorEl: null,
			target: null
		});
	}

	changeStudentCol(status) {
		this.props.dispatch(handleUpdateColumn(this.state.targetHW, status));
		this.setState({
			openHWMenu: !this.state.openHWMenu,
			anchorEl: null,
			targetHW: null
		});
	}

	_measureLengths = state => {
		return {
			studentRowLength: Object.keys(state.students.length),
			homeworksColLength: Object.keys(state.homeworks)
		};
	};

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<ListHWMenu
					open={this.state.openHWMenu}
					toggle={this.toggleHWMenu}
					anchorEl={this.state.anchorEl}
					change={this.changeStudentCol}
				/>
				<ListStatusMenu
					open={this.state.openStatusMenu}
					toggle={this.toggleStatusMenu}
					anchorEl={this.state.statusAnchorEl}
					change={this.changeStudentStatus}
				/>
				<AutoSizer>
					{({ height, width }) => (
						<ScrollSync>
							{({
								clientHeight,
								clientWidth,
								onScroll,
								scrollHeight,
								scrollLeft,
								scrollTop,
								scrollWidth
							}) => (
								<Grid
									container
									spacing={0}
									style={{ width: width, height: height }}
								>
									<Grid item xs={5} md={2}>
										<Paper
											style={{
												height: 40,
												zIndex: 3,
												boxShadow: "none",
												borderRadius: 0
											}}
										>
											<AutoSizer>
												{({ height, width }) => (
													<ListFirstLastNames height={height} width={width} />
												)}
											</AutoSizer>
										</Paper>
									</Grid>
									<Grid item xs={7} md={10}>
										<Paper
											style={{
												height: 40,
												zIndex: 3,
												boxShadow: "none",
												borderRadius: "none"
											}}
										>
											<AutoSizer>
												{({ height, width }) => (
													<VGrid
														ref={this._setHWHeaderRef}
														className={classes.hwHeaderContainer}
														cellRenderer={this._renderHWHeaderCell}
														columnCount={Math.max(
															this.state.homeworks[0].length,
															Math.ceil(width / this.state.bodyColWidth)
														)}
														columnWidth={this.state.bodyColWidth}
														rowCount={1}
														rowHeight={height}
														height={height}
														width={width - scrollbarSize()}
														overscanColumnCount={7}
														overscanRowCount={7}
														scrollLeft={scrollLeft}
													/>
												)}
											</AutoSizer>
										</Paper>
									</Grid>
									<Grid item xs={5} md={2}>
										<Paper
											style={{
												height: height - scrollbarSize(),
												zIndex: 2,
												borderRadius: 0,
												boxShadow:
													"5px 0px 5px -5px rgba(0, 0, 0, 0.2),10px 0px 20px -3px rgba(0, 0, 0, 0.14)"
											}}
										>
											<AutoSizer>
												{({ height, width }) => (
													<VGrid
														ref={this._setStudentColRef}
														className={classes.studentColContainer}
														cellRenderer={this._renderStudentColumnCell}
														columnCount={2}
														columnWidth={width / 2}
														rowCount={Math.max(
															this.state.students.length,
															Math.ceil(height / this.state.bodyRowHeight)
														)}
														rowHeight={this.state.bodyRowHeight}
														height={height - scrollbarSize()}
														width={width}
														overscanColumnCount={7}
														overscanRowCount={7}
														scrollTop={scrollTop}
													/>
												)}
											</AutoSizer>
										</Paper>
									</Grid>
									<Grid item xs={7} md={10}>
										<div style={{ height: height }}>
											<AutoSizer>
												{({ height, width }) => (
													<VGrid
														ref={this._setStudentBodyRef}
														cellRenderer={this._renderStudentBodyCell}
														columnCount={Math.max(
															this.state.homeworks[0].length,
															Math.ceil(width / this.state.bodyColWidth)
														)}
														columnWidth={this.state.bodyColWidth}
														rowCount={Math.max(
															this.state.students.length,
															Math.ceil(height / this.state.bodyRowHeight)
														)}
														rowHeight={this.state.bodyRowHeight}
														height={height}
														width={width}
														overscanColumnCount={7}
														overscanRowCount={7}
														onScroll={onScroll}
														scrollTop={scrollTop}
													/>
												)}
											</AutoSizer>
										</div>
									</Grid>
								</Grid>
							)}
						</ScrollSync>
					)}
				</AutoSizer>
			</div>
		);
	}
}

function mapStateToProps(
	{ hwStudents, homeworks, hwStatus, studentHWStatus },
	{ unitID }
) {
	Object.keys(homeworks).forEach(item => {
		if (homeworks[item].unitID !== unitID) {
			homeworks = update(homeworks, {
				$unset: [item]
			});
		}
	});

	return {
		hwStudents,
		homeworks,
		hwStatus,
		studentHWStatus
	};
}

export default compose(
	withStyles(styles),
	connect(mapStateToProps)
)(HWCourseStudentsList);
